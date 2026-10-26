from .db import SessionLocal
from .model import Language


def seed_languages():
    languages = [
        "English",
        "Hindi",
        "Urdu",
        "Tamil",
        "Bengali",
    ]

    db = SessionLocal()
    try:
        for language_name in languages:
            exists = db.query(Language.id).filter_by(
                language_name=language_name
            ).first()
            if not exists:
                db.add(Language(language_name=language_name))
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
