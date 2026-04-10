---
title: 反思分析不足模板
impact: MEDIUM
impactDescription: 反哺 design-analysis，减少同类遗漏
tags: workflow, reflection, design-analysis
---

## 反思分析不足（反哺 design-analysis）

### 为什么要反思

UI 问题常暴露「设计稿分析」阶段的遗漏或描述不清。把「哪些问题是因为分析没做到位」总结下来，可补充到 **design-analysis** 的检查项与文档结构中，减少同类遗漏。

### 反思要回答的问题

1. **清单遗漏**：有哪些问题是「分析清单里根本没写」导致的？
2. **描述不清**：有哪些是「分析清单写了但不具体」导致的？
3. **步骤或模板**：design-analysis 的步骤或分析清单模板，应做哪些补充或修改？
4. **设计常识缺失**：有哪些问题是「编写时缺乏主流网页设计常识」导致的？详见 `rules/writing-*.md` 和 `rules/errors-*.md`
5. **CSS 优先级问题**：是否有组件样式被页面级样式覆盖的问题？详见 `rules/errors-css-priority.md`
6. **浏览器验证缺失**：哪些细节问题是因为未用浏览器工具实际查看导致的？详见 `rules/tools-browser-navigation.md`

### 反思输出方式

- **短期**：在本次「UI 问题清单」文档末尾增加一节「分析不足反思」，按上面几问简要写出结论
- **长期**：将共性结论沉淀到 `.agents/skills/design-analysis/SKILL.md`（常见遗漏检查点、文档结构等）

### 反思记录模板

```markdown
## 分析不足反思（用于完善 design-analysis）

### 清单遗漏
- 问题：xxx
- 建议：design-analysis 中增加 xxx

### 描述不清
- 问题：xxx
- 建议：分析清单中必填 xxx

### 对 design-analysis 的补充建议
- [ ] 在常见遗漏检查点中增加：……
- [ ] 在文档结构中增加：……
```
