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
    created_at: datetime | None = None
    updated_at: datetime | None = None
