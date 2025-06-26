from typing import List

from src.tasks.domain.entities import TaskEntity, TaskResponse
from src.tasks.domain.repositories import TaskRepositoryABC


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
            user_id=created.user_id,
        )

    def get_task_by_id(self, task_id: str) -> TaskResponse:
        task = self.repo.get_by_id(task_id)
        return TaskResponse(
            id=task._id,
            title=task.title,
            description=task.description,
            status=task.status,
            user_id=task.user_id,
        )

    def get_all_tasks(self) -> List[TaskResponse]:
        tasks = self.repo.get_all()
        return [
            TaskResponse(
                id=t._id,
                title=t.title,
                description=t.description,
                status=t.status,
                user_id=t.user_id,
            )
            for t in tasks
        ]

    def update_task(self, task_id: str, data: dict) -> bool:
        task = self.repo.get_by_id(task_id)
        if not task:
            return False
        data.pop("_id", None)
        updated = self.repo.update(task_id, data)
        return updated

    def delete_task(self, task_id: str) -> bool:
        return self.repo.delete(task_id)
