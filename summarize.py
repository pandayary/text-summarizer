from datetime import datetime

from fastapi import APIRouter
from sqlalchemy.orm import Session

from database.db import SessionLocal
from database.model import Summary
from schemas.summary_schemas import SummaryRequest
from services.summarizer import summarize_text

router = APIRouter(prefix="/summarize", tags=["Summarizer"])


@router.post("/")
def summarize(request: SummaryRequest) -> dict[str, str]:
    summary = summarize_text(request.text, request.length)

    db: Session = SessionLocal()
    try:
        new_record = Summary(
            original_text=request.text,
            summarized_text=summary,
            created_at=str(datetime.now()),
        )
        db.add(new_record)
        db.commit()
        return {"summary": summary}
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()