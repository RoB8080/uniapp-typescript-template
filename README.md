# uniapp-typescript-template

- [uniapp-typescript-template](#uniapp-typescript-template)
  - [Structure 项目结构](#structure-%e9%a1%b9%e7%9b%ae%e7%bb%93%e6%9e%84)
  - [Environment Variables 环境变量](#environment-variables-%e7%8e%af%e5%a2%83%e5%8f%98%e9%87%8f)
  - [Request 网络请求](#request-%e7%bd%91%e7%bb%9c%e8%af%b7%e6%b1%82)
  - [Theme 主题](#theme-%e4%b8%bb%e9%a2%98)
    - [设置默认值](#%e8%ae%be%e7%bd%ae%e9%bb%98%e8%ae%a4%e5%80%bc)
    - [修改主题条目](#%e4%bf%ae%e6%94%b9%e4%b8%bb%e9%a2%98%e6%9d%a1%e7%9b%ae)
  - [Snippets 代码片段](#snippets-%e4%bb%a3%e7%a0%81%e7%89%87%e6%ae%b5)
  - [Lint 代码检查](#lint-%e4%bb%a3%e7%a0%81%e6%a3%80%e6%9f%a5)
    - [1. Manually 手动](#1-manually-%e6%89%8b%e5%8a%a8)
    - [2. Automatically 自动](#2-automatically-%e8%87%aa%e5%8a%a8)

## Structure 项目结构

```
root
├─ .vscode // vscode相关
│  └─ common.code-snippets // 代码片段
├─ lint // lint 配置文件夹
│  └─ style-order.js
├─ public
│  └─ index.html // 项目根html文件 !勿改
├─ src // 源文件目录
│  ├─ api // api文件夹
│  ├─ component // 公共组件
│  ├─ pages // 页面目录
│  │  └─ example // example页面文件夹
│  │     ├─ index.vue // 主页面
│  │     ├─ sub.vue // 子页面
│  │     └─ component // 私有组件 
│  ├─ static // 静态资源
│  ├─ store
│  │  ├─ module // 存放store模块的文件夹
│  │  └─ index.ts
│  ├─ style // 全局样式文件夹
│  │  └─ variables.scss // 全局SCSS变量文件
│  ├─ utils
│  │  ├─ request.ts // 网络请求模块
│  │  └─ update-manager.ts // 更新管理功能模块
│  ├─ App.vue // Vue根节点
│  ├─ main.ts // 代码主入口 
│  ├─ mainfest.json // uni应用配置
│  ├─ pages.json // uni页面表(代替router)
│  └─ sfc.d.ts
├─ .env.development // 环境变量-开发 
├─ .env.production // 环境变量-生产
├─ .eslintrc.js // Eslint 配置文件
├─ .gitignore // git忽略 配置文件
├─ .stylelintrc.js // Stylelint 配置文件
├─ .babel.config.js // babel 配置文件
├─ package.json // 项目配置文件
├─ postcss.config.js // CSS处理配置文件
├─ README.md
├─ tsconfig.json // TypeScript 配置文件
├─ vue.config.js // Vue CLI 配置文件
└─ yarn.lock
```

## Environment Variables 环境变量

于 /根目录/.env.* 中配置

## Request 网络请求

由axios封装并适配uniapp

调用方法与axios保持基本一致

```typescript
import request from '@/utils/request'

request({
    url: '链接',
    params: {},
    method: 'GET',
    data: {}, // !!! 注意点
    // 正常情况: 为request body
    // method为GET: 和params合并处理(不建议)
})
```

## Theme 主题

主要通过CSS变量以及Vuex实现

注意：为了保证主题在每个页面生效，请确保

1. 在pages.json中的每个页面里获取ThemeModule中的themeStyleString

```typescript
private get theme() {
    return this.$store.getters['theme/themeStyleString']
}
```

2. 为这些页面的根元素加上style属性
```html
<template>
    <view class="root-element" :style="theme"></view>
</template>
```

### 设置默认值

于 "@/store/module/theme.ts" 文件中，修改 defaultTheme 变量，其中属性名为CSS变量名，值为CSS变量值。（不限于颜色）

### 修改主题条目

调用 ThemeModule.SetRule 以覆盖原值

## Snippets 代码片段

为VSCode添加代码片段，以方便构建项目

输入前缀任意关键字以调用代码片段

| 前缀                      | 片段名           | 备注               |
| ------------------------- | ---------------- | ------------------ |
| \<vue> class-component    | ClassComponent   | Vue页面/组件模板   |
| \<vue> class-store-module | ClassStoreModule | Vuex模块模板       |
| \<uni> page               | UniPage          | pages.json快速构建 |

## Lint 代码检查

### 1. Manually 手动

在终端可以通过指令手动lint
```
# 检查
npm run lint
npm run lint:style
# 检查并自动修复
npm run lint --fix
npm run lint:style --fix
```

### 2. Automatically 自动

在commit代码前会自动进行代码风格检查,如代码检测不通过则无法成功commit。

