from __future__ import annotations

from app.domain.entities.message_template import MessageTemplate
from app.domain.ports.message_template_repository import MessageTemplateRepository


class TemplateNotFoundError(Exception):
    pass


class DuplicateResponseCodeError(Exception):
    pass


class InvalidLanguageError(Exception):
    pass


class MessageTemplateService:
    def __init__(self, repository: MessageTemplateRepository) -> None:
        self.repository = repository

    ALLOWED_LANGUAGES = {"en", "es", "pt"}

    def create(
        self,
        category: str,
        flow: str,
        language: str,
        response_code: str,
        content: str,
    ) -> MessageTemplate:
        self._validate_fields(
            category=category,
            flow=flow,
            language=language,
            response_code=response_code,
            content=content,
        )
        cleaned_language = self._normalize_language(language)
        existing = self.repository.get_by_response_code(response_code.strip(), cleaned_language)
        if existing:
            raise DuplicateResponseCodeError("response_code already exists for this language")
        return self.repository.create(
            category=category.strip(),
            flow=flow.strip().lower(),
            language=cleaned_language,
            response_code=response_code.strip(),
            content=content,
        )

    def list(self, language: str, category: str | None = None) -> list[MessageTemplate]:
        cleaned_language = self._normalize_language(language)
        cleaned_category = self._normalize_optional_text(category)
        return self.repository.list(cleaned_language, cleaned_category)

    def get(self, template_id: int) -> MessageTemplate:
        template = self.repository.get_by_id(template_id)
        if not template:
            raise TemplateNotFoundError("template not found")
        return template

    def search(
        self,
        query: str,
        language: str,
        category: str | None = None,
    ) -> list[MessageTemplate]:
        cleaned_language = self._normalize_language(language)
        cleaned_query = query.strip()
        cleaned_category = self._normalize_optional_text(category)
        if not cleaned_query:
            return self.repository.list(cleaned_language, cleaned_category)
        return self.repository.search(cleaned_query, cleaned_language, cleaned_category)

    def update(
        self,
        template_id: int,
        category: str,
        flow: str,
        language: str,
        response_code: str,
        content: str,
    ) -> MessageTemplate:
        self._validate_fields(
            category=category,
            flow=flow,
            language=language,
            response_code=response_code,
            content=content,
        )
        cleaned_language = self._normalize_language(language)
        existing = self.repository.get_by_response_code(response_code.strip(), cleaned_language)
        if existing and existing.id != template_id:
            raise DuplicateResponseCodeError("response_code already exists for this language")

        template = self.repository.update(
            template_id=template_id,
            category=category.strip(),
            flow=flow.strip().lower(),
            language=cleaned_language,
            response_code=response_code.strip(),
            content=content,
        )
        if not template:
            raise TemplateNotFoundError("template not found")
        return template

    def delete(self, template_id: int) -> None:
        deleted = self.repository.delete(template_id)
        if not deleted:
            raise TemplateNotFoundError("template not found")

    def increment_copy_count(self, template_id: int) -> MessageTemplate:
        template = self.repository.increment_copy_count(template_id)
        if not template:
            raise TemplateNotFoundError("template not found")
        return template

    def report_outdated(
        self,
        template_id: int,
        reported_by: str,
        commentary: str | None,
    ) -> MessageTemplate:
        template = self.repository.report_outdated(template_id, reported_by, commentary)
        if not template:
            raise TemplateNotFoundError("template not found")
        return template

    def clear_outdated(self, template_id: int) -> MessageTemplate:
        template = self.repository.clear_outdated(template_id)
        if not template:
            raise TemplateNotFoundError("template not found")
        return template

    @staticmethod
    def _validate_fields(
        category: str,
        flow: str,
        language: str,
        response_code: str,
        content: str,
    ) -> None:
        if not category.strip():
            raise ValueError("category cannot be empty")
        if not flow.strip():
            raise ValueError("flow cannot be empty")
        if not language.strip():
            raise InvalidLanguageError("language cannot be empty")
        if language.strip().lower() not in MessageTemplateService.ALLOWED_LANGUAGES:
            raise InvalidLanguageError("language must be one of: en, es, pt")
        if not response_code.strip():
            raise ValueError("response_code cannot be empty")
        if not content:
            raise ValueError("content cannot be empty")

    @staticmethod
    def _normalize_optional_text(value: str | None) -> str | None:
        if value is None:
            return None
        cleaned_value = value.strip()
        return cleaned_value or None

    @staticmethod
    def _normalize_language(language: str) -> str:
        cleaned_language = language.strip().lower()
        if cleaned_language not in MessageTemplateService.ALLOWED_LANGUAGES:
            raise InvalidLanguageError("language must be one of: en, es, pt")
        return cleaned_language
