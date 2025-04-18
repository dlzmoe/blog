<h2 align="center"> Zishu's Blog </h2>
<p align="center"> A front-end development engineer who loves life.</p>

[Online access](https://zishu.me)

<p align="center">
<img src="https://img.shields.io/github/last-commit/dlzmoe/blog">
<img src="https://img.shields.io/github/commit-activity/t/dlzmoe/blog">
<img src="https://img.shields.io/github/forks/dlzmoe/blog?style=flat">
<img src="https://img.shields.io/github/stars/dlzmoe/blog?style=flat">
<img src="https://img.shields.io/github/license/dlzmoe/blog">
</p>

---

![Visitor Count](https://profile-counter.glitch.me/zishu_me/count.svg)

```shell
hugo: 0.146.5
```

**Introduce OpenAI to refine article TDK and customize API information.**

```shell
# Install dependencies
pip install markdown beautifulsoup4 openai==0.28 python-dotenv
```

```shell
# Use, directly copy the file name
python aitdk.py xxx.md
```

## 1.Introduction

Built with the Hugo framework, code hosted on GitHub, deployed via Netlify, and domain resolved by CloudFlare.

Comments are powered by [giscus](https://giscus.app/), built on Discussions.

Blog post data retains copyright, while other code is open source and can be used directly.

* [/content](content) Blog post data
* [/themes](themes) Blog theme folder, multi-theme


## 2.Run a blog

This is a project generated using the Hugo open-source static blog framework. Before running this project, you need to install the Go and [Hugo](https://gohugo.io/documentation/) environment on your computer.

Clone the code to your local machine, clear the articles in the `/content/` directory, and modify the `config.yml` configuration.

```shell
# Download the project source code
git clone https://github.com/dlzmoe/blog.git
# Run locally
hugo serve
# Package build
hugo
```

You can deploy code uploaded to a GitHub repository via Netlify.

## 3.Contact me

If you have any questions, suggestions, or other concerns regarding the blog content, layout, or anything else, feel free to contact me!

- E-mail: hi@zishu.me
- Message: https://zishu.me/message/

## 4.LICENSE

Open Source License: [Apache-2.0 license](LICENSE)
