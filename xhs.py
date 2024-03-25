import os
import requests
import xml.etree.ElementTree as ET
import json

# 获取 XML 链接数据
xml_url = 'https://rss-worker.zishu.me/rss/xiaohongshu/user/61d5b929000000001000ae07'
# xml_url = 'https://rss-worker.zishu.me/rss/telegram/channel/brccq'
response = requests.get(xml_url)
xml_data = response.text

# 解析 XML 数据为 ElementTree 对象
root = ET.fromstring(xml_data)

# 递归函数将 ElementTree 对象转换为 JSON 格式
def element_to_json(element):
    json_data = {}
    if element.attrib:
        json_data['@attributes'] = element.attrib
    if element.text:
        json_data['text'] = element.text
    for child in element:
        if child.tag in json_data:
            if not isinstance(json_data[child.tag], list):
                json_data[child.tag] = [json_data[child.tag]]
            json_data[child.tag].append(element_to_json(child))
        else:
            json_data[child.tag] = element_to_json(child)
    return json_data

json_data = element_to_json(root)

# 将 JSON 数据写入当前目录下的 data.json 文件
output_path = 'xhs.json'
with open(output_path, 'w') as json_file:
    json.dump(json_data, json_file, indent=4)

print(f'JSON 数据已写入{output_path}文件')