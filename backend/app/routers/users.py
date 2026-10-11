from fastapi import APIRouter,Depends
from app.models.user import User
from app.schemas.user import UserResponse
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/users",tags=["Users"])
@router.get("/me",response_model=UserResponse)
def read_my_profile(curent_user:User = Depends(get_current_user))->User:
    return curent_user