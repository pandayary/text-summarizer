from typing import Literal

from pydantic import BaseModel, ConfigDict


class SummaryRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    text: str
    length: Literal["short", "medium", "long"] = "medium"


class SummaryResponse(BaseModel):
    summary: str