import asyncio
import json
from collections import Counter, deque
from datetime import UTC, datetime, timedelta
from threading import Lock
from time import perf_counter

from fastapi import Depends, FastAPI, HTTPException, Query, Request
from fastapi.responses import RedirectResponse
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import func

from app.adapters.api.auth import Role, decode_token, hash_password, require_roles
from app.adapters.api.auth_routes import admin_router as admin_users_router
from app.adapters.api.auth_routes import router as auth_router
from app.adapters.api.routes import router as template_router
from app.adapters.web.routes import router as web_router
from app.infrastructure.db.models import (
    CategoryNodeModel,
    MessageTemplateModel,
    TemplateCopyEventModel,
    UserModel,
)
from app.infrastructure.db.session import (
    Base,
    SessionLocal,
    engine,
    ensure_message_templates_schema,
    ensure_users_schema,
)

app = FastAPI(
    title="Message Template API",
    description=(
        "Simple CRUD for message templates. Use Try it out in /docs to edit "
        "the sample JSON and send requests directly from the browser."
    ),
)

REQUEST_RETENTION = timedelta(hours=24)
ACTIVE_WINDOW = timedelta(minutes=15)
DASHBOARD_WINDOWS: dict[str, timedelta] = {
    "hour": timedelta(hours=1),
    "day": timedelta(days=1),
    "month": timedelta(days=30),
}

_request_events: deque[dict[str, object]] = deque()
_sessions_last_seen: dict[str, datetime] = {}
_metrics_lock = Lock()
_last_summary_generated_at: datetime | None = None


def ensure_default_users() -> None:
    defaults = [
        ("manager", "kommotemplates0", "manager"),
        ("developer", "kommotemplates0", "developer"),
        ("user", "kommotemplates0", "user"),
    ]
    db = SessionLocal()
    try:
        for username, password, role in defaults:
            existing = db.query(UserModel).filter(UserModel.username == username).first()
            if existing:
                continue
            db.add(
                UserModel(
                    username=username,
                    password_hash=hash_password(password),
                    role=role,
                    is_active=True,
                )
            )
        db.commit()
    finally:
        db.close()


def resolve_user_and_role(request: Request) -> tuple[str, str]:
    authorization = (request.headers.get("authorization") or "").strip()
    if authorization.lower().startswith("bearer "):
        token = authorization.split(" ", 1)[1].strip()
        principal = decode_token(token)
        if principal:
            return principal.username, principal.role.value
    role = (request.headers.get("x-role") or "anonymous").strip().lower()
    username = (request.headers.get("x-username") or role or "anonymous").strip().lower()
    return username, role or "anonymous"


def _cleanup_expired(now: datetime) -> None:
    cutoff = now - REQUEST_RETENTION
    while _request_events and _request_events[0]["timestamp"] < cutoff:
        _request_events.popleft()

    active_cutoff = now - ACTIVE_WINDOW
    expired_sessions = [
        session_key
        for session_key, last_seen in _sessions_last_seen.items()
        if last_seen < active_cutoff
    ]
    for session_key in expired_sessions:
        _sessions_last_seen.pop(session_key, None)


def _resolve_dashboard_window(window: str) -> str:
    cleaned = (window or "day").strip().lower()
    if cleaned not in DASHBOARD_WINDOWS:
        raise HTTPException(status_code=400, detail="window must be one of: hour, day, month")
    return cleaned


