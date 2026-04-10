---
title: 页面容器宽度限制错误
impact: HIGH
impactDescription: 右侧大片留白，影响视觉体验
tags: errors, layout, container, max-width, responsive
---

## 页面容器宽度限制错误

**错误模式**：页面容器宽度限制

| 错误模式 | 典型表现 | 根本原因 | 避免方法 |
|---------|---------|----------|----------|
| **页面容器宽度限制** | 右侧大片留白 | 写死 `max-width`，未考虑响应式 | 除非设计稿特别说明，否则不限制 `max-width` |

**Incorrect（写死 max-width）：**

```css
.page-container {
  max-width: 1200px; /* 写死宽度，未考虑响应式 */
  margin: 0 auto;
}
```

**Correct（自适应宽度）：**

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
- `writing-page-container-width.md` - 页面容器宽度规则
