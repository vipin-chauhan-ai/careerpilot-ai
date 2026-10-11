from datetime import date,datetime
from typing import Literal
from pydantic import BaseModel,ConfigDict,Field

JobStatus = Literal[
    "saved",
    "applied",
    "interview",
    "offer",
    "rejected"
] 

class jobApplicationCreate(BaseModel):
    company_name:str=Field(min_length=2,max_length=200)
    job_title:str=Field(min_length=2,max_length=200)
    job_url:str | None = Field(min_length=2,max_length=500)
    location:str | None =Field(min_length=2,max_length=150)
    employment_type:str | None = Field(
        default=None,
        max_length=50,
        
    )
    status :JobStatus="saved"
    applied_date:date | None = None
    notes:str | None =None
    
class JobApplicationUpdate(BaseModel):
    company_name:str  | None = Field(
        default=None,
        min_length=2,
        max_length=200
    )
    job_title:str | None = Field(default=None, min_length=2,max_length=200)
    job_url :str | None = Field(default=None,max_length=500)
    location :str | None = Field(default=None,max_length=150)
    employment_type:str | None = Field(
            default=None,
            max_length=50,
            
        )
    status :JobStatus | None = None
    applied_date :date | None = None
    notes :str | None = None
    
class JobApplilcationResponse(BaseModel):
    model_config= ConfigDict(from_attributes=True)
    id:int
    user_id:int
    company_name:str
    job_title:str
    job_url:str | None
    location:str | None
    employment_type:str |None
    status : str
    applied_date :date | None
    notes : str | None
    created_at : datetime