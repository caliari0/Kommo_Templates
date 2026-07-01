from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.adapters.api.auth import (
    CurrentUser,
    Role,
    get_current_user,
    hash_password,
    issue_token,
    require_roles,
    verify_password,
)
from app.adapters.api.schemas import (
    AuthLoginRequest,
    AuthRegisterRequest,
    AuthResponse,
    UserSummaryResponse,
    UserUpdateRequest,
)
from app.infrastructure.db.models import UserModel
from app.infrastructure.db.session import get_db

router = APIRouter(prefix="/auth", tags=["auth"])
admin_router = APIRouter(prefix="/admin/users", tags=["admin-users"])
PROTECTED_USERNAMES = {"manager", "developer", "user"}


def _normalize_username(value: str) -> str:
    normalized = value.strip().lower()
    if not normalized:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Username is required.")
    return normalized


def _parse_role(value: str) -> Role:
    try:
        return Role(value.strip().lower())
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Invalid role. Allowed roles: manager, developer, user.",
        ) from exc


def _parse_registration_role(value: str) -> Role:
    role = _parse_role(value)
    if role not in (Role.user, Role.manager, Role.developer):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Registration role must be user, manager or developer.",
        )
    return role


@router.post("/register", response_model=AuthResponse, summary="Create a new account")
def register_user(payload: AuthRegisterRequest, db: Annotated[Session, Depends(get_db)]) -> AuthResponse:
    username = _normalize_username(payload.username)
    role = _parse_registration_role(payload.role)
    existing = db.query(UserModel).filter(UserModel.username == username).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already exists.")

    user = UserModel(
        username=username,
        password_hash=hash_password(payload.password),
        role=role.value,
        is_active=True,
    )
    db.add(user)
    db.commit()
    token = issue_token(user.username, role)
    return AuthResponse(username=user.username, role=user.role, token=token)


@router.post("/login", response_model=AuthResponse, summary="Login with username and password")
def login_user(payload: AuthLoginRequest, db: Annotated[Session, Depends(get_db)]) -> AuthResponse:
    username = _normalize_username(payload.username)
    user = db.query(UserModel).filter(UserModel.username == username).first()
    if not user or not user.is_active or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials.")
    role = _parse_role(user.role)
    token = issue_token(user.username, role)
    return AuthResponse(username=user.username, role=user.role, token=token)


@router.get("/me", response_model=UserSummaryResponse, summary="Get current user")
def me(current: Annotated[CurrentUser, Depends(get_current_user)], db: Annotated[Session, Depends(get_db)]):
    user = db.query(UserModel).filter(UserModel.username == current.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    return UserSummaryResponse(
        id=user.id,
        username=user.username,
        role=user.role,
        is_active=user.is_active,
        created_at=user.created_at,
        updated_at=user.updated_at,
    )


@admin_router.get(
    "",
    response_model=list[UserSummaryResponse],
    dependencies=[Depends(require_roles(Role.developer))],
    summary="List all accounts",
)
def list_users(db: Annotated[Session, Depends(get_db)]):
    users = db.query(UserModel).order_by(UserModel.username.asc()).all()
    return [
        UserSummaryResponse(
            id=user.id,
            username=user.username,
            role=user.role,
            is_active=user.is_active,
            created_at=user.created_at,
            updated_at=user.updated_at,
        )
        for user in users
    ]


@admin_router.put(
    "/{user_id}",
    response_model=UserSummaryResponse,
    dependencies=[Depends(require_roles(Role.developer))],
    summary="Update an account",
)
def update_user(user_id: int, payload: UserUpdateRequest, db: Annotated[Session, Depends(get_db)]):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    if payload.username is not None:
        new_username = _normalize_username(payload.username)
        existing = db.query(UserModel).filter(UserModel.username == new_username, UserModel.id != user.id).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already exists.")
        user.username = new_username
    if payload.role is not None:
        user.role = _parse_role(payload.role).value
    if payload.password is not None:
        user.password_hash = hash_password(payload.password)
    if payload.is_active is not None:
        user.is_active = payload.is_active

    db.add(user)
    db.commit()
    db.refresh(user)
    return UserSummaryResponse(
        id=user.id,
        username=user.username,
        role=user.role,
        is_active=user.is_active,
        created_at=user.created_at,
        updated_at=user.updated_at,
    )


@admin_router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_roles(Role.developer))],
    summary="Delete an account",
)
def delete_user(
    user_id: int,
    current: Annotated[CurrentUser, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    if user.username == current.username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot delete your own account.",
        )
    if user.username in PROTECTED_USERNAMES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This account is protected and cannot be deleted.",
        )
    db.delete(user)
    db.commit()
