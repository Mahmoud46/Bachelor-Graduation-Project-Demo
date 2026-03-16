from flask import Flask
from config.env import ENV
from routes.home import home_bp
from routes.auth import signup_bp, login_bp, logout_bp, reset_password_bp
from routes.services import control_charts_bp, outpatient_department_bp, booking_system_bp, entities_comparison_bp

app = Flask(__name__)

app.config['SECRET_KEY'] = ENV["JWT_SECRET"]

app.register_blueprint(home_bp)

app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(logout_bp)
app.register_blueprint(reset_password_bp)

app.register_blueprint(control_charts_bp)
app.register_blueprint(outpatient_department_bp)
app.register_blueprint(booking_system_bp)
app.register_blueprint(entities_comparison_bp)

if __name__ == "__main__":
    app.run(port=ENV["PORT"])
