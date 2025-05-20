from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    # Increase the size of the password column to accommodate hashed passwords (e.g., SHA256)
    password = db.Column(db.String(255), nullable=False)  # Increased length for hashed passwords
