from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    mongo_uri: str = "mongodb://localhost:27017"
    mongo_db_name: str = "seek_db"
    secret_key: str = "your-secret-key"


settings = Settings()
