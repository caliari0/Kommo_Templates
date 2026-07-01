import base64
import hashlib
import hmac
import os
import secrets
import time
from dataclasses import dataclass
from enum import Enum
from typing import Annotated

from fastapi import Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.infrastructure.db.models import UserModel
from app.infrastructure.db.session import get_db


class Role(str, Enum):
    manager = "manager"
    developer = "developer"
    user = "user"


@dataclass
class CurrentUser:
    username: str
    role: Role


TOKEN_SECRET = os.environ.get("AUTH_TOKEN_SECRET", "kommo_simple_auth_secret")
TOKEN_TTL_SECONDS = 60 * 60 * 24 * 14


def hash_password(password: str, salt: str | None = None) -> str:
    safe_salt = salt or secrets.token_hex(8)
    digest = hashlib.sha256(f"{safe_salt}:{password}".encode("utf-8")).hexdigest()
    return f"{safe_salt}${digest}"


def verify_password(password: str, password_hash: str) -> bool:
    if "$" not in password_hash:
        return False
    salt, expected = password_hash.split("$", 1)
    calculated = hashlib.sha256(f"{salt}:{password}".encode("utf-8")).hexdigest()
    return hmac.compare_digest(calculated, expected)


def issue_token(username: str, role: Role) -> str:
    issued_at = str(int(time.time()))
    payload = f"{username}|{role.value}|{issued_at}"
    signature = hmac.new(
        TOKEN_SECRET.encode("utf-8"),
        payload.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    raw = f"{payload}|{signature}".encode("utf-8")
    return base64.urlsafe_b64encode(raw).decode("utf-8")


def decode_token(token: str) -> CurrentUser | None:
    try:
        decoded = base64.urlsafe_b64decode(token.encode("utf-8")).decode("utf-8")
        username, role_text, issued_at_text, signature = decoded.split("|", 3)
        payload = f"{username}|{role_text}|{issued_at_text}"
        expected_signature = hmac.new(
            TOKEN_SECRET.encode("utf-8"),
            payload.encode("utf-8"),
            hashlib.sha256,
        ).hexdigest()
        if not hmac.compare_digest(signature, expected_signature):
            return None
        issued_at = int(issued_at_text)
        if time.time() - issued_at > TOKEN_TTL_SECONDS:
            return None
        return CurrentUser(username=username, role=Role(role_text))
    except Exception:
        return None


def _legacy_user_from_role_header(x_role: str | None) -> CurrentUser | None:
    if x_role is None:
        return None
    try:
        role = Role(x_role.strip().lower())
        return CurrentUser(username=role.value, role=role)
    except ValueError:
        return None


def get_current_user(
    authorization: Annotated[str | None, Header()] = None,
    x_role: Annotated[str | None, Header()] = None,
    db: Annotated[Session, Depends(get_db)] = None,
) -> CurrentUser:
    if authorization and authorization.lower().startswith("bearer "):
        token = authorization.split(" ", 1)[1].strip()
        principal = decode_token(token)
        if not principal:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token.")
        user = db.query(UserModel).filter(UserModel.username == principal.username).first()
        if not user or not user.is_active:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found or inactive.")
        return CurrentUser(username=user.username, role=Role(user.role))

    legacy = _legacy_user_from_role_header(x_role)
    if legacy:
        return legacy
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Missing credentials. Use Bearer token or X-Role header.",
    )


def get_current_role(
    user: Annotated[CurrentUser, Depends(get_current_user)],
) -> Role:
    return user.role


def require_roles(*allowed_roles: Role):
    def dependency(user: Annotated[CurrentUser, Depends(get_current_user)]) -> CurrentUser:
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions for this action.",
            )
        return user

    return dependency
