---
slug: 51
title: 使用宝塔面板安装 autoPicCdn 图床工具
date: 2021-02-25
categories: 
  - 技术
tags: 
  - 工具
---

很多小伙伴在做个人网站或者博客时，总能用到各种各样的图床工具，毕竟在写文章的时候需要插入一些图片，我也不例外，来盘点一下之前用的工具，

1. 最开始是找一些免费的图床网站，比如 sm.ms 等，但是后来为了安全性和稳定性考虑放弃了这种。
2. 然后是在 github，gitee 仓库存储的（缺点就是 github 访问速度有些尴尬，gitee 其实挺好的，但时用起来怪怪的）
3. 阿里云 oss 储存桶（挺好使的，搭配 picgo 软件，一年也才 9.9，但是链接很尴尬，直接下载，无法右键访问图片，搜过了解决办法，嫌太麻烦就搁置了，至今在那放着）
4. 后来在自己的服务器建一个网站，把图片放进去，使用的时候直接引用链接（缺点就是上传太麻烦，然后就是图片太占内存了，影响服务器的性能）
5. 然后就是今天的重头戏，autoPicCdn，一款开源软件

也是基于 github 实现图床功能，后来才知道可以用 jsdelivr 给资源进行加速，autoPicCdn 就是基于这样的功能实现。

今天就讲讲用宝塔面板配置 autoPicCdn 的流程吧！

### 准备工作

1. 进入 github 仓库下载资源到本地。
[https://github.com/yumusb/autoPicCdn](https://github.com/yumusb/autoPicCdn)

![](https://imgurl.zishu.me/images/old/2021/02/25/c5afee4580eb4e9ab70e48e79024efa9.png)

2. 在 github 建立一个新的仓库，自由命名，我的是 shuxhan/pic-cdn，简单易懂
3. 去这个页面 [https://github.com/settings/tokens](https://github.com/settings/tokens)生成一个有写权限的 token（repo：Full control of private repositories 和 write:packages 前打勾，然后点击确定，会生成一个 token 码，**记住它，最好复制到你的记事本，不然一刷新网页就不会再显示了**

然后解压。

### 上传到服务器

先利用自己的域名添加一个新的站点，比如我使用的是 [img.shuxhan.com](https://img.shuxhan.com) ，然后建立数据库。

![](https://imgurl.zishu.me/images/old/2021/02/25/22154c6e873e4741530c0344940069b2.png)

站点建立成功后，进入目录将默认生成的文件删除，然后点击上传，找到刚才解压的文件，点击上传即可。

### 配置文件

找到目录中的 up.php 配置文件，

将下面两个地方配置好，具体的内容在代码里。

```php
//必选项
define("TYPE","GITHUB");//选择 github
//define("TYPE","GITEE");//选择 gitee，如果使用 gitee，需要手动建立 master 分支，可以看这里 https://gitee.com/help/articles/4122

define("USER","shuxhan");//你的 GitHub/Gitee 的用户名

define("REPO","pic-cdn");//必须是上面用户名下的 公开仓库

define("MAIL","shuxhan@163.com");//邮箱无所谓，随便写

define("TOKEN","971b0a96ff5af545d5fe081f829cf5542007e70b");
// Github 去这个页面 https://github.com/settings/tokens生成一个有写权限的token（repo：Full control of private repositories 和 write:packages 前打勾）
// gitee  去往这个页面 https://gitee.com/personal_access_tokens
```

```php
//数据库配置文件
//请确保把当前目录下的 pic.sql 导入到你的数据库
$database = array(
    'dbname' => 'img',//你的数据库名字
    'host' => 'localhost',
    'port' => 3306,
    'user' => 'img',//你的数据库用户名
    'pass' => 'img',//你的数据库用户名对应的密码
);
```
然后最重要的一步是，将目录下的 pic.sql 导入刚才建立并链接的数据库，先右键复制 pic.sql 文件，然后进入路径

![](https://imgurl.zishu.me/images/old/2021/02/25/8d1badf54c5439b18c8dd8334357183c.png)

点击粘贴即可。

### 测试访问

打开你的浏览器，输入绑定的站点

![](https://imgurl.zishu.me/images/old/2021/02/25/a5a7c37f2f0312035c54726c9d1cd46f.png)

然后随便截个图，然后拖动到上传窗口，显示上传成功，下面是图片的廉价，复制 markdown 可以在写文章的时候使用辣！

![](https://imgurl.zishu.me/images/old/2021/02/25/908c287c823d4ceb7752e9071cde6737.png)

通过 jsdelivr 加速，结果非常令人满意，以后就决定使用 github + jsdelivr + autoPicCdn 来做图床工具啦！