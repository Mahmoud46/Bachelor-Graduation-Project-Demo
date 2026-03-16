from flask import render_template, request
from models.User import User
import jwt
from config.env import ENV

def home():
    token = request.cookies.get('jwt')
    # print(token)
    # print(ENV["JWT_SECRET"])
    if not token:
        return render_template("index.html")
    # Verify token
    payload = jwt.decode(token.encode('utf-8'), ENV["JWT_SECRET"], algorithms=["HS256"])
    user_id = payload.get("sub")
    # Assuming an ORM like Flask-MongoEngine or similar
    user = User.find_by_id(user_id)
    if not user:
        return render_template("index.html")
            
    return render_template("dashboard.html", user={"id":user[0], "first_name":user[1], "last_name":user[2], "email":user[3], "username":user[5]})