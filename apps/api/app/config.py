from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "sqlite:///./crm.db"
    debug: bool = True
    api_title: str = "CRM API"
    api_version: str = "0.1.0"


settings = Settings()
