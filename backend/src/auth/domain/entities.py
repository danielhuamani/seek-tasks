from dataclasses import dataclass
from typing import Optional

@dataclass
class UserEntity:
    _id: Optional[str] = None
    first_name: str = ""
    last_name: str = ""
    email: str = ""
    password: str = ""
    is_active: bool = True
    is_main: bool = False

@dataclass
class UserResponse:
    id: str
    first_name: str
    last_name: str
    email: str
    is_active: bool = True
    is_main: bool = False