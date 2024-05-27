---
slug: 212
title: python 通过 json 生成小文件
date: "2023-11-10"
categories: 
  - 技术
tags:
  - python
  - json
---

记录一个方法，pyhton 通过 json 文件，在同级目录下生成对应格式的小文本。

```py
import json

def generate_files_from_json(json_file):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for item in data:
        for key, value in item.items():
            if isinstance(value, list):
                for sub_item in value:
                    for sub_key, sub_value in sub_item.items():
                        if isinstance(sub_value, dict) and 'list' in sub_value:
                            for sub_sub_item in sub_value['list']:
                                if 'id' in sub_sub_item and 'css' in sub_sub_item:
                                    id_value = sub_sub_item['id']
                                    css_value = sub_sub_item['css']
                                    create_file(id_value, css_value)

def create_file(file_name, content):
    file_path = f"{file_name}.css"
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

    print(f"File '{file_path}' created successfully.")

if __name__ == "__main__":
    json_file_path = 'your_json_file.json'
    generate_files_from_json(json_file_path)
```

```py
import json

def generate_files_from_json(json_file):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for item in data:
        for key, value in item.items():
            if isinstance(value, dict) and 'list' in value:
                for sub_item in value['list']:
                    if 'id' in sub_item and 'css' in sub_item:
                        id_value = sub_item['id']
                        css_value = sub_item['css']
                        create_file(id_value, css_value)

def create_file(file_name, content):
    file_path = f"{file_name}.css"
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

    print(f"File '{file_path}' created successfully.")

if __name__ == "__main__":
    json_file_path = 'your_json_file.json'
    generate_files_from_json(json_file_path)
```