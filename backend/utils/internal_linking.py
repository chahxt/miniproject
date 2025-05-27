# utils/internal_linking.py
import spacy
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

nlp = spacy.load("en_core_web_sm")

def suggest_internal_links(pages):
    texts = [page["content"] for page in pages]
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(texts)
    similarity_matrix = cosine_similarity(tfidf_matrix)

    suggestions = []
    for i in range(len(pages)):
        similar_pages = sorted(
            [(j, similarity_matrix[i][j]) for j in range(len(pages)) if i != j],
            key=lambda x: x[1],
            reverse=True
        )[:3]
        suggestions.append({
            "page": pages[i]["url"],
            "suggestions": [{"url": pages[j]["url"], "score": round(score, 2)} for j, score in similar_pages]
        })

    return suggestions
