from typing import List
from datetime import datetime

from src.tasks.domain.entities import TaskEntity, TaskResponse
from src.tasks.domain.repositories import TaskRepositoryABC
from .utils import format_datetime

class TaskService:
    def __init__(self, repo: TaskRepositoryABC):
        self.repo = repo

    def create_task(self, data: dict) -> TaskResponse:
        task = TaskEntity(**data)
        task_id = self.repo.create(task)
        created = self.repo.get_by_id(task_id)
        return TaskResponse(
            id=created._id,
            title=created.title,
            description=created.description,
            status=created.status,
            created_at=format_datetime(created.created_at),
            updated_at=format_datetime(created.updated_at)
        )

    def get_task_by_id(self, task_id: str) -> TaskResponse:
        task = self.repo.get_by_id(task_id)
        return TaskResponse(
            id=task._id,
            title=task.title,
            description=task.description,
            status=task.status,
            created_at=format_datetime(task.created_at),
            updated_at=format_datetime(task.updated_at)
        )

    def get_all_tasks(self) -> List[TaskResponse]:
        tasks = self.repo.get_all()
        return [
            TaskResponse(
                id=t._id,
                title=t.title,
                description=t.description,
                status=t.status,
                created_at=format_datetime(t.created_at),
                updated_at=format_datetime(t.updated_at)
            )
            for t in tasks
        ]

    def update_task(self, task_id: str, data: dict) -> bool:
        task = self.repo.get_by_id(task_id)
        if not task:
            return False
        data.pop("_id", None)
        data['updated_at'] = datetime.now()
        self.repo.update(task_id, data)
        task_updated = self.repo.get_by_id(task_id)
        return TaskResponse(
            id=task_updated._id,
            title=task_updated.title,
            description=task_updated.description,
            status=task_updated.status,
            created_at=format_datetime(task_updated.created_at),
            updated_at=format_datetime(task_updated.updated_at)
        )

    def delete_task(self, task_id: str) -> bool:
        return self.repo.delete(task_id)
