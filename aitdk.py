import os
import json
import markdown
from bs4 import BeautifulSoup
import openai
from dotenv import load_dotenv
import argparse

# 加载环境变量
load_dotenv()

def extract_text_from_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        md_content = file.read()
    
    html_content = markdown.markdown(md_content)
    soup = BeautifulSoup(html_content, 'html.parser')
    text_content = soup.get_text()
    
    return text_content

def generate_seo_content(text, api_key, api_url, model):
    openai.api_key = api_key
    if api_url:
        openai.api_base = api_url

    prompt = f"请根据文章内容从 SEO 友好的角度提取出标题、关键词和描述:\n\n{text}\n\n请以 JSON 格式输出，包含 slug、title、keywords 和 description 字段。"
    
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": "你是一个 SEO 专家，擅长提炼文章的核心内容并生成优化的元数据。"},
                {"role": "user", "content": prompt}
            ]
        )
        
        content = response.choices[0].message['content']
        print("API Response:", content)  # 调试输出
        return content
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        return None

def parse_seo_content(content):
    try:
        # 尝试直接解析 JSON
        return json.loads(content)
    except json.JSONDecodeError:
        # 如果直接解析失败，尝试提取 JSON 部分
        try:
            start = content.index('{')
            end = content.rindex('}') + 1
            json_str = content[start:end]
            return json.loads(json_str)
        except (ValueError, json.JSONDecodeError):
            print("无法解析 API 返回的内容为 JSON 格式")
            return None

def main(file_name, api_key, api_url, model):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, 'content', 'blog', file_name)
    
    if not os.path.exists(file_path):
        print(f"错误：文件 '{file_path}' 不存在。")
        return

    text_content = extract_text_from_markdown(file_path)
    seo_content = generate_seo_content(text_content, api_key, api_url, model)
    
    if seo_content:
        seo_data = parse_seo_content(seo_content)
        if seo_data:
            print(json.dumps(seo_data, ensure_ascii=False, indent=2))
        else:
            print("无法生成有效的 SEO 数据")
    else:
        print("生成 SEO 内容失败")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="从 Markdown 文件生成 SEO 内容")
    parser.add_argument("file_name", help="Markdown 文件名称 (位于 content/blog/目录下)")
    parser.add_argument("--api_key", default=os.getenv("OPENAI_API_KEY"), help="OpenAI API 密钥")
    parser.add_argument("--api_url", default=os.getenv("OPENAI_API_URL"), help="OpenAI API URL")
    parser.add_argument("--model", default=os.getenv("OPENAI_API_MODEL"), help="OpenAI 模型名称")
    
    args = parser.parse_args()

    if not args.api_key:
        print("错误：未提供 API 密钥。请在命令行参数中指定或在.env 文件中设置 OPENAI_API_KEY。")
    else:
        main(args.file_name, args.api_key, args.api_url, args.model)
