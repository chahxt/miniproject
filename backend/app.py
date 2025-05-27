


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from models.user import db, User
# from utils.seo_scraper import scrape_seo_data
# from utils.image_checker import analyze_images
# import re
# from werkzeug.security import generate_password_hash, check_password_hash
# from bs4 import BeautifulSoup
# from utils.fix_assistant import suggest_seo_fixes
# from utils.internal_linking import suggest_internal_links
# from utils.ranking_predictor import estimate_ranking_impact
# from utils.ai_autofix import generate_alt_texts
# from datetime import datetime
# import json

# # NEW IMPORTS
# from utils.semantic_gap_analyzer import analyze_semantic_gap, fetch_main_content
# from utils.serp_feature_assessor import analyze_serp_features

# app = Flask(__name__)
# CORS(app)

# # Database Config
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
# app.config['SECRET_KEY'] = 'your-secret-key'
# db.init_app(app)

# with app.app_context():
#     print("Creating tables on startup...")
#     db.create_all()

# def is_valid_url(url):
#     regex = re.compile(
#         r'^(?:http|ftp)s?://' 
#         r'(?:(?:[A-Z0-9-]+\.)+[A-Z]{2,6})'
#         r'(?:/?|[/?]\S+)$', re.IGNORECASE)
#     return re.match(regex, url) is not None

# # --- User Registration ---
# @app.route('/register', methods=['POST'])
# def register():
#     data = request.json
#     if not data['email'] or not data['password']:
#         return jsonify({"error": "Email and password required."}), 400
#     if User.query.filter_by(email=data['email']).first():
#         return jsonify({"error": "User already exists."}), 409
#     hashed_password = generate_password_hash(data['password'])
#     user = User(email=data['email'], password=hashed_password, history=json.dumps([]))
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({"message": "User registered successfully."}), 201

# # --- User Login ---
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     user = User.query.filter_by(email=data['email']).first()
#     if user and check_password_hash(user.password, data['password']):
#         return jsonify({"message": "Login successful."}), 200
#     else:
#         return jsonify({"error": "Invalid credentials."}), 401

# # --- SEO Analysis + Save history ---
# @app.route('/analyze-seo', methods=['POST'])
# def analyze_seo():
#     data = request.json
#     url = data.get('url')
#     email = data.get('email')
#     if not is_valid_url(url):
#         return jsonify({"error": "Invalid URL."}), 400

#     result = scrape_seo_data(url)

#     # Save URL to user history (max 20 entries)
#     if email:
#         user = User.query.filter_by(email=email).first()
#         if user:
#             try:
#                 history_list = json.loads(user.history)
#             except:
#                 history_list = []
#             history_list.append({"url": url, "timestamp": datetime.utcnow().isoformat()})
#             user.history = json.dumps(history_list[-20:])
#             db.session.commit()

#     return jsonify(result)

# # --- Image Analysis ---
# @app.route('/analyze-images', methods=['POST'])
# def analyze_images_route():
#     url = request.json.get('url')
#     if not is_valid_url(url):
#         return jsonify({"error": "Invalid URL."}), 400
#     result = analyze_images(url)
#     return jsonify(result)

# # --- Fix SEO ---
# @app.route('/fix-seo', methods=['POST'])
# def fix_seo():
#     html = request.json.get('html')
#     if not html:
#         return jsonify({"error": "HTML content is required."}), 400
#     suggestions = suggest_seo_fixes(html)
#     return jsonify(suggestions)

# # --- Semantic Gap Analyzer API (NEW) ---
# @app.route("/api/semantic-gap", methods=["POST"])
# def semantic_gap():
#     data = request.get_json()
#     keyword = data.get("keyword")
#     user_content = data.get("content", "")
#     url = data.get("url", "")
#     if not keyword:
#         return jsonify({"error": "Keyword required"}), 400
#     if not user_content and not url:
#         return jsonify({"error": "Provide either content or URL"}), 400
#     if not user_content and url:
#         user_content = fetch_main_content(url)
#     result = analyze_semantic_gap(keyword, user_content)
#     return jsonify(result)

