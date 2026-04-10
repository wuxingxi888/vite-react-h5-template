---
title: 快速检查清单
impact: HIGH
impactDescription: 验收流程检查清单
tags: workflow, checklist, verification
---

## 快速检查清单

### 验收前
- [ ] 目标页面 URL 已确认（如 `http://localhost:5222/<route>`）
- [ ] 设计稿（.pen 或图）可打开，可截图或取元素
- [ ] 已有对应「UI 分析清单」更佳（作为按顺序比对的检查项列表）

### 验收中（必须落地）
- [ ] 已用 **Browser** 打开目标页面并获取截图或快照（详见 `tools-browser-navigation.md`）
- [ ] 已获取设计稿对应区域截图或元素信息（详见 `tools-design-guidelines.md`）
- [ ] **按从上到下、从左到右、从外到里**的顺序进行排查，**P0（布局、层级、文字、图片）四项无遗漏**（详见 `comparison-*.md`）
- [ ] 已完成**实际页面 vs 设计稿**的截图比对或元素比对
- [ ] 差异已按 P0（布局/层级/内容）/P1/P2 分类并写入「UI 问题清单」
- [ ] **已检查布局常识问题**：页面容器宽度、横向列表铺满、元素完整性、对齐方式等（详见 `writing-*.md` 和 `errors-*.md`）

### 修复后
- [ ] 已再次用 **Browser** 打开页面并重新与设计稿比对（详见 `tools-browser-navigation.md`）
- [ ] 问题清单状态与验收结论已更新
- [ ] 完成「分析不足反思」并考虑反哺 design-analysis（详见 `workflow-reflection.md`）
- [ ] **已检查常见错误模式**：CSS 优先级覆盖、Grid 容器宽度、Flex 布局铺满、对齐方式、按钮尺寸等（详见 `errors-*.md`）
