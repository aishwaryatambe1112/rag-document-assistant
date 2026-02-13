import chromadb
from app.config import CHROMA_DIR

client = chromadb.PersistentClient(path=CHROMA_DIR)
collection = client.get_or_create_collection("documents")


def add_chunks(chunks, embeddings, metadata):
    ids = [f"chunk_{i}" for i in range(len(chunks))]
    collection.add(documents=chunks, embeddings=embeddings, metadatas=metadata, ids=ids)


def search(query_embedding, k=3):
    results = collection.query(query_embeddings=[query_embedding], n_results=k)
    return results["documents"][0], results["metadatas"][0]
