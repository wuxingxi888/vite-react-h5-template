---
name: create-api
description: 指导在前端项目中按团队规范创建和维护接口请求层，涵盖统一请求客户端、业务 API 文件、类型组织、错误处理、mock 过渡与 React 使用边界。当前端需要新增或重构接口时使用本技能。
---

# 创建与维护 API

## 适用前提

- 适用于 React 18 通用前端的统一请求层建设
- 目录前提：请求层位于 `src/http/`，类型位于 `src/types/`
- 依赖前提：本技能不默认要求 axios；仅当模板或项目扩展规则明确采用 axios 时，才使用 axios 示例
- 若项目已有统一请求客户端，应优先延续现有客户端，而不是直接引入新库

## 使用场景

当你需要：

- 新增一个业务接口模块
- 统一封装请求客户端
- 为某个功能补齐请求类型
- 在后端未就绪时编写 mock API

请使用本技能，并同时遵守：

- `.agents/rules/03-项目结构.md`
- `.agents/rules/05-API规范.md`

---

## 执行前检查

- 检查项目规则是否明确声明请求库；若没有，只保持“统一请求层”约束
- 检查是否已有 `src/http/client.ts` 或等价统一客户端，避免重复发明
- 检查当前需求是否真的需要进入全局 store；服务端数据默认不进 Zustand

---

## 目录基线

本模板统一采用：

```text
src/
├── http/
│   ├── client.ts
│   └── <domain>.ts
└── types/
    └── <domain>/
        ├── api.ts
        ├── model.ts
        └── index.ts
```

说明：

- `src/http/client.ts`：统一请求客户端（若项目采用 axios，则由 axios 客户端承载）
- `src/http/<domain>.ts`：按业务域聚合接口函数
- `src/types/<domain>/api.ts`：接口 DTO 类型
- `src/types/<domain>/model.ts`：实体模型类型

---

## 步骤 1：准备类型

先在 `src/types/<domain>/` 中定义类型：

- `api.ts`：请求参数、响应体
- `model.ts`：页面消费的实体模型
- `index.ts`：对外导出

示例：

```ts
export interface GetUserDetailParams {
  userId: string;
}

export interface GetUserDetailResponse {
  id: string;
  name: string;
}
```

---

## 步骤 2：创建统一客户端

若项目尚未提供 `src/http/client.ts`，先创建统一客户端，负责：

- `baseURL`
- `timeout`
- token 注入
- 通用错误处理
- 响应解包

业务代码不得重复拼接通用请求头或重复写鉴权逻辑。若项目已声明 axios，可按 axios 客户端实现；否则沿用项目现有请求方案实现等价能力。

---

## 步骤 3：创建业务 API 文件

示例：

```ts
import { client } from './client';
import type { GetUserDetailParams, GetUserDetailResponse } from '@/types/user';

export async function getUserDetail(params: GetUserDetailParams) {
  return client.get<GetUserDetailResponse>('/users/detail', { params });
}
```

> 上例仅在项目已明确采用 axios 或兼容泛型 `get` 接口的客户端时适用；若客户端 API 不同，应按现有统一请求层适配。

命名规则：

- 获取列表：`getXxxList`
- 获取详情：`getXxxDetail`
- 创建：`createXxx`
- 更新：`updateXxx`
- 删除：`deleteXxx`

禁止使用 `fetchXxx` 作为业务接口函数名。

---

## 步骤 4：后端未就绪时的 mock 策略

若接口未就绪：

- 在 `src/http/<domain>.ts` 中提供 mock 数据与模拟请求函数
- 类型仍写在 `src/types/<domain>/`
- mock 字段仅保留当前页面真实消费字段
- 不要把 mock 常量散落到多个目录

---

## 步骤 5：React 使用边界

- 页面组件只负责编排 UI，不直接写裸请求
- 请求逻辑下沉到 `src/http/` 或自定义 hooks
- 必须处理请求竞态
- 明确 loading、empty、error 三态
- 服务端数据不要默认塞进 Zustand

---

## 快速检查清单

- [ ] 是否使用 `src/http/client.ts` 统一客户端
- [ ] 业务接口是否放在 `src/http/<domain>.ts`
- [ ] 类型是否放在 `src/types/<domain>/api.ts`
- [ ] 命名是否符合 `get/create/update/delete` 规则
- [ ] 是否避免在组件中直接使用裸 `axios`
- [ ] 是否处理了通用错误、竞态和状态三态
- [ ] mock 是否与真实消费字段对齐
- [ ] 若项目未声明 axios，是否没有把 axios 当成唯一实现前提
- [ ] 是否在依赖不存在时优先复用现有统一请求层，而不是直接引入新库

---

## 失败回退

- 若无法确认请求库，回退到“统一请求层”抽象，不输出绑定具体库的默认实现
- 若当前项目没有统一客户端且当前任务只需 mock，可先在 `src/http/<domain>.ts` 中收敛 mock，并在说明中标记后续需统一客户端
- 若请求逻辑仅服务单页且尚未稳定，可先下沉到页面 hooks，但不要直接写在组件 render 中

---

## 与其它技能的关系

- `create-proposal`：提案中若涉及接口改动，可引用本技能
- `create-store`：仅当接口结果确实需要作为客户端共享状态时，才进一步进入 store
