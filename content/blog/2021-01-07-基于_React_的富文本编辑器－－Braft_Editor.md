---
slug: 44
title: 基于 React 的富文本编辑器－－Braft Editor
date: 2021-01-07
categories: 
  - 技术
tags: 
  - react
  - 组件
---




最近发了很多关于 React 的文章，记录遇到的新技术点，以及在写代码过程中遇到的问题，希望可以帮助到和我遇到同样问题的同学。

今天分享的是一款基于 React 的富文本编辑器－－Braft Editor。



>Braft Editor 官网：[https://braft.margox.cn](https://braft.margox.cn)
>Github 仓库地址：[https://github.com/margox/braft-editor](https://github.com/margox/braft-editor)

这款插件非常方便，只需要下载然后引入即可直接使用，页面整体风格清新，符合绝大多数人的审美观，支持图片，音视频的插入。

按照官方的说法，假如你对它的功能还不够满意，不够使用，完全可以扩展它，自己写一个插件来强化他。

经过我的测试，功能绝对强大，可以满足市面上绝大多数的需求。接下来就说一下如何使用这款插件。

## 1.安装

在项目中直接通过 `npm` 或者 `yarn` 下载插件：

```shell
# 使用 npm 安装
npm install braft-editor --save

# 使用 yarn 安装
yarn add braft-editor
```

## 2.使用

新建一个组件 `EditorDemo.js`，在里面写入下列代码：

```js
// EditorDemo.js

import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

export default class PageDemo extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState(null)
  }

  render () {
    return (
      <BraftEditor value={this.state.editorState} onChange={this.handleChange}/>
    )
  }

  handleChange = (editorState) => {
    this.setState({ editorState })
  }

}
```

然后引入到 `index.js` 中去。

## 3.运行

写完组件之后，`npm start` 运行看看效果

相当不错，页面很简洁，如果觉得样式不喜欢，完全可以自己重新定制风格，非常方便。

## 4.文档

如果想使用更多功能、方法，进入 [Braft Editor 官方文档](https://www.yuque.com/braft-editor/be/gz44tn)吧，还有更多关于它的讲解！

属性、方法、示例，一应俱全。