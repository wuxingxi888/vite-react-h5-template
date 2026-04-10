---
title: 设计稿工具使用指南（Pencil/Figma）
impact: HIGH
impactDescription: 使用设计稿工具获取可比对信息
tags: tools, design, pencil, figma, mcp
---

## 设计稿工具使用指南（Pencil/Figma）

**核心原则**：验收时必须获取设计稿侧的可比对信息，与实现页进行对比。

### 设计稿类型与工具选择

验收时：先用当前环境可用的浏览器工具获取实际页面截图/快照，再根据设计稿来源选择对应设计稿工具：

- 设计稿为 `.pen` 时，用可读取 `.pen` 的工具获取设计稿截图或节点信息
- 设计稿为 Figma 链接时，用可读取 Figma 的工具获取对应截图或节点信息
- 二者与实现页比对得出结论

### 设计稿为 .pen（Pencil 设计稿）

**工具**：**Pencil MCP**

**操作**：
- 对指定节点或画布截图（`get_screenshot`）
- 获取布局结构（`snapshot_layout`）
- 与实现页的截图或快照对应比对

**工具说明**：
- **.pen** 是 **Pencil** 的设计稿文件后缀
- **Pencil MCP**：用于 `.pen` 设计稿，可查看设计稿细节、对指定节点或画布截图（如 `get_screenshot`）、获取布局结构（如 `snapshot_layout`）等，与实现页截图或快照对照

### 设计稿为 Figma 链接

**工具**：**Figma MCP**

**操作**：
- 从链接中解析 file key / node id
- 对指定 frame 或节点调用 `get_screenshot`、`get_design_context` 等
- 获取截图或布局/样式信息
- 与实现页的截图或快照对应比对

**工具说明**：
- **Figma 链接**：如 `https://www.figma.com/design/<fileKey>/<fileName>?node-id=...`
- **Figma MCP**：用于 Figma 设计稿，可从链接中解析 file key / node id，获取指定 frame 或节点的截图与布局/节点信息（如 `get_screenshot`、`get_design_context` 等）

### 设计稿为其它静态图片

**操作**：
- 直接使用设计稿图片与 `browser_take_screenshot` 的截图并排或叠放对比

### 工具不可用时

- 若专用设计稿工具不可用，应至少获取设计稿截图、标注或静态导出图
- 核心不是工具名称，而是必须拿到足够支撑比对的设计信息

**相关规则**：
- `tools-browser-navigation.md` - 浏览器工具打开页面指南
