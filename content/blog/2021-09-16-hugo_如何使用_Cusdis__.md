---
slug: 77
title: hugo 如何使用 Cusdis ?
date: 2021-09-16 13:14:00
updated: 2021-12-01 14:25:53
categories: 
  - 技术
tags: 
  - 博客
---




Cusdis 是一个界面清爽、注重隐私的轻量级 (~5kb gzip) 评论系统，可以很方便地与 React、Vue 或其他博客系统结合，并且还提供了一个后台来管理所有的评论。

由于 Cusdis 自称是 Disqus 的替代方案，因此它还支持一键从 Disqus 导入、支持邮件通知等功能。

官方地址: [https://cusdis.com/](https://cusdis.com/)

他通常是用于静态博客的一个第三方评论系统，但是官方文档没有提供如何在 hugo 中使用的参数，我也是报错了多次才琢磨出来。

## 1. 本地部署

根据提示，注册账号，然后 `Add website` ，建立一个仓库。

进入它，然后点击 `setting`。

![](https://imgurl.zburu.com/images/2021/09/16/68aa68c985a8a9560645c60a98adad6f.png)

`Embed Code` 会提供几行代码以及一些 api,复制他们。

![](https://imgurl.zburu.com/images/2021/09/16/059b79361e36b23f0c4ee59f2d69a990.png)

`data-app-id` 是注册时自动生成的，注意保密，每个人都不一样。

```html
<div id="cusdis_thread"
  data-host="https://cusdis.com"
  data-app-id="xxxxxxxxx"
  data-page-id="{{ PAGE_ID }}"
  data-page-url="{{ PAGE_URL }}"
  data-page-title="{{ PAGE_TITLE }}"
></div>
<script async defer src="https://cusdis.com/js/cusdis.es.js"></script>
```

将这些代码复制到本地主题的 `comments.html` 文件内（就是评论的那个模块，每个主题或许都不一样，注意分辨）。

这个时候如果你 hugo server 基本都会报错，因为没有修改 `{{ PAGE_ID }}` 等内容，这不是 hugo 官方提供的参数，按照我下面的格式，将 id, url, title 重写一下即可。

```html
<div id="cusdis_thread"
  data-host="https://cusdis.com"
  data-app-id="c1d43485-e8a7-4895-972e-247eddaf242d"
  data-page-id="{{ .RelPermalink }}"
  data-page-url="{{ .RelPermalink }}"
  data-page-title="{{ .Title }}"
></div>
<script async defer src="https://cusdis.com/js/cusdis.es.js"></script>
```

保存重新 hugo server 即可。

>这样做的好处是当你接受一条评论信息后，审核列表可以清楚地标明来自哪一篇文章。通常大多数博客都提供了这么一个功能。

## 2. 邮箱提醒

除了必备的评论功能， Cusdis 还提供了一个非常快速的邮箱提醒功能，不需要绑定密匙，直接输入自己的邮箱即可。

先勾选这个 Email Notification，然后点击下方的 Advanced Notification Settings (高级通知设置)

![](https://imgurl.zburu.com/images/2021/09/16/75641c05cbe66afcbb4ffdfb79bb464e.png)

就可以进入设置，输入自己的邮箱。

![](https://imgurl.zburu.com/images/2021/09/16/a3d47cb11f1662d3894da79ead79d852.png)

## 3. 中文化

默认的评论和提示文字均为英文，对我们很不友好，这里提供一个不错的解决方案，在引入 Cusdis 之后，顺便复制引入下面这段代码。

```html
<script>
  window.CUSDIS_LOCALE = {
    "powered_by": "评论由 Cusdis 提供",
    "post_comment": "发送",
    "loading": "加载中",
    "email": "邮箱地址 (可选)",
    "nickname": "昵称",
    "reply_placeholder": "回复内容...",
    "reply_btn": "回复",
    "sending": "发送中...",
    "mod_badge": "管理员",
    "content_is_required": "内容不能为空",
    "nickname_is_required": "昵称不能为空",
    "comment_has_been_sent": "评论已发送，管理员审核通过后会展示"
  }
</script>
```

。。。