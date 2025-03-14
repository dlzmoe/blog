import os
import re
import argparse

def filter_markdown_images(content):
    """
    过滤 Markdown 中的图片标签，移除 [] 中的内容
    将 ![任意内容](链接) 替换为 ![](链接)
    """
    pattern = r'!\[(.*?)\]\((.*?)\)'
    replacement = r'![]\(\2\)'
    return re.sub(pattern, replacement, content)

def process_file(file_path):
    """处理单个 Markdown 文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # 过滤图片标签
        filtered_content = filter_markdown_images(content)
        
        # 如果内容有变化，则写回文件
        if content != filtered_content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(filtered_content)
            print(f"已处理：{file_path}")
        else:
            print(f"无需修改：{file_path}")
    except Exception as e:
        print(f"处理文件 {file_path} 时出错：{e}")

def process_directory(directory):
    """处理目录下所有的 Markdown 文件"""
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.md'):
                file_path = os.path.join(root, file)
                process_file(file_path)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='过滤 Markdown 文件中的图片标签')
    parser.add_argument('path', help='Markdown 文件或包含 Markdown 文件的目录路径')
    
    args = parser.parse_args()
    path = args.path
    
    if os.path.isfile(path) and path.lower().endswith('.md'):
        process_file(path)
    elif os.path.isdir(path):
        process_directory(path)
    else:
        print("请提供有效的 Markdown 文件或目录路径")

