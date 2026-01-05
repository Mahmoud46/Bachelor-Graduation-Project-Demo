from flask import Blueprint, request, make_response, jsonify
from services.outpatient_department import OutpatientDepartment
from services.storage_control import get_example_file, save_file, delete_file, convert_np_to_native


booking_system_bp = Blueprint("booking_system_bp", __name__)

    
@booking_system_bp.route('/apply_booking_system',methods=['POST'])
def apply_booking_system():
    req = request.get_json()
    # print(req)
    file_path=''
    if req['outpatient_dep']['from_example']:
        file_info=get_example_file(req['outpatient_dep']["file_num"])
        file_path=save_file(file_info["file_data"],file_info["file_name"],'csv') 
        
    else:
        file_path=save_file(req['outpatient_dep']["file_input_data"],req['outpatient_dep']["file_name"],'csv')
    
    
    res=OutpatientDepartment(file_path).simulate_appointments_booking(int(req['booking_sys']['mean_patient_num']),float(req['booking_sys']['appointments_time']),float(req['booking_sys']['mean_interarrival_time']))
    
    delete_file(file_path)
        
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully","result":convert_np_to_native(res)}), 200)
    return res
