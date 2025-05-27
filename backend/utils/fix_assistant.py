
# from bs4 import BeautifulSoup

# def suggest_seo_fixes(html):
#     soup = BeautifulSoup(html, 'html.parser')
#     suggestions = []

#     # Title tag check
#     if not soup.title or not soup.title.string.strip():
#         suggestions.append("Add a <title> tag with a clear and relevant title.")

#     # Meta description check
#     if not soup.find("meta", attrs={"name": "description"}):
#         suggestions.append("Add a <meta name='description'> tag for better SEO.")

#     # H1 tag check
#     if not soup.find("h1"):
#         suggestions.append("Add at least one <h1> tag that describes the page content.")

#     # Alt tags on images
#     images = soup.find_all("img")
#     for img in images:
#         if not img.get("alt"):
#             suggestions.append(f"Add alt text for image with src '{img.get('src')}'.")

#     # Canonical link tag
#     if not soup.find("link", rel="canonical"):
#         suggestions.append("Consider adding a canonical <link> tag to prevent duplicate content.")

#     # Internal links check
#     internal_links = [a['href'] for a in soup.find_all("a", href=True) if a['href'].startswith('/')]
#     if len(internal_links) < 3:
#         suggestions.append("Add more internal links to connect pages within your site.")

#     # Heading structure check
#     h1_tags = soup.find_all("h1")
#     h2_tags = soup.find_all("h2")
#     h3_tags = soup.find_all("h3")
#     if len(h1_tags) > 1:
#         suggestions.append("Avoid using multiple <h1> tags on a single page.")
#     if len(h2_tags) == 0:
#         suggestions.append("Add <h2> tags to organize your content.")

#     return {
#         "suggestions": suggestions,
#         "h1_count": len(h1_tags),
#         "h2_count": len(h2_tags),
#         "h3_count": len(h3_tags),
#         "image_count": len(images),
#         "missing_alt_count": sum(1 for img in images if not img.get("alt"))
#     }


from bs4 import BeautifulSoup

def suggest_seo_fixes(html):
    soup = BeautifulSoup(html, 'html.parser')
    suggestions = []

    # Title tag check
    if not soup.title or not soup.title.string.strip():
        suggestions.append("Add a <title> tag with a clear and relevant title.")
    else:
        title_len = len(soup.title.string.strip())
        if title_len < 50:
            suggestions.append("Your <title> tag is quite short; consider making it more descriptive (50-60 characters ideal).")
        elif title_len > 60:
            suggestions.append("Your <title> tag is too long; keep it between 50-60 characters for best SEO.")

    # Meta description check
    meta_desc = soup.find("meta", attrs={"name": "description"})
    if not meta_desc or not meta_desc.get("content") or not meta_desc.get("content").strip():
        suggestions.append("Add a <meta name='description'> tag with a concise description.")

    # Meta robots check
    meta_robots = soup.find("meta", attrs={"name": "robots"})
    if not meta_robots:
        suggestions.append("Add a <meta name='robots'> tag to control search engine indexing.")

    # H1 tag check
    h1_tags = soup.find_all("h1")
    if len(h1_tags) == 0:
        suggestions.append("Add at least one <h1> tag that describes the page content.")
    elif len(h1_tags) > 1:
        suggestions.append("Avoid using multiple <h1> tags on a single page.")

    # H2 tag check
    h2_tags = soup.find_all("h2")
    if len(h2_tags) == 0:
        suggestions.append("Add <h2> tags to organize your content.")

    # H3 tags count (just reporting, no suggestion)
    h3_tags = soup.find_all("h3")

    # Image alt text check
    images = soup.find_all("img")
    missing_alt_imgs = [img for img in images if not img.get("alt")]
    for img in missing_alt_imgs:
        suggestions.append(f"Add alt text for image with src '{img.get('src')}'.")
    
    # Check for very short alt texts
    for img in images:
        alt = img.get("alt", "").strip()
        if alt and len(alt) < 5:
            suggestions.append(f"Improve alt text for image with src '{img.get('src')}' to be more descriptive.")

    # Canonical link tag
    if not soup.find("link", rel="canonical"):
        suggestions.append("Consider adding a canonical <link> tag to prevent duplicate content.")

    # Internal links check
    internal_links = [a['href'] for a in soup.find_all("a", href=True) if a['href'].startswith('/')]
    if len(internal_links) < 3:
        suggestions.append("Add more internal links to connect pages within your site.")

    # External links nofollow check
    external_links = [a for a in soup.find_all("a", href=True) if a['href'].startswith('http')]
    for a in external_links:
        rel = a.get("rel", [])
        if "nofollow" not in rel:
            suggestions.append(f"Add rel='nofollow' attribute to external link '{a['href']}' if you don't want to pass SEO juice.")

    return {
        "suggestions": suggestions,
        "h1_count": len(h1_tags),
        "h2_count": len(h2_tags),
        "h3_count": len(h3_tags),
        "image_count": len(images),
        "missing_alt_count": len(missing_alt_imgs)
    }
