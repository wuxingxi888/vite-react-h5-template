---
title: 布局比对规则（P0）
impact: CRITICAL
impactDescription: 布局错位/缺失/比例错均为 P0，验收时不得遗漏
tags: comparison, layout, p0, critical
---

## 布局比对规则（P0）

**P0 级要求**：布局错位、缺失、比例失调均为 P0，验收时不得遗漏。

**比对内容**：
- **布局**：区域位置、尺寸、排列方向、间距（gap/padding）、多图拼接方式；是否错位、缺失、比例失调。

**验收顺序**（必须按以下顺序进行，避免漏检）：
1. **从上到下**：从页面最上方区域逐块检查到最下方，顺序与布局一致。
2. **从左到右**：同一行或同一层级内，按从左到右依次检查，不跳过。
3. **从外到里**：每个区块内按「外层容器 → 内层容器 → 叶子元素」逐层检查。

**布局检查特别关注（常见问题）**：
- **页面容器宽度**：是否有不必要的 `max-width` 导致右侧大片留白？详见 `errors-page-container-width.md`
- **横向列表**：是否铺满宽度，不会留大片空白？换行后列宽是否一致？详见 `errors-flex-layout.md`、`errors-flex-column-width.md`
- **Grid 容器宽度**：Grid 容器是否有明确宽度（如 `width: 100%`），否则 `auto-fill` 可能只算出一列？详见 `errors-grid-container-width.md`
- **Flex 布局**：需要铺满时是否使用了 `flex-grow: 1`，而非 `flex: 0 1 fixed-width`？详见 `errors-flex-layout.md`
- **元素完整性**：是否有元素被截断（半截卡片等）？详见 `writing-element-completeness.md`
- **对齐方式**：图标与文本是否水平居中对齐（`align-items: center`）？详见 `errors-alignment.md`
- **CSS 优先级**：组件样式是否被页面级样式覆盖（如 `display: block` 覆盖了 `display: flex`）？详见 `errors-css-priority.md`
- **按钮/交互元素**：高度、宽度、定位是否符合设计稿（**必须用浏览器工具实际查看渲染效果**，不能仅凭代码推测）？详见 `errors-button-dimensions.md`、`errors-button-position.md`

**相关规则**：
- `writing-page-container-width.md` - 页面容器宽度规则
- `writing-list-layout.md` - 横向列表布局规则
- `writing-element-completeness.md` - 元素展示完整性规则
- `writing-alignment.md` - 对齐方式规则
- `errors-*.md` - 所有相关错误规则
