from __future__ import annotations

from abc import ABC, abstractmethod

from app.domain.entities.message_template import MessageTemplate


class MessageTemplateRepository(ABC):
    @abstractmethod
    def create(
        self,
        category: str,
        flow: str,
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
        flow: str,
        language: str,
        response_code: str,
        content: str,
    ) -> MessageTemplate | None:
        raise NotImplementedError

    @abstractmethod
    def delete(self, template_id: int) -> bool:
        raise NotImplementedError
