---
slug: 19
title: getElementBy 系列和 querySelector 系列的区别
date: 2020-11-16
categories: 
  - 技术
tags: 
  - 笔记
---

`querySelector`和`querySelectorAll`的用法和`getElementBy`大致一样，获取的时候带上符号，getElementBy 获取的是元素的`动态集合`，querySelector 获取的是元素的`静态集合`。


<red>但是需要注意：getElementBy 系列和 querySelector 系列的区别</red>

比如，我们写一个 for 循环，每次获取 li 标签的时候，ul 生成一个 li 子元素

```html
<ul id="ul">
    <li>a</li>
    <li>b</li>
    <li>c</li>
</ul>

<script>
    var ul = document.getElementById('ul');
    var li = document.getElementsByTagName('li');

    for(var i = 0;i < li.length; i++) {
        ul.appendChild(document.createElement('li'))
    };

    console.log(li.length);
    // 陷入死循环
</script>
```

用`i < li.length`来进行判断时，会导致浏览器死循环，因为循环一次的时候，浏览器又重新获取 li 标签数组，每调用一次就会重新对文档进行查询，就会进入死循环

进行修改：把`i < li.length`改成`i < 3`，把 li 标签数组静态化，然后打印

```js
conosle.log(li.length)  // 6
```

<red>重新用 querySelector 获取一遍元素</red>

```html
<ul id="ul">
    <li>a</li>
    <li>b</li>
    <li>c</li>
</ul>

<script>
    var ul = document.querySelector('ul');
    var li = document.querySelectorAll('li');

    for(var i = 0;i<li.length;i++) {
        ul.appendChild(document.createElement('li'))
    };

    console.log(li.length);
    // 输出对结果是原来的 li.length = 3，而不是增加后的 6
</script>
```

静态集合体现在`querySelectorAll('li')`获取到 ul 里所有 li 后，不管后续再动态添加了多少 li，都是不会对其参数影响