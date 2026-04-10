---
title: CSS 优先级覆盖问题
impact: HIGH
impactDescription: 组件样式被页面级样式覆盖，布局失效
tags: errors, css, priority, specificity, modules
---

## CSS 优先级覆盖问题

**错误模式**：组件样式被覆盖

| 错误模式 | 典型表现 | 根本原因 | 避免方法 |
|---------|---------|----------|----------|
| **组件样式被覆盖** | 组件布局失效（如 flex 变成 block） | 页面级样式覆盖了组件内部样式 | 检查 CSS 优先级，使用更具体的选择器或 CSS Modules |

**Incorrect（页面级样式覆盖组件样式）：**

```css
/* 页面级样式 */
.card {
  display: block; /* 覆盖了组件的 flex */
}

/* 组件内部样式 */
.card {
  display: flex; /* 被页面级样式覆盖 */
}
```

**Correct（使用 CSS Modules 或更具体的选择器）：**

```css
/* 使用 CSS Modules */
.card {
  display: flex;
}

/* 或使用更具体的选择器 */
.page .card {
  display: flex;
}
```

**验收时检查**：
- [ ] 组件样式是否被页面级样式覆盖（如 `display: block` 覆盖了 `display: flex`）？
- [ ] 传入的 `className` 是否会覆盖组件内部的关键样式？
- [ ] 是否使用了 CSS Modules 的类名冲突检查？

**验收时特别关注**：
- 检查 CSS 优先级覆盖问题（组件样式是否被页面级样式覆盖）
