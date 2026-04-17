---
name: create-route
description: 指导在前端项目中按团队规范创建和维护路由（React Router Data Router），涵盖路由单源、页面目录、路由模块注册、懒加载、标题与守卫等约束。当前端需要新增或重构页面路由时使用本技能。
---

# 创建与维护路由

## 适用前提

- 适用于 React 18 + React Router 7 的前端路由开发
- 目录前提：使用 `src/routes/` 与 `src/views/` 口径
- 依赖前提：以 React Router Data Router 为推荐基线，不默认引入第二套路由系统
- 若项目扩展规则未声明 `meta` 或 `handle` 之外的元信息模型，不得自行发明新字段体系

## 重要提示

在开始创建之前，请务必阅读以下关键规范：

**必读规范**：
- `.agents/rules/03-项目结构.md` - 目录结构要求（特别是 `index.module.scss`）
- `.agents/rules/06-路由规范.md` - 路由配置约束

**模板路由实现要点（先对齐再动手）**：
- 路由基线：React Router 7 + Data Router 风格（`createBrowserRouter` + `RouterProvider`）。
- 路由单源：router 由 `src/routes/index.tsx` 创建；路由表只允许在一个入口维护或由 `src/routes/modules/**/*.tsx` 统一聚合。
- 懒加载统一入口：页面级路由应使用统一的懒加载包装方式，避免在每个页面重复写 `Suspense`。
- 守卫与标题：应通过统一路由入口处理 `loader`、标题和守卫逻辑；**禁止**在页面里用 `useEffect` 做登录判断再跳转。
- 路由元信息：团队必须固定使用 `meta` 或 `handle` 其中一种，不得混用两套口径。

**常见错误警告**：
- **路径命名**：静态路径段统一 `kebab-case`（如 `/user-settings`）；动态参数使用 `camelCase`（如 `/:userId`），避免无语义的 `/:id`（除非团队明确同意）。
- **不要混用两套路由系统**：项目已使用 Data Router，禁止再引入 `<BrowserRouter><Routes>` 另一套路由系统。
- **不要在页面内部另起 `<Routes>`** 维护“子路由系统”（除非明确为独立子应用/微前端，并在架构文档写清边界）。
- **页面级必须懒加载**：新增页面路由应通过统一懒加载包装装配，保持全站 fallback/动画一致。
- **样式文件**：新增页面/页面内组件统一优先使用 `index.module.scss`。

---

## 执行前检查

- 先确认当前项目使用 `meta` 还是 `handle` 作为元信息承载；新增路由时保持全局唯一口径
- 检查根级是否已有默认重定向、404、根级 `errorElement`，新增路由时不得破坏唯一性
- 检查懒加载包装方式是否已有统一入口，避免每页重复造 `Suspense`

---

## 标准路由目录结构

本模板新增一个“页面路由”，通常涉及两处（页面实现 + 路由模块声明），并由“路由聚合器”自动汇总：

```text
# 1) 页面实现（最终被路由渲染）
src/views/login/
  ├─ index.tsx
  └─ index.module.scss

# 2) 路由声明（单源：只在 routes/modules 维护）
src/routes/modules/base.tsx        # 或按业务域拆分为新 module 文件

# 3) 路由聚合与统一配置（无需改动，但要知道它们存在）
src/routes/index.tsx               # createBrowserRouter(routes)
src/routes/modules/                # 路由模块片段
src/routes/guards/                 # 守卫（可选）
src/routes/utils/                  # LazyLoad 等路由工具（可选）
```

**关键要求**：
- **页面目录**：`src/views/<page-name>/index.tsx` 为入口；页面名建议 `kebab-case`（对齐项目结构规则）。
- **样式**：页面样式优先 `index.module.scss`（非 `.scss`）。
- **路由声明单源**：仅在 `src/routes/index.tsx` 或 `src/routes/modules/**/*.tsx` 增改路由对象；禁止在页面里注册路由。
- **路径命名**：静态段 `kebab-case`；动态参数 `camelCase`；资源型路由推荐：`/users`、`/users/:userId`、`/users/:userId/edit`。

---

## 步骤 1：创建 Page 组件

```tsx
// src/views/login/index.tsx
import styles from './index.module.scss';

export default function LoginPage() {
  return <div className={styles.page}>Login</div>;
}
```

**验证点**：
- [ ] 页面入口为 `src/views/<page>/index.tsx`
- [ ] 样式优先使用 `./index.module.scss`
- [ ] 默认导出页面组件（与现有页面目录约定一致）

---

## 步骤 2：接入页面懒加载

模板推荐使用统一懒加载装配，一般**不需要**为每个页面创建独立的 `Loader.tsx` 文件；请在路由模块里使用统一封装的懒加载方法包装页面即可（统一 fallback/动画，减少重复代码）。

