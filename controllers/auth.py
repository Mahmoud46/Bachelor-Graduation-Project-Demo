from flask import jsonify, json, request, make_response
from utils.generate_token import generate_token
from models.User import User
import bcrypt
import re
from nanoid import generate

def signup():
    data = request.get_json()
    try:
        if not data or 'email' not in data or 'password' not in data or 'first_name' not in data or 'last_name' not in data: 
            return jsonify({ "success": False, "message": "Please provide all required fields." }), 400
        
        email = data['email']
        password = data['password']
        first_name = data['first_name']
        last_name = data['last_name']

        email_regex = r"^\S+@\S+\.\S+$"
        if not re.match(email_regex, email):
            return jsonify({ "success": False, "message": "Invalid email format." }), 400
        
        existing_user = User.find_by_email(email)
        if existing_user:
            return jsonify({ "success": False, "message": "Email already in use." }), 409
        
        # Generate 'salt'
        salt = bcrypt.gensalt(10)
        password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)

        new_user = User.insert(first_name, last_name, email, password_hash, f'{first_name.lower()}_{last_name.lower()}_{generate(size=5)}')

        if new_user:
            print(new_user)
            response = generate_token(new_user[0])
            response.set_data(json.dumps({
                "success": True,
                "message": "Account created successfully! Welcome aboard.",
            }))

            return response, 201

    except Exception as e:
        # Log the error internally, return generic error to client
        print(e)
        return jsonify({ "success": False,"message": "Server error during signup"}), 500

def login():
    data = request.get_json()
    
    try:
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({ "success": False, "message": "Please provide email and password" }), 400
        
        email = data['email']
        password = data['password']

        # Find user in database
        user = User.find_by_email(email)
        
        if not user:
            return jsonify({"success": False, "message": "Invalid email or password"}), 401

        # Verify password hash
        is_password_correct = bcrypt.checkpw(password.encode('utf-8'), user[4])

        if not is_password_correct:
            return jsonify({"success": False, "message": "Invalid email or password"}), 401
        
        response = generate_token(user[0])

        response.set_data(json.dumps({
            "success": True,
            "message": f"Welcome back, {user[1]}",
        }))
        return response, 200
        
            
    except Exception as e:
        print(e)
        return jsonify({ "success": False,"message": "Server error during login"}), 500
    
def logout():
    try:
        # Create a JSON response
        response = make_response(jsonify({"message": "Logged out successfully"}))
        
        # Clear the 'jwt' cookie
        # Setting max_age=0 tells the browser to delete the cookie immediately
        response.set_cookie(
            'jwt',
            "",
            httponly=True,
            secure=True, # Set to False for local non-HTTPS dev
            samesite='Strict',
            max_age=0 
        )
        
        return response, 200
        
    except Exception as e:
        print(e)
        return jsonify({ "success": False,"message": "Server error during logout"}), 500

def reset_password():
    data = request.get_json()
    print(data)
    try:
        if not data or 'email' not in data or 'new_password' not in data:
            return jsonify({ "success": False, "message": "Please provide email and password" }), 400
        
        email = data['email']
        new_password = data['new_password']

        # Find user in database
        user = User.find_by_email(email)
        
        if not user:
            return jsonify({"success": False, "message": "User not found"}), 404
        
        # Generate 'salt'
        salt = bcrypt.gensalt(10)
        new_password_hash = bcrypt.hashpw(new_password.encode('utf-8'), salt)

        updated_user = User.update(user[0], password_hash=new_password_hash)
        print(updated_user)
        return jsonify({ "success": True, "message": "Password updated successfully!" }), 2


    except Exception as e:
        print(e)
        return jsonify({ "success": False,"message": "Server error during reset password"}), 500