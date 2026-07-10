# Kommo Templates CRUD

This project is organized around a clean FastAPI CRUD flow with:

- API endpoints
- a simple web UI
- role-based access
- language-aware templates
- SQLite persistence

Current version: `v3.5.0`

## What This App Does

This app manages reusable message templates by response code.

- create templates
- list templates
- search by code/content
- update and delete templates
- keep templates separated by language (`en`, `es`, `pt`)

The app has three roles:

- `manager`: full template CRUD and category-tree management, plus Business Dashboard
- `developer`: same as manager, plus Engineering Dashboard and deeper technical diagnostics
- `user`: read-only

## Tech Stack

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- SQLite
- Vanilla HTML/CSS/JS

## Run Locally (PowerShell)

### 1) Create the virtual environment

```powershell
python -m venv .venv
```

### 2) Activate it

```powershell
.\.venv\Scripts\Activate.ps1
```

If execution policy blocks activation, you can run directly with:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

### 3) Install dependencies

```powershell
pip install -r requirements.txt
```

### 4) Start the app

```powershell
uvicorn app.main:app --reload
```

### Optional: app + Cloudflare Tunnel (PowerShell)

For a one-shot local run with `uvicorn` and `cloudflared` (writes logs next to the repo root; frees port 8000 first):

```powershell
.\scripts\start_app_and_tunnel.ps1
```

Then open:

- UI: `http://127.0.0.1:8000/ui`
- Swagger: `http://127.0.0.1:8000/docs`

## API Auth

The API supports account login with bearer tokens and keeps `X-Role` as a legacy fallback.

- `manager` / `developer`: template CRUD, category tree, and admin routes where applicable
- `user`: read-only routes

Error behavior:

- missing header -> `401 Unauthorized`
- invalid role -> `403 Forbidden`
- valid role without permission -> `403 Forbidden`

Example:

```powershell
curl -H "X-Role: manager" http://127.0.0.1:8000/templates
```

## UI Login and Accounts

The `/ui` login uses database-backed accounts.

- Use **Create account** on the login screen to register a new account.
- Self-registration roles are `user`, `manager`, or `developer`.
- `manager` and `developer` users can also create, edit, and delete other accounts from the **User accounts** panel on the Business Dashboard.
- Default seeded accounts are preserved for continuity: `manager`, `developer`, and `user` (password `kommotemplates0`). These three are protected: they can never be deleted, and their username/role/active status can't be edited (only their password can be reset).

## Web UI (Category Explorer and Templates)

After login, the workspace uses a **Kommo-style** shell with role-based dashboard access. The left navigation rail shows only what your role can use (no unnecessary scrollbar).

- `manager`: **Business Dashboard** + Workspace
- `developer`: **Business Dashboard** + **Engineering Dashboard** + Workspace
- `user`: Workspace only

The **Find templates** panel (rail: “Find templates and categories”) includes a category-tree explorer: chip-style breadcrumbs, **Up one level** and **Clear path**, two columns (**Categories at this level** / **Sub-categories (next step)**), and optional template search.

**Templates** lists templates for the current scope; each card has **Edit** and **Copy** (managers/developers), **Report/Clear** for outdated feedback, and a **copy counter**. **Edit** opens the template form in a **drawer** (`<dialog>`) so the list stays in view.

**Category Node Management** (shown for `manager` and `developer`):

- **New node** — creates a **child** of the currently **selected** category, or a **top-level** node (no parent) if nothing is selected.
- **Rename** and **Delete** apply to the selected node (including top-level roots).
- **⋯** on each category row or **right-click** the row opens the same actions: **Add sub-category here** (uses that row as `parent_id`), **Rename…**, **Delete subtree…** — so you can manage nodes without selecting first.

Contextual **warnings** can be edited per category node when the user has permission.

**Business Dashboard** (`manager` + `developer`) focuses on operational outcomes:

- user activity and template usage snapshots
- top active users by templates copied, with a **last hour / day / month** selector
- top copied templates, usage by language
- **User accounts** panel: create/edit/delete accounts (username, password, role, active status), with a small search box to filter by username; the seeded `manager`/`developer`/`user` accounts are hidden from the list and protected from edits/deletion
- "Top active users", "Top copied templates", and "User accounts" panels are height-capped with internal scrolling so they stay the same size as the other dashboard panels regardless of list length

**Engineering Dashboard** (`developer` only) focuses on system diagnostics and reporting:

- request traffic and error rate
- latency percentiles (`p50`, `p95`, `p99`)
- status code distribution and role traffic
- auth failures (24h)
- slow endpoints ranked by `p95` latency
- integrated live usage metrics + one-click report generation

**Reports and recent changes**:

- **Reports** bell (manager/developer): grouped outdated reports with commentary, quick **Go to template**, and **Mark reviewed** actions.
- **Recent changes** bell (all users): collapsible list of templates changed since that user's last session, with a direct **Go to template** action and **Mark all as seen**.

