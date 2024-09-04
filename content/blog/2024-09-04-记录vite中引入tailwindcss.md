---
slug: 237
title: 记录 vite 中引入 tailwindcss
date: 2024-09-04
categories: 
  - 技术
tags: 
  - 笔记
  - vite
  - tailwindcss

---

安装依赖并生成 `tailwind.config.js` 和 `postcss.config.js`。

```shell
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

注意，配置中要使用 ES6 模块语法 `export default`。

```js
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

添加 Tailwind 的 CSS 文件。

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

在 `main.js` 中引入。

```js
// main.js
import './index.css';
```
