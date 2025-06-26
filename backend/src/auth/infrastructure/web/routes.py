from fastapi import APIRouter, Depends, HTTPException

from src.auth.application.services import UserService
from src.auth.infrastructure.repositories import UserRepository
from src.auth.infrastructure.web.dependencies import get_current_user
from src.auth.infrastructure.web.schemas import (LoginRequest, LoginResponse,
                                                 UserCreateBody, UserResponse)
from src.core.session import get_db

router = APIRouter()

# Ahora UserRepository recibirá db como argumento


def get_service(db=Depends(get_db)):
    repo = UserRepository(db)
    return UserService(repo)


@router.post("/register", response_model=UserResponse)
def register(user: UserCreateBody, service: UserService = Depends(get_service)):
    try:
        created = service.create_user(user.dict())
        return created
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", response_model=LoginResponse)
def login(user: LoginRequest, service: UserService = Depends(get_service)):
    try:
        token = service.login_user(**user.dict())
        return LoginResponse(token=token)
    except Exception as e:
        print("eeee", e)
        raise HTTPException(status_code=401, detail="Invalid credentials")


@router.get("/me", response_model=UserResponse)
def get_logged_user(
    current_user=Depends(get_current_user), service: UserService = Depends(get_service)
):
    user_id = current_user.get("user_id")
    user = service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
