---
title: 对齐方式错误
impact: MEDIUM
impactDescription: 图标与文本顶部对齐而非居中
tags: errors, alignment, flexbox, icon, text
---

## 对齐方式错误

**错误模式**：对齐方式错误

| 错误模式 | 典型表现 | 根本原因 | 避免方法 |
|---------|---------|----------|----------|
| **对齐方式错误** | 图标与文本顶部对齐而非居中 | 默认使用了 `flex-start` 而非 `center` | 明确设置 `align-items: center` |

**Incorrect（顶部对齐）：**

```css
.icon-text {
  display: flex;
  align-items: flex-start; /* 顶部对齐，视觉不协调 */
}
```

**Correct（居中对齐）：**

```css
.icon-text {
  display: flex;
  align-items: center; /* 水平居中，视觉协调 */
}
```

**验收时检查**：
- [ ] 图标与文本的对齐方式是否正确（`align-items: center` 而非 `flex-start`）？

**验收时特别关注**：
- 必须用浏览器工具实际查看渲染效果（特别是按钮、对齐等细节）
- 检查对齐方式是否正确设置

**相关规则**：
- `writing-alignment.md` - 对齐方式规则
