from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models.job_application import JobApplication
from app.models.user import User
from app.schemas.job_application import (
    jobApplicationCreate,
    JobApplilcationResponse,
    JobApplicationUpdate,
)

router = APIRouter(
    prefix="/job-applications",
    tags=["Job Applications"],
)


def get_owned_applicaiton(
    application_id: int,
    current_user: User,
    db: Session,
) -> JobApplication:
    statement = select(JobApplication).where(
        JobApplication.id == application_id,
        JobApplication.user_id == current_user.id,
    )

    application = db.scalar(statement)

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="job application not found",
        )

    return application


@router.post(
    "",
    response_model=JobApplilcationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_job_application(
    payload: jobApplicationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> JobApplication:
    application = JobApplication(
        user_id=current_user.id,
        **payload.model_dump(),
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return application


@router.get(
    "",
    response_model=list[JobApplilcationResponse],
)
def list_job_applications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[JobApplication]:
    statement = (
        select(JobApplication)
        .where(JobApplication.user_id == current_user.id)
        .order_by(JobApplication.created_at.desc())
    )

    return list(db.scalars(statement).all())


@router.get(
    "/{application_id}",
    response_model=JobApplilcationResponse,
)
def get_job_applcaiton(
    application_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> JobApplication:
    return get_owned_applicaiton(
        application_id,
        current_user,
        db,
    )


@router.patch(
    "/{application_id}",
    response_model=JobApplilcationResponse,
)
def update_job_application(
    application_id: int,
    payload: JobApplicationUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> JobApplication:
    application = get_owned_applicaiton(
        application_id,
        current_user,
        db,
    )

    update_date = payload.model_dump(exclude_unset=True)

    if update_date.get("status") is None:
        update_date.pop("status", None)

    for filed in ("company_name", "job_title"):
        if filed in update_date and update_date[filed] is None:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"{filed} cannot be null",
            )

    for filed, value in update_date.items():
        setattr(application, filed, value)

    db.commit()
    db.refresh(application)

    return application


@router.delete(
    "/{application_id}",
    response_model=dict[str, str],
)
def delete_job_applicaiton(
    application_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    application = get_owned_applicaiton(
        application_id,
        current_user,
        db,
    )

    db.delete(application)
    db.commit()

    return {"message": "Job application deleted successfully"}