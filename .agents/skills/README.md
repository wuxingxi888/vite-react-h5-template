# 技能索引

本目录包含面向 React 通用项目的 AI 执行技能。技能用于补充 rules，提供更具体的操作步骤、模板和检查清单。

## 使用原则

1. 先看 `.agents/rules/`，确认目录、命名、边界与基础约束。
2. 再根据任务类型选择对应 skill，按步骤执行。
3. 若 rules 与 skill 冲突，以 rules 为准；若多个 skill 冲突，以更贴近当前任务的 skill 为准。
4. 若 skill 中出现某个具体项目实现细节，而当前项目并不存在，应回退到模板基线，不得生搬硬套。

## 技能地图

### 需求与提案

- `create-proposal`
  - 用途：写 proposal、tasks、spec
  - 适合：页面需求、组件需求、接口需求、UI 还原需求

### 页面与路由

- `create-route`
  - 用途：新增或调整页面路由
  - 适合：新页面、路由改造、守卫接入、路由模块化

### 组件

- `create-component`
  - 用途：新增、拆分、沉淀组件
  - 适合：通用组件、页面级组件、组件迁移

### 接口与数据层

- `create-api`
  - 用途：新增接口、请求层封装、mock 过渡
  - 适合：业务 API、新增 DTO、axios 客户端整理

### 状态管理

- `create-store`
  - 用途：新增或重构 Zustand store
  - 适合：客户端共享状态、持久化状态

### 样式与主题

- `theme-variables`
  - 用途：主题变量、暗黑模式、样式规范对齐
  - 适合：颜色治理、CSS variables、组件库变量覆盖

### 设计分析与验收

- `design-analysis`
  - 用途：分析设计稿，产出 UI 分析清单
  - 适合：有设计稿或明确 UI 描述的需求

- `ui-verification`
  - 用途：对照设计稿验收页面效果
  - 适合：实现完成后的还原度检查与问题追踪

## 参考技能

以下技能默认作为参考，不应覆盖本模板基线：

- `vercel-react-best-practices`
  - 说明：性能与工程最佳实践参考
  - 注意：Next.js、RSC、Server Actions 相关规则仅在项目实际使用这些能力时启用

- `vercel-composition-patterns`
  - 说明：组件组合与架构参考
  - 注意：React 19 相关规则不是当前模板默认基线

- `web-design-guidelines`
  - 说明：UI 设计与体验审查参考

## 推荐触发顺序

常见任务可按以下顺序组合：

- 新页面开发：`create-proposal` -> `design-analysis` -> `create-route` -> `create-component` -> `create-api` -> `create-store` -> `ui-verification`
- 新功能组件：`create-proposal` -> `create-component` -> `theme-variables`
- 接口联调：`create-proposal` -> `create-api` -> `create-store`
- UI 还原：`design-analysis` -> 开发技能 -> `ui-verification`

## 扩展约定

- 新增 skill 时，优先复用现有 rules，不要自己重新发明目录结构和命名体系
- 新增 skill 若绑定具体框架能力或运行时前提，必须在开头写清“适用边界”
- 新增 skill 后，应同步更新本索引
