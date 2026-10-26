from fastapi import APIRouter

from database.db import SessionLocal
from database.model import Summary

router = APIRouter(
    prefix="/history",
    tags=["History"]
)

@router.get("/")
def get_history():
    db = SessionLocal()
    try:
        return db.query(Summary).order_by(Summary.id.desc()).all()
    finally:
        db.close()