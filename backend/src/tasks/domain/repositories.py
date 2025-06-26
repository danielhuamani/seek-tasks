from abc import ABC, abstractmethod
from typing import List, Optional

from .entities import TaskEntity


class TaskRepositoryABC(ABC):
    @abstractmethod
    def create(self, task: TaskEntity) -> str:
        raise NotImplementedError

    @abstractmethod
    def get_by_id(self, task_id: str) -> Optional[TaskEntity]:
        raise NotImplementedError

    @abstractmethod
    def get_all(self) -> List[TaskEntity]:
        raise NotImplementedError

    @abstractmethod
    def update(self, task_id: str, data: dict) -> bool:
        raise NotImplementedError

    @abstractmethod
    def delete(self, task_id: str) -> bool:
        raise NotImplementedError
