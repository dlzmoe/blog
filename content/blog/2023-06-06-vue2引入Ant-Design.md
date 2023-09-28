---
slug: 197
title: vue2 中引入 Ant Design 报错问题
date: "2023-06-06"
categories: 
  - 技术
tags:
  - Ant Design
---

https://1x.antdv.com/docs/vue/getting-started-cn/

根据 Ant Design 官方文档，在 vue2 中安装组件时使用指令：

```shell
npm i --save ant-design-vue
```

但在实际操作中会出现问题，它仅适用于 vue3 项目，在 vue2 中需要带上相匹配的版本号。

```shell
npm i --save ant-design-vue@1.7.8
```

```js
// main.js
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);
```