from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    mongo_uri: str = "mongodb://localhost:27017"
    mongo_db_name: str = "seek_db"
    secret_key: str = "your-secret-key"
    cors_origins: str = "http://localhost:5173"


settings = Settings()
