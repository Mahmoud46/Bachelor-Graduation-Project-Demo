from flask import  Blueprint, make_response, jsonify, request
from services.user_login import login_validate
from services.user_signup import user_regestration
from services.user_data_control import reset_user_password

sign_bp = Blueprint("sign_bp", __name__)

@sign_bp.route('/user_login_signup', methods=['POST'])
def user_login_signup():
    req = request.get_json()
    user_req_res={}
    
    if req['login_flag']:
        user_req_res=login_validate(req)
        
    elif req['sign_up_flag']:   
        user_req_res=user_regestration(req)
                    
    elif req['reset_password_flag']:
        user_req_res=reset_user_password(req['email'],req['new_pswrd']) 
        
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully","user_req_res":user_req_res}), 200)
    return res



