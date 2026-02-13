from openai import OpenAI
from app.config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)


def generate_answer(question: str, contexts: list[str]):
    context_text = "\n".join(contexts)

    prompt = f"""
Answer the question using ONLY the context below.

Context:
{context_text}

Question:
{question}
"""

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
