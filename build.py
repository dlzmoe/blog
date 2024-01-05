import os
import httpx
import re
import urllib.parse
import datetime

def fetch_ci_time(filePath):
    entries = httpx.get("https://api.github.com/repos/98zi/hugo-blog/commits?path=" + filePath + "&page=1&per_page=1")
    return entries

if __name__ == "__main__":
  readmefile=open('README.md','w')
  readmefile.write("## hugo-blog\n\n使用 hugo 框架构建，在 GitHub 托管代码，Netlify 部署，CloudFlare 解析域名。\n\n评论使用的第三方程序 [twikoo](https://twikoo.js.org/)，依然部署在 netlify 上。\n\n文章数据保留版权，其他代码开源，可直接使用。\n\n将代码 clone 到本地，把 `/content/` 目录下的文章清除，并且修改 `config.yml` 配置。\n\n## 使用\n\n提前在本地安装好 hugo 环境，具体流程查阅官方文档。\n\n```shell\n\ngit clone https://github.com/98zi/hugo-blog.git\n\ncd hugo-blog\n\nhugo serve\n\nhugo\n\n```\n\n")

  for root, dirs, filenames in os.walk('./content/blog'):
    filenames = sorted(filenames, key=lambda x:float(re.findall("(\d+)",x)[0]), reverse=True)

  for index, name in enumerate(filenames):
      if name.endswith('.md'):
        filepath = urllib.parse.quote(name)
        oldTitle = name.split('.html')[0]
        url   = 'https://zishu.me/blog/' + oldTitle
        readmeMd= '* [{}]({})\n'.format(title, url)
        if index < 5 :
          modified = fetch_ci_time('/content/blog/' + filepath)

          recentMd= '* [{}]({}) - {}\n'.format(title, url, modified)
        readmefile.write(readmeMd)

  readmefile.close()