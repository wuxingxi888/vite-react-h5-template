---
title: 元素展示完整性规则
impact: MEDIUM
impactDescription: 避免展示不完整的元素，提升视觉体验
tags: writing, layout, element, overflow, completeness
---

## 元素展示完整性规则

验收时发现的问题，很多是**编写代码时缺乏主流网页设计常识**导致的。应在实现阶段就主动避免这些反审美的效果，而不是等到验收才发现。

**核心原则**：
- ❌ **不应展示不完整的元素**（如半截卡片、被裁切的按钮）
- ✅ **要么完整展示，要么完全不展示**（使用 `overflow: hidden` 配合数量控制，而非视觉截断）

**Incorrect（元素被截断显示）：**

```tsx
function CardList({ items }: { items: Item[] }) {
  return (
    <div className="card-list">
      {items.map(item => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  )
}

/* CSS: 没有控制，导致半截卡片显示 */
.card-list {
  display: flex;
  overflow-x: auto; /* 横向滚动，可能显示半截卡片 */
}
```

**Correct（完整展示或完全不展示）：**

```tsx
function CardList({ items }: { items: Item[] }) {
  const visibleCount = Math.floor(containerWidth / cardWidth)
  const visibleItems = items.slice(0, visibleCount)
  
  return (
    <div className="card-list">
      {visibleItems.map(item => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  )
}

/* CSS: 使用 overflow: hidden 配合数量控制 */
.card-list {
  display: flex;
  overflow: hidden; /* 隐藏超出部分 */
}
```

**验收时检查**：
- [ ] 是否有元素被截断显示（半截卡片等）？

**看到设计稿时，默认不会出现以下反审美的效果**：
- 元素截断
