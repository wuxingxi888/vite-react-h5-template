# 技能索引

本目录包含面向 React 通用项目的 AI 执行技能。技能用于补充 rules，提供更具体的操作步骤、模板和检查清单。

## 使用原则

1. 先看 `.agents/rules/`，确认目录、命名、边界与基础约束。
2. 再根据任务类型选择对应 skill，按步骤执行。
3. 若 rules 与 skill 冲突，以 rules 为准；若多个 skill 冲突，以更贴近当前任务的 skill 为准。
4. 若 skill 中出现某个具体项目实现细节，而当前项目并不存在，应回退到模板基线，不得生搬硬套。

## 技能地图

### 基线执行技能

以下技能直接参与模板内常见 React 任务的生成与落地：

- `create-route`
- `create-component`
- `create-api`
- `create-store`
- `theme-variables`

### 工作流技能

以下技能用于需求梳理、设计分析与验收追踪：

- `create-proposal`
  - 用途：写 proposal、tasks、spec
  - 适合：页面需求、组件需求、接口需求、UI 还原需求

- `design-analysis`
  - 用途：分析设计稿，产出 UI 分析清单
  - 适合：有设计稿或明确 UI 描述的需求

- `ui-verification`
  - 用途：对照设计稿验收页面效果
  - 适合：实现完成后的还原度检查与问题追踪

- `agents-governance`
  - 用途：检查 `.agents` 内 rules / skills / README / 依赖声明的一致性
  - 适合：新增或修改规则、技能后的治理回归

## 参考技能

以下技能默认作为参考，不应覆盖本模板基线：

- `vercel-react-best-practices`
  - 说明：性能与工程最佳实践参考
  - 注意：Next.js、RSC、Server Actions 相关规则仅在项目实际使用这些能力时启用

- `vercel-composition-patterns`
  - 说明：组件组合与架构参考
  - 注意：React 19 相关规则不是当前模板默认基线

- `web-design-guidelines`
  - 说明：UI 设计与体验审查参考

参考技能只能辅助 review、refactor、架构判断，不能单独决定目录、依赖或默认实现方案。

## 推荐触发顺序

常见任务可按以下顺序组合：

- 新页面开发：`create-proposal` -> `design-analysis` -> `create-route` -> `create-component` -> `create-api` -> `create-store` -> `ui-verification`
- 新功能组件：`create-proposal` -> `create-component` -> `theme-variables`
- 接口联调：`create-proposal` -> `create-api` -> `create-store`
- UI 还原：`design-analysis` -> 开发技能 -> `ui-verification`
- 规则治理回归：`agents-governance`

说明：参考技能不单独决定目录结构、依赖选择或技术选型，只能在基线规则已经确定边界后辅助判断。

## 扩展约定

- 新增 skill 时，优先复用现有 rules，不要自己重新发明目录结构和命名体系
- 新增 skill 若绑定具体框架能力或运行时前提，必须在开头写清“适用边界”
- 新增 skill 后，应同步更新本索引
