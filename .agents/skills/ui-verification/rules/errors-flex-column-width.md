---
title: 换行后列宽不一致
impact: MEDIUM
impactDescription: Flex 布局换行后列宽不一致
tags: errors, layout, flex, grid, column-width
---

## 换行后列宽不一致

**错误模式**：换行后列宽不一致

| 错误模式 | 典型表现 | 根本原因 | 避免方法 |
|---------|---------|----------|----------|
| **换行后列宽不一致** | 第一行和第二行的卡片宽度不同 | Flex 布局每行独立计算 | 使用 Grid 而非 Flex 来保证列宽一致 |

**Incorrect（Flex 布局，换行后列宽不一致）：**

```css
.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.flex-item {
  flex: 1 1 280px; /* Flex 每行独立计算，列宽可能不一致 */
}
```

**Correct（Grid 布局，列宽一致）：**

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
```

**验收时检查**：
- [ ] 列表换行后列宽是否一致（使用 Grid）？

**看到设计稿时，默认不会出现以下反审美的效果**：
- 换行后列宽不一致

**相关规则**：
- `writing-list-layout.md` - 横向列表布局规则
