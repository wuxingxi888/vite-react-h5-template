---
title: 页面容器宽度规则
impact: HIGH
impactDescription: 避免右侧大片留白，提升页面自适应能力
tags: writing, layout, container, responsive, max-width
---

## 页面容器宽度规则

验收时发现的问题，很多是**编写代码时缺乏主流网页设计常识**导致的。应在实现阶段就主动避免这些反审美的效果，而不是等到验收才发现。

**核心原则**：页面应自适应视口宽度，避免割裂的留白效果。除非设计稿明确要求固定宽度，否则默认不限制 `max-width`。

**Incorrect（写死 max-width 导致右侧大片留白）：**

```css
.page-container {
  max-width: 1200px; /* 写死宽度，未考虑响应式 */
  margin: 0 auto;
}
```

**Correct（自适应视口宽度）：**

```css
.page-container {
  width: 100%; /* 自适应视口宽度 */
  padding: 0 16px; /* 可选：添加内边距 */
}
```

**验收时检查**：
- [ ] 页面容器是否有不必要的 `max-width` 限制？
- [ ] 是否有右侧大片留白的问题？

**相关规则**：
- `errors-page-container-width.md` - 页面容器宽度限制错误
