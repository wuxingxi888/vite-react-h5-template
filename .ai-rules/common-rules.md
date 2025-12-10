# 项目统一 AI 助手规则

## 技术栈

- **构建工具**: Vite 7+
- **框架**: React 18+ (函数式组件 + Hooks)
- **语言**: TypeScript 5.8+ (严格模式)
- **状态管理**: Zustand + Immer
- **路由**: React Router 7
- **UI 组件库**: Ant Design Mobile
- **样式方案**: SCSS + UnoCSS (原子化 CSS)
- **包管理器**: pnpm (必须使用 pnpm，不允许 npm/yarn)
- **图表库**: ECharts
- **动画库**: Framer Motion

## 代码规范

### TypeScript

- 使用 TypeScript 严格模式
- 避免使用 `any` 类型，优先使用具体类型或 `unknown`
- 使用 `as const` 定义常量数组/对象，确保类型推断
- 未使用的变量使用 `_` 前缀（如 `_unusedVar`）

### React

- 使用函数式组件，禁止使用类组件
- 优先使用 React Hooks
- 使用 `memo` 优化组件性能（特别是列表项组件）
- 为使用 `memo` 的组件设置 `displayName`
- 使用 `lazy` 和 `LazyLoad` 进行路由懒加载
- 组件 props 使用 TypeScript 接口定义，并添加 JSDoc 注释

### 代码质量

- 遵循项目的 ESLint 配置
- 遵循 Prettier 代码格式化规则
- 遵循 Stylelint 样式规范
- 使用函数式编程风格
- 优先使用 `const`，避免使用 `var`
- 使用解构赋值简化代码

## 项目结构

- **页面文件**: 放在 `src/views/` (不是 `src/pages/`)
- **组件**: 放在 `src/components/`
- **工具函数**: 放在 `src/utils/`
- **路由配置**: 放在 `src/router/modules/`
- **状态管理**: 放在 `src/store/modules/`
- **样式文件**: 放在 `src/styles/`
- **类型定义**: 放在 `src/types/`
- **Hooks**: 放在 `src/hooks/`
- **服务**: 放在 `src/services/`

## 命名约定

- **组件**: 使用 PascalCase (如 `CustomNavBar`)
- **文件/目录**: 使用 kebab-case (如 `custom-nav-bar/index.tsx`)
- **变量/函数**: 使用 camelCase (如 `handleClick`)
- **常量**: 使用 UPPER_SNAKE_CASE (如 `API_BASE_URL`)
- **类型/接口**: 使用 PascalCase (如 `UserInfo`)

## 导入规范

- 使用 `@/` 别名导入 src 目录下的文件
- 导入顺序：第三方库 → 项目内部模块 → 相对路径导入
- 使用 Prettier 自动排序导入
- 避免循环依赖

## 状态管理 (Zustand)

- 使用 `create` 创建 store
- 使用 `immer` 中间件处理不可变数据更新
- 使用 `persist` 中间件进行状态持久化（如需要）
- Store 文件命名：`useXxxStore.ts`
- 将 State 和 Action 类型分离定义

## 路由规范

- 路由配置放在 `src/router/modules/` 目录
- 使用 `lazy` 和 `LazyLoad` 进行路由懒加载
- 路由对象使用 `routeItem` 类型，包含 `meta` 字段
- 路由守卫逻辑放在 `src/router/utils/RouteGuard.tsx`

## 样式规范

- 优先使用 UnoCSS 原子类（如 `flex-center`、`text-overflow`）
- 复杂样式使用 SCSS 文件
- SCSS 文件与组件文件同名，放在同一目录
- 使用全局 SCSS 变量（`src/styles/scss/var.scss`）
- 移动端适配使用 PostCSS px 转 viewport
- 支持暗色主题，使用 `dark:` 前缀

## 性能优化

- 使用 `memo` 优化组件渲染
- 使用 `useMemo` 和 `useCallback` 优化计算和函数
- 路由使用懒加载
- 图片使用适当的格式和压缩
- 避免在渲染函数中创建新对象/数组

## 业务规则

- 异步操作使用 `async/await`，避免使用 `.then()`
- 错误处理使用 `try-catch`
- API 请求统一放在 `src/services/` 目录
- 使用环境变量管理不同环境的配置
- H5 页面需要考虑安全区域适配（safe-area-inset）

## Git 提交规范

- 遵循 Conventional Commits 规范
- 使用 `pnpm run lint:all` 检查代码
- 提交前自动运行 lint-staged 检查

## 其他规范

- 使用 `pnpm` 安装依赖，禁止使用 `npm` 或 `yarn`
- 组件导出使用 `export default` 或命名导出
- 工具函数优先使用 `es-toolkit` 库
- 事件处理函数使用 `handle` 前缀（如 `handleClick`）
- 布尔值变量使用 `is`、`has`、`should` 等前缀
