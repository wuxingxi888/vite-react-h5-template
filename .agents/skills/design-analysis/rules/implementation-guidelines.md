---
title: 主流网页设计常识（实现时需遵循）
impact: HIGH
impactDescription: 实现时应遵循，避免右侧留白、列表留白、元素截断等反审美效果
tags: implementation, guidelines, layout, design
---

# 主流网页设计常识（实现时需遵循）

## 核心原则

**实现时应遵循主流网页设计常识，避免反审美的效果。这些常识应在编写代码时就遵循，而非验收时才发现。**

看到设计稿时，默认不会出现以下反审美的效果：
- 右侧大片留白
- 列表留空白
- 元素截断
- 换行后列宽不一致

## 页面容器宽度

### ❌ 错误做法

**不应写死 `max-width`** 导致右侧大片留白（除非设计稿特别说明）。

```css
/* 错误：固定宽度导致右侧大片留白 */
.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

### ✅ 正确做法

**页面应自适应视口宽度**，避免割裂的留白效果。

```css
/* 正确：自适应视口宽度 */
.container {
  width: 100%;
  padding: 0 132px; /* 页面边距 */
}
```

**例外**：如果设计稿明确要求固定宽度，则按设计稿实现。

## 横向列表布局

### ❌ 错误做法

- **不应限制一行几个元素而留空白**（如固定列数导致右侧大片空白）
- **不应出现元素被截断**（如半截卡片显示）

```css
/* 错误：固定列数导致右侧留白 */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 固定3列 */
}
```

### ✅ 正确做法

- **应铺满可用宽度**，能放几个就放几个，不够再换行
- **换行后应保持列宽一致**（使用 Grid 而非 Flex）

### 布局选择指导

#### Grid：适合等列宽、多行一致的情况

```css
/* 正确：Grid 自适应列数，列宽一致 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  width: 100%; /* 重要：确保 Grid 容器有明确宽度 */
}
```

**注意**：确保 Grid 容器有明确宽度（如 `width: 100%`），否则 `auto-fill` 可能只算出一列。

#### Flex：适合自适应但每行独立计算的情况

```css
/* 正确：Flex 铺满宽度 */
.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.flex-item {
  flex: 1 1 minmax(300px, 1fr); /* 允许增长，最小宽度 300px */
}
```

**注意**：
- 需要铺满宽度时使用 `flex-grow: 1`，不要用 `flex: 0 1 fixed-width`
- Flex 每行独立计算，换行后列宽可能不一致（如需列宽一致，使用 Grid）

## 元素展示完整性

### ❌ 错误做法

**不应展示不完整的元素**（如半截卡片、被裁切的按钮）。

```css
/* 错误：元素被截断 */
.container {
  overflow: visible; /* 允许元素溢出 */
}
```

### ✅ 正确做法

**要么完整展示，要么完全不展示**（使用 `overflow: hidden` 配合数量控制，而非视觉截断）。

```css
/* 正确：完整展示或完全不展示 */
.container {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}

/* 通过数量控制，确保每行元素完整 */
.item {
  flex: 0 0 calc(33.333% - 16px); /* 固定宽度，确保完整 */
}
```

## 对齐方式

### 图标与文本的对齐

**检查 `align-items` 值，常见应为 `center`（水平居中）而非 `flex-start`（顶部对齐）**。

```css
/* 正确：图标与文本垂直居中 */
.icon-text {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 8px;
}
```

### 按钮、卡片等元素的定位

**仔细对照设计稿的 `padding`、`margin`、定位规则**。

```css
/* 正确：对照设计稿的间距 */
.button {
  padding: 12px 24px; /* 对照设计稿 */
  margin: 0 8px; /* 对照设计稿 */
}
```

## CSS 优先级与样式覆盖

### ⚠️ 问题

**组件样式被页面级样式覆盖**：传入的 `className` 可能覆盖组件内部的关键样式（如 `display: block` 覆盖 `display: flex`）。

```css
/* 页面级样式 */
.page-container {
  display: block; /* 可能覆盖组件内部样式 */
}

/* 组件内部样式 */
.component {
  display: flex; /* 被覆盖 */
}
```

### ✅ 建议

**组件内部样式使用更具体的选择器，或使用 CSS Modules 避免冲突**。

```css
/* 方法1：使用更具体的选择器 */
.page-container .component {
  display: flex; /* 优先级更高 */
}

/* 方法2：使用 CSS Modules */
.component {
  display: flex; /* 类名会被哈希化，避免冲突 */
}
```

### ✅ 检查

**验收时检查组件样式是否被父级样式覆盖**。

## 必须用浏览器验证的细节

以下细节**必须用浏览器工具实际查看渲染效果**，不能仅凭代码推测：

- ⚠️ **按钮高度、宽度**：必须用浏览器工具实际查看渲染效果
- ⚠️ **对齐效果**：必须用浏览器查看实际对齐效果
- ⚠️ **hover/active 状态**：必须用浏览器实际触发查看
- ⚠️ **响应式表现**：必须用浏览器在不同视口下查看

## 相关规则

- `implementation-common-errors.md` - 常见错误模式与避免方法
- `ui-verification` 技能的 `writing-*.md` 规则（类似内容，用于验收时检查）
