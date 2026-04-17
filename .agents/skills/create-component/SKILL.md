---
name: create-component
description: 指导在前端项目中按团队规范创建和维护 React 组件，涵盖通用组件与页面级组件的边界、目录结构、样式隔离、类型设计与导出策略。当前端需要新增、拆分或沉淀组件时使用本技能。
---

# 创建与维护组件

## 适用前提

- 适用于 React 18 通用前端组件开发
- 目录前提：遵守 `src/components/` 与 `src/views/<page>/components/` 双层边界
- 依赖前提：无需额外依赖；若项目已安装 `classnames`，可选使用，但不是默认前提
- 若任务需要 compound components、复杂组合 API 或 React 19 能力，应先确认是否属于基线范围

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

## 执行前检查

- 先判断该组件是通用组件还是页面级组件，再决定目录
- 检查是否真的需要新增依赖；未声明前提时不要默认引入 `classnames`
- 检查组件是否已经出现明显的布尔开关膨胀或 API 复杂化，必要时再参考 `vercel-composition-patterns`

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
import styles from './index.module.scss';

interface UserCardProps {
  title: string;
  className?: string;
}

export default function UserCard({ title, className }: UserCardProps) {
  return <div className={[styles.card, className].filter(Boolean).join(' ')}>{title}</div>;
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
- 当一个组件超过约 400 行、承担多个布局片段、或同时处理多个独立交互区块时，应评估拆分
- 当 Props 中连续出现多个 `isXxx` / `showXxx` / `withXxx` 开关时，应视为 API 膨胀预警

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
- [ ] 是否先完成“通用 / 页面级”边界判断，再决定目录
- [ ] 是否未默认引入模板未声明的第三方依赖
- [ ] 是否避免了布尔开关膨胀；如已复杂化，是否明确需要再引入组合模式

---

## 失败回退

- 若无法确认组件是否通用，默认先落在页面级目录，等复用稳定后再晋升
- 若项目未安装 `classnames` 等辅助库，回退到原生 class 拼接方案
- 若组件 API 已明显复杂但当前任务不允许改架构，先保持语义 props 清晰，不强行引入高级模式

---

## 与其它技能的关系

- `create-route`：页面开发时，页面级组件通常与新路由一起创建
- `create-proposal`：提案中若涉及组件开发，可引用本技能
- `theme-variables`：涉及主题样式时配合使用
