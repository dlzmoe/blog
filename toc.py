import os
import re

def extract_slug(file_content):
    # 使用正则表达式提取 Front Matter 中的 slug
    match = re.search(r'^---\nslug: (\d+)', file_content, re.MULTILINE)
    if match:
        slug = match.group(1)
        return slug
    else:
        return None

def process_md_files(folder_path):
    # 获取文件夹下的所有 Markdown 文件
    md_files = [f for f in os.listdir(folder_path) if f.endswith('.md')]

    # 用于存储输出的文本
    output_text = []

    # 遍历每个 Markdown 文件并提取 slug 信息
    for md_file in md_files:
        # 过滤掉文件名的 .md 后缀
        file_name = os.path.splitext(md_file)[0]
        md_file_path = os.path.join(folder_path, md_file)

        with open(md_file_path, 'r', encoding='utf-8') as file:
            file_content = file.read()

        slug = extract_slug(file_content)

        # 将格式化的文本添加到输出列表中
        if slug is not None:
            # output_text.append(f'- [{file_name}](https://zishu.me/blog/{slug}.html/)')
            output_text.append(f'- [{file_name}](./content/blog/{file_name}.md)')

    # 获取当前工作目录并将输出文本写入到 toc.md 文件，以倒序方式
    current_directory = os.getcwd()
    output_file_path = os.path.join(current_directory, 'toc.md')
    with open(output_file_path, 'w', encoding='utf-8') as output_file:
        # 添加标题
        output_file.write("## 文章归档目录\n\n")
        # 写入输出文本
        for line in reversed(output_text):
            output_file.write(line + '\n')

if __name__ == "__main__":
    folder_path = "content/blog"  # 替换为你的相对文件夹路径
    process_md_files(folder_path)
