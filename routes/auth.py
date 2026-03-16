from flask import Blueprint
from controllers.auth import signup, login, logout, reset_password

# Blueprints
signup_bp = Blueprint("signup_bp", __name__)

login_bp = Blueprint("login_bp", __name__)

logout_bp = Blueprint("logout_bp", __name__)

reset_password_bp = Blueprint("reset_password_bp", __name__)

# Routes
@signup_bp.route('/api/auth/signup', methods=['POST'])
def auth_signup():
    return signup()

@login_bp.route('/api/auth/login', methods=['POST'])
def auth_login():
    return login()

@logout_bp.route('/api/auth/logout', methods=['POST'])
def auth_logout():
    return logout()

@reset_password_bp.route('/api/auth/reset_password', methods=['PUT'])
def auth_reset_password():
    return reset_password()