# # --- SERP Features Opportunity & Risk Assessment (NEW) ---
# # @app.route('/api/serp-features', methods=['POST'])
# # def serp_features():
# #     data = request.get_json()
# #     keyword = data.get("keyword")
# #     if not keyword:
# #         return jsonify({"error": "Keyword required"}), 400
# #     result = analyze_serp_features(keyword)
# #     return jsonify(result)
# @app.route('/api/serp-features', methods=['POST'])
# def serp_features():
#     print("SERP Features endpoint was called!")  # <--- ADD THIS LINE
#     data = request.get_json()
#     keyword = data.get("keyword")
#     if not keyword:
#         return jsonify({"error": "Keyword required"}), 400
#     result = analyze_serp_features(keyword)
#     return jsonify(result)

# # --- SEO CSS Fix Suggestions ---
# def suggest_seo_css_fixes(html):
#     soup = BeautifulSoup(html, 'html.parser')
#     suggestions = []

#     if not soup.title or not soup.title.string.strip():
#         suggestions.append("Add a <title> tag with a clear and relevant title.")
#     elif len(soup.title.string.strip()) > 60:
#         suggestions.append("Your <title> tag is too long; keep it between 50-60 characters for best SEO.")
#     if not soup.find("meta", attrs={"name": "description"}):
#         suggestions.append("Add a <meta name='description'> tag for better SEO.")
#     h1_tags = soup.find_all("h1")
#     if len(h1_tags) == 0:
#         suggestions.append("Add at least one <h1> tag that describes the page content.")
#     elif len(h1_tags) > 1:
#         suggestions.append("Avoid using multiple <h1> tags on a single page.")
#     h2_tags = soup.find_all("h2")
#     if len(h2_tags) == 0:
#         suggestions.append("Add <h2> tags to organize your content.")
#     images = soup.find_all("img")
#     missing_alt_count = sum(1 for img in images if not img.get("alt"))
#     if len(images) == 0:
#         suggestions.append("Add images to make your content visually appealing.")
#     if missing_alt_count > 0:
#         suggestions.append(f"Add alt text for {missing_alt_count} image(s) for accessibility.")
#     if not soup.find("link", rel="canonical"):
#         suggestions.append("Consider adding a canonical <link> tag to prevent duplicate content.")
#     internal_links = [a['href'] for a in soup.find_all("a", href=True) if a['href'].startswith('/')]
#     if len(internal_links) < 3:
#         suggestions.append("Add more internal links to connect pages within your site.")

#     inline_style_elements = soup.select('[style]')
#     if inline_style_elements:
#         suggestions.append(f"Found {len(inline_style_elements)} elements with inline styles. Consider moving styles to external CSS files for maintainability.")
#     css_links = soup.find_all("link", rel="stylesheet")
#     if len(css_links) == 0:
#         suggestions.append("No external CSS files linked. Consider adding stylesheets for better style management.")
#     style_tags = soup.find_all("style")
#     large_style_tags = [tag for tag in style_tags if tag.string and len(tag.string) > 1000]
#     if large_style_tags:
#         suggestions.append(f"Found {len(large_style_tags)} large internal <style> blocks. Consider moving them to external CSS files.")
#     if not soup.find("meta", attrs={"name": "viewport"}):
#         suggestions.append("Add a responsive viewport <meta> tag for better mobile experience.")
#     deprecated_css_props = ['float', 'zoom']
#     for elem in inline_style_elements:
#         styles = elem.get('style', '')
#         for prop in deprecated_css_props:
#             if re.search(rf'\b{prop}\s*:', styles):
#                 suggestions.append(f"Inline style uses deprecated or discouraged CSS property '{prop}'.")
#     if re.search(r'background-image\s*:\s*url\(', html, re.I):
#         suggestions.append("Detected background images via CSS. Ensure important content images have alt text for accessibility.")
#     known_frameworks = ['bootstrap', 'tailwind', 'foundation', 'bulma', 'materialize']
#     css_frameworks_found = any(framework in str(css_links).lower() for framework in known_frameworks)
#     if not css_frameworks_found:
#         suggestions.append("No popular CSS frameworks detected. Consider using frameworks like Bootstrap or Tailwind CSS for responsive design and faster development.")

#     return {
#         "suggestions": suggestions,
#         "h1_count": len(h1_tags),
#         "h2_count": len(h2_tags),
#         "h3_count": len(soup.find_all("h3")),
#         "image_count": len(images),
#         "missing_alt_count": missing_alt_count,
#         "inline_style_count": len(inline_style_elements),
#         "external_css_count": len(css_links),
#         "style_tag_count": len(style_tags),
#     }

