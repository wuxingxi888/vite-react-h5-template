# Performance Optimization Report

## Execution Date

- 2026-04-17

## Context

This optimization pass followed the project `.agents` baseline and used `vercel-react-best-practices` as a reference-only performance guide. The work stayed within the React 18 client-side boundary and focused on high-confidence improvements:

- reduce initial bundle pressure
- defer non-critical dependencies
- reduce unnecessary re-renders
- remove avoidable runtime network overhead on the default route

## Implemented Optimizations

### 1. Deferred route animation dependency loading

Files:

- [src/routes/utils/LazyLoad.tsx](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/routes/utils/LazyLoad.tsx)
- [src/routes/utils/RouteAnimation.tsx](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/routes/utils/RouteAnimation.tsx)

Changes:

- `RouteAnimation` is now lazy-loaded instead of being imported into the common route loading path.
- `framer-motion` is no longer eagerly pulled into every lazily loaded page boundary.
- Route animation code now loads only when page animations are enabled.

Why it helps:

- reduces the shared route-loading bundle
- avoids paying the animation library cost for users who never enable page transitions

### 2. Removed `framer-motion` from the home page critical path

Files:

- [src/views/home/index.tsx](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/views/home/index.tsx)
- [src/views/home/index.module.scss](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/views/home/index.module.scss)

Changes:

- replaced the home logo entrance animation from `framer-motion` with a lightweight CSS keyframe animation
- kept the visual behavior without requiring the motion library on the default route

Why it helps:

- improves default route startup cost
- keeps animation but removes a large JS dependency from the first screen

### 3. Removed external badge image requests from the default route

File:

- [src/views/home/index.tsx](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/views/home/index.tsx)

Changes:

- replaced remote `img.shields.io` badge images with local rendered badge chips

Why it helps:

- removes multiple render-block-adjacent external image fetches from the home route
- improves reliability and reduces layout/network variability on first visit

### 4. Trimmed ECharts registration to only used chart capabilities

File:

- [src/hooks/useECharts/echarts.ts](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/hooks/useECharts/echarts.ts)

Changes:

- removed unused chart registrations:
  - `GaugeChart`
  - `MapChart`
  - `PictorialBarChart`
  - `RadarChart`
- removed unused component registrations:
  - `AriaComponent`
  - `CalendarComponent`
  - `DataZoomComponent`
  - `MarkLineComponent`
  - `ParallelComponent`
  - `PolarComponent`
  - `RadarComponent`
  - `TimelineComponent`
  - `VisualMapComponent`

Why it helps:

- reduces chart route bundle size
- keeps current chart pages working while removing dead registration cost

### 5. Reduced unnecessary Zustand-driven re-renders

Files:

- [src/hooks/useThemeSync/index.ts](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/hooks/useThemeSync/index.ts)
- [src/hooks/useECharts/index.ts](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/hooks/useECharts/index.ts)
- [src/components/Logo/index.tsx](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/components/Logo/index.tsx)
- [src/components/ThemeToggle/index.tsx](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/components/ThemeToggle/index.tsx)
- [src/views/login/components/LoginWave/index.tsx](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/views/login/components/LoginWave/index.tsx)
- [src/views/example/index.tsx](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/views/example/index.tsx)
- [src/views/mine/components/ThemeSetting/index.tsx](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/views/mine/components/ThemeSetting/index.tsx)
- [src/layout/index.tsx](/Users/tomcat/Desktop/TomCat/vite-react-h5-template/src/layout/index.tsx)

Changes:

- replaced broad store object subscriptions with selector-based subscriptions
- avoided components re-rendering for unrelated store field changes
- hoisted menu route generation out of the layout render path

Why it helps:

- reduces unnecessary work on theme and app store updates
- keeps global state usage closer to React best practices for render isolation

## Build Result Comparison

Measured with `pnpm run build:test`.

### Main modern vendor chunk

- Before: `dist/static/js/.pnpm-eoPIRjn-.js` `1499.68 kB`, gzip `499.12 kB`
- After: `dist/static/js/.pnpm-BeimpPGm.js` `1287.41 kB`, gzip `432.21 kB`

Change:

- reduced by `212.27 kB` raw
- reduced by `66.91 kB` gzip

### Main legacy vendor chunk

- Before: `dist/static/js/.pnpm-legacy-CGUEXtla.js` `1473.74 kB`, gzip `482.90 kB`
- After: `dist/static/js/.pnpm-legacy-DF-_ArI9.js` `1263.87 kB`, gzip `417.92 kB`

Change:

- reduced by `209.87 kB` raw
- reduced by `64.98 kB` gzip

### Additional structural outcome

- route animation now appears as an isolated async chunk:
  - `dist/static/js/RouteAnimation-Cy8XGgM2.js`
  - `dist/static/js/RouteAnimation-legacy-B-w03Hq3.js`

This confirms that animation code is no longer bundled into the common route path.

## Validation

Executed:

- `pnpm typecheck`
- `pnpm run lint:eslint`
- `pnpm run build:test`

Result:

- all three commands passed

## Remaining Non-Blocking Warnings

The build still reports existing environment/tooling warnings unrelated to this optimization pass:

- `baseline-browser-mapping` data is stale
- `caniuse-lite` / Browserslist data is stale
- `plugin-legacy` warns about using plugin `targets`
- `vite-plugin-imagemin` still reports errors on two PNG assets while the build succeeds

## Next Optimization Opportunities

- move Uno web font fetching to a more deterministic self-hosted or cached strategy
- review whether `vite-plugin-imagemin` should remain enabled in local/test builds
- audit chart pages for viewport-based deferred rendering if chart content grows further
- consider splitting dev-only tools such as `vConsole` behind a stricter on-demand pathway

## Summary

This pass focused on practical React 18 performance wins with low behavioral risk. The largest gains came from removing `framer-motion` from the default/common loading path and trimming unused ECharts capabilities. The project now ships a smaller shared vendor bundle and avoids several unnecessary first-screen network and render costs.
