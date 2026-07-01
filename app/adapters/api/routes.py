from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Header, Query, Response, status
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.adapters.api.auth import Role, require_roles
from app.adapters.api.schemas import (
    MessageTemplateCreate,
    MessageTemplateResponse,
    MessageTemplateUpdate,
)
from app.application.use_cases.message_template_service import (
    DuplicateResponseCodeError,
    InvalidLanguageError,
    MessageTemplateService,
    TemplateNotFoundError,
)
from app.infrastructure.db.session import get_db
from app.infrastructure.db.models import CategoryNodeModel, MessageTemplateModel
from app.infrastructure.repositories.sqlalchemy_message_template_repository import (
    SqlAlchemyMessageTemplateRepository,
)

router = APIRouter(prefix="/templates", tags=["templates"])


def get_service(db: Annotated[Session, Depends(get_db)]) -> MessageTemplateService:
    repository = SqlAlchemyMessageTemplateRepository(db)
    return MessageTemplateService(repository)


def resolve_language(language: str | None, x_language: str | None) -> str:
    return (language or x_language or "en").strip().lower()


def _build_category_tree(nodes: list[CategoryNodeModel]) -> list[dict[str, object]]:
    items: dict[int, dict[str, object]] = {}
    roots: list[dict[str, object]] = []
    for node in nodes:
        items[node.id] = {
            "id": node.id,
            "name": node.name,
            "path": node.path,
            "parent_id": node.parent_id,
            "flow": node.flow,
            "children": [],
        }
    for node in nodes:
        item = items[node.id]
        if node.parent_id and node.parent_id in items:
            items[node.parent_id]["children"].append(item)
        else:
            roots.append(item)
    return roots


def _collect_descendants(nodes_by_parent: dict[int | None, list[CategoryNodeModel]], parent_id: int) -> list[CategoryNodeModel]:
    result: list[CategoryNodeModel] = []
    children = nodes_by_parent.get(parent_id, [])
    for child in children:
        result.append(child)
        result.extend(_collect_descendants(nodes_by_parent, child.id))
    return result


