---
slug: 217
title: 分析 VScode 中 Live Server 插件
date: 2024-01-23
categories: 
  - 结束
tags: 
  - vscode
  - 插件
---

在 VScode 中运行 Live Server 插件时，会默认给网页添加一串 js 代码，用于实现浏览器的实时重新加载（live reloading）功能，通过WebSocket与服务器进行通信。

```js
if ('WebSocket' in window) {
  (function () {
    function refreshCSS() {
      var sheets = [].slice.call(document.getElementsByTagName("link"));
      var head = document.getElementsByTagName("head")[0];
      for (var i = 0; i < sheets.length; ++i) {
        var elem = sheets[i];
        var parent = elem.parentElement || head;
        parent.removeChild(elem);
        var rel = elem.rel;
        if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
          var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
          elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
        }
        parent.appendChild(elem);
      }
    }
    var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
    var address = protocol + window.location.host + window.location.pathname + '/ws';
    var socket = new WebSocket(address);
    socket.onmessage = function (msg) {
      if (msg.data == 'reload') window.location.reload();
      else if (msg.data == 'refreshcss') refreshCSS();
    };
    if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
      console.log('Live reload enabled.');
      sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
    }
  })();
}
else {
  console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live - Reloading.');
}
```


**1.首先判断浏览器是否支持 WebSocket**

```js
if ('WebSocket' in window)
```

这个条件语句检查浏览器是否支持 WebSocket。如果支持，就执行后续的代码块，否则输出错误信息并停止执行。

**2.定义refreshCSS函数**

```js
function refreshCSS() {
  // ...
}
```

这个函数用于刷新页面上的css。它会遍历页面上所有的 `<link>` 标签，移除它们，然后再次添加，触发css的重新加载。

**3.构建WebSocket连接**

```js
var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
var address = protocol + window.location.host + window.location.pathname + '/ws';
var socket = new WebSocket(address);
```

这部分代码根据当前页面的协议（HTTP或HTTPS）构建WebSocket的连接地址，然后创建一个WebSocket对象，连接到这个地址。

**4.WebSocket消息处理**

```js
socket.onmessage = function (msg) {
    if (msg.data == 'reload') window.location.reload();
    else if (msg.data == 'refreshcss') refreshCSS();
};
```

当WebSocket接收到消息时，会执行这个回调函数。如果消息是 'reload'，则刷新整个页面；如果消息是 'refreshcss'，则调用refreshCSS函数刷新CSS。

**5.检测是否执行成功**

通过判断 `sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')` 属性监测前面的代码是否运行成功，并返回一定的提示，这里可以在前端用于进行标记，并且只会在WebSocket链接成功时返回，如果时更新数据不会重复运行。

```js
if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer'))
```