```tsx
// src/routes/modules/base.tsx（示例片段）
import { lazy } from 'react';

import { LazyLoad } from '../utils/LazyLoad';

export const loginRoute = {
  path: '/login',
  meta: { title: '登录' },
  element: LazyLoad(lazy(() => import('@/views/login'))),
};
```

**验证点**：
- [ ] 页面级路由使用统一懒加载包装（不要在页面内重复写 `Suspense`）
- [ ] Vite 项目不使用 `webpackChunkName` 注释
- [ ] `meta.title` 已配置（用于统一设置 `document.title`）

---

## 步骤 3：在全局路由中注册

在本模板中，“注册路由”指的是：**在 `src/routes/index.tsx` 或 `src/routes/modules/**/*.tsx` 中维护路由对象**，并保持全局只有一份唯一路由表入口。

```tsx
// src/routes/modules/base.tsx（示例：独立页面）
import { lazy } from 'react';

import type { routeItem } from '../index';
import { LazyLoad } from '../utils/LazyLoad';

const routes: routeItem[] = [
  {
    path: '/login',
    meta: { title: '登录' },
    element: LazyLoad(lazy(() => import('@/views/login'))),
  },
];

export default routes;
```

**验证点**：
- [ ] 只在 `src/routes/index.tsx` 或 `src/routes/modules/**/*.tsx` 增改路由（单源）
- [ ] `path` 命名符合规范（静态段 kebab-case；动态参数 camelCase）
- [ ] `meta.title` 必填（标题统一由路由入口处理）
- [ ] `element` 使用 `LazyLoad(lazy(() => import('@/views/...')))` 装配

> 布局嵌套路由应由父级 `element` 承载布局，`children` 声明嵌套页面。不要在子页面里复制粘贴公共布局。

---

## 步骤 4：验证文件结构

创建完成后，检查目录结构是否符合规范：

```text
# 页面实现
src/views/<page>/
  ├─ index.tsx              ✓
  └─ index.module.scss      ✓（优先）

# 路由声明（单源）
src/routes/modules/<module>.tsx    ✓（已声明 path/element/meta）
```

**额外一致性检查**：
- [ ] `/` 默认重定向与 `/*` 404 兜底仍保持唯一且可达（不要在别处重复定义 `*`）。
- [ ] 新增路径不会与现有路径冲突（尤其是 404 兜底与旧路径迁移）。
- [ ] 根级或关键业务子树的 `errorElement` 仍存在且职责清晰。

---

## 页面级组件放置

如果页面需要专用组件，创建 `components/` 目录：

```text
src/views/<page-name>/
  ├─ index.tsx
  ├─ index.module.scss
  └─ components/                 # 页面专用组件
      └─ ComponentName/
          ├─ index.tsx
          └─ index.module.scss
```

**组件放置规则**（详见 `.agents/rules/04-组件规范.md`）：
- 页面级组件（仅当前页面使用）→ `src/views/<page>/components/`
- 通用组件（多处复用）→ `src/components/`

---

## 快速检查清单

创建完成后，逐项核对：

- [ ] **单一事实来源**：仅在 `src/routes/index.tsx` 或 `src/routes/modules/**/*.tsx` 维护路由对象；未引入第二套路由系统
- [ ] **路径命名**：静态段 `kebab-case`；动态参数 `camelCase`；资源型路由写法清晰
- [ ] **页面懒加载**：页面级路由使用统一懒加载包装；不在页面内重复写 `Suspense`
- [ ] **标题一致性**：已填写 `meta.title`，标题由统一路由入口设置（不在页面里散落设置）
- [ ] **元信息口径**：全局只使用 `meta` 或 `handle` 其中一种；新增路由未引入第二套字段
- [ ] **守卫位置正确**：鉴权/白名单/权限重定向放在 `loader`（或团队统一 wrapper）中，禁止页面 `useEffect` 跳转
- [ ] **重定向与 404**：`/` 默认重定向与 `/*` 兜底路由保持唯一，不在多个模块重复定义 `*`
- [ ] **错误边界**：根级错误边界可达，关键业务子树按需有局部错误边界
- [ ] **页面目录规范**：`src/views/<page>/index.tsx` 存在且默认导出；样式优先 `index.module.scss`
- [ ] **组件边界**：页面专用组件在 `src/views/<page>/components/`；通用组件在 `src/components/`

---

## 失败回退

- 若无法确认是 `meta` 还是 `handle`，默认沿用仓库当前已存在的唯一口径，不新增第三种字段
- 若暂时无法引入新的守卫层，至少不要把跳转逻辑塞进页面 `useEffect`
- 若关键页面不适合立即懒加载，应在说明中明确原因，并保持 fallback 口径一致

**样式还原检查**：涉及 UI 还原的样式开发，请参考 `.agents/skills/create-proposal/SKILL.md` 中的「样式还原验证检查清单」及对应页面的 `docs/样式还原/<名称>-UI分析清单.md`。
