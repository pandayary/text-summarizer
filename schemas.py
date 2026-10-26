from pydantic import BaseModel

class SummaryRequest(BaseModel):
    text: str
    language_id: int


class UserCreate(BaseModel):
    username: str
    email: str
    password: str