from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class MessageTemplateCreate(BaseModel):
    category: str = Field(
        default="General",
        min_length=1,
        max_length=100,
        description="Category used to organize templates.",
        examples=["Onboarding"],
    )
    language: str = Field(
        default="en",
        min_length=2,
        max_length=2,
        description="Template language. Allowed values: en, es, pt.",
        examples=["en"],
    )
    response_code: str = Field(
        min_length=1,
        max_length=100,
        description="Unique code that identifies the template.",
        examples=["WELCOME_001"],
    )
    content: str = Field(
        min_length=1,
        description="Template text. Line breaks and formatting are preserved.",
        examples=["Hello {name},\n\nWelcome to our system.\n\nRegards,\nSupport Team"],
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "category": "Onboarding",
                "language": "en",
                "response_code": "WELCOME_001",
                "content": "Hello {name},\n\nWelcome to our system.\n\nRegards,\nSupport Team",
            }
        }
    )


class MessageTemplateUpdate(BaseModel):
    category: str = Field(
        default="General",
        min_length=1,
        max_length=100,
        description="Category used to organize templates.",
        examples=["Onboarding"],
    )
    language: str = Field(
        default="en",
        min_length=2,
        max_length=2,
        description="Template language. Allowed values: en, es, pt.",
        examples=["en"],
    )
    response_code: str = Field(
        min_length=1,
        max_length=100,
        description="Unique code that identifies the template.",
        examples=["WELCOME_001"],
    )
    content: str = Field(
        min_length=1,
        description="Template text. Line breaks and formatting are preserved.",
        examples=["Hello {name},\n\nYour request has been updated.\n\nRegards,\nSupport Team"],
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "category": "Onboarding",
                "language": "en",
                "response_code": "WELCOME_001",
                "content": "Hello {name},\n\nYour request has been updated.\n\nRegards,\nSupport Team",
            }
        }
    )


class MessageTemplateResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    category: str
    category_id: int | None = None
    language: str
    response_code: str
    content: str
    copy_count: int = 0
    is_outdated: bool = False
    outdated_reported_by: str | None = None
    outdated_commentary: str | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None


class AuthLoginRequest(BaseModel):
    username: str = Field(min_length=1, max_length=100)
    password: str = Field(min_length=1, max_length=200)


class AuthRegisterRequest(BaseModel):
    username: str = Field(min_length=1, max_length=100)
    password: str = Field(min_length=4, max_length=200)
    role: str = Field(min_length=1, max_length=20)


class AuthResponse(BaseModel):
    username: str
    role: str
    token: str


class UserSummaryResponse(BaseModel):
    id: int
    username: str
    role: str
    is_active: bool
    created_at: datetime | None = None
    updated_at: datetime | None = None


class UserUpdateRequest(BaseModel):
    username: str | None = Field(default=None, min_length=1, max_length=100)
    role: str | None = Field(default=None, min_length=1, max_length=20)
    password: str | None = Field(default=None, min_length=4, max_length=200)
    is_active: bool | None = None
