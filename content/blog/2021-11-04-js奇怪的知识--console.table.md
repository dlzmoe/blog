---
slug: 81
title: js奇怪的知识--console.table
date: "2021-11-04"
categories: 
  - 技术
tags: 
  - js
---





这个属性对我来说还真有些陌生，无意中发现的，查询过 MDN 之后听得挺有意思的，就记录一下。

根据字面意思就是“将数据以表格的形式显示”。这个方法需要一个必须参数 data，data 必须是一个数组或者是一个对象；还可以使用一个可选参数 columns。

表格的第一列是 index。如果数据 data 是一个数组，那么这一列的单元格的值就是数组的索引。 如果数据是一个对象，那么它们的值就是各对象的属性名称。 注意（在 FireFox 中）console.table 被限制为只显示1000行（第一行是被标记的索引）。

### 1.直接输出

直接进行尝试，在控制台输出 console.table

```js
console.table(["双十一", "双十二", "双十三"]);

PS E:\demo> node 1.js
┌─────────┬──────────┐
│ (index) │  Values  │
├─────────┼──────────┤
│    1    │ '双十二' │
│    2    │ '双十三' │
└─────────┴──────────┘
```
复制下来怪怪的，直接上个图，就是下面这个样子。

![](https://imgurl.zishu.me/images/2021/11/04/5b865e6a38851240419ceb0984e6557e.png)

---

### 2.定义对象进行输出

同样也可以定义一个对象然后输出

```js
function Fun(title, date) {
  this.title = title
  this.date = date
}

const one = new Fun("双十一", "11.11")
const two = new Fun("双十二", "12.12")
const three = new Fun("双十三", "你是傻子吗，没有13月")

console.table([one, two, three], ["title", "date"])
```

打印出来，就是下面这个样子。

![](https://imgurl.zishu.me/images/2021/11/04/ed587c8b3373abe1fca2c9cdc6dd50dd.png)


### 3.console.table() 的应用场景

前面是在通过在编辑器中使用 node.js 输出数据，看看在浏览器中输出会不会不一样的效果。

![](https://imgurl.zishu.me/images/2021/11/04/092caebd508948e18d29468739d17e18.png)

可以看到成功输出数据，并且点击表头时，可以按照不同顺序进行排序，这么一看....嗯，还挺有用的（假笑）

应用场景大概就是可以对打印的数据进行更直观的观看，在某些情况下有利于调试代码，以后看看是否能用得上这种方法。