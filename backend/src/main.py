from contextlib import asynccontextmanager
from logging import INFO, basicConfig, getLogger

from fastapi import FastAPI
from pymongo import MongoClient

from src.auth.infrastructure.web import routes as auth_routes
from src.core.settings import settings
from src.tasks.infrastructure.web import routes as task_routes

logger = getLogger(__name__)
basicConfig(level=INFO)


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.mongodb_client = MongoClient(settings.mongo_uri)
    app.database = app.mongodb_client[settings.mongo_db_name]
    try:
        yield
    finally:
        app.mongodb_client.close()


app = FastAPI(title="Seek Challenge", lifespan=lifespan)


app.include_router(auth_routes.router)
app.include_router(task_routes.router)
