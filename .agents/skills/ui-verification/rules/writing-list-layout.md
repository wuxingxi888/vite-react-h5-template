---
title: 横向列表布局规则
impact: HIGH
impactDescription: 确保列表铺满宽度，换行后列宽一致
tags: writing, layout, grid, flex, list
---

## 横向列表布局规则

验收时发现的问题，很多是**编写代码时缺乏主流网页设计常识**导致的。应在实现阶段就主动避免这些反审美的效果，而不是等到验收才发现。

**核心原则**：
- ❌ **不应限制一行几个元素而留空白**（如固定列数导致右侧大片空白）
- ❌ **不应出现元素被截断**（如半截卡片显示）
- ✅ **应铺满可用宽度**，能放几个就放几个，不够再换行
- ✅ **换行后应保持列宽一致**（使用 Grid 而非 Flex）

**布局选择指导**：

**Grid**：适合等列宽、多行一致的情况

```css
/* Correct: 使用 Grid 实现自适应列数 */
.grid-container {
  width: 100%; /* 必须明确宽度 */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
```

**Flex**：适合自适应但每行独立计算的情况

```css
/* Correct: Flex 需要铺满时使用 flex-grow */
.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.flex-item {
  flex: 1 1 minmax(280px, 1fr); /* 允许增长 */
  /* 不要用 flex: 0 1 fixed-width */
}
```

**Incorrect（Grid 容器宽度不确定）：**

```css
.grid-container {
  /* 缺少 width，auto-fill 可能只算出一列 */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
```

**Incorrect（Flex 不铺满，留空白）：**

```css
.flex-item {
  flex: 0 1 280px; /* 不允许增长，右侧留空白 */
}
```

**验收时检查**：
- [ ] 横向列表是否铺满宽度，不会留大片空白？
- [ ] 列表换行后列宽是否一致（使用 Grid）？
- [ ] 是否有元素被截断显示（半截卡片等）？
- [ ] Grid 容器是否有明确宽度（如 `width: 100%`），否则 `auto-fill` 可能只算出一列？
- [ ] Flex 布局需要铺满时是否使用了 `flex-grow: 1`，而非 `flex: 0 1 fixed-width`？

**相关规则**：
- `errors-grid-container-width.md` - Grid 容器宽度问题
- `errors-flex-layout.md` - Flex 布局问题
- `errors-flex-column-width.md` - 换行后列宽不一致
