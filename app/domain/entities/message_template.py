from dataclasses import dataclass
from datetime import datetime


@dataclass
class MessageTemplate:
    id: int | None
    category: str
    category_id: int | None
    flow: str
    language: str
    response_code: str
    content: str
    copy_count: int = 0
    is_outdated: bool = False
    outdated_reported_by: str | None = None
    outdated_commentary: str | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None
