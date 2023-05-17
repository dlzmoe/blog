---
slug: 106
title: 一个优雅的字体压缩解决方案 ---fonttools
date: 2022-05-24 14:28:00
updated: 2022-06-02 08:55:07
categories: 
  - 技术
tags: 
  - 字体
---


分享一个 python 的库 ---fonttools，针对字体文件进行处理非常方便。

### 下载
需要先在电脑上下载 python 环境，这个就不多说了。

然后在本地命令行输入：

```shell
pip install fonttools
```

### 字体库

1. 本地新建一个文件夹，取名为 `fonts` ，随意即可。将自己需要压缩整理的字体放在文件夹中，如 `OPPOSans.ttf` 。
2. 然后建立一个文件取名为 `word.txt`，这时我们需要找到一个常用字体库，这里我在github分享一个 [https://github.com/zburu/cdn/blob/main/font/汉字常用字体.txt](https://github.com/zburu/cdn/blob/main/font/%E6%B1%89%E5%AD%97%E5%B8%B8%E7%94%A8%E5%AD%97%E4%BD%93.txt) ，把里面的内容常用字体复制到 `word.txt` 文件。

### 运行


```shell
pyftsubset OPPOSans.ttf --text=$(cat word.txt) --no-hinting
```


我们看一下命令，其中 `OPPOSans.ttf` 是字体文件，`word.txt` 是常用字体，我们要将这些字单独分离出来。

名字都可以按照自己的要求来，但是一定要互相对应。


在命令行输入即可，运行完成之后，可以在文件夹中看到带有 `subset` 字样的字体文件，占用空间大大缩小，可以直接拿来使用。