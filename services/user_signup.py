from services.user_data_control import check_user_db_by_email, save_new_user
from services.storage_control import generate_random_number_codes


def regestration_validation(reg_data):
    return not check_user_db_by_email(reg_data['email'])

def user_regestration(reg_data):
    if not check_user_db_by_email(reg_data['email']):
        username=create_username(reg_data["fst_name"],reg_data["lst_name"])
        save_new_user(reg_data,username)
        return {'user_reg':True,'username':username}
    else: return {'user_reg':False,'username':''}

def create_username(fst_name,lst_name):
    return f"{fst_name.lower()}.{lst_name.lower()}.{generate_random_number_codes(19)}"
