from flask import request, jsonify
from services.outpatient_department import OutpatientDepartment
from utils.storage_control import get_example_file, save_file, delete_file, convert_np_to_native

def perform_outpatient_department():
    req = request.get_json()
    try:
        file_path = ''
        if req['from_example']:
            file_info = get_example_file(req["file_num"])
            file_path=save_file(file_info["file_data"], file_info["file_name"], 'csv') 
            
        else:
            file_path = save_file(req["file_input_data"], req["file_name"], 'csv')
              
        outpatinet_department_data = OutpatientDepartment(file_path).get_result()
        
        delete_file(file_path)
        
        return jsonify({ "success": True, 'message': "Transformation has been done successfully", "result": convert_np_to_native(outpatinet_department_data) }), 200

    except Exception as e:
        print(e)
        return jsonify({ "success": False, "message": "Something went wrong!" }), 500

def apply_booking_system():
    req = request.get_json()
    try:
        file_path = ''
        if req['outpatient_dep']['from_example']:
            file_info = get_example_file(req['outpatient_dep']["file_num"])
            file_path = save_file(file_info["file_data"], file_info["file_name"], 'csv') 
            
        else:
            file_path = save_file(req['outpatient_dep']["file_input_data"], req['outpatient_dep']["file_name"], 'csv')
        
        
        booking_system_result = OutpatientDepartment(file_path).simulate_appointments_booking(int(req['booking_sys']['mean_patient_num']), float(req['booking_sys']['appointments_time']), float(req['booking_sys']['mean_interarrival_time']))
        
        delete_file(file_path)
        
        return jsonify({ "success": True, 'message': "Transformation has been done successfully", "result": convert_np_to_native(booking_system_result) }), 200

    
    except Exception as e:
        print(e)
        return jsonify({ "success": False, "message": "Something went wrong!" }), 500
    