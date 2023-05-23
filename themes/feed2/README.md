<p align="center">
  <a href="https://github.com/lovezsh/hugo-theme-Reader/">
    <img src="images/logo.png" alt="Logo" width="300">
  </a>
  <p align="center">
   一款简单的、易于阅读的 hugo 主题，集成了多种功能。
    <br />
    <a href="https://github.com/lovezsh/hugo-theme-Reader"><strong>探索本项目的文档 »</strong></a>
    <br />
    <br />
    <a href="https://zburu.com" target="_blank">查看Demo</a>
    ·
    <a href="https://github.com/lovezsh/hugo-theme-Reader/issues">报告Bug</a>
    ·
    <a href="https://github.com/lovezsh/hugo-theme-Reader/issues">提出新特性</a>
  </p>

</p>

本篇 README.md 面向主题使用者和开发者，欢迎使用和提交 pr.


新增：
- [x] 图片灯箱
- [x] 文章目录
- [x] 文章搜索 
 
### 目录

- [目录](#目录)
- [上手指南](#上手指南)
- [文件目录说明](#文件目录说明)
- [配置](#配置)
- [贡献者](#贡献者)
  - [如何参与本项目](#如何参与本项目)
- [作者](#作者)
- [版权说明](#版权说明)

### 上手指南

```shell
git clone git@github.com:lovezsh/hugo-theme-Reader.git themes/Reader
```

修改 `config.toml`:

```
theme = "Reader"
```

注意：`/content` 文件夹下文章文件夹名要改成 `/blog`，不然会出现不可预知的错误。详情看 `/exampleSite` 示例。

### 文件目录说明
eg:

```shell
+---archetypes
+---exampleSite
|   +---content
|   +---layouts
|   \---static
+---layouts
|   +---partials
|   \---_default
\---static
    +---css
    +---fonts
    +---images
    +---js
```

### 配置 

1. 第三方评论使用 artalk.

3. `config.toml` 完整配置文件

[config.toml](./exampleSite/config.toml)


### 贡献者

请阅读**CONTRIBUTING.md** 查阅为该项目做出贡献的开发者。

#### 如何参与本项目

贡献使开源社区成为一个学习、激励和创造的绝佳场所。你所作的任何贡献都是**非常感谢**的。

fork 仓库，本地开发完成提交仓库，在提交 pr 时注明修改的功能等，保证在没有 bug 的前提下提交，我会进行 review code.


### 作者

子舒（shuxhan@163.com）

 *您也可以在贡献者名单中参看所有参与该项目的开发者。*

### 版权说明

该项目签署了MIT 授权许可，详情请参阅 [LICENSE](https://github.com/lovezsh/hugo-theme-Reader/blob/main/LICENSE)

