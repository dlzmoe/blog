---
slug: 239
title: Python + GPT 自动翻译 README 文档
date: 2024-09-09
categories: 
  - 技术
tags: 
  - Python
  - GPT

---

在开发个人项目时，写 README 文件一直是一件很头疼的事情，所幸辛苦写完了，想做个多语言版本更头疼，为了解决整个痛点，写了个 python + GPT 脚本，将这一切自动化处理了。

源码：https://github.com/dlzmoe/translate-README

在根目录下新建俩文件 `.env` 和 `translate_md.py`：

```shell
OPENAI_URL=https://api.openai.com/v1/chat/completions
API_KEY=your_api_key_here
MODEL=gpt-4o-mini
INPUT_FILE=README.md
OUTPUT_FILE=README_EN.md
TARGET_LANGUAGE=en
```

个人是比较喜欢 `gpt-4o-mini` 这个模型，功能足够覆盖我日常使用，生成速度快，对 token 的消耗也比较低，作图生文、理解性也都是前排水平。

```python
# translate_md.py
import os
import requests
from dotenv import load_dotenv

# 加载 .env 文件中的环境变量
load_dotenv()

# 配置选项
OPENAI_URL = os.getenv("OPENAI_URL")
API_KEY = os.getenv("API_KEY")
MODEL = os.getenv("MODEL")
INPUT_FILE = os.getenv("INPUT_FILE")
OUTPUT_FILE = os.getenv("OUTPUT_FILE")
TARGET_LANGUAGE = os.getenv("TARGET_LANGUAGE")

def read_markdown_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def write_markdown_file(file_path, content):
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def translate_text(text):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    prompt = f"Translate the following text to {TARGET_LANGUAGE} Markdown syntax is not preserved :\n\n{text}"
    
    data = {
        "model": MODEL,
        "messages": [{"role": "user", "content": prompt}]
    }
    
    response = requests.post(OPENAI_URL, headers=headers, json=data)
    
    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content']
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

def main():
    if not os.path.exists(INPUT_FILE):
        print(f"Input file {INPUT_FILE} does not exist.")
        return
    
    # 读取 Markdown 文件
    markdown_content = read_markdown_file(INPUT_FILE)
    
    # 去除头尾的 ``` 语法
    # 这里假设 markdown_content 的开头和结尾没有其他内容，只是代码块
    if markdown_content.startswith('```'):
        markdown_content = markdown_content[3:].strip()
    if markdown_content.endswith('```'):
        markdown_content = markdown_content[:-3].strip()
    
    # 翻译文本
    translated_content = translate_text(markdown_content)
    
    if translated_content:
        # 写入翻译后的内容到输出文件
        write_markdown_file(OUTPUT_FILE, translated_content)
        print(f"Translation completed. Output saved to {OUTPUT_FILE}.")
    else:
        print("Translation failed.")

if __name__ == "__main__":
    main()
```

文件创建完成后安装一下依赖：

```shell
pip install requests
pip install python-dotenv
```

直接运行即可：

```shell
py translate_md.py
```
