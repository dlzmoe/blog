---
slug: 203
title: Bitwarden / Vaultwarden  --- 密码管理工具
date: "2023-07-27"
categories: 
  - 技术
tags:
  - 密码管理
  - Bitwarden
  - Vaultwarden
---

### 1.介绍

Bitwarden 是一款自由且开源的密码管理服务，用户可在加密的保管库中存储敏感信息。Bitwarden 平台提供有多种客户端应用程序，包括网页用户界面、桌面应用，浏览器扩展、移动应用以及命令行界面。Bitwarden 提供云端托管服务，并支持自行部署解决方案。

在调研一些市面常用的密码管理工具之后，我选择了 Bitwarden。然后使用自托管的方式部署在服务器上，定时备份数据库，导出密码，安全性也有保证。

https://bitwarden.com/

而Vaultwarden 是一个使用 Rust 编写的非官方 Bitwarden 服务器实现，提供了不错的 web 管理界面，并与 Bitwarden 兼容。

![](https://imgurl.zburu.com/images/2023/64c2607587a9a.png)

### 2.部署

先在服务器执行指令。

```shell
docker run -d --name bitwardenrs \  
  --restart unless-stopped \  
  -e WEBSOCKET_ENABLED=true \  
  -v /data/password/data/:/data/ \  
  -p 6666:80 \  
  -p 3012:3012 \  
  vaultwarden/server:latest
```

部署完成后打开网站，登陆注册之后，删除容器。

需要配置禁止注册的功能，因为我只想自己使用。如果不禁止注册，可以忽略下面这两步。

```shell
docker stop bitwardenrs  #停止容器  
docker rm -f bitwardenrs  #删除容器
```

```shell
docker run -d --name bitwardenrs \  
  --restart unless-stopped \  
  -e SIGNUPS_ALLOWED=false \  
  -e WEBSOCKET_ENABLED=true \  
  -v /data/password/data/:/data/ \  
  -p 6666:80 \  
  -p 3012:3012 \  
  vaultwarden/server:latest
```

### 3.docker-compose.yml

通过 ChatGPT 我将这段代码转化成了`docker-compose.yml` 文件，可以更方便的部署安装。

![](https://imgurl.zburu.com/images/2023/64c261e24fc4a.png)

```yml
version: '3'
services:
  bitwardenrs:
    image: vaultwarden/server:latest
    container_name: bitwardenrs
    restart: unless-stopped
    environment:
      - SIGNUPS_ALLOWED=false
      - WEBSOCKET_ENABLED=true
    volumes:
      - /data/password/data/:/data/
    ports:
      - "6666:80"
      - "3012:3012"
```

### 4.chrome 扩展

通过反向代理可以使用域名登陆 web 端，并且使用了 chrome 扩展方式，在登陆网站可以自动保存密码。

https://chrome.google.com/webstore/detail/bitwarden-free-password-m/nngceckbapebfimnlniiiahkandclblb

之后我只需要记住一个主密码，其他网站密码全部采用加密方式生成，方便与安全并存。