from flask import Blueprint, request, make_response, jsonify
from services.storage_control import get_example_file, save_file, delete_file
from services.control_charts.control_charts import ControlCharts

control_charts_bp = Blueprint("control_charts_bp", __name__)

@control_charts_bp.route('/apply_control_charts',methods=['POST'])
def apply_control_charts():
    req = request.get_json()
    file_path=''
    if req['from_example']:
        file_info=get_example_file(req["file_num"])
        file_path=save_file(file_info["file_data"],file_info["file_name"],'csv') 
        
    else:
        file_path=save_file(req["file_input_data"],req["file_name"],'csv')
    
    
    res=ControlCharts(file_path).apply_control_char()
    
    delete_file(file_path)
        
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully","result":res}), 200)
    return res
    