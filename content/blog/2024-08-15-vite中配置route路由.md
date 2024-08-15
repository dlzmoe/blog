---
slug: 233
title: vite 中配置 route 路由
date: 2024-08-15
categories: 
  - 技术
tags: 
  - vite
  - 路由
---

使用 vite + vue 构建项目默认是没有 route 的，所以需要手动引入。

### 1. 基础配置

```shell
# 建立一个 vite 项目
npm create vite@latest
yarn create vite

# 安装 route 依赖
npm install vue-router@4
yarn add vue-router@4
```

接下来，需要在项目中配置 Vue Router。首先在 src 目录下创建一个 router 目录，并在该目录下创建 index.js，并配置路由。

```shell
src/
  ├── router/
  │   └── index.js
```

```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes
})

export default router
```

在 `main.js` 声明一下 route 文件。

```js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App)
app.use(router)
app.mount('#app')
```

并且在 `App.vue` 中要使用 router-view 来显示当前路由对应的组件，所以修改下文件。

```html
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

### 2. 添加多路由

要添加更多的页面或动态路由，可以继续在 routes 数组中添加配置。例如：

```js
{
  path: '/user/:id',
  name: 'User',
  component: () => import('@/views/User.vue')
}
```

这样，访问 `/user/1` 就会加载 User.vue 组件并显示相应内容。

### 3. 配置 @ 路径别名

注意，vite 默认是没有配置路径别名 `@` 的，所以要手动添加，配置如下：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

配置完别名后，就可以在项目中使用 @ 来代替 src 目录的路径，从而简化模块引用。
