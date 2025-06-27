from dataclasses import dataclass, field
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
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: datetime = field(default_factory=datetime.now)


@dataclass
class TaskResponse:
    id: str
    title: str
    description: str
    status: TaskStatus
    created_at: str
    updated_at: str
