from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Activity, ActivityType

router = APIRouter()


class ActivityCreate(BaseModel):
    type: ActivityType = ActivityType.note
    summary: str
    details: str | None = None
    lead_id: int | None = None
    customer_id: int | None = None


class ActivityRead(ActivityCreate):
    id: int

    model_config = {"from_attributes": True}


@router.get("/", response_model=list[ActivityRead])
def list_activities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Activity).offset(skip).limit(limit).all()


@router.get("/{activity_id}", response_model=ActivityRead)
def get_activity(activity_id: int, db: Session = Depends(get_db)):
    activity = db.query(Activity).filter(Activity.id == activity_id).first()
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    return activity


@router.post("/", response_model=ActivityRead, status_code=201)
def create_activity(payload: ActivityCreate, db: Session = Depends(get_db)):
    activity = Activity(**payload.model_dump())
    db.add(activity)
    db.commit()
    db.refresh(activity)
    return activity


@router.delete("/{activity_id}", status_code=204)
def delete_activity(activity_id: int, db: Session = Depends(get_db)):
    activity = db.query(Activity).filter(Activity.id == activity_id).first()
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    db.delete(activity)
    db.commit()
