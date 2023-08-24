---
slug: 170
title:  hugo 一键打包并上传 github
date: "2022-10-14"
categories: 
  - 技术
tags: 
  - 博客
---

分享一个 hugo 一键打包并上传 github 的方法，前提是你之前上传过 GitHub 仓库。

采用 window 支持的 sh可执行文件，在根目录新建一个 `hugo.sh` 文件，里面放上一些命令。

```shell
hugo

# cd public

time=$(date "+%Y-%m-%d %H:%M:%S")
echo $time

git add .
git commit -m "自动执行构建脚本 🎓$time"
git push
exit

```

可以在文件夹双击运行 `hugo.sh`，也可以在终端输入命令。

```shell
.\hugo.sh
```

省去了我输入繁琐的 Git 上传指令，并且自动生成当前系统时间作为 commit。

**其他**

这里我上传的是整体的 hugo 目录，如果你只想上传生成的 `/public` ，在中间加入 `cd public`。