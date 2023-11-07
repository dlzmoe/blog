---
slug: weekly-26
title: 子舒周刊 -26 | Clash 停止更新
date: 2023-11-09
categories:
  - 周刊
tags:
  - 周刊
---

*每周四发布，尽量不停更，分享有趣的软件，程序，文章等。 [周刊列表](/categories/周刊/)*

![](https://imgurl.zishu.me/images/ffb7a901f304e7532c799881928b558_z8lb0v_.webp)

*江畔渔火对愁眠。*

---

## 1.Clash 系列删库事件

2023 年 11 月 2 日，Fndroid/clash_for_windows_pkg 作者由于某些原因，删除仓库中的 releases 包。

3 日，clash 核心也随之删库，紧接着，一系列基于 clash 核心的软件都宣告删库或者 archived。

## 2.令人困惑的 git 术语

https://jvns.ca/blog/2023/11/01/confusing-git-terminology/

作者举例了很多有关 git 指令奇怪的术语。

## 3.GitHub 恢复旧的 feed 流推送

https://github.com/wangrongding/github-old-feed

一个油猴脚本，将 GitHub 首页的推送信息进行优化，显示效果也是非常不错的。

## 4.知乎评论时间精确到秒

https://meta.appinn.net/t/topic/47711/18

来自一位网友的分享，我修改了一些内容和知乎网页风格保持一致。将显示 `几小时前` 的时间显示改为正常 `年-月-日 时-分-秒`

<details>
<summary>油猴脚本代码</summary>

```js
// ==UserScript==
// @name         知乎评论时间精确到秒
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/*
// @icon         http://zhihu.com/favicon.ico
// @grant       GM_addStyle
// @run-at document-start
// @require https://scriptcat.org/lib/637/1.3.3/ajaxHooker.js

// ==/UserScript==


(function () {
	'use strict';
	function timestampToTime(timestamp) {
		const milliseconds = timestamp * 1000;
		const date = new Date(milliseconds);
		const year = date.getFullYear();
		const month = addZero(date.getMonth() + 1);
		const day = addZero(date.getDate());
		const hour = addZero(date.getHours());
		const minute = addZero(date.getMinutes());
		const second = addZero(date.getSeconds());

		return `${ year }-${ month }-${ day } ${ hour }:${ minute }:${ second }`;
	}

	function addZero(num) {
		return num < 10 ? `0${ num }` : `${ num }`;
	}

	ajaxHooker.hook(request => {
		if (request.url.includes("https://www.zhihu.com/api/v4/comment_v5/comment/") || request.url.includes("https://www.zhihu.com/api/v4/comment_v5/answers/") || request.url.includes("https://www.zhihu.com/api/v4/comment_v5/articles/")) {

			request.response = res => {
				// console.log('\n== ↓ ↓ ↓ ↓ ↓ == \n', res)

				if (res.json.data) {

					res.json.data.forEach(item => {
						// console.log(timestampToTime(item.created_time));
						item.content =  item.content +   '<span class="css-nm6sok commentTime">' + timestampToTime(item.created_time) + '</span>'
						if (item.child_comments.length >= 1) {
							item.child_comments.forEach(child => {
								child.content =   child.content  + '<span class="css-nm6sok commentTime">' + timestampToTime(child.created_time) + '</<span>'
							});
						}
					});
					GM_addStyle(`
					.CommentContent {
							position: relative;
							overflow: visible;
						}

						/* 	精确时间 */
						.commentTime {
							position: absolute;
							left: 0;
							bottom: -22px;
							color: #999;
						}

						.css-140jo2 {
							position: relative;
						}

						/* 原时间	 */
						.css-12cl38p,
						.css-12cl38p + span,
						.css-nm6sok + span {
							display: none;
						}

						/* ip 属地	 */
						.css-8hxn0r .css-nm6sok {
							position: absolute;
							left: 160px;
							top: 3px;
						}
						/* 热评	 */
						.css-8hxn0r .css-33kuns {
							position: absolute;
							left: 240px;
							top: 3px;
						}
						/*  作者置顶	 */
						.css-1o87v1m{
						    position: absolute;
  						    top: 22px;
   						    left: -4px;
						}
					`);
				}

			};
		}

	});
})();
```

</details>
