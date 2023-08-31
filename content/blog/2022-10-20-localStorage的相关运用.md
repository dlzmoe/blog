---
slug: 171
title:  localStorage 的相关运用
date: "2022-10-20"
categories: 
  - 技术
tags: 
  - js
---

localStorage 是浏览器自带的一个属性，只读的localStorage 属性允许你访问一个Document 源（origin）的对象 Storage；存储的数据将保存在浏览器会话中。localStorage 类似 sessionStorage，但其区别在于：存储在 localStorage 的数据可以长期保留；而当页面会话结束——也就是说，当页面被关闭时，存储在 sessionStorage 的数据会被清除。

应注意，无论数据存储在 localStorage 还是 sessionStorage ，它们都特定于页面的协议。

另外，localStorage 中的键值对总是以字符串的形式存储。 (需要注意，和 js 对象相比，键值对总是以字符串的形式存储意味着数值类型会自动转化为字符串类型).

localStorage 的使用也非常简单，分为存入和读取，可以将其绑定在事件方法中。

```js
// 存入
const arr= 100;
localStorage.setItem("key", JSON.stringify(arr));

// 读取
const arr = JSON.parse(localStorage.getItem("key"));
```

这里 `"key"` 指的是存到浏览器中的参数名，`arr` 则是参数值。

1. `localStorage.setItem("key", JSON.stringify(arr));` 这个方法就是将数组arr存到了浏览器的localStorage 中，它的参数名叫 key
2. `const arr = JSON.parse(localStorage.getItem("key"));` 就是读取浏览器中参数名为 key 的参数值。

比如静态保存某个设置参数，可以将其写入数组中，然后通过 localStorage 存储，原本刷新就会显示默认设置，现在可以在每次刷新的适合读取存入的参数。

![](https://imgurl.zishu.me/images/2022/20221020-1.59d2myq20340.webp)

在一些场景下非常好用，比如开发一个油猴脚本等等。

清除 localStorage，分为清除所以的存储值和清除某个特定的 key。

```js
// 清除本地存储中的所有值
localStorage.clear(); 

// 本地存储中删除特定项
localStorage.removeItem(key);
```

