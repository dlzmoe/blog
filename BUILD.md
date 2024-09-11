## 1.介绍

使用 Hugo 框架构建，在 GitHub 托管代码，Netlify 部署，CloudFlare 解析域名。

评论使用 [giscus](https://giscus.app/)，基于 Discussions 构建而成。

博客文章数据保留版权，其他代码开源，可直接使用。

* [/content](./content/)：博客文章数据
* [/themes](./themes/)：博客主题文件夹，多主题


## 2.运行博客

这是一个基于 Hugo 开源静态博客程序生成的项目，在运行本项目前，需要在你电脑中安装 Go 和 [Hugo](https://gohugo.io/documentation/) 环境。

将代码 clone 到本地，把 `/content/` 目录下的文章清除，并且修改 `config.yml` 配置。

```shell
# 下载项目源码
git clone https://github.com/dlzmoe/blog.git
# 本地运行
hugo serve
# 打包构建
hugo
```

可以通过 Netlify 部署上传到 GitHub 仓库的代码。


## 3.插件脚本

**1. 自动生成 md 文件，备份文章目录。**

```shell
py toc.py
```

## 4.联系我

如对博客内容，排版等有疑问、建议或者其他问题，欢迎联系我！

- 邮箱：anghunk@gmail.com
- 留言：https://zishu.me/message/


## 5.Star History

[![Star History Chart](https://api.star-history.com/svg?repos=dlzmoe/blog&type=Date)](https://star-history.com/#dlzmoe/blog&Date)


## 6.LICENSE

开源协议：[Apache-2.0 license](./LICENSE)
