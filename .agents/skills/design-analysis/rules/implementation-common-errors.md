---
title: 常见错误模式与避免方法
impact: HIGH
impactDescription: 实现阶段避免 Grid/Flex/对齐/按钮等常见错误
tags: implementation, errors, guidelines
---

# 常见错误模式与避免方法

## 概述

本文档列出实现 UI 时常见的错误模式、原因和避免方法，帮助开发人员在实现阶段避免这些问题。

## 错误模式表格

| 错误模式 | 原因 | 避免方法 |
|---------|------|----------|
| **Grid 一行只有一个** | Grid 容器宽度不确定，`auto-fill` 只算出一列 | 确保 Grid 容器有明确宽度（如 `width: 100%`） |
| **Flex 不铺满、留空白** | 使用了 `flex: 0 1 fixed-width`，不允许增长 | 使用 `flex-grow: 1` 或 `flex: 1 1 min-width` |
| **换行后列宽不一致** | Flex 布局每行独立计算 | 使用 Grid 而非 Flex 来保证列宽一致 |
| **组件样式被覆盖** | 页面级样式覆盖了组件内部样式 | 检查 CSS 优先级，使用更具体的选择器或 CSS Modules |
| **对齐方式错误** | 默认使用了 `flex-start` 而非 `center` | 明确设置 `align-items: center` |
| **按钮尺寸不对** | 未用浏览器实际查看，仅凭代码推测 | **必须用浏览器工具查看实际渲染效果** |

## 详细说明

### 1. Grid 一行只有一个

**错误示例**：

```css
/* 错误：Grid 容器宽度不确定 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /* 缺少 width，导致 auto-fill 只算出一列 */
}
```

**原因**：Grid 容器宽度不确定，`auto-fill` 只算出一列。

**正确做法**：

```css
/* 正确：确保 Grid 容器有明确宽度 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  width: 100%; /* 明确宽度 */
}
```

### 2. Flex 不铺满、留空白

**错误示例**：

```css
/* 错误：不允许增长 */
.flex-item {
  flex: 0 1 300px; /* 不允许增长，导致留空白 */
}
```

**原因**：使用了 `flex: 0 1 fixed-width`，不允许增长。

**正确做法**：

```css
/* 正确：允许增长 */
.flex-item {
  flex-grow: 1; /* 允许增长 */
  flex-basis: 300px; /* 最小宽度 */
}

/* 或使用简写 */
.flex-item {
  flex: 1 1 minmax(300px, 1fr);
}
```

### 3. 换行后列宽不一致

**错误示例**：

```css
/* 错误：Flex 每行独立计算 */
.flex {
  display: flex;
  flex-wrap: wrap;
}

.flex-item {
  flex: 1 1 300px; /* 每行独立计算，列宽可能不一致 */
}
```

**原因**：Flex 布局每行独立计算，换行后列宽可能不一致。

**正确做法**：

```css
/* 正确：使用 Grid 保证列宽一致 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;
}
```

### 4. 组件样式被覆盖

**错误示例**：

```css
/* 页面级样式 */
.page-container .component {
  display: block; /* 覆盖组件内部样式 */
}

/* 组件内部样式 */
.component {
  display: flex; /* 被覆盖 */
}
```

**原因**：页面级样式覆盖了组件内部样式。

**正确做法**：

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

### 5. 对齐方式错误

**错误示例**：

```css
/* 错误：默认 flex-start */
.icon-text {
  display: flex;
  /* 缺少 align-items，默认 flex-start，导致图标和文本顶部对齐 */
}
```

**原因**：默认使用了 `flex-start` 而非 `center`。

**正确做法**：

```css
/* 正确：明确设置居中 */
.icon-text {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 8px;
}
```

### 6. 按钮尺寸不对

**错误示例**：

```css
/* 仅凭代码推测 */
.button {
  padding: 12px 24px;
  font-size: 14px;
  /* 未用浏览器实际查看，可能实际渲染高度不对 */
}
```

**原因**：未用浏览器实际查看，仅凭代码推测。

**正确做法**：

**必须用浏览器工具查看实际渲染效果**：
- 使用浏览器开发者工具检查实际高度、宽度
- 检查 padding、margin 的实际效果
- 验证字体大小、行高的实际渲染

## 检查清单

实现时检查以下项：

- [ ] Grid 容器有明确宽度（如 `width: 100%`）
- [ ] Flex 布局使用 `flex-grow: 1` 允许增长
- [ ] 需要列宽一致时使用 Grid 而非 Flex
- [ ] 组件样式使用更具体的选择器或 CSS Modules
- [ ] 对齐方式明确设置（如 `align-items: center`）
- [ ] 按钮尺寸用浏览器工具实际查看

## 相关规则

- `implementation-guidelines.md` - 主流网页设计常识（详细说明）
- `ui-verification` 技能的 `errors-*.md` 规则（类似内容，用于验收时检查）
