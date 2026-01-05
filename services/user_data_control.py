import json

def check_user_db_by_email(email):
    with open('./db/users.json', 'r') as file:
        data_loaded = json.load(file)
    
    for user in data_loaded:
        if(user['email']==email): return True

    return False

def get_user_data_by_email_and_password(email,password):
    with open('./db/users.json', 'r') as file:
        data_loaded = json.load(file)
    
    for user in data_loaded:
        if(user['email']==email and user['pswrd']==password): return [True,user]

    return [False,{}]

def save_new_user(user_info,username):
    new_user=create_new_user(user_info,username)
    data_list=get_data_storage()
    data_list.append(new_user)
    update_data_storage(data_list)
    return


def create_new_user(user_info,username):
    return {
        "fst_name": user_info['fst_name'],
        "lst_name": user_info['lst_name'],
        "email": user_info['email'],
        "pswrd": user_info['pswrd'],
        "username": username,
    }

def get_data_storage():
    data_list=[]
    with open('./db/users.json', 'r') as file:
        data_loaded = json.load(file)

    for user in data_loaded:
        data_list.append(user)
    return data_list

def update_data_storage(data_list):
    with open('./db/users.json', 'w') as file:
        json.dump(data_list, file, indent=4)

def get_user_data_by_username(username):
    data_list=get_data_storage()
    for user in data_list:
        if user['username']==username:
            return user
    return {}

def reset_user_password(email,new_password):
    if check_user_db_by_email(email):
        change_user_password(email,new_password)
        return {"reset_password_stat":True}
    return {"reset_password_stat":False}

def change_user_password(email,new_password):
    data_list=get_data_storage()
    for user in data_list:
        if user['email']==email:
            user['pswrd']=new_password
    update_data_storage(data_list)
    
    