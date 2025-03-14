---
slug: 236
title: Github 仓库同步到 Cloudflare R2
date: 2024-08-25
categories: 
  - 技术
tags: 
  - GitHub
  - Cloudflare
---

我在 GitHub 搭建了一个图床，用于小量存储博客图片，为了稳定安全考虑，决定备份到 Cloudflare R2 存储桶一份，R2 默认有每月免费的 10G 存储、100 万次 A 类操作、1000 万次 B 类操作，备份完全足够了。

说到备份肯定是越自动化越好，手动上传是不可能的，因此我决定利用 GitHub Actions 执行自动任务。

话不多说，开始操作。

## 1. 建立 Cloudflare R2 存储桶

在 R2 页面新建一个存储桶，名称可以随意，就叫做 `github-sync-imgurl`，默认不公开就行了，这个不用调整。

![](https://imgurl.zishu.me/2024/08/1724553937361.webp)

然后在管理 R2 API 令牌中，创建一个新的 API 令牌，权限设为 `管理员读和写`，其他不用管默认设置，保存即可。

会生成一个 `KEY_ID` 和 `ACCESS_KEY`，这俩等会要用到，先记录一下。

## 2. GitHub 仓库设置

来到你需要备份的仓库，打开 `Setting > Actions > General`，勾选这两个设置然后保存，这个是必须的，否则 GitHub Actions 无法自动运行。

![](https://imgurl.zishu.me/2024/08/1724554184492.webp)

然后来到 `Setting > Secrets and variables > Actions`，点击 `New repository secret` 按钮开始创建密钥，按照下面的命名开始依次操作：

```shell
CLOUDFLARE_ACCOUNT_ID         #你的 Cloudflare 账户 ID
CLOUDFLARE_ACCESS_KEY_ID      # Cloudflare R2 的访问密钥 ID
CLOUDFLARE_SECRET_ACCESS_KEY  # Cloudflare R2 的秘密访问密钥
CLOUDFLARE_BUCKET_NAME        # 你在 Cloudflare R2 上的存储桶名称
```

图示如下：

![](https://imgurl.zishu.me/2024/08/1724554376324.webp)

最后在 Actions 中新建一个新的任务，可以直接复制代码使用，无需修改，保存后运行即可。

```yml
name: Sync to Cloudflare R2

on:
  schedule:
    - cron: '0 16 * * *'  # 每天的16:00 UTC 时间触发（相当于东八区的 00:00）
  workflow_dispatch:  # 允许手动触发

jobs:
  sync:

    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Install AWS CLI
      run: |
        sudo apt-get update
        sudo apt-get install -y awscli

    - name: Configure AWS CLI for Cloudflare R2
      run: |
        aws configure set aws_access_key_id ${{ secrets.CLOUDFLARE_ACCESS_KEY_ID }}
        aws configure set aws_secret_access_key ${{ secrets.CLOUDFLARE_SECRET_ACCESS_KEY }}
        aws configure set default.region auto

    - name: Sync repository to Cloudflare R2
      run: |
        aws s3 sync . s3://${{ secrets.CLOUDFLARE_BUCKET_NAME }} --endpoint-url=https://${{ secrets.CLOUDFLARE_ACCOUNT_ID }}.r2.cloudflarestorage.com --delete --exclude ".git/*"
      env:
        CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

由于使用了 `aws s3 sync` 命令，它会进行增量同步，这意味着它只会上传有变化的文件，而不会每次都重新上传整个仓库，避免消耗无用的 Cloudflare R2 流量。

