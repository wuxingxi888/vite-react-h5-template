# Vite React H5 Template

一个基于 Vite 的现代化 React H5 移动端开发模板，集成了丰富的功能和最佳实践，帮助你快速搭建高质量的移动端应用。

## 项目简介

这是一个开箱即用的 React H5 移动端开发模板，采用最新的技术栈和工程化实践，提供了完整的移动端开发解决方案。模板内置了路由、状态管理、主题切换、图标系统、动画效果等常见功能，让你可以专注于业务逻辑开发。

## 技术栈

- [React 18](https://reactjs.org/) - 用于构建用户界面的 JavaScript 库
- [Vite 7](https://vitejs.dev/) - 新一代前端构建工具，提供快速的开发体验
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集，提供类型安全
- [UnoCSS](https://unocss.dev/) - 即时按需的原子 CSS 引擎
- [React Router v7](https://reactrouter.com/) - React 官方推荐的路由解决方案
- [Zustand](https://github.com/pmndrs/zustand) - 轻量级状态管理库
- [Ant Design Mobile](https://mobile.ant.design/) - 专为移动端设计的 React 组件库
- [Framer Motion](https://www.framer.com/motion/) - 强大的 React 动画库

## 功能特性

- 🚀 基于 Vite 构建，开发体验极佳
- 📱 专为移动端优化，支持响应式设计
- 🎨 内置深色/浅色主题切换
- 🎯 完整的路由系统，支持路由守卫
- 📦 按需引入的图标系统
- 🎭 丰富的动画效果支持
- 🧠 状态管理方案 (Zustand)
- 📊 图表展示 (ECharts)
- 🎨 UnoCSS 原子化 CSS
- 🛡️ TypeScript 类型安全
- 🧪 ESLint + Prettier + Stylelint 代码规范
- 📱 移动端调试工具集成
- 🔄 动态脚本加载
- 🌍 WebView 支持

## 快速开始

### 环境要求

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### 安装依赖

```bash
pnpm install
```

### 开发调试

```bash
# 启动开发服务器
pnpm dev

# 启动生产环境服务器
pnpm prod
```

### 构建打包

```bash
# 构建测试环境
pnpm build:test

# 构建生产环境
pnpm build:prod
```

### 预览构建结果

```bash
# 预览测试环境构建结果
pnpm preview:test

# 预览生产环境构建结果
pnpm preview:prod
```

### 代码检查与格式化

```bash
# TypeScript 类型检查
pnpm typecheck

# ESLint 代码检查与修复
pnpm lint:eslint

# Stylelint 样式检查与修复
pnpm lint:style

# Prettier 代码格式化
pnpm lint:format

# 执行所有代码检查
pnpm lint:all
```

## 项目结构

```
src/
├── components/        # 公共组件
├── hooks/             # 自定义 Hooks
├── layout/            # 页面布局
├── plugins/           # 插件系统
├── router/            # 路由配置
├── services/          # 服务层（JS 与原生交互）
├── store/             # 状态管理
├── styles/            # 全局样式
├── types/             # TypeScript 类型定义
├── utils/             # 工具函数
├── views/             # 页面组件
├── App.tsx            # 根组件
└── main.tsx           # 入口文件
```

## 路由系统

项目采用文件路由的方式组织路由，路由配置位于 `src/router/modules/` 目录下：

- [base.tsx](file:///Users/wuxingxi/Desktop/react-h5-template/src/router/modules/base.tsx) - 基础路由（如登录页等）
- [menu.tsx](file:///Users/wuxingxi/Desktop/react-h5-template/src/router/modules/menu.tsx) - 主要页面路由

路由支持：

- 路由守卫
- 动态导入
- 路由元信息（标题、图标等）

## 主题系统

项目支持深色/浅色主题切换，可以通过 `useThemeStore` 进行主题管理。主题配置位于 `src/store/modules/useThemeStore.ts` 中。

## 状态管理

使用 Zustand 作为状态管理方案，相关文件位于 `src/store/modules/` 目录下：

- [useAppStore.ts](file:///Users/wuxingxi/Desktop/react-h5-template/src/store/modules/useAppStore.ts) - 应用级状态
- [useThemeStore.ts](file:///Users/wuxingxi/Desktop/react-h5-template/src/store/modules/useThemeStore.ts) - 主题状态
- [useUserStore.ts](file:///Users/wuxingxi/Desktop/react-h5-template/src/store/modules/useUserStore.ts) - 用户状态

## 样式系统

项目采用 UnoCSS 作为主要的样式解决方案，同时支持 SCSS 作为补充。

### UnoCSS 特性

- 原子化 CSS
- 图标系统（支持多种图标库）
- 属性模式
- 自定义快捷方式

### SCSS 支持

项目也支持传统的 SCSS 样式编写，全局样式文件位于 `src/styles/scss/` 目录下。

## 动画系统

项目集成了 Framer Motion 动画库，支持：

- 页面切换动画
- 组件动画效果
- 路由动画

## 移动端适配

项目采用 vw/vh 单位进行移动端适配，通过 PostCSS 插件自动转换 px 单位。

## 浏览器兼容性

项目支持主流的现代浏览器：

- Chrome >= 31
- Firefox >= 31
- iOS >= 7.1
- Android >= 4.1

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个模板。

## 许可证

[MIT](LICENSE) © TomCat

## 作者

[TomCat](https://github.com/wuxingxi888)
