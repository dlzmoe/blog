---
slug: 75
title:  npm install 报错和取消本地代理的问题
date: 2021-08-19 11:15:00
updated: 2021-12-01 14:24:42
categories: 
  - 技术
tags: 
  - 报错
  - npm
---




`npm install`下载依赖包的时候出现下面错误，请求失败。

```shell
npm ERR! FetchError: request to https://registry.npm.taobao.org/cnpm failed, reason: connect ECONNREFUSED 127.0.0.1:1181
```

调试过后发现是本地代理的问题，取消它。

```shell
npm config delete proxy
npm config delete https-proxy
```

`npm install` 成功运行，完毕。