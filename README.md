# uniapp-typescript-template

- [uniapp-typescript-template](#uniapp-typescript-template)
  - [Structure 项目结构](#Structure-%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84)
  - [Environment Variables 环境变量](#Environment-Variables-%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)
  - [Request 网络请求](#Request-%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82)
  - [Theme 主题](#Theme-%E4%B8%BB%E9%A2%98)
    - [设置默认值](#%E8%AE%BE%E7%BD%AE%E9%BB%98%E8%AE%A4%E5%80%BC)
    - [修改主题条目](#%E4%BF%AE%E6%94%B9%E4%B8%BB%E9%A2%98%E6%9D%A1%E7%9B%AE)
  - [Snippets 代码片段](#Snippets-%E4%BB%A3%E7%A0%81%E7%89%87%E6%AE%B5)
  - [Lint 代码检查](#Lint-%E4%BB%A3%E7%A0%81%E6%A3%80%E6%9F%A5)
    - [1. Manually 手动](#1-Manually-%E6%89%8B%E5%8A%A8)
    - [2. Automatically 自动](#2-Automatically-%E8%87%AA%E5%8A%A8)

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

提供VSCode代码片段<font color="#55ccbb"> \<vue> class-page-with-theme</font> 以方便创建

注意：为了保证主题在每个页面生效，请确保

1. 在pages.json中的每个页面均引入ThemeVue作为基类

```typescript
import { Component } from 'vue-property-decorator'
import ThemeVue from '@/mixins/theme.vue'

@Component({
    name: 'Example',
})
export default class extends ThemeVue {
    // 避免属性名为theme
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

