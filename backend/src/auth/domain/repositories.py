from abc import ABC, abstractmethod
from typing import Optional

from src.auth.domain.entities import UserEntity


class UserRepositoryABC(ABC):
    @abstractmethod
    def create(self, user: UserEntity) -> str:
        raise NotImplementedError

    @abstractmethod
    def get_by_id(self, user_id: str) -> Optional[UserEntity]:
        raise NotImplementedError

    @abstractmethod
    def get_by_email(self, email: str) -> Optional[UserEntity]:
        raise NotImplementedError