**User management and metrics**:

- **Manager** and **developer** users manage accounts directly from the Business Dashboard's **User accounts** panel (create, edit, delete).
- Seeded default accounts (`manager`, `developer`, `user`) stay protected and are hidden from the dashboard account list.
- Metrics include global + per-user activity, with status-code hover descriptions and report generation.

## UI Extras

The web UI includes accessibility-focused toggles in the **bottom-left bar**:

- Dark/Light mode toggle
- ADHD mode toggle (switches app fonts to Comfortaa)
- Reset UI (clears saved panel height preferences)

There is also a small secret button hidden in the interface for curious users to discover.

## Main Endpoints

**Templates**

- `POST /templates`
- `GET /templates`
- `GET /templates?language=en`
- `GET /templates/search?q=welcome&language=es`
- `POST /templates/import/csv` (manager/developer only; bulk create/update from a CSV file, see below)
- `GET /templates/{id}`
- `PUT /templates/{id}`
- `DELETE /templates/{id}`
- `PATCH /templates/{id}/copied` (increments template copy counter, logs a per-user copy event)
- `PATCH /templates/{id}/outdated/report?commentary=` (reporter is taken from the authenticated user, not client input)
- `PATCH /templates/{id}/outdated/clear` (manager/developer only)
- `GET /templates/outdated/count` (manager/developer only)
- `GET /templates/outdated/summary` (manager/developer only)

**Category tree** (manager/developer; see OpenAPI for full query and role rules)

- `GET /templates/categories/tree`
- `POST /templates/categories/nodes` — optional `parent_id`; omit for a root node
- `PUT /templates/categories/nodes/{node_id}`
- `DELETE /templates/categories/nodes/{node_id}`

**Auth and account endpoints**

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `GET /admin/users` (manager/developer)
- `PUT /admin/users/{user_id}` (manager/developer; seeded accounts only allow a password change)
- `DELETE /admin/users/{user_id}` (manager/developer; seeded accounts and self-delete are blocked)
- `GET /admin/dashboard/business?window=hour|day|month` (manager/developer)
- `GET /admin/dashboard/engineering` (developer only)

## Example Payload

```json
{
  "category": "Onboarding",
  "language": "en",
  "response_code": "WELCOME_001",
  "content": "Hello {name},\n\nWelcome to our system.\n\nRegards,\nSupport Team"
}
```

## CSV Import Format

`POST /templates/import/csv` (manager/developer only, multipart file upload, field name `file`) accepts a CSV with a header row:

```csv
response_code,content,category,language
WELCOME_001,"Hello {name}, welcome!",Onboarding,en
FOLLOWUP_001,"Just checking in.",,es
```

- `response_code` and `content` are required.
- `category` is optional; defaults to `newtemp` when blank or the column is omitted.
- `language` is optional; defaults to the current UI language (`X-Language` header) when blank or the column is omitted.
- A row whose `response_code` + `language` already matches an existing template **updates** that template instead of creating a duplicate (upsert).
- **Category auto-creation**: `category` is a `>`-delimited path (e.g. `Support > Billing > Refunds`). Any segment that doesn't already exist under its parent is created automatically — no need to pre-create the category tree before importing.
- **Case-insensitive matching**: segment lookup ignores case, so `billing`, `Billing`, and `BILLING` all resolve to the same node rather than creating duplicates. When a new node is created, all-lowercase words are capitalized (`billing` → `Billing`); words with deliberate mixed casing (e.g. `FAQ`, `API`) are left as-is.
- This same category resolution (auto-create + case-insensitive match) also applies to manual template create/update, not just CSV import.
- The response reports `total_rows`, `created`, `updated`, `failed`, and up to 20 row-level `errors`.

## Project Structure

```text
app/
├── adapters/
│   ├── api/            # FastAPI routes + schemas
│   └── web/            # UI routes + static files
├── application/        # use-case services
├── domain/             # entities + interfaces
├── infrastructure/     # SQLAlchemy + repository implementation
└── main.py             # app entry point
```

## Data Notes

- SQLite database file: `app.db`
- Tables are created on startup
- `response_code` is unique per language
- `content` supports multiline text
- Each `PATCH /templates/{id}/copied` call logs a row (`template_id`, `username`, timestamp) in `template_copy_events`, used to compute "top active users" by copies over a selectable window

## Trade-offs and Decisions

- SQLite is used because it is quick to set up and good enough for local/testing scenarios.
- Auth is intentionally simple: lightweight token flow with a legacy header fallback for compatibility.
- The frontend uses vanilla JS to avoid extra framework overhead for this scope.
- The layered architecture (`domain/application/adapters/infrastructure`) keeps business rules separate from HTTP and DB concerns.
