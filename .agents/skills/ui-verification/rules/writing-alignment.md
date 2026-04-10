---
title: 对齐方式规则
impact: MEDIUM
impactDescription: 确保图标与文本、按钮等元素的对齐正确
tags: writing, alignment, flexbox, icon, text
---

## 对齐方式规则

验收时发现的问题，很多是**编写代码时缺乏主流网页设计常识**导致的。应在实现阶段就主动避免这些反审美的效果，而不是等到验收才发现。

**核心原则**：
- ✅ **图标与文本的对齐**：检查 `align-items` 值，常见应为 `center`（水平居中）而非 `flex-start`（顶部对齐）
- ✅ **按钮、卡片等元素的定位**：仔细对照设计稿的 `padding`、`margin`、定位规则

**Incorrect（图标与文本顶部对齐）：**

```css
.icon-text {
  display: flex;
  align-items: flex-start; /* 顶部对齐，视觉不协调 */
}
```

**Correct（图标与文本居中对齐）：**

```css
.icon-text {
  display: flex;
  align-items: center; /* 水平居中，视觉协调 */
}
```

**验收时检查**：
- [ ] 图标与文本的对齐方式是否正确（`align-items: center` 而非 `flex-start`）？
- [ ] 按钮、卡片的 padding、margin、定位是否符合设计稿？
- [ ] 绝对定位的元素是否正确设置了 `left`、`right`、`top`、`bottom`？

**验收时特别关注**：
- 必须用浏览器工具实际查看渲染效果（特别是按钮、对齐等细节）
- 检查对齐方式是否正确设置

**相关规则**：
- `errors-alignment.md` - 对齐方式错误
