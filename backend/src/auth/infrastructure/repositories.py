from dataclasses import asdict
from typing import Optional

from bson import ObjectId
from pymongo.collection import Collection

from src.auth.domain.entities import UserEntity


class UserRepository:
    def __init__(self, db):
        self.collection: Collection = db["users"]

    def create(self, user: UserEntity) -> str:
        user_dict = asdict(user)
        user_dict.pop("_id", None)  # No pasar _id al crear
        result = self.collection.insert_one(user_dict)
        return str(result.inserted_id)

    def get_by_id(self, user_id: str) -> Optional[UserEntity]:
        doc = self.collection.find_one({"_id": ObjectId(user_id)})
        if doc and "_id" in doc:
            doc["_id"] = str(doc["_id"])
        print("doc", doc)
        return UserEntity(**doc) if doc else None

    def get_by_email(self, email: str) -> Optional[UserEntity]:
        doc = self.collection.find_one({"email": email})
        return UserEntity(**doc) if doc else None
