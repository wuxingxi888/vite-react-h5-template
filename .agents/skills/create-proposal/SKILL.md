---
name: create-proposal
description: 通用创建提案技能。根据需求是否有设计稿或 UI 描述、是否有接口、是页面还是功能组件等可选条件，决定设计稿分析、接口与数据层、以及实现后的 UI 还原验收等步骤。适用于各类需求提案，不限于纯 UI 页面。
---

# 创建提案

## 使用时机

当需要为一个**需求**创建 OpenSpec 提案（proposal、tasks、spec）时使用本技能。需求可能是：

- 新增/改版一个**页面**（有或没有设计稿）
- 开发一系列**功能组件**（有或没有 UI 描述）
- **有接口**或**无接口**（后端未就绪时用 mock）
- 纯逻辑、纯接口、或 UI + 接口 等组合

本技能根据「是否有设计稿/UI 描述」「是否有接口」「交付形态（页面/组件/其它）」等条件，决定执行哪些步骤、产出哪些任务。

---

## 步骤 1：明确需求类型与条件

在写 proposal / tasks / spec 之前，先确认下列条件，以便后续步骤按需执行。

| 条件 | 选项 | 影响 |
|------|------|------|
| **是否有设计稿或 UI 要求描述** | 有 / 无 | 有 → 可选用 design-analysis 产出 UI 分析清单；实现后可有 UI 还原验收步骤 |
| **是否有接口（已提供或约定）** | 有 / 无 / 未就绪 | 有 → 正常对接；无 → 可不做数据层；未就绪 → mock，见项目 Mock 数据策略 |
| **交付形态** | 新页面 / 功能组件 / 能力模块 / 其它 | 决定目录结构（routes vs components）、tasks 模板 |
| **是否仅样式/还原类** | 是 / 否 | 是 → 重点在 design-analysis + 验收 |

---

## 步骤 2：若有设计稿或 UI 描述 —— 设计稿分析（可选但推荐）

当需求**包含界面**且**有设计稿**（.pen、figma链接、设计图、标注）或**有明确 UI 描述**时：

- **使用技能**：`.agents/skills/design-analysis/SKILL.md`
- **产出**：`docs/样式还原/<名称>-UI分析清单.md`

这样后续开发可以依据分析清单精确实现，实现后的验收也以此清单为基准。不限定「必须先分析再写提案」：可以边写提案边分析，或先分析再写提案，只要在开发前有一份分析清单即可。

在 **tasks** 中可写明：页面/组件开发须依据 `docs/样式还原/<名称>-UI分析清单.md` 实现布局与样式。

---

## 步骤 3：定义组件与代码结构（涉及 UI 时）

若交付形态是**页面**或**功能组件**，根据 `.agents/rules/04-组件规范.md` 判断组件放置位置：

- 多处复用 → `src/components/<name>/`
- 单页或单能力内使用 → `src/views/<page>/components/<name>/` 或对应功能目录下

涉及页面时，常见约定：

- 样式文件使用 `.module.scss`
- 类型目录使用 `src/types/<feature>/`，含 `model.ts`、`api.ts`
- 图标/图片未定时用占位元素（见 `.agents/rules/08-通用约束.md`）

---

## 步骤 4：接口与数据层（有接口或需 mock 时）

若需求**涉及接口**（已提供或未就绪）：

- **已提供接口**：按 `.agents/rules/03-项目结构.md` 等规范，在 tasks 中安排 `types/`、`http/` 等。
- **未就绪**：按项目 Mock 数据策略，在 `src/types/<feature>/` 下定义 `model.ts`、`api.ts`，在 `src/http/<feature>.ts` 下提供 mock；tasks 中标注「mock，后续替换」。

若不涉及接口，可省略或仅写「无后端依赖」。

---

## 步骤 5：创建提案文档

### 5.1 proposal.md

根据需求类型书写，建议包含：

- **Why**：业务价值或目标
- **What Changes**：改动范围（新页面 / 新组件 / 新接口 / 样式还原等）
- **Impact**：受影响或新增的 capability、目录、文件

若有设计稿或 UI：可写「图标/图片使用占位元素」「开发依据 docs/样式还原/xxx-UI分析清单.md」等。

### 5.2 tasks.md

按**交付形态**与**条件**勾选任务，例如：

- **新页面**：路由目录、Page、`index.module.scss`、与布局一致的结构；若有分析清单则写「依据 xxx-UI分析清单 实现」。
- **功能组件**：组件目录、`index.tsx`、`index.module.scss`、占位与规范。
- **接口/数据层**：`src/types/<feature>/`、`src/http/<feature>.ts` 或 mock。
- **UI 还原验收**：若有设计稿且产出了分析清单，可在 tasks 末尾加「实现后使用 `.agents/skills/ui-verification/SKILL.md` 进行 UI 还原验收，产出问题清单并反思分析不足」。

### 5.3 spec.md

定义需求规格：场景、验收标准、可选的状态与边界。若有 UI，可引用分析清单中的「验证检查清单」作为验收参考。

---

## 步骤 6：实现后的 UI 还原验收（可选）

当需求**包含界面**且**有设计稿**并已产出 **UI 分析清单**时，在**实现完成**后需要进行 UI 还原验收时：

- **使用技能**：`.agents/skills/ui-verification/SKILL.md`
- 该技能通用指导如何进行 UI 验收：对照分析清单与设计稿、产出 UI 问题清单、修复与再验证、反思分析不足并反哺 design-analysis。

---

## 样式还原验证检查清单（供 create-route / create-component 引用）

当开发涉及 **UI 还原**（有设计稿或分析清单）时，可对照以下检查项自检；更完整项见 `docs/样式还原/<名称>-UI分析清单.md` 中的「验证检查清单」。

**布局**：区域位置、尺寸、间距是否与分析清单/设计稿一致；对齐方式（如 flex-start vs center）是否正确。  
**样式**：颜色、字体、字号、字重、圆角、边框、阴影、效果（如 backdrop-filter）是否一致。  
**元素**：是否缺少区块、图标、占位图；占位尺寸与比例是否正确。  
**交互**：默认/hover/active 等状态是否还原（若有设计）。

create-route、create-component 等技能中「涉及 UI 还原时」可引用：`.agents/skills/create-proposal/SKILL.md` 中的「样式还原验证检查清单」及对应页面的 `docs/样式还原/<名称>-UI分析清单.md`。

---

## 相关规范与技能

- `.agents/rules/03-项目结构.md` - 目录结构、Mock 数据策略
- `.agents/rules/04-组件规范.md` - 组件放置决策
- `.agents/rules/05-API规范.md` - 接口目录与命名规范
- `.agents/rules/08-通用约束.md` - 占位元素等
- `.agents/rules/09-样式规范.md` - 设计稿颜色提取
- `.agents/skills/design-analysis/SKILL.md` - 设计稿分析（有设计稿时使用，产出 UI 分析清单）
- `.agents/skills/create-component/SKILL.md` - 创建组件
- `.agents/skills/create-api/SKILL.md` - 创建接口层
- `.agents/skills/ui-verification/SKILL.md` - UI 验收（实现后需验收时使用）
