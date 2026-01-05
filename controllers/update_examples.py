from flask import  Blueprint, make_response, jsonify, request
from services.storage_control import add_file_to_example_files

update_examples_bp = Blueprint("update_examples_bp", __name__)



@update_examples_bp.route('/update_example_files',methods=['POST'])
def update_examples():
    req = request.get_json()
    add_file_to_example_files(req)
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully"}), 200)
    return res