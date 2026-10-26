from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.db import engine
from database.model import Base

from routes.summarize import router as summarize_router
from routes.history import router as history_router

Base.metadata.create_all(
    bind=engine
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    summarize_router
)

app.include_router(
    history_router
)

@app.get("/")
def home():
    return {
        "message":
        "Text Summarizer API Running"
    }