## hugo-blog

![](https://img.shields.io/github/last-commit/98zi/hugo-blog)
![](https://img.shields.io/github/commit-activity/t/98zi/hugo-blog)
![](https://img.shields.io/github/forks/98zi/hugo-blog?style=flat)
![](https://img.shields.io/github/stars/98zi/hugo-blog?style=flat)
![](https://img.shields.io/github/license/98zi/hugo-blog)

- 源码查看：https://github.com/98zi/hugo-blog
- 在线预览：https://zishu.me

使用 hugo 框架构建，在 GitHub 托管代码，Netlify 部署，CloudFlare 解析域名。

评论使用的第三方程序 [twikoo](https://twikoo.js.org/)，依然部署在 netlify 上。

文章数据保留版权，其他代码开源，可直接使用。

## 使用

### 1.安装博客

将代码 clone 到本地，把 `/content/` 目录下的文章清除，并且修改 `config.yml` 配置。

**提前在本地安装好 hugo 环境，具体流程查阅官方文档。**

```shell
git clone https://github.com/98zi/hugo-blog.git
cd hugo-blog
hugo serve
hugo
```

### 2.生成文章目录

**自动生成 md 文件，存放文章目录。**

```
py github-toc.py
```

### 3.设置不想在首页显示的分类

设置不想在首页显示的分类，`7` 表示过滤完还显示 7 条，如果不写的话，可能会设置的数量。

```html
<!-- /layouts/index.html -->
{{ if and (not (in .Params.categories "weekly")) (lt $count 7) }}
```

## LICENSE

开源协议：[Apache-2.0 license](./LICENSE)
