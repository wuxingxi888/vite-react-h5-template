---
name: agents-governance
description: 检查 .agents 下 rules、skills、README 与模板基线依赖的一致性，避免规则漂移、悬空引用和 React 能力越界。修改或新增 .agents 内容时使用本技能。
---

# `.agents` 治理自检

## 适用前提

- 适用于维护 `.agents/rules/`、`.agents/skills/`、相关 README 与模板治理说明
- 输入来源限定为：
  - `.agents/rules/**`
  - `.agents/skills/**`
  - `package.json`
- 本技能用于只读治理检查，不负责修改业务代码

## 使用场景

当你需要：

- 新增或修改规则后做治理回归
- 检查 rules 与 skills 是否出现悬空引用
- 检查示例依赖是否被误写成模板基线
- 检查参考技能是否被误提升为默认基线

请使用本技能，并同时遵守：

- `.agents/rules/00-规则治理.md`
- `.agents/rules/01-项目概述.md`

---

## 执行前检查

- 确认当前变更范围是否只涉及 `.agents`
- 确认需要对照的依赖来源是 `package.json`，而不是记忆中的常用库
- 确认当前模板仍以 React 18 为基线

---

## 自检清单

### 1. README 与目录一致性

- `skills/README.md` 是否列出了所有可用技能
- `rules/README.md` 是否仍能正确反映基线规则与专项规则分层

### 2. 引用真实性

- rules 中引用的 skill 是否真实存在
- skills 中引用的 rules 是否真实存在
- README 中提到的 skill 是否真实存在

### 3. 依赖与能力真实性

- 示例代码出现的第三方依赖是否在 `package.json` 中声明，或被明确标注为可选依赖
- 是否把 React 19、RSC、Server Actions、Next.js、React Compiler 能力误写进 React 18 基线

### 4. 基线与参考分层

- `vercel-*`、`web-design-guidelines` 是否仍被标记为 reference-only / advisory
- 是否存在把参考技能当成默认脚手架来源的表述

### 5. 执行闭环

- 核心技能是否都包含：
  - 适用前提
  - 执行前检查
  - 验收清单
  - 失败回退

---

## 建议的只读校验脚本设计

可选实现一个只读治理脚本，输入：

- `.agents/rules/**`
- `.agents/skills/**`
- `package.json`

输出：

- 缺失引用
- README 漏登记
- 示例依赖漂移
- React 能力越界
- reference-only 技能误提升

该脚本只用于检查，不应自动修改文档。

---

## 失败回退

- 若无法确认某项依赖是否属于模板基线，默认按“非基线依赖”处理，并要求在文档中显式标注
- 若无法确认某条参考规则是否适用于 React 18，默认忽略，不将其写入基线
