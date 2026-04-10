---
title: Flex 布局问题
impact: HIGH
impactDescription: Flex 不铺满、留空白
tags: errors, layout, flex, flex-grow, width
---

## Flex 布局问题

**错误模式**：Flex 不铺满、留空白

| 错误模式 | 典型表现 | 根本原因 | 避免方法 |
|---------|---------|----------|----------|
| **Flex 不铺满、留空白** | 横向列表右侧留大片空白 | 使用了 `flex: 0 1 fixed-width`，不允许增长 | 使用 `flex-grow: 1` 或 `flex: 1 1 min-width` |

**Incorrect（Flex 不允许增长）：**

```css
.flex-item {
  flex: 0 1 280px; /* 不允许增长，右侧留空白 */
}
```

**Correct（Flex 允许增长）：**

```css
.flex-item {
  flex: 1 1 minmax(280px, 1fr); /* 允许增长，铺满宽度 */
}

/* 或 */
.flex-item {
  flex-grow: 1; /* 允许增长 */
  flex-shrink: 1;
  flex-basis: 280px;
}
```

**验收时检查**：
- [ ] Flex 布局需要铺满时是否使用了 `flex-grow: 1`，而非 `flex: 0 1 fixed-width`？

**验收时特别关注**：
- 检查 Flex 布局是否正确使用了 `flex-grow`

**相关规则**：
- `writing-list-layout.md` - 横向列表布局规则