# @app.route('/fix-seo-css', methods=['POST'])
# def fix_seo_css():
#     data = request.get_json()
#     html = data.get('html', '')
#     if not html:
#         return jsonify({"error": "HTML content is required."}), 400

#     result = suggest_seo_css_fixes(html)

#     if not result['suggestions']:
#         return jsonify({
#             "message": "No SEO or CSS issues found! 🎉",
#             "summary": {
#                 "h1_count": result['h1_count'],
#                 "h2_count": result['h2_count'],
#                 "h3_count": result['h3_count'],
#                 "image_count": result['image_count'],
#                 "missing_alt_count": result['missing_alt_count'],
#                 "inline_style_count": result['inline_style_count'],
#                 "external_css_count": result['external_css_count'],
#                 "style_tag_count": result['style_tag_count'],
#             }
#         })
#     else:
#         return jsonify({
#             "message": "Suggestions:",
#             "suggestions": result['suggestions'],
#             "summary": {
#                 "h1_count": result['h1_count'],
#                 "h2_count": result['h2_count'],
#                 "h3_count": result['h3_count'],
#                 "image_count": result['image_count'],
#                 "missing_alt_count": result['missing_alt_count'],
#                 "inline_style_count": result['inline_style_count'],
#                 "external_css_count": result['external_css_count'],
#                 "style_tag_count": result['style_tag_count'],
#             }
#         })

# @app.route('/internal-links', methods=['POST'])
# def internal_links():
#     data = request.json.get('pages')
#     if not data:
#         return jsonify({"error": "Pages data required."}), 400
#     result = suggest_internal_links(data)
#     return jsonify(result)

# @app.route('/predict-impact', methods=['POST'])
# def predict_impact():
#     issues = request.json.get('fixes')
#     if not issues:
#         return jsonify({"error": "Fixes list required."}), 400
#     score = estimate_ranking_impact(issues)
#     return jsonify({"predicted_ranking_improvement": f"{score}%"})

# @app.route('/generate-alt-texts', methods=['POST'])
# def generate_alt():
#     images = request.json.get('images')
#     if not images:
#         return jsonify({"error": "Image descriptions required."}), 400
#     alt_texts = generate_alt_texts(images)
#     return jsonify({"generated_alts": alt_texts})

# # New History endpoints
# @app.route('/history', methods=['POST'])
# def get_history():
#     email = request.json.get('email')
#     user = User.query.filter_by(email=email).first()
#     if not user:
#         return jsonify({"error": "User not found"}), 404
#     try:
#         history = json.loads(user.history)
#     except:
#         history = []
#     return jsonify({"history": history})

# @app.route('/clear-history', methods=['POST'])
# def clear_history():
#     email = request.json.get('email')
#     user = User.query.filter_by(email=email).first()
#     if not user:
#         return jsonify({"error": "User not found"}), 404
#     user.history = json.dumps([])
#     db.session.commit()
#     return jsonify({"message": "History cleared."})

# if __name__ == "__main__":
#     app.run(debug=True)








from flask import Flask, request, jsonify
from flask_cors import CORS
from models.user import db, User
from utils.seo_scraper import scrape_seo_data
from utils.image_checker import analyze_images
import re
from werkzeug.security import generate_password_hash, check_password_hash
from bs4 import BeautifulSoup
from utils.fix_assistant import suggest_seo_fixes
from utils.internal_linking import suggest_internal_links
from utils.ranking_predictor import estimate_ranking_impact
from utils.ai_autofix import generate_alt_texts
from datetime import datetime
import json

# NEW IMPORTS
from utils.semantic_gap_analyzer import analyze_semantic_gap, fetch_main_content
from utils.serp_feature_assessor import analyze_serp_features

app = Flask(__name__)
CORS(app)

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = 'your-secret-key'
db.init_app(app)

with app.app_context():
    print("Creating tables on startup...")
    db.create_all()

def is_valid_url(url):
    regex = re.compile(
        r'^(?:http|ftp)s?://' 
        r'(?:(?:[A-Z0-9-]+\.)+[A-Z]{2,6})'
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, url) is not None

