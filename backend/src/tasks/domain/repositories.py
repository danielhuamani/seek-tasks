from abc import ABC, abstractmethod
from typing import Optional, List
from .entities import TaskEntity

class TaskRepositoryABC(ABC):
    @abstractmethod
    def create(self, task: TaskEntity) -> str: ...

    @abstractmethod
    def get_by_id(self, task_id: str) -> Optional[TaskEntity]: ...

    @abstractmethod
    def get_all(self) -> List[TaskEntity]: ...

    @abstractmethod
    def update(self, task_id: str, data: dict) -> bool: ...

    @abstractmethod
    def delete(self, task_id: str) -> bool: ...
