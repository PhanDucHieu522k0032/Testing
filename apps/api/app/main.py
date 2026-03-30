from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings  # noqa: F401 – ensure config is loaded early
from app.routers import health, leads, customers, activities

app = FastAPI(
    title="CRM API",
    description="FastAPI backend for the MVP CRM system",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(leads.router, prefix="/leads", tags=["leads"])
app.include_router(customers.router, prefix="/customers", tags=["customers"])
app.include_router(activities.router, prefix="/activities", tags=["activities"])
