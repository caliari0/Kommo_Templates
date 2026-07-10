from __future__ import annotations

from abc import ABC, abstractmethod

from app.domain.entities.message_template import MessageTemplate


class MessageTemplateRepository(ABC):
    @abstractmethod
    def create(
        self,
        category: str,
        language: str,
        response_code: str,
        content: str,
    ) -> MessageTemplate:
        raise NotImplementedError

    @abstractmethod
    def list(self, language: str, category: str | None = None) -> list[MessageTemplate]:
        raise NotImplementedError

    @abstractmethod
    def get_by_id(self, template_id: int) -> MessageTemplate | None:
        raise NotImplementedError

    @abstractmethod
    def get_by_response_code(self, response_code: str, language: str) -> MessageTemplate | None:
        raise NotImplementedError

    @abstractmethod
    def search(
        self,
        query: str,
        language: str,
        category: str | None = None,
    ) -> list[MessageTemplate]:
        raise NotImplementedError

    @abstractmethod
    def update(
        self,
        template_id: int,
        category: str,
        language: str,
        response_code: str,
        content: str,
    ) -> MessageTemplate | None:
        raise NotImplementedError

    @abstractmethod
    def delete(self, template_id: int) -> bool:
        raise NotImplementedError

    @abstractmethod
    def increment_copy_count(self, template_id: int) -> MessageTemplate | None:
        raise NotImplementedError

    @abstractmethod
    def report_outdated(
        self,
        template_id: int,
        reported_by: str,
        commentary: str | None,
    ) -> MessageTemplate | None:
        raise NotImplementedError

    @abstractmethod
    def clear_outdated(self, template_id: int) -> MessageTemplate | None:
        raise NotImplementedError
