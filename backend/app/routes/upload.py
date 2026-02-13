import os
from fastapi import APIRouter, UploadFile, File
from app.config import UPLOAD_DIR
from app.services.document_loader import load_text
from app.services.chunking import chunk_text
from app.services.embedding_service import embed_texts
from app.services.vectordb_service import add_chunks

router = APIRouter()

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    text = load_text(file_path)
    chunks = chunk_text(text)
    embeddings = embed_texts(chunks)

    metadata = [{"source": file.filename}] * len(chunks)
    add_chunks(chunks, embeddings, metadata)

    return {"status": "uploaded"}
