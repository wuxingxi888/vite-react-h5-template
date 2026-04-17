---
name: create-store
description: 指导在前端项目中按团队规范使用 Zustand 创建和维护全局状态 store，包括目录结构、命名与持久化策略。当前端需要新增或重构状态管理时使用本技能。
---

# 创建与维护 Zustand Store

## 适用前提

- 适用于 React 18 通用前端的客户端共享状态
- 目录前提：`src/stores/index.ts` + `src/stores/modules/useXxxStore.ts`
- 依赖前提：以 Zustand 为基线，优先使用 `immer`；持久化仅在确有需要时启用
- 不适用于把服务端数据缓存或请求结果机械搬入全局 store 的场景

## 使用场景

当你需要：

- 为业务模块新增全局状态（如主题、用户信息、AI 编辑器状态）
- 重构原有的状态管理逻辑到统一的 `src/stores` 目录

请使用本技能，并同时遵守 `.agents/rules/03-项目结构.md`（目录结构约束）与 `.agents/rules/07-状态管理.md`。

---

## 执行前检查

- 先判断该状态是否真的是跨页面或跨模块共享的客户端状态
- 检查项目是否已经存在对应 store，避免同一业务状态重复建模
- 检查是否只需要组件局部状态；若是，优先 `useState` / `useReducer`

---

## 目录与命名

- 所有 store 文件必须放在：`src/stores/modules/`
- 每个业务模块一个文件：`src/stores/modules/useXxxStore.ts`
- 每个 store 文件必须导出同名 hook：`useXxxStore`（`Xxx` 与业务语义一致）
- 统一导出入口：`src/stores/index.ts`（集中导出各模块 `useXxxStore`）

示例：

```ts
// 结构示意
// src/stores/index.ts
// src/stores/modules/useThemeStore.ts     -> useThemeStore
// src/stores/modules/useUserStore.ts      -> useUserStore
// src/stores/modules/useAppStore.ts       -> useAppStore
```

```ts
// src/stores/index.ts（统一导出示例）
export { useThemeStore } from './modules/useThemeStore';
export { useUserStore } from './modules/useUserStore';
export { useAppStore } from './modules/useAppStore';
```

---

## 步骤 1：创建基本 Store

```ts
// src/stores/modules/useThemeStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ThemeMode } from '@/constants/theme';

type State = {
  themeMode: ThemeMode;
};

type Action = {
  setThemeMode: (themeMode: ThemeMode) => void;
  toggleThemeMode: () => void;
};

type Store = State & Action;

export const useThemeStore = create<Store>()(
  immer((set, get) => ({
    themeMode: ThemeMode.LIGHT,
    setThemeMode: (themeMode) =>
      set((state) => {
        state.themeMode = themeMode;
      }),
    toggleThemeMode: () =>
      set((state) => {
        state.themeMode =
          get().themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
      }),
  }))
);
```

---

## 步骤 2：使用持久化（如需要）

当状态需要跨页面或刷新保留时，使用 `zustand/middleware` 的 `persist`：

```ts
// src/stores/modules/useThemeStore.ts（持久化示例）
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ThemeMode } from '@/constants/theme';

type State = {
  themeMode: ThemeMode;
};

type Action = {
  setThemeMode: (themeMode: ThemeMode) => void;
};

type Store = State & Action;

export const useThemeStore = create<Store>()(
  persist(
    immer((set) => ({
      themeMode: ThemeMode.LIGHT,
      setThemeMode: (themeMode) =>
        set((state) => {
          state.themeMode = themeMode;
        }),
    })),
    {
      name: 'app-theme-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ themeMode: state.themeMode }),
    }
  )
);
```

---

## 使用约定

- 状态逻辑必须集中在 `src/stores`，**禁止** 在组件层直接用 `useState` 维护本应全局共享的业务状态。
- Store 中不要直接耦合具体 UI 组件，只存纯数据与业务行为。
- Store 文件只负责“纯数据 + 业务动作”，不直接耦合 UI 组件、路由实例、DOM/浏览器 API。
- 组件私有状态优先使用 `useState` / `useReducer`，不要把局部状态提前抽到全局。
- 服务端数据与接口缓存默认不进入 Zustand；只有明确的客户端共享状态才进入 store。
- 不要把服务端数据缓存、列表响应或详情响应机械塞进 store。
- 页面/组件通过：

```ts
// 推荐：使用选择器订阅，避免一次性订阅整个 store 导致不必要重渲染
const themeMode = useThemeStore((s) => s.themeMode);
const setThemeMode = useThemeStore((s) => s.setThemeMode);

// 若确需同时取多个字段，可组合选择器（注意引用稳定性与渲染影响）
const toggleThemeMode = useThemeStore((s) => s.toggleThemeMode);
```

来消费状态。

---

## 快速检查清单

- [ ] store 文件是否放在了 `src/stores/modules/`？
- [ ] 文件名是否为 `useXxxStore.ts`，且是否导出 `useXxxStore`？
- [ ] 是否在 `src/stores/index.ts` 统一导出了对应 `useXxxStore`？
- [ ] store 是否只包含“纯数据 + 业务动作”，且不耦合 UI/路由/DOM/浏览器 API？
- [ ] 是否默认使用了 `immer` 中间件，并用 `set((state) => { ... })` 更新 state？
- [ ] 是否使用 `useXxxStore` 作为导出的 hook 名称？
- [ ] 是否根据需要选择了是否使用 `persist`？
- [ ] 如使用 `persist`：是否组合了 `createJSONStorage(() => localStorage)`？
- [ ] 如使用 `persist`：是否通过 `partialize` 只持久化必要字段？
- [ ] 如使用 `persist`：`name` 是否使用 `app-xxx-store` 形式？
- [ ] 是否避免在 store 中写与 UI 绑定的逻辑？
- [ ] 组件消费是否优先使用选择器：`useXxxStore((s) => s.xxx)` / `useXxxStore((s) => s.setXxx)`？
- [ ] 是否避免把服务端数据缓存机械搬进 Zustand

---

## 失败回退

- 若状态仅服务单组件或单页面，回退到组件局部状态或页面 hooks
- 若当前只是临时联调数据，不要为了“统一”而提前创建全局 store
- 若无法确认是否需要持久化，默认先不启用 `persist`
