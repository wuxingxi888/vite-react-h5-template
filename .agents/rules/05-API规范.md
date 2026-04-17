---
alwaysApply: true
description: 项目的 API 规范，包括接口请求封装、函数命名约定、错误处理原则。当新增或修改接口时读取此规则。
---

# API 规范

## 接口请求规范

- 接口请求必须基于统一请求客户端封装，禁止在页面/组件中直接书写裸请求逻辑
- 若模板或项目扩展规则明确采用 `axios`，则统一客户端放在 `src/http/client.ts`
- 若模板未声明具体请求库，则保持“统一请求层”要求，但不指定具体库实现
- 业务接口按领域聚合在 `src/http/<domain>.ts`
- 与 HTTP 无关的原生通信逻辑、SDK 适配逻辑不得混入 `src/http/`
- API 类型统一放在 `src/types/<domain>/api.ts`
- 若项目存在 Token 认证，统一在请求客户端层处理认证信息注入

如需查看完整示例与落地步骤，请使用技能文件：

- `.agents/skills/create-api/SKILL.md`（若技能尚未提供，则以本规则为准）

## 接口函数命名（NON-NEGOTIABLE）

| 操作     | 命名规则     | 示例              |
| -------- | ------------ | ----------------- |
| 获取列表 | getXxxList   | `getBannerList`   |
| 获取详情 | getXxxDetail | `getBannerDetail` |
| 创建     | createXxx    | `createBanner`    |
| 更新     | updateXxx    | `updateBanner`    |
| 删除     | deleteXxx    | `deleteBanner`    |

**禁止**使用 `fetch` 前缀或匈牙利命名法。

## 接口错误处理（NON-NEGOTIABLE）

统一请求客户端应包含通用错误码映射与提示能力，业务代码中**禁止重复添加** `message.error` 等错误提示：

- 通用 HTTP 错误由拦截器统一处理（网络异常、超时、401/403/5xx 等）
- 业务层仅处理语义错误、表单校验错误与成功反馈，避免重复 toast
- 需要静默处理的场景应通过参数显式声明（如 `silent`），避免默认静默

## 统一请求客户端约束

- 统一配置 `baseURL`、`timeout`、通用请求头与响应解包逻辑
- 统一处理 token 注入、token 失效与登录态清理逻辑
- 响应结构需保持可预测：明确返回业务数据或抛出可识别错误对象
- 禁止在业务 API 函数中重复拼接通用头、重复写鉴权逻辑
- 若项目采用 axios，上述能力由 `src/http/client.ts` 统一承载；若未采用 axios，仍需在统一请求层实现等价约束

## React 使用约束

- 页面组件只负责编排 UI 与交互，网络请求逻辑下沉到 `src/http/` 或自定义 hooks
- 异步请求必须处理竞态问题（取消请求或忽略过期响应），防止旧响应覆盖新状态
- 组件卸载时应取消未完成请求（如 `AbortController` 或请求库提供的取消机制）
- 列表/详情等高频场景应明确 loading、empty、error 三态，避免隐式状态

## 目录基线说明

- 本模板固定使用 `src/http/` 作为请求层目录，不再使用 `src/services/api/`
- 若项目确实存在更复杂的基础设施层，可在项目扩展规则中声明 `src/http/core/`、`src/http/adapters/` 等细分目录，但模板基线不预设
