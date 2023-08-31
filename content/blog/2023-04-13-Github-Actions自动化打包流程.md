---
slug: 192
title: Github Actions 自动化打包流程
date: "2023-04-13"
categories: 
  - 技术
tags: 
  - Github Actions
---

Github Actions 监听仓库 commit 事件，然后执行自动化打包流程，并通过第三方平台自动部署，发布非常方便。

```yml
name: Build
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Commit changes
        run: |
          git config --global user.email "youremail"
          git config --global user.name "username"
          git add .
          git commit -m "Action bot commit"
      - name: Push changes
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          branch: main
```

程序会自动获取 github token，只需要在仓库设置 `/settings/actions` 中把 `Workflow permissions` 设为读写权限。

![](https://imgurl.zishu.me/images/2023/04/13/6437a8b1404b2.webp)
