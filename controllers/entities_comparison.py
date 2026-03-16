from flask import request, jsonify
from services.entities_comparison.data_comparison import EntitiesComparison
from utils.storage_control import get_example_file, save_file, delete_file, excel_to_csv

def apply_entities_comparison():
    req = request.get_json()
    try:
        file_path = ''
        if req['from_example']:
            file_info = get_example_file(req["file_num"])
            file_path = save_file(file_info["file_data"], file_info["file_name"], 'xlsx') 
            
        else:
            file_path = save_file(req["file_input_data"], req["file_name"], 'xlsx')
        
        data_io_paths = excel_to_csv(file_path)
        
        entities_comparison_result = EntitiesComparison(data_io_paths[0], data_io_paths[1]).get_result()
        
        for data_io_path in data_io_paths:
            delete_file(data_io_path)
            
        delete_file(file_path)

        return jsonify({ "success": True, 'message': "Transformation has been done successfully", "result": entities_comparison_result })
    
    except Exception as e:
        print(e)
        return jsonify({ "success": False, "message": "Something went wrong!" }), 500
    