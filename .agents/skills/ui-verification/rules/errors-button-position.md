---
title: 按钮定位问题
impact: MEDIUM
impactDescription: 按钮位置、边距与设计稿不符
tags: errors, button, position, padding, margin
---

## 按钮定位问题

**错误模式**：按钮定位不对

| 错误模式 | 典型表现 | 根本原因 | 避免方法 |
|---------|---------|----------|----------|
| **按钮定位不对** | 按钮位置、边距与设计稿不符 | 未仔细对照设计稿的 padding、margin、定位规则 | 验收时逐项对照设计稿的定位细节 |

**验收时检查**：
- [ ] 按钮、卡片的 padding、margin、定位是否符合设计稿？
- [ ] 绝对定位的元素是否正确设置了 `left`、`right`、`top`、`bottom`？

**验收时特别关注**：
- 必须用浏览器工具实际查看渲染效果（特别是按钮、对齐等细节）

**相关规则**：
- `writing-alignment.md` - 对齐方式规则
- `tools-browser-navigation.md` - 浏览器工具打开页面指南
