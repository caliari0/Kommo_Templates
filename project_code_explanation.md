# Project Notes

This is a FastAPI CRUD app for reusable message templates.

Current version: `v3.2.0`

Main components:

- API at `/templates`
- Web UI at `/ui`
- SQLite database (`app.db`)
- Role model (`manager`, `developer`, and `user`)
- Language support (`en`, `es`, `pt`)

The main design choice here is separation of concerns:

- routes handle HTTP
- service handles business rules
- repository handles DB access

## Why It Is Structured This Way

For this scope, the goal is to keep code easy to change without touching everything.

- Business rules can be modified without rewriting route handlers.
- The persistence layer can be swapped later if needed.
- The service layer is easier to unit test than route logic.

This is more structure than a minimal CRUD app, but it keeps things cleaner as features grow.

## Folder Overview

### `app/main.py`

Application entrypoint and wiring.

- creates the FastAPI app
- mounts static files
- includes API and web routers
- redirects `/` to `/ui`
- ensures DB schema is ready on startup

### `app/domain`

Core concepts without framework details.

- `entities/message_template.py`: template entity dataclass, including `copy_count`, `is_outdated`, `outdated_reported_by`, `outdated_commentary` (mapped end-to-end from the DB, so list/search/get responses reflect real state)
- `ports/message_template_repository.py`: repository interface/contract, including `increment_copy_count`, `report_outdated`, `clear_outdated`

### `app/application/use_cases/message_template_service.py`

Business rules live here, for example:

- `response_code` must be unique per language
- language must be one of `en`, `es`, `pt`
- required fields cannot be blank
- missing ids raise `TemplateNotFoundError`

This layer does not know about FastAPI or SQLAlchemy directly.

### `app/infrastructure`

Database and persistence implementation.

- `db/session.py`: SQLAlchemy engine/session + startup schema check
- `db/models.py`: `MessageTemplateModel` (unique constraint on `response_code`, `language`; `copy_count`, `is_outdated`, `outdated_reported_by`, `outdated_commentary`), `TemplateCopyEventModel` (one row per copy action: `template_id`, `username`, `created_at`), `UserModel`, `CategoryNodeModel`
- `repositories/sqlalchemy_message_template_repository.py`: concrete repository implementation

### `app/adapters/api`

HTTP API layer.

- `auth.py`: token + role resolution and role-based permission checks
- `auth_routes.py`: register/login/current-user and developer account-management endpoints
- `schemas.py`: Pydantic input/output models
- `routes.py`: endpoint definitions + exception to HTTP mapping

### `app/adapters/web`

UI delivery layer.

- `routes.py`: serves `index.html` at `/ui`
- `static/index.html`: page layout
- `static/app.js`: login/session/language/theme/font-mode switching + API calls
- `static/styles.css`: styling

UI behavior highlights:

- Kommo-style shell: left rail navigation with role-based visibility and role-specific dashboards (overflow hidden so the rail does not show a stray scrollbar)
- `manager`: Business Dashboard + Workspace
- `developer`: Business Dashboard + Engineering Dashboard + Workspace
- `user`: Workspace only
- Flow Explorer: flow tabs, chip breadcrumbs, path notice when the flow tab invalidates the path, **Up one level**, two-column category navigation, template search
- Templates panel: list scoped to selection; per-card **Edit** / **Copy**, outdated **Report/Clear**, copy counter; **Edit** opens a modal **drawer** for the form
- Flow Node Management (manager/developer): **New node** creates a root when the flow tab is **All flows**, or a child under the selected node when a specific flow tab is active; **Rename** / **Delete** on the selected node; per-row **⋯** menu and **right-click** for **Add sub-category here** (parent = that row), **Rename**, **Delete** without prior selection
- Contextual warnings (per node/flow), editable when permitted
- Reports panel (manager/developer): grouped outdated reports with commentary, quick open-to-template, and mark-reviewed; the reporting username comes from the authenticated session, not client input
- Recent changes panel (all users): templates updated since each user's last session, with mark-as-seen and open-to-template
- Login screen supports **Create account**; self-registration allows `user`, `manager`, or `developer` roles
- Business Dashboard includes operational metrics for templates and user activity, including a "Top active users" panel ranked by templates copied with an **hour/day/month** window selector
- Engineering Dashboard includes technical diagnostics (latency percentiles, error rate, status breakdown, and slow endpoints), plus integrated usage metrics reporting (dashboard data refreshes on a fixed interval)
- Account administration is embedded in Engineering Dashboard and hides seeded default accounts from the visible list
- Recent changes timestamps and header clock are timezone-aware for each user
- Protected default users (`manager`, `developer`, `user`) cannot be deleted
- Deprecated full-width metrics and standalone user-accounts panels from the workspace bottom bar in favor of the Engineering Dashboard
- dark/light mode toggle persisted in `localStorage` (toggle in bottom bar)
- ADHD mode toggle (Comfortaa font across the UI), also persisted
- a hidden secret button in the page for discoverability/easter-egg behavior

## API Behavior

Protected primarily with bearer token auth, with `X-Role` retained as a compatibility fallback:

- `manager` / `developer`: template CRUD and category-tree routes (developer also has metrics-related access where exposed)
- `user`: read-only

Common status mapping:

- validation/business input errors -> `400`
- duplicate `response_code` in same language -> `409`
- template not found -> `404`

Main endpoints:

- `POST /templates`
- `GET /templates`
- `GET /templates/search`
- `GET /templates/{id}`
- `PUT /templates/{id}`
- `DELETE /templates/{id}`
- `PATCH /templates/{id}/copied` (any role; increments `copy_count` and logs a `template_copy_events` row for the authenticated user)
- `PATCH /templates/{id}/outdated/report?commentary=` (any role; `reported_by` is the authenticated user)
- `PATCH /templates/{id}/outdated/clear` (manager/developer)
- `GET /templates/outdated/count` (manager/developer)
- `GET /templates/outdated/summary` (manager/developer)
- `GET /templates/categories/tree`
- `POST /templates/categories/nodes` (optional `parent_id`; omit for a root node)
- `PUT /templates/categories/nodes/{node_id}`
- `DELETE /templates/categories/nodes/{node_id}`
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `GET /admin/users` (developer)
- `PUT /admin/users/{user_id}` (developer)
- `DELETE /admin/users/{user_id}` (developer)
- `GET /admin/dashboard/business?window=hour|day|month` (manager/developer; `window` defaults to `day`)
- `GET /admin/dashboard/engineering` (developer)

## Typical Request Flow

Example flow: create template (`POST /templates`)

1. route validates request body (Pydantic)
2. route checks role permissions
3. route calls `MessageTemplateService`
4. service applies business rules
5. repository writes with SQLAlchemy
6. route returns response model

The same flow applies to list/search/get/update/delete.

## Trade-offs and Decisions

- SQLite is used for local/dev speed, not as a final choice for high-scale production.
- Auth remains intentionally simple and local-first: lightweight token sessions plus backward-compatible header support.
- The layered architecture is slightly more verbose, but responsibilities stay clearer.

## Current Outcome

- clean API/UI/DB separation
- business logic centralized in service layer
- language-aware templates in one database
- straightforward room to grow
