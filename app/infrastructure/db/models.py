from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.infrastructure.db.session import Base


class CategoryNodeModel(Base):
    __tablename__ = "category_nodes"
    __table_args__ = (UniqueConstraint("parent_id", "name", name="uq_category_nodes_parent_name"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    parent_id: Mapped[int | None] = mapped_column(ForeignKey("category_nodes.id"), nullable=True, index=True)
    path: Mapped[str] = mapped_column(String(300), nullable=False, unique=True, index=True)
    flow: Mapped[str] = mapped_column(String(100), nullable=False, default="general")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    parent: Mapped["CategoryNodeModel | None"] = relationship(
        "CategoryNodeModel",
        remote_side="CategoryNodeModel.id",
        backref="children",
    )


class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(200), nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False, default="user")
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, server_default="1")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class MessageTemplateModel(Base):
    __tablename__ = "message_templates"
    __table_args__ = (UniqueConstraint("response_code", "language", name="uq_response_code_language"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    category: Mapped[str] = mapped_column(String(100), index=True, nullable=False, default="General")
    category_id: Mapped[int | None] = mapped_column(
        ForeignKey("category_nodes.id"),
        index=True,
        nullable=True,
    )
    flow: Mapped[str] = mapped_column(String(100), index=True, nullable=False, default="general")
    language: Mapped[str] = mapped_column(String(2), index=True, nullable=False, default="en")
    response_code: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    copy_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0, server_default="0")
    is_outdated: Mapped[bool] = mapped_column(nullable=False, default=False, server_default="0", index=True)
    outdated_reported_by: Mapped[str | None] = mapped_column(String(100), nullable=True)
    outdated_commentary: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
    category_node: Mapped[CategoryNodeModel | None] = relationship("CategoryNodeModel")
