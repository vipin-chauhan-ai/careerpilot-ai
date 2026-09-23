from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.dependencies.database import get_db

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
# Root function
@app.get("/")
def root():
    return {"message":"Wellcome to CareerPilot AI"}

@app.get("/health")
def health_check():
    return{"status":"Healthy"}

@app.get("/health/database")
def database_health_check(db:Session =Depends(get_db) ):
    result = db.execute(
        text("SELECT current_database(), current_user")
    ).one()

    return{
        "status":"Healthy",
        "database":result[0],
        "user":result[1]
    }