def _build_dashboard_payload(now: datetime, window: str = "day") -> dict[str, object]:
    copy_cutoff = now - DASHBOARD_WINDOWS[window]

    db = SessionLocal()
    try:
        total_templates = db.query(func.count(MessageTemplateModel.id)).scalar() or 0
        total_copy_count = db.query(func.coalesce(func.sum(MessageTemplateModel.copy_count), 0)).scalar() or 0
        outdated_templates = db.query(func.count(MessageTemplateModel.id)).filter(
            MessageTemplateModel.is_outdated.is_(True)
        ).scalar() or 0

        top_templates = db.query(
            MessageTemplateModel.response_code,
            MessageTemplateModel.language,
            MessageTemplateModel.copy_count,
        ).order_by(MessageTemplateModel.copy_count.desc(), MessageTemplateModel.id.desc()).limit(8).all()

        language_rows = db.query(
            MessageTemplateModel.language,
            func.count(MessageTemplateModel.id),
            func.coalesce(func.sum(MessageTemplateModel.copy_count), 0),
        ).group_by(MessageTemplateModel.language).order_by(MessageTemplateModel.language.asc()).all()

        top_copiers = db.query(
            TemplateCopyEventModel.username,
            func.count(TemplateCopyEventModel.id),
        ).filter(
            TemplateCopyEventModel.created_at >= copy_cutoff
        ).group_by(TemplateCopyEventModel.username).order_by(
            func.count(TemplateCopyEventModel.id).desc()
        ).limit(8).all()
    finally:
        db.close()

    return {
        "generated_at_utc": now.isoformat(),
        "user_metrics": {
            "window": window,
            "top_copiers": [{"username": username, "copies": count} for username, count in top_copiers],
        },
        "template_usage": {
            "total_templates": total_templates,
            "total_copies": total_copy_count,
            "outdated_templates": outdated_templates,
            "top_templates_by_copy_count": [
                {
                    "response_code": response_code,
                    "language": language,
                    "copy_count": copy_count,
                }
                for response_code, language, copy_count in top_templates
            ],
            "usage_by_language": [
                {
                    "language": language,
                    "template_count": template_count,
                    "copy_count": copy_count,
                }
                for language, template_count, copy_count in language_rows
            ],
        },
    }


def _percentile(values: list[float], pct: float) -> float:
    if not values:
        return 0.0
    sorted_values = sorted(values)
    rank = (len(sorted_values) - 1) * pct
    lower = int(rank)
    upper = min(lower + 1, len(sorted_values) - 1)
    weight = rank - lower
    return round(
        sorted_values[lower] * (1 - weight) + sorted_values[upper] * weight,
        2,
    )


def _build_engineering_dashboard_payload(now: datetime) -> dict[str, object]:
    fifteen_min_cutoff = now - timedelta(minutes=15)
    sixty_min_cutoff = now - timedelta(minutes=60)
    twenty_four_hour_cutoff = now - timedelta(hours=24)

    with _metrics_lock:
        _cleanup_expired(now)
        events = list(_request_events)

    events_last_15 = [event for event in events if event["timestamp"] >= fifteen_min_cutoff]
    events_last_60 = [event for event in events if event["timestamp"] >= sixty_min_cutoff]
    events_last_24h = [event for event in events if event["timestamp"] >= twenty_four_hour_cutoff]

    durations_60 = [float(event["duration_ms"]) for event in events_last_60]
    status_60 = Counter(str(event["status_code"]) for event in events_last_60)

    endpoint_stats: dict[str, dict[str, object]] = {}
    for event in events_last_60:
        endpoint_label = f'{event["method"]} {event["path"]}'
        entry = endpoint_stats.setdefault(
            endpoint_label,
            {"count": 0, "durations": [], "errors": 0},
        )
        entry["count"] = int(entry["count"]) + 1
        entry["durations"].append(float(event["duration_ms"]))
        if int(event["status_code"]) >= 400:
            entry["errors"] = int(entry["errors"]) + 1

    slow_endpoints = sorted(
        (
            {
                "endpoint": endpoint,
                "requests": int(data["count"]),
                "p95_latency_ms": _percentile(list(data["durations"]), 0.95),
                "error_count": int(data["errors"]),
            }
            for endpoint, data in endpoint_stats.items()
            if int(data["count"]) >= 3
        ),
        key=lambda item: item["p95_latency_ms"],
        reverse=True,
    )[:10]

    auth_failures_24h = sum(
        1
        for event in events_last_24h
        if event["path"].startswith("/auth")
        and int(event["status_code"]) in {401, 403}
    )

    role_traffic_60 = Counter(event["role"] for event in events_last_60)
    error_events_60 = [event for event in events_last_60 if int(event["status_code"]) >= 400]

    return {
        "generated_at_utc": now.isoformat(),
        "traffic": {
            "request_count_last_15m": len(events_last_15),
            "request_count_last_60m": len(events_last_60),
            "error_count_last_60m": len(error_events_60),
            "error_rate_last_60m": round(
                (len(error_events_60) / len(events_last_60)) * 100,
                2,
            ) if events_last_60 else 0.0,
        },
        "latency_ms": {
            "p50_last_60m": _percentile(durations_60, 0.5),
            "p95_last_60m": _percentile(durations_60, 0.95),
            "p99_last_60m": _percentile(durations_60, 0.99),
        },
        "status_codes_last_60m": dict(status_60),
        "role_traffic_last_60m": dict(role_traffic_60),
        "auth_failures_last_24h": auth_failures_24h,
        "slow_endpoints_last_60m": slow_endpoints,
    }


