---
slug: 80
title: 通过 getTimezoneOffset() 方法判断当前时区是否为夏令时
date: 2021-10-22
categories: 
  - 技术
tags: 
  - js
---



`getTimezoneOffset() 方法` 方法返回 UTC 时间和本地时间之间的时差，以分钟为单位。

>世界协调时间 (UTC) 是世界时间标准设定的时间，UTC 时间与 GMT 时间（格林威治时间）相同。

测一下我所在时区和标准时区的时间差

```js
function myDate () {
  var d = new Date();
  var n = d.getTimezoneOffset();
  console.log(n)
}
myDate();

// PS E:\demo> node 1.js
// -480
```

也就是 480 分钟（8 个小时），北京时间是东八区，刚好与格林威治时间相差 8 个小时，这说明 `getTimezoneOffset()` 方法是很有效的。

接下来利用这个方法，判断一下当前时区是否为夏令时。

```js
const time1 = new Date(2021, 0, 1);
const time2 = new Date(2021, 6, 1);
if (time1.getTimezoneOffset() != time2.getTimezoneOffset()) {
  console.log('夏令时');
}
else {
  console.log('非夏令时');
}


// PS E:\demo> node 1.js
// 非夏令时
```
