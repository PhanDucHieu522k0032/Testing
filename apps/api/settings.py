from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "sqlite:///./dev.db"
    secret_key: str = "change-this-in-production"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
