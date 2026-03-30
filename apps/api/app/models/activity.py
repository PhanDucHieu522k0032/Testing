import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class ActivityType(str, enum.Enum):
    call = "call"
    email = "email"
    meeting = "meeting"
    note = "note"
    task = "task"


class Activity(Base):
    __tablename__ = "activities"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    type: Mapped[ActivityType] = mapped_column(
        Enum(ActivityType), default=ActivityType.note, nullable=False
    )
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    lead_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("leads.id", ondelete="SET NULL"), nullable=True
    )
    customer_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("customers.id", ondelete="SET NULL"), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
