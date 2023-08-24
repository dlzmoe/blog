---
slug: 41
title: 如何在 React 中引入 less？ 
date: "2021-01-04"
categories: 
  - 技术
tags: 
  - react
---





本文主要写如何在 React 中引入 less 。因为 less 和 css 非常像，因此很容易学习。而且 less 仅对 css 语言增加了少许方便的扩展，这就是 less 如此易学的原因之一。

<!-- more -->

## 1.安装 less

```shell
npm install less less-loader --save-dev
```

## 2.暴露 webpack 文件

利用 npx create-react-app  搭建的 React 项目，默认隐藏 webpack 配置文件，引入 less 需要修改 webpack 配置文件，因此我们需要执行命令暴露 webpack 配置文件。

>这里需要注意，一旦暴露，无法回退。

```shell
npm run eject
```

如果这一步失败，执行下列命令：

```shell
git add .

git commit -m "init"
```

然后再执行 `npm run eject`

>注意：暴露 webpack 文件只能在 `create-react-app` 之初，一旦项目结构发生改变，再进行暴露操作就会失败。所以尽量在项目建立时就进行 `npm run eject` 操作。

## 3.修改 wenpack.config.js 配置

在合适的位置添加：

```js
// 放在 
// const sassRegex = /\.(scss|sass)$/;
// const sassModuleRegex = /\.module\.(scss|sass)$/; 
// 后面

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
```

```js
// 放在 oneof 数组下

{
  test: lessRegex,
  exclude: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'less-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
},
// Adds support for CSS Modules, but using SASS
// using the extension .module.scss or .module.sass
{
  test: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: true,
      getLocalIdent: getCSSModuleLocalIdent,
    },
    'less-loader'
  ),
},
```

## 4.如何使用 less

新建一个 `App.less` 文件，然后在 `App.js` 中引入：

```js
import './Map.less'
```

[less 语法手册](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)