@router.post(
    "",
    response_model=MessageTemplateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a message template",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def create_template(
    payload: MessageTemplateCreate,
    service: Annotated[MessageTemplateService, Depends(get_service)],
) -> MessageTemplateResponse:
    try:
        template = service.create(
            category=payload.category,
            flow=payload.flow,
            language=payload.language,
            response_code=payload.response_code,
            content=payload.content,
        )
        return MessageTemplateResponse.model_validate(template)
    except DuplicateResponseCodeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except InvalidLanguageError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.get(
    "",
    response_model=list[MessageTemplateResponse],
    summary="List all message templates",
    dependencies=[Depends(require_roles(Role.user, Role.manager, Role.developer))],
)
def list_templates(
    service: Annotated[MessageTemplateService, Depends(get_service)],
    language: Annotated[
        str | None,
        Query(description="Optional language filter. Allowed: en, es, pt.", examples=["en"]),
    ] = None,
    x_language: Annotated[str | None, Header(alias="X-Language")] = None,
    category: Annotated[
        str | None,
        Query(description="Optional category filter.", examples=["Onboarding"]),
    ] = None,
) -> list[MessageTemplateResponse]:
    try:
        templates = service.list(language=resolve_language(language, x_language), category=category)
        return [MessageTemplateResponse.model_validate(template) for template in templates]
    except InvalidLanguageError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.get(
    "/search",
    response_model=list[MessageTemplateResponse],
    summary="Search templates by response code or content",
    dependencies=[Depends(require_roles(Role.user, Role.manager, Role.developer))],
)
def search_templates(
    service: Annotated[MessageTemplateService, Depends(get_service)],
    q: Annotated[
        str,
        Query(
            description="Search text used to match response_code and content.",
            examples=["WELCOME"],
        ),
    ] = "",
    language: Annotated[
        str | None,
        Query(description="Optional language filter. Allowed: en, es, pt.", examples=["en"]),
    ] = None,
    x_language: Annotated[str | None, Header(alias="X-Language")] = None,
    category: Annotated[
        str | None,
        Query(description="Optional category filter.", examples=["Onboarding"]),
    ] = None,
) -> list[MessageTemplateResponse]:
    try:
        templates = service.search(
            q,
            language=resolve_language(language, x_language),
            category=category,
        )
        return [MessageTemplateResponse.model_validate(template) for template in templates]
    except InvalidLanguageError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.get(
    "/{template_id}",
    response_model=MessageTemplateResponse,
    summary="Get one message template by id",
    dependencies=[Depends(require_roles(Role.user, Role.manager, Role.developer))],
)
def get_template(
    template_id: int,
    service: Annotated[MessageTemplateService, Depends(get_service)],
) -> MessageTemplateResponse:
    try:
        template = service.get(template_id)
        return MessageTemplateResponse.model_validate(template)
    except TemplateNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except InvalidLanguageError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.put(
    "/{template_id}",
    response_model=MessageTemplateResponse,
    summary="Update a message template",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def update_template(
    template_id: int,
    payload: MessageTemplateUpdate,
    service: Annotated[MessageTemplateService, Depends(get_service)],
) -> MessageTemplateResponse:
    try:
        template = service.update(
            template_id=template_id,
            category=payload.category,
            flow=payload.flow,
            language=payload.language,
            response_code=payload.response_code,
            content=payload.content,
        )
        return MessageTemplateResponse.model_validate(template)
    except TemplateNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except DuplicateResponseCodeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except InvalidLanguageError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.get(
    "/categories/tree",
    summary="List category tree for tree navigation",
    dependencies=[Depends(require_roles(Role.user, Role.manager, Role.developer))],
)
def list_category_tree(
    db: Annotated[Session, Depends(get_db)],
) -> list[dict[str, object]]:
    nodes = db.scalars(select(CategoryNodeModel).order_by(CategoryNodeModel.path.asc())).all()
    return _build_category_tree(nodes)


@router.get(
    "/categories/{category_id}/breadcrumb",
    summary="Get breadcrumb chain for a category node",
    dependencies=[Depends(require_roles(Role.user, Role.manager, Role.developer))],
)
def get_category_breadcrumb(
    category_id: int,
    db: Annotated[Session, Depends(get_db)],
) -> dict[str, object]:
    node = db.get(CategoryNodeModel, category_id)
    if not node:
        raise HTTPException(status_code=404, detail="category node not found")
    parts = [part.strip() for part in node.path.split(">") if part.strip()]
    return {
        "category_id": node.id,
        "flow": node.flow,
        "path": node.path,
        "breadcrumb": parts,
    }


@router.post(
    "/categories/nodes",
    summary="Create a category/flow node",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def create_category_node(
    db: Annotated[Session, Depends(get_db)],
    name: Annotated[str, Query(min_length=1, max_length=100, description="Node name")],
    parent_id: Annotated[int | None, Query(description="Optional parent node id")] = None,
    flow: Annotated[str | None, Query(min_length=1, max_length=100, description="Flow key")] = None,
) -> dict[str, object]:
    cleaned_name = name.strip()
    if not cleaned_name:
        raise HTTPException(status_code=400, detail="name cannot be empty")

    parent: CategoryNodeModel | None = None
    if parent_id is not None:
        parent = db.get(CategoryNodeModel, parent_id)
        if not parent:
            raise HTTPException(status_code=404, detail="parent node not found")
        node_flow = (flow or parent.flow).strip().lower()
        node_path = f"{parent.path} > {cleaned_name}"
    else:
        node_flow = (flow or "general").strip().lower()
        node_path = cleaned_name

    existing = db.scalar(select(CategoryNodeModel).where(CategoryNodeModel.path == node_path))
    if existing:
        raise HTTPException(status_code=409, detail="node path already exists")

    node = CategoryNodeModel(
        name=cleaned_name,
        parent_id=parent.id if parent else None,
        path=node_path,
        flow=node_flow,
    )
    db.add(node)
    db.commit()
    db.refresh(node)
    return {
        "id": node.id,
        "name": node.name,
        "parent_id": node.parent_id,
        "path": node.path,
        "flow": node.flow,
    }


@router.put(
    "/categories/nodes/{node_id}",
    summary="Rename/update a category/flow node",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def update_category_node(
    node_id: int,
    db: Annotated[Session, Depends(get_db)],
    name: Annotated[str | None, Query(min_length=1, max_length=100)] = None,
    flow: Annotated[str | None, Query(min_length=1, max_length=100)] = None,
) -> dict[str, object]:
    node = db.get(CategoryNodeModel, node_id)
    if not node:
        raise HTTPException(status_code=404, detail="node not found")

    old_path = node.path
    old_flow = node.flow
    cleaned_name = name.strip() if name is not None else node.name
    if not cleaned_name:
        raise HTTPException(status_code=400, detail="name cannot be empty")

    parent = db.get(CategoryNodeModel, node.parent_id) if node.parent_id else None
    new_path = f"{parent.path} > {cleaned_name}" if parent else cleaned_name
    new_flow = (flow.strip().lower() if flow is not None else node.flow)

    if new_path != old_path:
        collision = db.scalar(
            select(CategoryNodeModel).where(
                CategoryNodeModel.path == new_path,
                CategoryNodeModel.id != node.id,
            )
        )
        if collision:
            raise HTTPException(status_code=409, detail="node path already exists")

    node.name = cleaned_name
    node.path = new_path
    node.flow = new_flow

    descendants = db.scalars(
        select(CategoryNodeModel).where(CategoryNodeModel.path.like(f"{old_path} > %"))
    ).all()
    for descendant in descendants:
        descendant.path = descendant.path.replace(f"{old_path} > ", f"{new_path} > ", 1)
        if flow is not None and descendant.flow == old_flow:
            descendant.flow = new_flow

    templates = db.scalars(
        select(MessageTemplateModel).where(
            MessageTemplateModel.category == old_path
        )
    ).all()
    for template in templates:
        template.category = new_path
        if flow is not None and template.flow == old_flow:
            template.flow = new_flow

    descendant_templates = db.scalars(
        select(MessageTemplateModel).where(MessageTemplateModel.category.like(f"{old_path} > %"))
    ).all()
    for template in descendant_templates:
        template.category = template.category.replace(f"{old_path} > ", f"{new_path} > ", 1)
        if flow is not None and template.flow == old_flow:
            template.flow = new_flow

    db.commit()
    db.refresh(node)
    return {
        "id": node.id,
        "name": node.name,
        "parent_id": node.parent_id,
        "path": node.path,
        "flow": node.flow,
    }


@router.delete(
    "/categories/nodes/{node_id}",
    summary="Delete a category/flow node subtree",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def delete_category_node(
    node_id: int,
    db: Annotated[Session, Depends(get_db)],
    delete_templates: Annotated[bool, Query(description="Delete templates under this subtree")] = False,
) -> dict[str, object]:
    node = db.get(CategoryNodeModel, node_id)
    if not node:
        raise HTTPException(status_code=404, detail="node not found")

    all_nodes = db.scalars(select(CategoryNodeModel)).all()
    nodes_by_parent: dict[int | None, list[CategoryNodeModel]] = {}
    for item in all_nodes:
        nodes_by_parent.setdefault(item.parent_id, []).append(item)

    descendants = _collect_descendants(nodes_by_parent, node.id)
    subtree_paths = [node.path] + [item.path for item in descendants]
    subtree_ids = [node.id] + [item.id for item in descendants]

    subtree_templates = db.scalars(
        select(MessageTemplateModel).where(MessageTemplateModel.category_id.in_(subtree_ids))
    ).all()

    if subtree_templates and not delete_templates:
        raise HTTPException(
            status_code=409,
            detail="node has templates. Retry with delete_templates=true to remove subtree templates.",
        )

    deleted_templates_count = 0
    if subtree_templates and delete_templates:
        deleted_templates_count = len(subtree_templates)
        for template in subtree_templates:
            db.delete(template)

    # Also clean any legacy rows linked only by path text
    if delete_templates:
        legacy_templates = db.scalars(
            select(MessageTemplateModel).where(MessageTemplateModel.category.in_(subtree_paths))
        ).all()
        for template in legacy_templates:
            if template not in subtree_templates:
                db.delete(template)
                deleted_templates_count += 1

    for item in sorted(descendants, key=lambda row: row.path.count(">"), reverse=True):
        db.delete(item)
    db.delete(node)
    db.commit()

    return {
        "status": "ok",
        "deleted_nodes": len(descendants) + 1,
        "deleted_templates": deleted_templates_count,
    }


@router.post(
    "/admin/reset-database",
    summary="Reset DB and seed generic category-flow templates",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def reset_database(
    db: Annotated[Session, Depends(get_db)],
) -> dict[str, object]:
    db.query(MessageTemplateModel).delete()
    db.query(CategoryNodeModel).delete()
    db.commit()

    categories_by_flow = {
        "intake": ["Incoming Lead", "Web Contact", "Event Contact", "Cold Outreach", "Referral"],
        "qualification": ["Discovery", "Needs Mapping", "Budget Check", "Decision Mapping", "Risk Assessment"],
        "follow_up": ["First Follow-up", "Second Follow-up", "No Response", "Re-engagement", "Nurture"],
        "conversion": ["Proposal", "Negotiation", "Closing", "Contract", "Handover"],
        "retention": ["Onboarding", "Adoption", "Renewal", "Expansion", "Advocacy"],
    }
    channel_nodes = ["Email", "WhatsApp", "Phone", "SMS", "Chat"]

    created_nodes: list[CategoryNodeModel] = []
    for flow, roots in categories_by_flow.items():
        for root_name in roots:
            root_path = root_name
            root = CategoryNodeModel(name=root_name, parent_id=None, path=root_path, flow=flow)
            db.add(root)
            db.flush()
            created_nodes.append(root)
            for channel in channel_nodes:
                child_path = f"{root_path} > {channel}"
                child = CategoryNodeModel(
                    name=channel,
                    parent_id=root.id,
                    path=child_path,
                    flow=flow,
                )
                db.add(child)
                db.flush()
                created_nodes.append(child)
    db.commit()

    languages = ["en", "es", "pt"]
    templates_per_language = 130
    target_nodes = created_nodes[:templates_per_language]
    for language in languages:
        for index in range(templates_per_language):
            node = target_nodes[index % len(target_nodes)]
            template = MessageTemplateModel(
                category=node.path,
                category_id=node.id,
                flow=node.flow,
                language=language,
                response_code=f"TEMPLATE_{language.upper()}_{index + 1:03}",
                content=(
                    f"[{language.upper()}] Generic template #{index + 1}. "
                    f"Category: {node.path}. Flow: {node.flow}. "
                    "Use this for endpoint and UI tests."
                ),
            )
            db.add(template)
    db.commit()

    return {
        "status": "ok",
        "languages_seeded": languages,
        "templates_per_language": templates_per_language,
        "total_templates": templates_per_language * len(languages),
        "total_categories": len(created_nodes),
    }


@router.delete(
    "/{template_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a message template",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def delete_template(
    template_id: int,
    service: Annotated[MessageTemplateService, Depends(get_service)],
) -> Response:
    try:
        service.delete(template_id)
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except TemplateNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
