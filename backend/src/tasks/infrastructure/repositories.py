from dataclasses import asdict
from typing import List, Optional

from bson import ObjectId
from bson.errors import InvalidId

from src.core.domain.exceptions import NotFoundException
from src.tasks.domain.entities import TaskEntity
from src.tasks.domain.repositories import TaskRepositoryABC


class TaskRepository(TaskRepositoryABC):
    def __init__(self, db):
        self.collection = db["tasks"]

    def create(self, task: TaskEntity) -> str:
        task_dict = asdict(task)
        task_dict.pop("_id", None)
        result = self.collection.insert_one(task_dict)
        return str(result.inserted_id)

    def get_by_id(self, task_id: str) -> Optional[TaskEntity]:
        try:
            obj_id = ObjectId(task_id)
        except InvalidId as e:
            raise NotFoundException("Invalid task ID") from e
        doc = self.collection.find_one({"_id": obj_id})
        if doc is None:
            raise NotFoundException("Task not found")
        if doc and "_id" in doc:
            doc["_id"] = str(doc["_id"])
        return TaskEntity(**doc) if doc else None

    def get_all(self) -> List[TaskEntity]:
        tasks = []
        for doc in self.collection.find():
            if doc and "_id" in doc:
                doc["_id"] = str(doc["_id"])
            tasks.append(TaskEntity(**doc))
        return tasks

    def update(self, task_id: str, data: dict) -> bool:
        data.pop("_id", None)
        try:
            task_id = ObjectId(task_id)
        except InvalidId as e:
            raise NotFoundException("Invalid task ID") from e
        result = self.collection.update_one({"_id": task_id}, {"$set": data})
        return result.modified_count > 0

    def delete(self, task_id: str) -> bool:
        try:
            task_id = ObjectId(task_id)
        except InvalidId as e:
            raise NotFoundException("Invalid task ID") from e
        result = self.collection.delete_one({"_id": task_id})
        return result.deleted_count > 0
