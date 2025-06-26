from dataclasses import dataclass
from typing import Optional
from enum import Enum
from datetime import datetime

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