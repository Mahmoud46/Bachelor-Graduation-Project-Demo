from flask import Flask

from controllers.home import home_bp
from controllers.sign import sign_bp
from controllers.user import user_bp
from controllers.user_data import user_data_bp
from controllers.update_examples import update_examples_bp
from controllers.control_charts import control_charts_bp
from controllers.hospitals_comparison import hospitals_comparison_bp
from controllers.outpatient_department import outpatient_department_bp
from controllers.booking_system import booking_system_bp

app = Flask(__name__)

app.register_blueprint(home_bp)
app.register_blueprint(sign_bp)
app.register_blueprint(user_bp)
app.register_blueprint(user_data_bp)
app.register_blueprint(update_examples_bp)
app.register_blueprint(control_charts_bp)
app.register_blueprint(hospitals_comparison_bp)
app.register_blueprint(outpatient_department_bp)
app.register_blueprint(booking_system_bp)

if __name__ == "__main__":
    app.run()
