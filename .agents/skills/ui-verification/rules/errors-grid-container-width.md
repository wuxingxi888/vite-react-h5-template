---
title: Grid 容器宽度问题
impact: HIGH
impactDescription: Grid 一行只有一个元素，列表竖向排列
tags: errors, layout, grid, container, width
---

## Grid 容器宽度问题

**错误模式**：Grid 一行只有一个

| 错误模式 | 典型表现 | 根本原因 | 避免方法 |
|---------|---------|----------|----------|
| **Grid 一行只有一个** | 列表竖向排列，一行只有一个元素 | Grid 容器宽度不确定，`auto-fill` 只算出一列 | 确保 Grid 容器有明确宽度（如 `width: 100%`） |

**Incorrect（Grid 容器宽度不确定）：**

```css
.grid-container {
  /* 缺少 width，auto-fill 可能只算出一列 */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
```

**Correct（Grid 容器有明确宽度）：**

```css
.grid-container {
  width: 100%; /* 必须明确宽度 */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
```

**验收时检查**：
- [ ] Grid 容器是否有明确宽度（如 `width: 100%`），否则 `auto-fill` 可能只算出一列？

**验收时特别关注**：
- 检查 Grid 容器是否有明确宽度

**相关规则**：
- `writing-list-layout.md` - 横向列表布局规则
