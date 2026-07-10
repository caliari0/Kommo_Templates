from __future__ import annotations

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.domain.entities.message_template import MessageTemplate
from app.domain.ports.message_template_repository import MessageTemplateRepository
from app.infrastructure.db.models import CategoryNodeModel, MessageTemplateModel


class SqlAlchemyMessageTemplateRepository(MessageTemplateRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def create(
        self,
        category: str,
        language: str,
        response_code: str,
        content: str,
    ) -> MessageTemplate:
        category_node = self._get_or_create_category_node(category)
        model = MessageTemplateModel(
            category=category,
            category_id=category_node.id if category_node else None,
            language=language,
            response_code=response_code,
            content=content,
        )
        self.db.add(model)
        self.db.commit()
        self.db.refresh(model)
        return self._to_entity(model)

    def list(self, language: str, category: str | None = None) -> list[MessageTemplate]:
        statement = select(MessageTemplateModel).where(MessageTemplateModel.language == language)
        if category:
            statement = statement.where(MessageTemplateModel.category == category)
        statement = statement.order_by(MessageTemplateModel.id.desc())
        models = self.db.scalars(statement).all()
        return [self._to_entity(model) for model in models]

    def get_by_id(self, template_id: int) -> MessageTemplate | None:
        model = self.db.get(MessageTemplateModel, template_id)
        if not model:
            return None
        return self._to_entity(model)

    def get_by_response_code(self, response_code: str, language: str) -> MessageTemplate | None:
        statement = select(MessageTemplateModel).where(
            MessageTemplateModel.response_code == response_code,
            MessageTemplateModel.language == language,
        )
        model = self.db.scalar(statement)
        if not model:
            return None
        return self._to_entity(model)

    def search(
        self,
        query: str,
        language: str,
        category: str | None = None,
    ) -> list[MessageTemplate]:
        search_term = f"%{query}%"
        statement = select(MessageTemplateModel).where(
            MessageTemplateModel.language == language,
            or_(
                MessageTemplateModel.response_code.ilike(search_term),
                MessageTemplateModel.content.ilike(search_term),
                MessageTemplateModel.category.ilike(search_term),
            )
        )
        if category:
            statement = statement.where(MessageTemplateModel.category == category)
        statement = statement.order_by(MessageTemplateModel.id.desc())
        models = self.db.scalars(statement).all()
        return [self._to_entity(model) for model in models]

    def update(
        self,
        template_id: int,
        category: str,
        language: str,
        response_code: str,
        content: str,
    ) -> MessageTemplate | None:
        model = self.db.get(MessageTemplateModel, template_id)
        if not model:
            return None

        category_node = self._get_or_create_category_node(category)
        model.category = category
        model.category_id = category_node.id if category_node else None
        model.language = language
        model.response_code = response_code
        model.content = content
        self.db.commit()
        self.db.refresh(model)
        return self._to_entity(model)

    def delete(self, template_id: int) -> bool:
        model = self.db.get(MessageTemplateModel, template_id)
        if not model:
            return False

        self.db.delete(model)
        self.db.commit()
        return True

    def increment_copy_count(self, template_id: int) -> MessageTemplate | None:
        model = self.db.get(MessageTemplateModel, template_id)
        if not model:
            return None

        model.copy_count = (model.copy_count or 0) + 1
        self.db.commit()
        self.db.refresh(model)
        return self._to_entity(model)

    def report_outdated(
        self,
        template_id: int,
        reported_by: str,
        commentary: str | None,
    ) -> MessageTemplate | None:
        model = self.db.get(MessageTemplateModel, template_id)
        if not model:
            return None

        model.is_outdated = True
        model.outdated_reported_by = reported_by
        model.outdated_commentary = commentary
        self.db.commit()
        self.db.refresh(model)
        return self._to_entity(model)

    def clear_outdated(self, template_id: int) -> MessageTemplate | None:
        model = self.db.get(MessageTemplateModel, template_id)
        if not model:
            return None

        model.is_outdated = False
        model.outdated_reported_by = None
        model.outdated_commentary = None
        self.db.commit()
        self.db.refresh(model)
        return self._to_entity(model)

    def _get_or_create_category_node(self, category: str) -> CategoryNodeModel | None:
        """Resolve a ' > '-delimited category path, creating any missing nodes along the way."""
        segments = [segment.strip() for segment in category.split(">")]
        segments = [segment for segment in segments if segment]
        if not segments:
            return None

        parent: CategoryNodeModel | None = None
        node: CategoryNodeModel | None = None
        for segment in segments:
            node = self.db.scalar(
                select(CategoryNodeModel).where(
                    CategoryNodeModel.parent_id == (parent.id if parent else None),
                    func.lower(CategoryNodeModel.name) == segment.lower(),
                )
            )
            if not node:
                name = self._normalize_category_name(segment)
                node_path = f"{parent.path} > {name}" if parent else name
                node = CategoryNodeModel(name=name, parent_id=parent.id if parent else None, path=node_path)
                self.db.add(node)
                self.db.flush()
            parent = node
        return node

    @staticmethod
    def _normalize_category_name(name: str) -> str:
        """Capitalize each all-lowercase word; leave names with deliberate casing untouched."""
        words = name.split(" ")
        return " ".join(word.capitalize() if word.islower() else word for word in words)

    @staticmethod
    def _to_entity(model: MessageTemplateModel) -> MessageTemplate:
        return MessageTemplate(
            id=model.id,
            category=model.category,
            category_id=model.category_id,
            language=model.language,
            response_code=model.response_code,
            content=model.content,
            copy_count=model.copy_count,
            is_outdated=model.is_outdated,
            outdated_reported_by=model.outdated_reported_by,
            outdated_commentary=model.outdated_commentary,
            created_at=model.created_at,
            updated_at=model.updated_at,
        )
