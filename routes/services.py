from flask import Blueprint
from middlewares.auth import protected_route
from controllers.control_charts import apply_control_charts
from controllers.outpatient_department import perform_outpatient_department, apply_booking_system
from controllers.entities_comparison import apply_entities_comparison

# Blueprints
control_charts_bp = Blueprint("control_charts_bp", __name__)
outpatient_department_bp = Blueprint("outpatient_department_bp", __name__)
booking_system_bp = Blueprint("booking_system_bp", __name__)
entities_comparison_bp = Blueprint("entities_comparison_bp", __name__)


# Routes
@control_charts_bp.route('/api/control_charts',methods=['POST'])
@protected_route
def control_charts():
    return apply_control_charts()

@outpatient_department_bp.route('/api/outpatient_department',methods=['POST'])
@protected_route
def outpatient_department():
    return perform_outpatient_department()


@booking_system_bp.route('/api/booking_system',methods=['POST'])
@protected_route
def booking_system():
    return apply_booking_system()

@entities_comparison_bp.route('/api/entities_comparison',methods=['POST'])
@protected_route
def entities_comparison():
    return apply_entities_comparison()