# --- User Registration ---
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data['email'] or not data['password']:
        return jsonify({"error": "Email and password required."}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "User already exists."}), 409
    hashed_password = generate_password_hash(data['password'])
    user = User(email=data['email'], password=hashed_password, history=json.dumps([]))
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully."}), 201

# --- User Login ---
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login successful."}), 200
    else:
        return jsonify({"error": "Invalid credentials."}), 401

# --- SEO Analysis + Save history ---
@app.route('/analyze-seo', methods=['POST'])
def analyze_seo():
    data = request.json
    url = data.get('url')
    email = data.get('email')
    if not is_valid_url(url):
        return jsonify({"error": "Invalid URL."}), 400

    result = scrape_seo_data(url)

    # Save URL to user history (max 20 entries)
    if email:
        user = User.query.filter_by(email=email).first()
        if user:
            try:
                history_list = json.loads(user.history)
            except:
                history_list = []
            history_list.append({"url": url, "timestamp": datetime.utcnow().isoformat()})
            user.history = json.dumps(history_list[-20:])
            db.session.commit()

    return jsonify(result)

# --- Image Analysis ---
@app.route('/analyze-images', methods=['POST'])
def analyze_images_route():
    url = request.json.get('url')
    if not is_valid_url(url):
        return jsonify({"error": "Invalid URL."}), 400
    result = analyze_images(url)
    return jsonify(result)

# --- Fix SEO ---
@app.route('/fix-seo', methods=['POST'])
def fix_seo():
    html = request.json.get('html')
    if not html:
        return jsonify({"error": "HTML content is required."}), 400
    suggestions = suggest_seo_fixes(html)
    return jsonify(suggestions)

# --- Semantic Gap Analyzer API (NEW) ---
@app.route("/api/semantic-gap", methods=["POST"])
def semantic_gap():
    data = request.get_json()
    keyword = data.get("keyword")
    user_content = data.get("content", "")
    url = data.get("url", "")
    if not keyword:
        return jsonify({"error": "Keyword required"}), 400
    if not user_content and not url:
        return jsonify({"error": "Provide either content or URL"}), 400
    if not user_content and url:
        user_content = fetch_main_content(url)
    result = analyze_semantic_gap(keyword, user_content)
    return jsonify(result)

# --- SERP Features Opportunity & Risk Assessment (NEW) ---
# @app.route('/api/serp-features', methods=['POST'])
# def serp_features():
#     data = request.get_json()
#     keyword = data.get("keyword")
#     if not keyword:
#         return jsonify({"error": "Keyword required"}), 400
#     result = analyze_serp_features(keyword)
#     return jsonify(result)
@app.route('/api/serp-features', methods=['POST'])
def serp_features():
    print("SERP Features endpoint was called!")  # <--- ADD THIS LINE
    data = request.get_json()
    keyword = data.get("keyword")
    if not keyword:
        return jsonify({"error": "Keyword required"}), 400
    result = analyze_serp_features(keyword)
    return jsonify(result)

