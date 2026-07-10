import csv
import io
from typing import Annotated

from fastapi import APIRouter, Depends, File, HTTPException, Header, Query, Response, UploadFile, status
from sqlalchemy.orm import Session
from sqlalchemy import func, select

from app.adapters.api.auth import CurrentUser, Role, require_roles
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
from app.infrastructure.db.models import CategoryNodeModel, MessageTemplateModel, TemplateCopyEventModel
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


@router.post(
    "/import/csv",
    summary="Bulk create/update templates from a CSV file",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
async def import_templates_csv(
    service: Annotated[MessageTemplateService, Depends(get_service)],
    file: Annotated[UploadFile, File(description="CSV file with response_code/content columns")],
    x_language: Annotated[str | None, Header(alias="X-Language")] = None,
) -> dict[str, object]:
    raw = await file.read()
    try:
        text = raw.decode("utf-8-sig")
    except UnicodeDecodeError as exc:
        raise HTTPException(status_code=400, detail="CSV file must be UTF-8 encoded.") from exc

    reader = csv.DictReader(io.StringIO(text))
    if not reader.fieldnames:
        raise HTTPException(status_code=400, detail="CSV file is empty or missing a header row.")

    field_lookup = {(name or "").strip().lower(): name for name in reader.fieldnames}
    if "response_code" not in field_lookup or "content" not in field_lookup:
        raise HTTPException(
            status_code=400,
            detail="CSV must include 'response_code' and 'content' columns.",
        )

    default_language = resolve_language(None, x_language)

    total_rows = 0
    created = 0
    updated = 0
    failed = 0
    errors: list[str] = []

    for row in reader:
        total_rows += 1
        response_code = (row.get(field_lookup["response_code"]) or "").strip()
        content = row.get(field_lookup["content"]) or ""
        category_raw = row.get(field_lookup.get("category", "")) if "category" in field_lookup else None
        category = (category_raw or "").strip() or "newtemp"
        language_raw = row.get(field_lookup.get("language", "")) if "language" in field_lookup else None
        language = (language_raw or "").strip().lower() or default_language

        if not response_code or not content.strip():
            failed += 1
            errors.append(f"Row {total_rows}: response_code and content are required.")
            continue

        try:
            _, was_created = service.upsert(
                category=category,
                language=language,
                response_code=response_code,
                content=content,
            )
            if was_created:
                created += 1
            else:
                updated += 1
        except (InvalidLanguageError, ValueError) as exc:
            failed += 1
            errors.append(f"Row {total_rows}: {exc}")

    return {
        "status": "ok",
        "total_rows": total_rows,
        "created": created,
        "updated": updated,
        "failed": failed,
        "errors": errors[:20],
    }


@router.get(
    "/outdated/count",
    summary="Count templates currently flagged as outdated",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def count_outdated_templates(
    db: Annotated[Session, Depends(get_db)],
    language: Annotated[str | None, Query(description="Optional language filter.")] = None,
) -> dict[str, int]:
    statement = select(func.count(MessageTemplateModel.id)).where(MessageTemplateModel.is_outdated.is_(True))
    if language:
        statement = statement.where(MessageTemplateModel.language == language.strip().lower())
    count = db.scalar(statement) or 0
    return {"count": count}


@router.get(
    "/outdated/summary",
    summary="List templates currently flagged as outdated, most recently reported first",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def summarize_outdated_templates(
    db: Annotated[Session, Depends(get_db)],
    language: Annotated[str | None, Query(description="Optional language filter.")] = None,
    limit: Annotated[int, Query(ge=1, le=100, description="Max number of reports to return.")] = 12,
) -> dict[str, object]:
    cleaned_language = language.strip().lower() if language else None

    count_statement = select(func.count(MessageTemplateModel.id)).where(MessageTemplateModel.is_outdated.is_(True))
    items_statement = (
        select(MessageTemplateModel)
        .where(MessageTemplateModel.is_outdated.is_(True))
        .order_by(MessageTemplateModel.updated_at.desc())
        .limit(limit)
    )
    if cleaned_language:
        count_statement = count_statement.where(MessageTemplateModel.language == cleaned_language)
        items_statement = items_statement.where(MessageTemplateModel.language == cleaned_language)

    count = db.scalar(count_statement) or 0
    templates = db.scalars(items_statement).all()
    items = [
        {
            "template_id": template.id,
            "response_code": template.response_code,
            "reported_by": template.outdated_reported_by,
            "commentary": template.outdated_commentary,
        }
        for template in templates
    ]
    return {"count": count, "items": items}


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


@router.patch(
    "/{template_id}/copied",
    response_model=MessageTemplateResponse,
    summary="Record that a template's content was copied",
)
def mark_template_copied(
    template_id: int,
    service: Annotated[MessageTemplateService, Depends(get_service)],
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[
        CurrentUser,
        Depends(require_roles(Role.user, Role.manager, Role.developer)),
    ],
) -> MessageTemplateResponse:
    try:
        template = service.increment_copy_count(template_id)
    except TemplateNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

    db.add(TemplateCopyEventModel(template_id=template_id, username=current_user.username))
    db.commit()
    return MessageTemplateResponse.model_validate(template)


@router.patch(
    "/{template_id}/outdated/report",
    response_model=MessageTemplateResponse,
    summary="Flag a template as outdated",
)
def report_template_outdated(
    template_id: int,
    service: Annotated[MessageTemplateService, Depends(get_service)],
    current_user: Annotated[
        CurrentUser,
        Depends(require_roles(Role.user, Role.manager, Role.developer)),
    ],
    commentary: Annotated[
        str | None,
        Query(max_length=2000, description="Optional commentary about why the template is outdated."),
    ] = None,
) -> MessageTemplateResponse:
    try:
        template = service.report_outdated(
            template_id,
            reported_by=current_user.username,
            commentary=commentary.strip() if commentary and commentary.strip() else None,
        )
        return MessageTemplateResponse.model_validate(template)
    except TemplateNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.patch(
    "/{template_id}/outdated/clear",
    response_model=MessageTemplateResponse,
    summary="Clear the outdated flag from a template",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def clear_template_outdated(
    template_id: int,
    service: Annotated[MessageTemplateService, Depends(get_service)],
) -> MessageTemplateResponse:
    try:
        template = service.clear_outdated(template_id)
        return MessageTemplateResponse.model_validate(template)
    except TemplateNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


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
        "path": node.path,
        "breadcrumb": parts,
    }


@router.post(
    "/categories/nodes",
    summary="Create a category node",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def create_category_node(
    db: Annotated[Session, Depends(get_db)],
    name: Annotated[str, Query(min_length=1, max_length=100, description="Node name")],
    parent_id: Annotated[int | None, Query(description="Optional parent node id")] = None,
) -> dict[str, object]:
    cleaned_name = name.strip()
    if not cleaned_name:
        raise HTTPException(status_code=400, detail="name cannot be empty")

    parent: CategoryNodeModel | None = None
    if parent_id is not None:
        parent = db.get(CategoryNodeModel, parent_id)
        if not parent:
            raise HTTPException(status_code=404, detail="parent node not found")
        node_path = f"{parent.path} > {cleaned_name}"
    else:
        node_path = cleaned_name

    existing = db.scalar(select(CategoryNodeModel).where(CategoryNodeModel.path == node_path))
    if existing:
        raise HTTPException(status_code=409, detail="node path already exists")

    node = CategoryNodeModel(
        name=cleaned_name,
        parent_id=parent.id if parent else None,
        path=node_path,
    )
    db.add(node)
    db.commit()
    db.refresh(node)
    return {
        "id": node.id,
        "name": node.name,
        "parent_id": node.parent_id,
        "path": node.path,
    }


@router.put(
    "/categories/nodes/{node_id}",
    summary="Rename/update a category node",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def update_category_node(
    node_id: int,
    db: Annotated[Session, Depends(get_db)],
    name: Annotated[str | None, Query(min_length=1, max_length=100)] = None,
) -> dict[str, object]:
    node = db.get(CategoryNodeModel, node_id)
    if not node:
        raise HTTPException(status_code=404, detail="node not found")

    old_path = node.path
    cleaned_name = name.strip() if name is not None else node.name
    if not cleaned_name:
        raise HTTPException(status_code=400, detail="name cannot be empty")

    parent = db.get(CategoryNodeModel, node.parent_id) if node.parent_id else None
    new_path = f"{parent.path} > {cleaned_name}" if parent else cleaned_name

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

    descendants = db.scalars(
        select(CategoryNodeModel).where(CategoryNodeModel.path.like(f"{old_path} > %"))
    ).all()
    for descendant in descendants:
        descendant.path = descendant.path.replace(f"{old_path} > ", f"{new_path} > ", 1)

    templates = db.scalars(
        select(MessageTemplateModel).where(
            MessageTemplateModel.category == old_path
        )
    ).all()
    for template in templates:
        template.category = new_path

    descendant_templates = db.scalars(
        select(MessageTemplateModel).where(MessageTemplateModel.category.like(f"{old_path} > %"))
    ).all()
    for template in descendant_templates:
        template.category = template.category.replace(f"{old_path} > ", f"{new_path} > ", 1)

    db.commit()
    db.refresh(node)
    return {
        "id": node.id,
        "name": node.name,
        "parent_id": node.parent_id,
        "path": node.path,
    }


@router.delete(
    "/categories/nodes/{node_id}",
    summary="Delete a category node subtree",
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
    summary="Reset DB and seed generic category templates",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
)
def reset_database(
    db: Annotated[Session, Depends(get_db)],
) -> dict[str, object]:
    db.query(MessageTemplateModel).delete()
    db.query(CategoryNodeModel).delete()
    db.commit()

    root_categories = [
        "Incoming Lead", "Web Contact", "Event Contact", "Cold Outreach", "Referral",
        "Discovery", "Needs Mapping", "Budget Check", "Decision Mapping", "Risk Assessment",
        "First Follow-up", "Second Follow-up", "No Response", "Re-engagement", "Nurture",
        "Proposal", "Negotiation", "Closing", "Contract", "Handover",
        "Onboarding", "Adoption", "Renewal", "Expansion", "Advocacy",
    ]
    channel_nodes = ["Email", "WhatsApp", "Phone", "SMS", "Chat"]

    created_nodes: list[CategoryNodeModel] = []
    for root_name in root_categories:
        root_path = root_name
        root = CategoryNodeModel(name=root_name, parent_id=None, path=root_path)
        db.add(root)
        db.flush()
        created_nodes.append(root)
        for channel in channel_nodes:
            child_path = f"{root_path} > {channel}"
            child = CategoryNodeModel(
                name=channel,
                parent_id=root.id,
                path=child_path,
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
                language=language,
                response_code=f"TEMPLATE_{language.upper()}_{index + 1:03}",
                content=(
                    f"[{language.upper()}] Generic template #{index + 1}. "
                    f"Category: {node.path}. "
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
