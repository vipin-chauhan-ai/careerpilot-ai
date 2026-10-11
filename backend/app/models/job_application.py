from __future__ import annotations
from datetime import datetime,date
from typing import TYPE_CHECKING
from sqlalchemy import (
    Boolean,
    DateTime,
    Integer,
    ForeignKey,
    Date,
    String,
    func,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.db.session import Base

if TYPE_CHECKING:
    from app.models.user import User

class JobApplication(Base):
    __tablename__ = "job_applications"
    
    id :Mapped[int] = mapped_column(Integer,primary_key=True, index=True)
    user_id:Mapped[int] = mapped_column(ForeignKey("users.id",ondelete="CASCADE"),nullable=False,index=True)
    company_name :Mapped[str] = mapped_column(String(200),nullable=False)
    job_title:Mapped[str]=mapped_column(String(200),nullable=False)
    job_url : Mapped[str | None]=mapped_column(String(500),nullable=True)
    location: Mapped[str | None] = mapped_column(String(150), nullable=True)
    employment_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    status : Mapped[str] = mapped_column(
        String(30),
        default="saved",
        server_default="saved",
        nullable=False
    )
    applied_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    notes:Mapped[str  | None] = mapped_column(Text,nullable=True)
    created_at: Mapped[datetime] = mapped_column(
            DateTime(timezone=True),
            server_default=func.now(),
            nullable=False,
        )
    updated_at: Mapped[datetime] = mapped_column(
            DateTime(timezone=True),
            server_default=func.now(),
            onupdate=func.now(),
            nullable=False,
        )
    user: Mapped["User"] = relationship(
    back_populates="job_applications"
    )