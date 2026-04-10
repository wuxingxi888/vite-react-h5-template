---
name: create-component
description: 指导在前端项目中按团队规范创建和维护 React 组件，涵盖通用组件与页面级组件的边界、目录结构、样式隔离、类型设计与导出策略。当前端需要新增、拆分或沉淀组件时使用本技能。
---

# 创建与维护组件

## 使用场景

当你需要：

- 新增一个通用组件
- 为某个页面新增页面级私有组件
- 拆分过大的页面或组件
- 将页面级组件沉淀为通用组件

请使用本技能，并同时遵守：

- `.agents/rules/03-项目结构.md`
- `.agents/rules/04-组件规范.md`
- `.agents/rules/09-样式规范.md`

---

## 目录与放置规则

- 多个页面复用、业务无关的组件：放在 `src/components/<ComponentName>/`
- 仅当前页面使用的组件：放在 `src/views/<page-name>/components/<ComponentName>/`
- 页面私有组件禁止提前提升到 `src/components/`

标准结构：

```text
src/components/ComponentName/
  ├── index.tsx
  └── index.module.scss
```

或：

```text
src/views/<page-name>/components/ComponentName/
  ├── index.tsx
  └── index.module.scss
```

---

## 步骤 1：确认组件边界

创建前先判断：

- 这个组件是否会被多个页面稳定复用
- 这个组件是否依赖明显的页面业务语义
- 这个组件是否只是当前页面结构拆分的一部分

判断结论：

- 可复用且业务无关：通用组件
- 当前页面专属：页面级组件

---

## 步骤 2：创建组件文件

示例：

```tsx
import classNames from 'classnames';
import styles from './index.module.scss';

interface UserCardProps {
  title: string;
  className?: string;
}

export default function UserCard({ title, className }: UserCardProps) {
  return <div className={classNames(styles.card, className)}>{title}</div>;
}
```

对应样式：

```scss
.card {
  display: flex;
}
```

---

## 步骤 3：处理导出策略

- 组件目录内部固定使用 `index.tsx` 作为入口
- 若项目存在 `src/components/index.ts` 公共出口，可按需补充导出
- 页面级组件不要加入根级公共出口

---

## 步骤 4：检查样式隔离

- 局部样式优先使用 `index.module.scss`
- 全局样式只允许放在 `src/styles/`
- 覆盖组件库样式时，仅在当前组件根容器内局部嵌套 `.adm-*`

---

## 步骤 5：检查职责与可维护性

- 页面组件应以编排为主，复杂 UI 片段应拆到子组件
- 单个 `.tsx` 文件过大时优先拆分
- Props 保持语义清晰，避免布尔开关不断膨胀
- 组件内不要直接耦合路由注册、全局 store 初始化、请求层细节

---

## 迁移场景

### 页面级组件晋升为通用组件

适用条件：

- 已被 2 个及以上页面稳定复用
- 页面专属依赖可以剥离

操作：

1. 移动目录到 `src/components/<ComponentName>/`
2. 修复导入路径
3. 若有公共出口，按需补充导出
4. 执行类型检查与回归验证

### 通用组件降级为页面级组件

适用条件：

- 长期仅在单页面使用
- 内含明显业务耦合逻辑

操作：

1. 移动目录到 `src/views/<page-name>/components/<ComponentName>/`
2. 修复导入路径
3. 移除不该继续暴露的公共导出
4. 执行类型检查与回归验证

---

## 快速检查清单

- [ ] 组件放置位置是否正确
- [ ] 是否使用 `index.tsx` + `index.module.scss`
- [ ] Props 是否显式类型化
- [ ] 页面级组件是否没有误暴露到根级公共出口
- [ ] 是否避免使用全局样式污染
- [ ] 组件职责是否单一、命名是否语义化

---

## 与其它技能的关系

- `create-route`：页面开发时，页面级组件通常与新路由一起创建
- `create-proposal`：提案中若涉及组件开发，可引用本技能
- `theme-variables`：涉及主题样式时配合使用
