import json
import base64
import os
import pandas as pd
import numpy as np
from nanoid import generate
from config.paths import UPLOAD_DIR

def get_example_files_list():
    files_list = []
    with open('./db/example_files.json', 'r') as file:
        files_loaded = json.load(file)

    for file in files_loaded:
        files_list.append(file)
        
    return files_list
        
def get_example_file(file_num):
    example_files_list = get_example_files_list()
    for file in example_files_list:
        if file["file_num"] == file_num:
            return file
    return 

def save_file(file_data, file_name, file_type):
    file = base64.b64decode(file_data.split(',')[1])
    file_path = f'{UPLOAD_DIR}/{file_name}_{generate(size=5)}.{file_type}'
    with open(file_path, 'wb') as f:
        f.write(file)
    
    return file_path

def delete_file(file_path):
    os.remove(file_path)
    return 

def get_constants_files_list():
    files_list = []
    with open('./db/constants_tables.json', 'r') as file:
        files_loaded = json.load(file)

    for file in files_loaded:
        files_list.append(file)
        
    return files_list

def get_constants_tables():
    constants_tables_list = get_constants_files_list()
    tables_pd = []
    for table in constants_tables_list:
        file_path = save_file(table["file_data"], table["file_name"], 'csv')
        tables_pd.append(pd.read_csv(file_path))
        delete_file(file_path)
    
    return tables_pd

def excel_to_csv(xlsx_file_path):
    excel_sheets = pd.ExcelFile(xlsx_file_path)
    csv_files_paths = []
    for sheet_name in excel_sheets.sheet_names:
        file_path=f'{UPLOAD_DIR}/{generate()}.csv'
        csv_files_paths.append(file_path)
        pd.read_excel(xlsx_file_path,sheet_name=sheet_name).to_csv(file_path,index=False)
    excel_sheets.close()
    
    return csv_files_paths


def convert_np_to_native(obj):
    if isinstance(obj, np.int64):
        return int(obj)
    elif isinstance(obj, dict):
        return {key: convert_np_to_native(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_np_to_native(element) for element in obj]
    return obj


