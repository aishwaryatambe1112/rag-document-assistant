from pypdf import PdfReader
import docx


def load_text(file_path: str) -> str:
    if file_path.endswith(".pdf"):
        reader = PdfReader(file_path)
        return "\n".join([p.extract_text() or "" for p in reader.pages])

    if file_path.endswith(".docx"):
        d = docx.Document(file_path)
        return "\n".join([p.text for p in d.paragraphs])

    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()
