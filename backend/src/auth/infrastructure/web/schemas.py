from pydantic import BaseModel, EmailStr


class UserCreateBody(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    is_active: bool = True


class UserResponse(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    is_active: bool = True


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    token: str
