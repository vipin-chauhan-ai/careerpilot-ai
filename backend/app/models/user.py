from __future__ import annotations
from typing import TYPE_CHECKING
from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    Integer,
    ForeignKey,
    Date,
    String,
    func,
    Text,
    text
)
from sqlalchemy.orm import Mapped, mapped_column,relationship

from app.db.session import Base

if TYPE_CHECKING:
 from app.models.job_application import JobApplication
 
class User(Base):
    
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )
    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )
    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        server_default=text("true"),
        nullable=False,
    )
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
    
    job_applications: Mapped[list["JobApplication"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
    )