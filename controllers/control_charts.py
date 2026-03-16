from flask import request, jsonify
from utils.storage_control import get_example_file, save_file, delete_file
from services.control_charts.control_charts import ControlCharts

def apply_control_charts():
    req = request.get_json()
    try:
        file_path = ''

        if req['from_example']:
            file_info = get_example_file(req["file_num"])
            file_path = save_file(file_info["file_data"], file_info["file_name"], 'csv') 
            
        else:
            file_path = save_file(req["file_input_data"], req["file_name"], 'csv')
        
        
        control_charts_result = ControlCharts(file_path).apply_control_char()
        
        delete_file(file_path)

        return jsonify({ "success": True, 'message': "Transformation has been done successfully", "result": control_charts_result }), 200

        
    except Exception as e:
        print(e)
        return jsonify({ "success": False, "message": "Something went wrong!" }), 500
    