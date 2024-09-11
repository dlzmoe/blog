import os
import re

def extract_slug_and_title(file_content):
    # 使用正则表达式提取 Front Matter 中的 slug 和 title
    slug_match = re.search(r'^---\nslug: (.+?)\n', file_content, re.MULTILINE)
    title_match = re.search(r'^---\n.*?\ntitle: (.+?)\n', file_content, re.MULTILINE)
    
    slug = slug_match.group(1).strip() if slug_match else None
    title = title_match.group(1).strip() if title_match else None

    return slug, title

def update_readme(output_text, section):
    # 读取现有 README.md 文件内容
    with open("README.md", "r", encoding="utf-8") as readme_file:
        readme_content = readme_file.read()

    # 在指定位置插入新内容
    new_readme_content = re.sub(
        rf'<!-- {section} -->.*<!-- {section} -->',
        f'<!-- {section} -->\n{output_text}\n<!-- {section} -->',
        readme_content,
        flags=re.DOTALL
    )

    # 更新 README.md
    with open("README.md", "w", encoding="utf-8") as readme_file:
        readme_file.write(new_readme_content)

def process_md_files(folder_path):
    # 获取文件夹下的所有 Markdown 文件
    md_files = [f for f in os.listdir(folder_path) if f.endswith('.md')]
    file_paths = [os.path.join(folder_path, f) for f in md_files]

    # 用于存储 slug 和 title 信息
    extracted_data = []

    # 遍历 Markdown 文件并提取 slug 和 title 信息
    for md_file_path in file_paths:
        with open(md_file_path, 'r', encoding='utf-8') as file:
            file_content = file.read()

        slug, title = extract_slug_and_title(file_content)

        # 将提取出的 slug 和 title 添加到列表中
        if slug and title and slug.startswith("weekly-"):
            extracted_data.append((slug, title))

    # 按 slug 数字部分排序并取最大的
    extracted_data.sort(key=lambda x: int(x[0].split('-')[1]), reverse=True)

    # 将格式化的文本添加到输出列表中
    output_text = [f'- [{title}](https://zishu.me/blog/{slug}.html/)' for slug, title in extracted_data]

    # 将输出文本连接为字符串
    output_text_str = "\n".join(output_text)

    # 更新 README.md
    update_readme(output_text_str, "WEEKLY")

if __name__ == "__main__":
    folder_path = "content/blog"  # 替换为你的相对文件夹路径
    process_md_files(folder_path)
