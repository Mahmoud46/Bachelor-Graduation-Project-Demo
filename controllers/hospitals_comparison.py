from flask import Blueprint, request, make_response, jsonify
from services.entities_comparison.data_comparison import EntitiesComparison
from services.storage_control import get_example_file, save_file, delete_file, excel_to_csv


hospitals_comparison_bp = Blueprint("hospitals_comparison_bp", __name__)

@hospitals_comparison_bp.route('/apply_hospitals_comparison',methods=['POST'])
def apply_hospitals_comparison():
    req = request.get_json()
    file_path=''
    if req['from_example']:
        file_info=get_example_file(req["file_num"])
        file_path=save_file(file_info["file_data"],file_info["file_name"],'xlsx') 
        
    else:
        file_path=save_file(req["file_input_data"],req["file_name"],'xlsx')
    
    data_io_paths=excel_to_csv(file_path)
    
    res=EntitiesComparison(data_io_paths[0],data_io_paths[1]).get_result()
    
    print(file_path)
    
    for data_io_path in data_io_paths:
        delete_file(data_io_path)
        
    delete_file(file_path)
    
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully","result":res}), 200)
    return res
