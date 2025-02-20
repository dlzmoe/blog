---
slug: 251
title: Cloudflare 上部署 Twikoo 服务时报错
date: 2025-02-20
categories:
  - 技术
tags:
  - cloudflare
  - twikoo
---

GitHub: https://github.com/twikoojs/twikoo-cloudflare

Twikoo 支持通过 Cloudflare Workers 进行部署服务和数据库，GitHub 仓库地址如上。

但是部署文档中有一点小坑需要注意一下，官方没有进行标注，我不清楚是只有我遇到这个问题还是怎么样，记录下来以防有其他人遇到这个问题，在搜索引擎可以看到这篇文章而解决。

![1740030986550](https://imgurl.zishu.me/2025/02/1740030986550.webp)

> 由于 Cloudflare Workers 的免费套餐对捆绑包大小有严格的 1MiB 限制，因此我们需要手动删除一些包以使捆绑包保持在限制范围内。由于 Cloudflare 工作线程的 Node.js 兼容性问题，这些包无论如何都无法使用。

因为上面那个问题，所以需要把这几个文件清空，（不能删除会报错），但是这个指令存在问题，会把文件格式转为 `utf-16`，如果不处理它的话就会导致最后部署的时候报错，如下图所示。

![1740031220577](https://imgurl.zishu.me/2025/02/1740031220577.webp)

解决方法也很简单，只需要在 vscode 中找到这三个文件。

把编码格式改为 `utf-8`，然后清空乱码即可。

![1740031930681](https://imgurl.zishu.me/2025/02/1740031930681.webp)
