# import requests
# from bs4 import BeautifulSoup
# import spacy
# from collections import Counter

# # Load spaCy model once
# nlp = spacy.load("en_core_web_sm")

# def get_google_results(query, num_results=5):
#     # For demo, static URLs (use SERP API for production)
#     search_urls = [
#         "https://en.wikipedia.org/wiki/" + query.replace(" ", "_"),
#         "https://www.investopedia.com/terms/b/" + query.replace(" ", "") + ".asp",
#         "https://www.forbes.com/search/?q=" + query.replace(" ", "%20"),
#         "https://www.britannica.com/search?query=" + query.replace(" ", "%20"),
#         "https://www.techtarget.com/search/query?q=" + query.replace(" ", "%20"),
#     ]
#     return search_urls[:num_results]

# def fetch_main_content(url):
#     try:
#         r = requests.get(url, timeout=8)
#         soup = BeautifulSoup(r.text, 'html.parser')
#         text = " ".join([p.get_text() for p in soup.find_all('p')])
#         return text
#     except Exception:
#         return ""

# def extract_entities_and_topics(text):
#     doc = nlp(text)
#     # Entities: Only specific labels
#     entities = [ent.text.strip() for ent in doc.ents if ent.label_ in (
#         "PERSON", "ORG", "GPE", "PRODUCT", "EVENT", "WORK_OF_ART"
#     )]
#     # Main topics: Most common non-stopword nouns
#     nouns = [token.lemma_.lower() for token in doc if token.pos_ == "NOUN" and not token.is_stop]
#     top_nouns = [item[0] for item in Counter(nouns).most_common(10)]
#     # Remove duplicates, prioritize topics
#     return list(set(entities + top_nouns))

# def analyze_semantic_gap(keyword, user_text):
#     urls = get_google_results(keyword)
#     top_texts = [fetch_main_content(url) for url in urls]
#     all_entities_topics = []
#     for txt in top_texts:
#         all_entities_topics += extract_entities_and_topics(txt)
#     all_entities_topics = list(set(all_entities_topics))
#     user_entities_topics = extract_entities_and_topics(user_text)
#     user_entities_topics_set = set(user_entities_topics)
#     missing = [item for item in all_entities_topics if item not in user_entities_topics_set]
#     coverage_score = int(100 * (len(all_entities_topics) - len(missing)) / max(len(all_entities_topics), 1))
#     return {
#         "gaps": missing,
#         "coverage_score": coverage_score,
#         "all_entities_topics": all_entities_topics,
#         "user_entities_topics": list(user_entities_topics),
#     }


import requests
from bs4 import BeautifulSoup
import spacy
from collections import Counter

# Load spaCy model once
nlp = spacy.load("en_core_web_sm")

def get_google_results(query, num_results=8):
    # Diverse, representative URLs for better semantic coverage
    search_urls = [
        # Knowledge and reference
        "https://en.wikipedia.org/wiki/" + query.replace(" ", "_"),
        "https://www.britannica.com/search?query=" + query.replace(" ", "%20"),
        "https://www.investopedia.com/terms/b/" + query.replace(" ", "") + ".asp",
        # News/Trends
        "https://www.forbes.com/search/?q=" + query.replace(" ", "%20"),
        "https://www.cnn.com/search?q=" + query.replace(" ", "%20"),
        # Shopping/E-commerce
        "https://www.amazon.in/s?k=" + query.replace(" ", "+"),
        "https://www.flipkart.com/search?q=" + query.replace(" ", "+"),
        # Recipe/food
        "https://www.allrecipes.com/search/results/?wt=" + query.replace(" ", "%20"),
        "https://www.foodnetwork.com/search/" + query.replace(" ", "-") + "-",
        # Blogs/Social
        "https://medium.com/search?q=" + query.replace(" ", "%20"),
        "https://www.quora.com/search?q=" + query.replace(" ", "+"),
        "https://twitter.com/search?q=" + query.replace(" ", "%20"),
        # Technology/How-to
        "https://www.techtarget.com/search/query?q=" + query.replace(" ", "%20"),
        "https://www.wikihow.com/wikiHowTo?search=" + query.replace(" ", "+"),
    ]
    return search_urls[:num_results]

def fetch_main_content(url):
    try:
        r = requests.get(url, timeout=8)
        soup = BeautifulSoup(r.text, 'html.parser')
        # Prefer main/section/article tags if present for focused extraction
        main_content = soup.find('main') or soup.find('section') or soup.find('article')
        if main_content:
            text = " ".join([p.get_text() for p in main_content.find_all('p')])
        else:
            text = " ".join([p.get_text() for p in soup.find_all('p')])
        # Clean up
        return text.strip()
    except Exception:
        return ""

def extract_entities_and_topics(text):
    doc = nlp(text)
    # Entities: Only specific, SEO-relevant types
    entities = [ent.text.strip() for ent in doc.ents if ent.label_ in (
        "PERSON", "ORG", "GPE", "PRODUCT", "EVENT", "WORK_OF_ART"
    )]
    # Topics: Top 15 unique, meaningful nouns (lemmas, not stopwords)
    nouns = [token.lemma_.lower() for token in doc if token.pos_ == "NOUN" and not token.is_stop]
    top_nouns = [item[0] for item in Counter(nouns).most_common(15)]
    # Remove duplicates and preserve order
    combined = []
    seen = set()
    for item in entities + top_nouns:
        if item not in seen and len(item) > 2:
            seen.add(item)
            combined.append(item)
    return combined

def analyze_semantic_gap(keyword, user_text):
    urls = get_google_results(keyword)
    top_texts = [fetch_main_content(url) for url in urls]
    all_entities_topics = []
    for txt in top_texts:
        all_entities_topics += extract_entities_and_topics(txt)
    # Unique topics, preserve order
    seen = set()
    all_entities_topics = [x for x in all_entities_topics if not (x in seen or seen.add(x))]
    user_entities_topics = extract_entities_and_topics(user_text)
    user_entities_topics_set = set(user_entities_topics)
    missing = [item for item in all_entities_topics if item not in user_entities_topics_set]
    coverage_score = int(100 * (len(all_entities_topics) - len(missing)) / max(len(all_entities_topics), 1))
    return {
        "gaps": missing,
        "coverage_score": coverage_score,
        "all_entities_topics": all_entities_topics,
        "user_entities_topics": list(user_entities_topics),
    }
