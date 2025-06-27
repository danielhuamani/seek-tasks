import os

import pytest
from fastapi.testclient import TestClient
from pymongo import MongoClient

from src.main import app

# os.environ["MONGO_URI"] = os.getenv("MONGO_TEST_URI")
# os.environ["MONGO_DB_NAME"] = os.getenv("MONGO_TEST_DB_NAME")


@pytest.fixture(scope="module")
def client():
    mongo_uri = os.environ["MONGO_TEST_URI"]
    mongo_db_name = os.environ["MONGO_TEST_DB_NAME"]
    client = MongoClient(mongo_uri)
    test_db = client[mongo_db_name]
    app.database = test_db
    with TestClient(app) as c:
        yield c


@pytest.fixture(autouse=True)
def limpiar_tasks():
    db = app.database
    db.tasks.delete_many({})
    yield
    db.tasks.delete_many({})
