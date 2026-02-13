from fastapi import FastAPI
from app.routes import upload, ask

app = FastAPI(title="RAG Document API")

app.include_router(upload.router)
app.include_router(ask.router)

@app.get("/")
def root():
    return {"message": "RAG API running"}