@app.middleware("http")
async def track_request_metrics(request: Request, call_next):
    started_at = perf_counter()
    response = await call_next(request)
    duration_ms = round((perf_counter() - started_at) * 1000, 2)

    now = datetime.now(UTC)
    client_ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    username, role = resolve_user_and_role(request)
    endpoint = request.url.path

    session_key = f"{client_ip}|{user_agent}|{username}|{role}"

    with _metrics_lock:
        _cleanup_expired(now)
        _request_events.append(
            {
                "timestamp": now,
                "path": endpoint,
                "method": request.method,
                "status_code": response.status_code,
                "duration_ms": duration_ms,
                "client_ip": client_ip,
                "username": username,
                "role": role,
                "session_key": session_key,
            }
        )
        _sessions_last_seen[session_key] = now

    return response


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(
        bind=engine,
        tables=[
            CategoryNodeModel.__table__,
            MessageTemplateModel.__table__,
            UserModel.__table__,
            TemplateCopyEventModel.__table__,
        ],
    )
    ensure_users_schema()
    ensure_message_templates_schema()
    ensure_default_users()


@app.get("/")
def read_root() -> RedirectResponse:
    return RedirectResponse(url="/ui")


@app.get(
    "/admin/metrics",
    dependencies=[Depends(require_roles(Role.developer))],
    summary="Lightweight app usage metrics",
)
def get_admin_metrics():
    now = datetime.now(UTC)
    five_min_cutoff = now - timedelta(minutes=5)
    fifteen_min_cutoff = now - timedelta(minutes=15)
    sixty_min_cutoff = now - timedelta(minutes=60)

    with _metrics_lock:
        _cleanup_expired(now)
        events = list(_request_events)

    events_last_5 = [event for event in events if event["timestamp"] >= five_min_cutoff]
    events_last_15 = [event for event in events if event["timestamp"] >= fifteen_min_cutoff]
    events_last_60 = [event for event in events if event["timestamp"] >= sixty_min_cutoff]

    unique_ip_15 = len({event["client_ip"] for event in events_last_15})
    unique_ip_60 = len({event["client_ip"] for event in events_last_60})
    active_sessions = len({event["session_key"] for event in events_last_15})

    top_endpoints = Counter(
        f'{event["method"]} {event["path"]}' for event in events_last_60
    ).most_common(10)

    role_breakdown = Counter(event["role"] for event in events_last_60)
    user_breakdown = Counter(event.get("username", "anonymous") for event in events_last_60)
    status_breakdown = Counter(str(event["status_code"]) for event in events_last_60)
    avg_latency_ms = round(
        sum(event["duration_ms"] for event in events_last_60) / len(events_last_60),
        2,
    ) if events_last_60 else 0.0

    return {
        "generated_at_utc": now.isoformat(),
        "active_sessions_last_15m": active_sessions,
        "unique_ips_last_15m": unique_ip_15,
        "unique_ips_last_60m": unique_ip_60,
        "request_count_last_5m": len(events_last_5),
        "request_count_last_15m": len(events_last_15),
        "request_count_last_60m": len(events_last_60),
        "avg_latency_ms_last_60m": avg_latency_ms,
        "status_codes_last_60m": dict(status_breakdown),
        "roles_last_60m": dict(role_breakdown),
        "users_last_60m": dict(user_breakdown),
        "top_endpoints_last_60m": [
            {"endpoint": endpoint, "requests": count}
            for endpoint, count in top_endpoints
        ],
        "top_users_last_60m": [
            {"username": username, "requests": count}
            for username, count in user_breakdown.most_common(10)
        ],
    }


