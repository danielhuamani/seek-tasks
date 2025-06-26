from typing import Optional

from passlib.context import CryptContext

from src.auth.application.jwt_utils import create_access_token
from src.auth.domain.entities import UserEntity, UserResponse
from src.auth.domain.repositories import UserRepositoryABC

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserService:
    def __init__(self, repo: UserRepositoryABC):
        self.repo = repo

    def hash_password(self, password: str) -> str:
        return pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    def login_user(self, email: str, password: str) -> str:
        user = self.repo.get_by_email(email)
        if not user:
            return None
        if not self.verify_password(password, user.password):
            return None
        token = create_access_token(
            {"sub": user.email, "user_id": str(getattr(user, "id", None))}
        )
        return token

    def get_by_email(self, email: str):
        return self.repo.get_by_email(email)

    def create_user(self, user_data: dict) -> UserResponse:
        existing_user = self.repo.get_by_email(user_data["email"])
        if existing_user:
            raise ValueError("El correo electrónico ya está registrado")
        user_data = user_data.copy()
        user_data["password"] = self.hash_password(user_data["password"])
        user = UserEntity(**user_data)
        user_id = self.repo.create(user)
        created_user = self.repo.get_by_id(user_id)
        return UserResponse(
            id=created_user._id,
            first_name=created_user.first_name,
            last_name=created_user.last_name,
            email=created_user.email,
            is_active=created_user.is_active,
            is_main=created_user.is_main,
        )

    def get_user_by_id(self, user_id: str) -> Optional[UserResponse]:
        user = self.repo.get_by_id(user_id)
        if user:
            return UserResponse(
                first_name=user.first_name,
                last_name=user.last_name,
                email=user.email,
                is_active=user.is_active,
                is_main=user.is_main,
            )
        return None
