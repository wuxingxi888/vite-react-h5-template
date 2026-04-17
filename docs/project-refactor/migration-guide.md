# React 18 Rules-Driven Migration Guide

## Background

This refactor aligned the project structure with the current `.agents` baseline for a React 18 + Vite + React Router 7 + Zustand application. The migration was executed as a one-shot strict migration without compatibility aliases.

## Goals

- Align runtime directories and imports with `.agents` baseline
- Remove legacy Vue-oriented or template drifted implementation details
- Keep behavior stable while improving React 18 engineering consistency
- Preserve `.agents` governance changes already made in the repository

## Directory Mapping

| Before | After | Notes |
| --- | --- | --- |
| `src/router` | `src/routes` | Router entry, route modules, route utils moved under one source of truth |
| `src/store` | `src/stores` | Zustand modules normalized to `useXxxStore` named exports |
| `src/services` | `src/plugins/native-bridge` | Native bridge is runtime wiring, not business service layer |
| `src/utils/const/theme.ts` | `src/constants/theme.ts` | Theme constants promoted to stable constants directory |
| `src/views/<page>/<PrivateComp>` | `src/views/<page>/components/<PrivateComp>` | Page-private components moved under page-local `components/` |
| local `index.scss` | `index.module.scss` | Local styles migrated to CSS Modules where applicable |

## Route Migration

- Router entry is now [src/routes/index.tsx](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/routes/index.tsx).
- Route modules are aggregated from `src/routes/modules/*.tsx`.
- Route utilities were moved to `src/routes/utils/`.
- Routing metadata continues to use `meta`, not `handle`.
- The route tree now keeps:
  - one default redirect at `/ -> /home`
  - one 404 fallback at `/* -> /err404`
  - root-level `errorElement`
  - title injection through `meta.title`

## Store Migration

- All Zustand modules now live in `src/stores/modules/`.
- Unified export entry: [src/stores/index.ts](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/stores/index.ts)
- Current baseline exports:
  - `useAppStore`
  - `useThemeStore`
  - `useUserStore`

## Style Migration

- Local component and page styles were converted from `index.scss` to `index.module.scss`.
- CSS Modules are now used for local styling in migrated areas.
- No new `classnames` dependency was introduced; native class string composition is used.
- Global style responsibilities remain in `src/styles/` and [src/plugins/index.ts](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/plugins/index.ts).

## Native Bridge Migration

The old `src/services` bridge files were moved into `src/plugins/native-bridge/` because they are app runtime integration code:

- they attach capabilities to `window`
- they coordinate browser/native runtime behavior
- they are initialized with app plugins

This is closer to plugin semantics than API/service semantics.

Current entry points:

- [src/plugins/native-bridge/index.ts](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/plugins/native-bridge/index.ts)
- [src/plugins/native-bridge/js-call-native.ts](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/plugins/native-bridge/js-call-native.ts)
- [src/plugins/native-bridge/native-call-js.ts](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/plugins/native-bridge/native-call-js.ts)

## Why `src/http` Was Not Added

This migration did not fabricate a `src/http` layer because the repository does not currently contain a mature business request layer that would justify a fake baseline implementation. The `.agents` rules require stable, truthful structure over invented placeholders.

Decision:

- keep the rules aligned conceptually with `src/http`
- do not create empty or speculative HTTP modules
- wait until a real request layer is introduced by actual business needs

## Why `meta` Was Kept

The project already used `meta` for route metadata, and the refactor goal was to stabilize the current React 18 baseline rather than introduce a parallel metadata model.

Decision:

- continue using `meta`
- do not mix `meta` and `handle`
- keep title and menu metadata sourced from the existing route model

## Removed Legacy Paths

The following legacy directories were removed after migration:

- `src/router`
- `src/store`
- `src/services`
- `src/utils/const`

## Post-Migration Validation

The migration was validated with:

- `pnpm typecheck`
- `pnpm run build:test`
- `pnpm run lint:eslint`

Additional cleanup checks confirmed:

- no `@/router`, `@/store`, `@/services` import usage remains in `src/`
- no local `index.scss` remains outside `src/styles/`
- migrated directories now exist under `src/routes`, `src/stores`, and `src/plugins/native-bridge`
