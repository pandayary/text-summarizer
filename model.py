from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import ForeignKey

from .db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(100))
    email = Column(String(255))
    password = Column(String(255))


class Language(Base):
    __tablename__ = "languages"

    id = Column(Integer, primary_key=True)
    language_name = Column(String(100))


class Summary(Base):
    __tablename__ = "summaries"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    language_id = Column(
        Integer,
        ForeignKey("languages.id")
    )

    original_text = Column(Text)

    summarized_text = Column(Text)

    created_at = Column(String(100))