


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from models.user import db, User
# from utils.seo_scraper import scrape_seo_data
# from utils.image_checker import analyze_images
# import re

# app = Flask(__name__)
# CORS(app)

# # Database Config
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
# db.init_app(app)

# # ✅ Create tables at app startup using app context
# with app.app_context():
#     print("Creating tables on startup...")
#     db.create_all()

# # --- Input Validation ---
# def is_valid_url(url):
#     regex = re.compile(
#         r'^(?:http|ftp)s?://'  # http:// or https://
#         r'(?:(?:[A-Z0-9-]+\.)+[A-Z]{2,6})'  # domain...
#         r'(?:/?|[/?]\S+)$', re.IGNORECASE)
#     return re.match(regex, url) is not None

# @app.route('/register', methods=['POST'])
# def register():
#     data = request.json
#     if not data['email'] or not data['password']:
#         return jsonify({"error": "Email and password required."}), 400

#     if User.query.filter_by(email=data['email']).first():
#         return jsonify({"error": "User already exists."}), 409

#     user = User(email=data['email'], password=data['password'])
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({"message": "User registered successfully."}), 201

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     user = User.query.filter_by(email=data['email'], password=data['password']).first()
#     if user:
#         return jsonify({"message": "Login successful."}), 200
#     else:
#         return jsonify({"error": "Invalid credentials."}), 401

# @app.route('/analyze-seo', methods=['POST'])
# def analyze_seo():
#     url = request.json.get('url')
#     if not is_valid_url(url):
#         return jsonify({"error": "Invalid URL."}), 400
#     result = scrape_seo_data(url)
#     return jsonify(result)

# @app.route('/analyze-images', methods=['POST'])
# def analyze_images_route():
#     url = request.json.get('url')
#     if not is_valid_url(url):
#         return jsonify({"error": "Invalid URL."}), 400
#     result = analyze_images(url)
#     return jsonify(result)

# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
from models.user import db, User
from utils.seo_scraper import scrape_seo_data
from utils.image_checker import analyze_images
import re
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = 'your-secret-key'  # Secret key for generating tokens
db.init_app(app)

# ✅ Create tables at app startup using app context
with app.app_context():
    print("Creating tables on startup...")
    db.create_all()

# --- Input Validation ---
def is_valid_url(url):
    regex = re.compile(
        r'^(?:http|ftp)s?://'  # http:// or https://
        r'(?:(?:[A-Z0-9-]+\.)+[A-Z]{2,6})'  # domain...
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, url) is not None

# --- Routes ---
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data['email'] or not data['password']:
        return jsonify({"error": "Email and password required."}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "User already exists."}), 409

    hashed_password = generate_password_hash(data['password'], method='sha256')
    user = User(email=data['email'], password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully."}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login successful."}), 200
    else:
        return jsonify({"error": "Invalid credentials."}), 401

# --- Additional Routes for SEO and Image Analysis ---
@app.route('/analyze-seo', methods=['POST'])
def analyze_seo():
    url = request.json.get('url')
    if not is_valid_url(url):
        return jsonify({"error": "Invalid URL."}), 400
    result = scrape_seo_data(url)
    return jsonify(result)

@app.route('/analyze-images', methods=['POST'])
def analyze_images_route():
    url = request.json.get('url')
    if not is_valid_url(url):
        return jsonify({"error": "Invalid URL."}), 400
    result = analyze_images(url)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