# --- SEO CSS Fix Suggestions ---
def suggest_seo_css_fixes(html):
    soup = BeautifulSoup(html, 'html.parser')
    suggestions = []

    if not soup.title or not soup.title.string.strip():
        suggestions.append("Add a <title> tag with a clear and relevant title.")
    elif len(soup.title.string.strip()) > 60:
        suggestions.append("Your <title> tag is too long; keep it between 50-60 characters for best SEO.")
    if not soup.find("meta", attrs={"name": "description"}):
        suggestions.append("Add a <meta name='description'> tag for better SEO.")
    h1_tags = soup.find_all("h1")
    if len(h1_tags) == 0:
        suggestions.append("Add at least one <h1> tag that describes the page content.")
    elif len(h1_tags) > 1:
        suggestions.append("Avoid using multiple <h1> tags on a single page.")
    h2_tags = soup.find_all("h2")
    if len(h2_tags) == 0:
        suggestions.append("Add <h2> tags to organize your content.")
    images = soup.find_all("img")
    missing_alt_count = sum(1 for img in images if not img.get("alt"))
    if len(images) == 0:
        suggestions.append("Add images to make your content visually appealing.")
    if missing_alt_count > 0:
        suggestions.append(f"Add alt text for {missing_alt_count} image(s) for accessibility.")
    if not soup.find("link", rel="canonical"):
        suggestions.append("Consider adding a canonical <link> tag to prevent duplicate content.")
    internal_links = [a['href'] for a in soup.find_all("a", href=True) if a['href'].startswith('/')]
    if len(internal_links) < 3:
        suggestions.append("Add more internal links to connect pages within your site.")

    inline_style_elements = soup.select('[style]')
    if inline_style_elements:
        suggestions.append(f"Found {len(inline_style_elements)} elements with inline styles. Consider moving styles to external CSS files for maintainability.")
    css_links = soup.find_all("link", rel="stylesheet")
    if len(css_links) == 0:
        suggestions.append("No external CSS files linked. Consider adding stylesheets for better style management.")
    style_tags = soup.find_all("style")
    large_style_tags = [tag for tag in style_tags if tag.string and len(tag.string) > 1000]
    if large_style_tags:
        suggestions.append(f"Found {len(large_style_tags)} large internal <style> blocks. Consider moving them to external CSS files.")
    if not soup.find("meta", attrs={"name": "viewport"}):
        suggestions.append("Add a responsive viewport <meta> tag for better mobile experience.")
    deprecated_css_props = ['float', 'zoom']
    for elem in inline_style_elements:
        styles = elem.get('style', '')
        for prop in deprecated_css_props:
            if re.search(rf'\b{prop}\s*:', styles):
                suggestions.append(f"Inline style uses deprecated or discouraged CSS property '{prop}'.")
    if re.search(r'background-image\s*:\s*url\(', html, re.I):
        suggestions.append("Detected background images via CSS. Ensure important content images have alt text for accessibility.")
    known_frameworks = ['bootstrap', 'tailwind', 'foundation', 'bulma', 'materialize']
    css_frameworks_found = any(framework in str(css_links).lower() for framework in known_frameworks)
    if not css_frameworks_found:
        suggestions.append("No popular CSS frameworks detected. Consider using frameworks like Bootstrap or Tailwind CSS for responsive design and faster development.")

    return {
        "suggestions": suggestions,
        "h1_count": len(h1_tags),
        "h2_count": len(h2_tags),
        "h3_count": len(soup.find_all("h3")),
        "image_count": len(images),
        "missing_alt_count": missing_alt_count,
        "inline_style_count": len(inline_style_elements),
        "external_css_count": len(css_links),
        "style_tag_count": len(style_tags),
    }

@app.route('/fix-seo-css', methods=['POST'])
def fix_seo_css():
    data = request.get_json()
    html = data.get('html', '')
    if not html:
        return jsonify({"error": "HTML content is required."}), 400

    result = suggest_seo_css_fixes(html)

    if not result['suggestions']:
        return jsonify({
            "message": "No SEO or CSS issues found! 🎉",
            "summary": {
                "h1_count": result['h1_count'],
                "h2_count": result['h2_count'],
                "h3_count": result['h3_count'],
                "image_count": result['image_count'],
                "missing_alt_count": result['missing_alt_count'],
                "inline_style_count": result['inline_style_count'],
                "external_css_count": result['external_css_count'],
                "style_tag_count": result['style_tag_count'],
            }
        })
    else:
        return jsonify({
            "message": "Suggestions:",
            "suggestions": result['suggestions'],
            "summary": {
                "h1_count": result['h1_count'],
                "h2_count": result['h2_count'],
                "h3_count": result['h3_count'],
                "image_count": result['image_count'],
                "missing_alt_count": result['missing_alt_count'],
                "inline_style_count": result['inline_style_count'],
                "external_css_count": result['external_css_count'],
                "style_tag_count": result['style_tag_count'],
            }
        })

@app.route('/internal-links', methods=['POST'])
def internal_links():
    data = request.json.get('pages')
    if not data:
        return jsonify({"error": "Pages data required."}), 400
    result = suggest_internal_links(data)
    return jsonify(result)

@app.route('/predict-impact', methods=['POST'])
def predict_impact():
    issues = request.json.get('fixes')
    if not issues:
        return jsonify({"error": "Fixes list required."}), 400
    score = estimate_ranking_impact(issues)
    return jsonify({"predicted_ranking_improvement": f"{score}%"})

