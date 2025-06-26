from enum import Enum
from typing import Optional

from pydantic import BaseModel


class TaskStatus(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"


class TaskCreateBody(BaseModel):
    title: str
    description: str
    status: TaskStatus = TaskStatus.TODO


class TaskResponse(BaseModel):
    id: str
    title: str
    description: str
    status: TaskStatus


class TaskUpdateBody(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[TaskStatus]
