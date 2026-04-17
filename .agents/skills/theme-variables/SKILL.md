---
name: theme-variables
description: 指导在前端项目中正确使用 Ant Design 与自定义主题 CSS 变量，避免硬编码颜色并保证暗色/浅色主题切换一致性。当前端编写或修改样式时使用本技能。
---

# 主题 CSS 变量与样式规范

## 适用前提

- 适用于 React 18 通用前端样式开发
- 目录前提：组件与页面局部样式遵守 `index.module.scss`，全局主题能力位于 `src/styles/`
- 依赖前提：优先使用模板已声明的 CSS Variables、UnoCSS、SCSS mixins，不负责发明新的主题同步机制
- 若需求超出模板基线主题能力，应先补项目扩展规则

## 使用场景

当你在：

- 为组件/页面编写新的样式
- 修改已有样式以适配暗色/浅色主题

请使用本技能，并同时遵守：

- `.agents/rules/09-样式规范.md`（本模板样式规范与暗黑/主题落地口径）
- `.agents/rules/04-组件规范.md`（组件边界与样式隔离要求，避免污染）

---

## 执行前检查

- 先判断这处颜色是否属于“可主题化颜色”，再决定用变量还是固定色
- 先检查是否已有 `--adm-*` 或项目主题变量可以表达，不要先发明新变量
- 先确认当前任务是否只是样式落地；本技能不负责定义主题同步的运行时实现

---

## 基本原则

- 本模板 UI 组件库以 `antd-mobile` 为准，主题与暗黑模式优先走其 CSS 变量体系（`--adm-*`）。
- 暗黑/浅色切换由项目统一在 `html` 上切换 `light/dark` 类完成；业务组件/页面**禁止**自行实现 `prefers-color-scheme` 或重复写 `setProperty` 注入主题色。
- 颜色类样式遵循“可主题化优先”：
  - **必须**使用 CSS 变量或项目主题 mixin 表达会随主题变化的颜色（主背景/主文字/强调色/容器背景/边框等）。
  - **禁止**硬编码会影响主题一致性与可读性的颜色值（例如 `#fff/#000/#1677ff` 等）。
- 优先级建议：
  - **布局/间距/排版**优先使用 UnoCSS 原子类（减少样式冲突、提升一致性）。
  - 需要工程化/复杂样式再使用 SCSS，并把覆盖限定在当前页面/组件根容器下（局部嵌套 `.adm-*`）。

---

## 常用 Ant Design 主题变量

本模板常用的是 `antd-mobile` CSS 变量（`--adm-*`）。在 SCSS 中可直接使用：

```scss
color: var(--adm-color-text);
background-color: var(--adm-color-background);
border-color: var(--adm-color-border);
```

常见变量举例：

- 主色：`var(--adm-color-primary)`（由项目统一同步注入）
- 文本色：`var(--adm-color-text)`
- 背景：`var(--adm-color-background)`
- 边框色：`var(--adm-color-border)`

当你需要“跟随 light/dark 语义变化”的颜色（不仅仅是 `--adm-*`），应优先使用项目的 SCSS 主题能力：

- `src/styles/` 下的统一主题文件可提供 `@include use-theme { ... }` 与 `get-var('xxx')`
- 用法示例（组件/页面局部根容器内）：

```scss
.some-root {
  @include use-theme {
    color: get-var('main-text-color');
    background-color: get-var('main-card-bg-color');
  }
}
```

---

## 自定义主题变量示例

当 `--adm-*` 与项目主题变量无法表达你的业务语义时，可以定义“自有语义变量”，但必须满足：

- 变量名**语义化**（表达用途而非颜色值），并在主题切换时仍保持语义一致
- 尽量收敛在项目统一主题/变量文件中，避免在业务页面随意“发明变量”

示例（仅示意命名风格）：

- `var(--app-card-bg)`
- `var(--app-radius-lg)`
- `var(--app-font-cn)`

在组件样式中的使用：

```scss
.card {
  background-color: var(--app-card-bg);
  border-radius: var(--app-radius-lg);
  font-family: var(--app-font-cn);
}
```

如果你只是想做暗黑/浅色差异，不建议为每处都加自定义变量；优先：

- UnoCSS：使用 `dark:(...)` / `dark:text-*` 等变体
- SCSS：用 `@include use-theme { ... }` + `get-var('...')`

## 主题变量优先级

从高到低推荐：

1. `--adm-*` 组件库变量
2. 项目统一主题变量 / mixin（如 `get-var('...')`）
3. 自定义语义变量（需能跨主题保持语义稳定）
4. 固定装饰性颜色硬编码（仅在例外场景使用）

---

## 反例（不要这样写）

```scss
// ❌ 硬编码颜色，不随主题变化
.button {
  background-color: #1677ff;
  color: #ffffff;
}
```

---

## 快速检查清单

- [ ] 所有颜色是否都来自 `var(--xxx)` 变量？
- [ ] 是否优先使用 `--adm-*`（组件库变量）或项目主题 `get-var('...')`，最后才考虑自定义语义变量？
- [ ] 是否在 UnoCSS 中使用 `dark:(...)` 变体处理暗黑差异，而不是手写媒体查询？
- [ ] 是否避免在组件/页面样式中写死“会随主题变化”的颜色值？如确需硬编码，是否能说明其为固定装饰性/演示性颜色且不破坏暗黑可读性？

---

## 失败回退

- 若无法确认颜色是否需要主题化，默认按“可主题化颜色”处理，优先使用变量
- 若现有变量无法表达业务语义，先复用最接近的统一主题变量，再评估是否新增自定义语义变量
- 若必须硬编码，需明确其属于固定装饰性颜色，本技能不负责新增主题同步实现
