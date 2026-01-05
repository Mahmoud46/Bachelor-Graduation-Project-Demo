from flask import Blueprint, request, make_response, jsonify
from services.outpatient_department import OutpatientDepartment
from services.storage_control import get_example_file, save_file, delete_file, convert_np_to_native


outpatient_department_bp = Blueprint("outpatient_department_bp", __name__)

@outpatient_department_bp.route('/apply_outpatient_department',methods=['POST'])
def apply_outpatient_department():
    req = request.get_json()
    
    file_path=''
    if req['from_example']:
        file_info=get_example_file(req["file_num"])
        file_path=save_file(file_info["file_data"],file_info["file_name"],'csv') 
        
    else:
        file_path=save_file(req["file_input_data"],req["file_name"],'csv')
    
    
    res=OutpatientDepartment(file_path).get_result()
    
    delete_file(file_path)
        
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully","result":convert_np_to_native(res)}), 200)
    return res
    