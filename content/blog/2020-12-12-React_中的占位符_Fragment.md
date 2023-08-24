---
slug: 33
title: React 中的占位符 Fragment
date: "2020-12-12"
categories: 
  - 技术
tags: 
  - react
---





在 React 项目中， render 方法只能有一个根元素，一般都是 `<div> <div/>` ，然后在里面写上我们的组件，渲染到浏览器一看，除了我们想要显示的组件，外面还套着一层 div ，如果在写项目的时候，套了很多曾组件，那么每一层都会多出来一个父级元素 div ，不美观，而且在调整样式的时候会有些麻烦

因此， React 提供了一个占位符 Fragment，写法是：

```js
// index.js

import React, { Component,Fragment } from 'react'

export default class index extends Component {
    render() {
        return (
            <Fragment>
                <h2>hello,wolrd</h2>
            </Fragment>
        )
    }
}
```

在引入 React 的时候，增加一个属性 Fragment ，然后 `render()`方法下唯一的根元素我们用 `<Fragment> </Fragment>` 来代替，这时候再看浏览器，就不会显示多余的标签了，直接显示 `<h2>`标签