@app.route('/generate-alt-texts', methods=['POST'])
def generate_alt():
    images = request.json.get('images')
    if not images:
        return jsonify({"error": "Image descriptions required."}), 400
    alt_texts = generate_alt_texts(images)
    return jsonify({"generated_alts": alt_texts})

# New History endpoints
@app.route('/history', methods=['POST'])
def get_history():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    try:
        history = json.loads(user.history)
    except:
        history = []
    return jsonify({"history": history})

@app.route('/clear-history', methods=['POST'])
def clear_history():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    user.history = json.dumps([])
    db.session.commit()
    return jsonify({"message": "History cleared."})





import requests
import ssl

def check_ssl(url):
    try:
        hostname = url.replace("https://", "").replace("http://", "").split("/")[0]
        import socket
        ctx = ssl.create_default_context()
        with ctx.wrap_socket(socket.socket(), server_hostname=hostname) as s:
            s.settimeout(5)
            s.connect((hostname, 443))
            cert = s.getpeercert()
        return True, cert.get('notAfter', 'Unknown')
    except Exception:
        return False, None

def check_headers(url):
    try:
        resp = requests.get(url, timeout=7)
        headers = resp.headers
        good = []
        bad = []
        sec_headers = [
            "Strict-Transport-Security",
            "Content-Security-Policy",
            "X-Frame-Options",
            "X-Content-Type-Options",
            "Referrer-Policy",
            "Permissions-Policy",
        ]
        for h in sec_headers:
            if h in headers:
                good.append(h)
            else:
                bad.append(h)
        return good, bad
    except Exception:
        return [], ["Headers could not be checked"]

def check_cookies(url):
    try:
        resp = requests.get(url, timeout=7)
        cookies = resp.cookies
        risky = []
        for cookie in cookies:
            if not cookie.secure or not cookie.has_nonstandard_attr('HttpOnly'):
                risky.append(cookie.name)
        return risky
    except Exception:
        return ["Cookie scan failed"]

def check_privacy_policy(url):
    try:
        base = url.rstrip("/")
        for path in ["/privacy", "/privacy-policy", "/terms"]:
            r = requests.get(base + path, timeout=5)
            if r.status_code == 200 and ("privacy" in r.text.lower() or "policy" in r.text.lower()):
                return True
        return False
    except Exception:
        return False

@app.route('/api/security-check', methods=['POST'])
def security_check():
    data = request.get_json()
    url = data.get("url", "")
    if not url:
        return jsonify({"error": "URL required"}), 400

    score = 100
    checks = []
    tips = []

    # 1. SSL check
    ssl_ok, ssl_expiry = check_ssl(url)
    if ssl_ok:
        checks.append({"text": f"SSL is valid. Expiry: {ssl_expiry}", "ok": True})
    else:
        score -= 20
        checks.append({"text": "SSL is not valid or expired.", "ok": False})
        tips.append("Enable HTTPS and set up a valid SSL certificate.")

    # 2. Security headers
    good, bad = check_headers(url)
    if len(bad) == 0:
        checks.append({"text": "All important security headers set.", "ok": True})
    else:
        score -= len(bad) * 5
        checks.append({"text": f"Missing headers: {', '.join(bad)}", "ok": False})
        for h in bad:
            tips.append(f"Add security header: {h}")

    # 3. Cookie check
    risky_cookies = check_cookies(url)
    if risky_cookies and risky_cookies != ["Cookie scan failed"]:
        score -= 10
        checks.append({"text": f"Cookies not set securely: {', '.join(risky_cookies)}", "ok": False})
        tips.append("Set all cookies as Secure & HttpOnly.")
    elif risky_cookies == ["Cookie scan failed"]:
        checks.append({"text": "Cookies could not be scanned.", "ok": False})
    else:
        checks.append({"text": "All cookies are secure.", "ok": True})

    # 4. Privacy Policy
    if check_privacy_policy(url):
        checks.append({"text": "Privacy Policy found.", "ok": True})
    else:
        score -= 5
        checks.append({"text": "No privacy policy found.", "ok": False})
        tips.append("Add a privacy policy page to your site.")

    score = max(score, 0)
    return jsonify({"score": score, "checks": checks, "tips": tips})



if __name__ == "__main__":
    app.run(debug=True)

