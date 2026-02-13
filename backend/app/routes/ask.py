from fastapi import APIRouter
from app.models.schemas import QuestionRequest, AnswerResponse
from app.services.embedding_service import embed_query
from app.services.vectordb_service import search
from app.services.llm_service import generate_answer

router = APIRouter()

@router.post("/ask", response_model=AnswerResponse)
def ask_question(req: QuestionRequest):
    query_emb = embed_query(req.question)
    docs, metas = search(query_emb)

    answer = generate_answer(req.question, docs)
    sources = [m["source"] for m in metas]

    return AnswerResponse(answer=answer, sources=sources)
