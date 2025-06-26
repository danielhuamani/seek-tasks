from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Optional


class TaskStatus(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"


@dataclass
class TaskEntity:
    _id: Optional[str] = None
    title: str = ""
    description: str = ""
    status: TaskStatus = TaskStatus.TODO
    user_id: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


@dataclass
class TaskResponse:
    id: str
    title: str
    description: str
    status: TaskStatus
    user_id: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
