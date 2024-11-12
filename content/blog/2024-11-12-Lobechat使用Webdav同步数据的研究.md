---
slug: 247
title: Lobechat 使用 Webdav 同步数据的研究
date: 2024-11-12
categories:
  - 技术
tags:
  - Lobechat
  - Webdav
---

Lobechat 就不做过多介绍了，一个开源、现代设计的人工智能聊天框架。

今天就来聊聊同步的问题，Lobechat 分为社区版和正式版，正式版需要付费订阅套餐，支持全局云同步，但是最便宜的套餐都要 4.9 刀，这让我 API 用户感觉有点难以接受。

因为我需要的功能社区版都已经满足了，并不打算单独对云同步付费，因此我想到了利用 Webdav 技术自己解决同步问题。

**Webdav**

大多数网盘都支持通过 Webdav 技术进行同步，网盘提供一套账号密码以及服务器地址，在前端调用，可以实现增删改查。

**油猴管理器（Tampermonkey）**

油猴管理器（Tampermonkey）无疑是浏览器插件的伟大创作之一，可以对网页注入 js 脚本来实现一些功能。

所以我打算使用 Tampermonkey 来构建这个脚本文件。

**Lobechat 数据**

我研究过 Lobechat 源码，它数据都存放在本地的 IndexedDB 数据库中，这是浏览器的一个存储机制，可以存放大量的数据，显示则是以数据库的格式。

![1731404378265](https://imgurl.zishu.me/2024/11/1731404378265.webp)

然后我先手动导出一份 json 格式的全局数据（社区版只支持手动导入导出文件），拿这份文件跟 IndexedDB 数据库 做对比，发现字段基本保持一致，数据格式也不用转，全部都在其中。

**操作数据库**

于是我翻阅了一下官方文档，有可以利用的 API，操作查询这些数据。

```js
const dbName = "LOBE_CHAT_DB";
const storeNames = ["messages", "sessionGroups", "sessions", "topics", "users"];

let request = indexedDB.open(dbName);

request.onsuccess = (event) => {
  const db = event.target.result;
  let state = {
    messages: [],
    sessionGroups: [],
    sessions: [],
    topics: [],
    users: [],
  };

  let pendingStores = 0;

  storeNames.forEach((storeName) => {
    if (db.objectStoreNames.contains(storeName)) {
      pendingStores++;
      const transaction = db.transaction([storeName], "readonly");
      const objectStore = transaction.objectStore(storeName);
      const allRecords = objectStore.getAll();

      allRecords.onsuccess = (event) => {
        const result = event.target.result;
        state[storeName] = result;
        pendingStores--;

        if (pendingStores === 0) {
          // 整个数据库的数据都可以导出
          this.exportData = JSON.stringify({
            exportType: "all",
            state: state,
            version: 7,
          });
        }
      };
    } 
  });
};


```

既然可以查询，就可以覆盖，同样也有 API 支持，所以我就构思一下流程，利用 Webdav 的增删改查，把这些数据传到网盘中，然后在另一台设备拉取，最后优化一下整个流程，让它更加可视化。

大致原型如下：

![1731404855162](https://imgurl.zishu.me/2024/11/1731404855162.webp)

只要输入账号密码后，可以随时保存本地数据到云端，下载数据到本地，同步就很方便。

最终我把它做成了油猴脚本发布到 Greasyfork，可供大家直接使用，代码也已开源

- 安装：[https://greasyfork.org/scripts/516358](https://greasyfork.org/scripts/516358)
- Github：[https://github.com/dlzmoe/UserScript](https://github.com/dlzmoe/UserScript)