@app.get(
    "/admin/dashboard",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
    summary="Business dashboard data (manager + developer)",
)
def get_dashboard_metrics(window: str = Query("day", description="hour, day, or month")):
    now = datetime.now(UTC)
    return _build_dashboard_payload(now, _resolve_dashboard_window(window))


@app.get(
    "/admin/dashboard/business",
    dependencies=[Depends(require_roles(Role.manager, Role.developer))],
    summary="Business dashboard data (manager + developer)",
)
def get_business_dashboard_metrics(window: str = Query("day", description="hour, day, or month")):
    now = datetime.now(UTC)
    return _build_dashboard_payload(now, _resolve_dashboard_window(window))


@app.get(
    "/admin/dashboard/engineering",
    dependencies=[Depends(require_roles(Role.developer))],
    summary="Engineering dashboard data (developer only)",
)
def get_engineering_dashboard_metrics():
    now = datetime.now(UTC)
    return _build_engineering_dashboard_payload(now)


@app.get(
    "/admin/dashboard/stream",
    summary="Live dashboard metrics stream (SSE)",
)
async def stream_dashboard_metrics(token: str, window: str = Query("day", description="hour, day, or month")):
    principal = decode_token(token)
    if not principal or principal.role not in {Role.manager, Role.developer}:
        raise HTTPException(status_code=401, detail="unauthorized")
    resolved_window = _resolve_dashboard_window(window)

    async def event_generator():
        while True:
            payload = _build_dashboard_payload(datetime.now(UTC), resolved_window)
            yield f"event: dashboard\ndata: {json.dumps(payload)}\n\n"
            await asyncio.sleep(2)

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "Connection": "keep-alive"},
    )


@app.post(
    "/admin/metrics/summary",
    dependencies=[Depends(require_roles(Role.developer))],
    summary="Generate textual usage summary since last summary",
)
def generate_admin_metrics_summary():
    global _last_summary_generated_at

    now = datetime.now(UTC)
    with _metrics_lock:
        _cleanup_expired(now)
        events = list(_request_events)
        previous_summary_at = _last_summary_generated_at
        _last_summary_generated_at = now

    if previous_summary_at is None:
        window_start = events[0]["timestamp"] if events else now
    else:
        window_start = previous_summary_at

    events_since_last = [event for event in events if event["timestamp"] >= window_start]

    sessions: dict[str, dict[str, object]] = {}
    for event in events_since_last:
        session_key = str(event["session_key"])
        entry = sessions.setdefault(
            session_key,
            {
                "first_seen": event["timestamp"],
                "last_seen": event["timestamp"],
                "endpoints": Counter(),
                "username": event.get("username", "anonymous"),
            },
        )
        if event["timestamp"] < entry["first_seen"]:
            entry["first_seen"] = event["timestamp"]
        if event["timestamp"] > entry["last_seen"]:
            entry["last_seen"] = event["timestamp"]
        endpoint_label = f'{event["method"]} {event["path"]}'
        entry["endpoints"][endpoint_label] += 1

    session_count = len(sessions)
    if session_count:
        avg_session_seconds = sum(
            (entry["last_seen"] - entry["first_seen"]).total_seconds()
            for entry in sessions.values()
        ) / session_count
    else:
        avg_session_seconds = 0.0

    lines = [
        f"Summary window: {window_start.isoformat()} -> {now.isoformat()}",
        f"Total number of unique sessions since last summary: {session_count}",
        f"Average time spent in each sessions: {avg_session_seconds:.2f} seconds",
        "What endpoints each session used:",
    ]

    if not sessions:
        lines.append("- No session activity in this period.")
    else:
        for index, (session_key, entry) in enumerate(sessions.items(), start=1):
            lines.append(f'- Session {index}: {session_key} (user: {entry["username"]})')
            for endpoint, count in entry["endpoints"].most_common():
                lines.append(f"  - {endpoint} ({count} requests)")

    summary_text = "\n".join(lines)
    return {
        "summary_text": summary_text,
        "window_start_utc": window_start.isoformat(),
        "window_end_utc": now.isoformat(),
        "session_count": session_count,
        "average_session_seconds": round(avg_session_seconds, 2),
    }


app.mount("/static", StaticFiles(directory="app/adapters/web/static"), name="static")
app.include_router(auth_router)
app.include_router(admin_users_router)
app.include_router(template_router)
app.include_router(web_router)
