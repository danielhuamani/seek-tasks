from typing import List

from fastapi import APIRouter, Depends, HTTPException

from src.auth.infrastructure.web.dependencies import get_current_user
from src.core.session import get_db
from src.tasks.application.services import TaskService
from src.tasks.infrastructure.repositories import TaskRepository
from src.tasks.infrastructure.web.schemas import (TaskCreateBody, TaskResponse,
                                                  TaskUpdateBody)

router = APIRouter()


def get_service(db=Depends(get_db)):
    repo = TaskRepository(db)
    return TaskService(repo)


@router.post("/tasks", response_model=TaskResponse)
def create_task(
    task: TaskCreateBody,
    service: TaskService = Depends(get_service),
    user=Depends(get_current_user),
):
    return service.create_task(task.model_dump())


@router.get("/tasks", response_model=List[TaskResponse])
def list_tasks(
    service: TaskService = Depends(get_service), user=Depends(get_current_user)
):
    return service.get_all_tasks()


@router.get("/tasks/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: str,
    service: TaskService = Depends(get_service),
    user=Depends(get_current_user),
):
    task = service.get_task_by_id(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/tasks/{task_id}", response_model=bool)
def update_task(
    task_id: str,
    data: TaskUpdateBody,
    service: TaskService = Depends(get_service),
    user=Depends(get_current_user),
):
    updated = service.update_task(task_id, data.model_dump())
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found or not updated")
    return updated


@router.delete("/tasks/{task_id}", response_model=bool)
def delete_task(
    task_id: str,
    service: TaskService = Depends(get_service),
    user=Depends(get_current_user),
):
    deleted = service.delete_task(task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found or not deleted")
    return deleted
