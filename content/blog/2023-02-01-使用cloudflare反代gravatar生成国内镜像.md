---
slug: 182
title: 使用 cloudflare 反代 gravatar 免费生成国内镜像
date: "2023-02-01"
categories: 
  - 技术
tags: 
  - cloudflare
  - gravatar
---

cloudflare 有一个非常好用的功能---Workers，可以在无服务器的状态下运行一些程序，包括常见的反向代理等。

所以我利用这一功能实现对 gravatar 反代，达到国内访问加速的目的。

话不多说，开始流程操作，分享我的部署过程。

**1.登陆后，在主页点击左侧的 `Workers`，然后点击`创建服务`。**

![](https://imgurl.zishu.me/images/20230201/1675253358798.5h6helivsl00.webp)


**2.服务名称随意填写，然后点击右下角创建。**

![](https://imgurl.zishu.me/images/20230201/1675253485344.451pp9l8u920.webp)


**3.点击右上角快速编辑**

![](https://imgurl.zishu.me/images/20230201/image.2ple8r24vra.webp)

**4.在左侧编辑器中输入下列的代码**

![](https://imgurl.zishu.me/images/20230201/image.7hrwxy8aok00.webp)

<details>
<summary>点击展开代码</summary>

```js
// 替换成你想镜像的站点
const upstream = 'gravatar.com'
 
// 如果那个站点有专门的移动适配站点，否则保持和上面一致
const upstream_mobile = 'gravatar.com'
 
// 你希望禁止哪些国家访问
const blocked_region = []
 
// 禁止自访问
const blocked_ip_address = []
 
// 替换成你想镜像的站点
const replace_dict = {
    '$upstream': '$custom_domain',
    '//gravatar.com': ''
}
 
//以下内容都不用动
addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request));
})
 
async function fetchAndApply(request) {
 
    const region = request.headers.get('cf-ipcountry').toUpperCase();
    const ip_address = request.headers.get('cf-connecting-ip');
    const user_agent = request.headers.get('user-agent');
 
    let response = null;
    let url = new URL(request.url);
    let url_host = url.host;
 
    if (url.protocol == 'http:') {
        url.protocol = 'https:'
        response = Response.redirect(url.href);
        return response;
    }
 
    if (await device_status(user_agent)) {
        upstream_domain = upstream
    } else {
        upstream_domain = upstream_mobile
    }
 
    url.host = upstream_domain;
 
    if (blocked_region.includes(region)) {
        response = new Response('Access denied: WorkersProxy is not available in your region yet.', {
            status: 403
        });
    } else if(blocked_ip_address.includes(ip_address)){
        response = new Response('Access denied: Your IP address is blocked by WorkersProxy.', {
            status: 403
        });
    } else{
        let method = request.method;
        let request_headers = request.headers;
        let new_request_headers = new Headers(request_headers);
 
        new_request_headers.set('Host', upstream_domain);
        new_request_headers.set('Referer', url.href);
 
        let original_response = await fetch(url.href, {
            method: method,
            headers: new_request_headers
        })
 
        let original_response_clone = original_response.clone();
        let original_text = null;
        let response_headers = original_response.headers;
        let new_response_headers = new Headers(response_headers);
        let status = original_response.status;
 
        new_response_headers.set('access-control-allow-origin', '*');
        new_response_headers.set('access-control-allow-credentials', true);
        new_response_headers.delete('content-security-policy');
        new_response_headers.delete('content-security-policy-report-only');
        new_response_headers.delete('clear-site-data');
 
        const content_type = new_response_headers.get('content-type');
        if (content_type.includes('text/html') && content_type.includes('UTF-8')) {
            original_text = await replace_response_text(original_response_clone, upstream_domain, url_host);
        } else {
            original_text = original_response_clone.body
        }
 
        response = new Response(original_text, {
            status,
            headers: new_response_headers
        })
    }
    return response;
}
 
async function replace_response_text(response, upstream_domain, host_name) {
    let text = await response.text()
 
    var i, j;
    for (i in replace_dict) {
        j = replace_dict[i]
        if (i == '$upstream') {
            i = upstream_domain
        } else if (i == '$custom_domain') {
            i = host_name
        }
 
        if (j == '$upstream') {
            j = upstream_domain
        } else if (j == '$custom_domain') {
            j = host_name
        }
 
        let re = new RegExp(i, 'g')
        text = text.replace(re, j);
    }
    return text;
}
 
async function device_status (user_agent_info) {
    var agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < agents.length; v++) { if (user_agent_info.indexOf(agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
```

</details>



然后点击`保存并部署`，就可以成功反代 gravatar 镜像了。

然后照葫芦画瓢，可以通过这种方式反代任何网站，访问起来大致无压力，延迟100+ms左右。

**5.自定义域名**

![](https://imgurl.zishu.me/images/20230201/1675254069096.51n0e9vl53g0.webp)

在触发器中可以找到自定义域名选项，输入已经绑定 cloudflare 的域名，再次赞美 cloudflare，如果事前绑定好了域名，在这里可以直接输入二级域名，cloudflare 会自动解析，全部都是自动化的。

在主页左侧的 `网站` 绑定域名。

```shell
# 分享我的免费镜像。
https://gravatar.zsh.im/avatar
```
