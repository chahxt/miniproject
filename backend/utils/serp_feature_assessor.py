import requests
from bs4 import BeautifulSoup
import re

SERP_FEATURES = [
    {"name": "Featured Snippet", "check": lambda soup: bool(soup.select_one('.kp-blk, .ifM9O'))},
    {"name": "People Also Ask", "check": lambda soup: bool(soup.find(text=re.compile("People also ask", re.I)))},
    {"name": "Knowledge Panel", "check": lambda soup: bool(soup.select_one('.kp-wholepage'))},
    {"name": "Video Carousel", "check": lambda soup: bool(soup.select_one('.hdtb-mitem span:contains("Videos")'))},
    {"name": "Shopping Results", "check": lambda soup: bool(soup.find(text=re.compile("Shop", re.I)))},
    {"name": "Image Pack", "check": lambda soup: bool(soup.select_one('.hdtb-mitem span:contains("Images")'))},
    {"name": "Top Stories", "check": lambda soup: bool(soup.find(text=re.compile("Top stories", re.I)))},
    {"name": "Ads", "check": lambda soup: bool(soup.find_all(text=re.compile("Ad", re.I)))},
]

def analyze_serp_features(keyword):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    params = {"q": keyword}
    resp = requests.get("https://www.google.com/search", params=params, headers=headers)
    soup = BeautifulSoup(resp.text, "html.parser")
    found = []
    for feature in SERP_FEATURES:
        present = feature["check"](soup)
        found.append({"feature": feature["name"], "present": present})
    # For now, basic suggestions
    tips = []
    for item in found:
        if item["feature"] == "Featured Snippet" and not item["present"]:
            tips.append("Structure your content with clear Q&A or summaries to win the snippet.")
        if item["feature"] == "People Also Ask" and item["present"]:
            tips.append("Add an FAQ section with concise answers.")
        if item["feature"] == "Video Carousel" and item["present"]:
            tips.append("Include a relevant YouTube video or create your own.")
        if item["feature"] == "Shopping Results" and item["present"]:
            tips.append("Use Product schema and optimize for e-commerce.")
        if item["feature"] == "Knowledge Panel" and item["present"]:
            tips.append("Add organization/person schema for knowledge panel potential.")
        if item["feature"] == "Top Stories" and item["present"]:
            tips.append("Publish newsworthy, timely content for Top Stories.")
        if item["feature"] == "Image Pack" and item["present"]:
            tips.append("Add optimized, relevant images with alt text.")
    return {
        "features": found,
        "tips": tips
    }
