# uniapp-typescript-template

## Menu 目录

- ### [项目结构](#structure-%e9%a1%b9%e7%9b%ae%e7%bb%93%e6%9e%84)
- ### [代码检查](#lint-%e4%bb%a3%e7%a0%81%e6%a3%80%e6%9f%a5)

## Structure 项目结构

```
project // 项目根目录
├─ public
│  └─ index.html // 项目根html文件 !勿改
├─ src // 源文件目录
│  ├─ component // 公共组件文件夹  
│  ├─ pages // 页面目录
│  │  └─ example // example页面文件夹
│  │     ├─ index.vue // 主页面
│  │     ├─ sub.vue // 子页面
│  │     └─ component // 私有组件文件夹   
│  ├─ static // 静态资源文件夹
│  ├─ style // 全局样式文件夹
│  │  └─ variables.scss // 全局SCSS变量文件
│  ├─ App.vue // Vue根节点
│  ├─ main.ts // 代码主入口 
│  ├─ mainfest.json // uni应用配置
│  ├─ pages.json // uni页面表(代替vue router)
│  ├─ sfc.d.ts // !勿改
├─ .eslintrc.js // Eslint配置文件
├─ .gitignore // git忽略配置文件
├─ .babel.config.js // babel配置文件
├─ package.json // 项目配置文件
├─ postcss.config.js // CSS处理配置文件
├─ README.md
├─ tsconfig.json // TypeScript配置文件
├─ vue.config.js // VueCli配置文件
└─ yarn.lock // yarn包管理文件 !勿改
```

## Lint 代码检查

### 1. Manually 手动

在终端可以通过指令手动lint
```
# 检查
npm run lint
# 检查并自动修复
npm run lint:fix
```

### 2. Automatically 自动

在commit代码前会自动进行代码风格检查,如代码检测不通过则无法成功commit。

