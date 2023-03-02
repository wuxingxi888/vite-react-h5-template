import type { PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import legacyPlugin from '@vitejs/plugin-legacy'
import topLevelAwait from 'vite-plugin-top-level-await'
import { configVisualizerConfig } from './visualizer'
import { configCompressPlugin } from './compress'
import { configImgCompressPlugin } from './imgCompress'
import { ConfigProgressPlugin } from './progress'
import { ConfigEruda } from './eruda'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const { VITE_ENV, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE, VITE_REPORT } =
        viteEnv

    const vitePlugins: (PluginOption | PluginOption[])[] = [
        // react支持
        react(),
        // es兼容性支持
        legacyPlugin({
            targets: ['chrome 52'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            renderLegacyChunks: true,
            polyfills: [
                'es.symbol',
                'es.array.filter',
                'es.promise',
                'es.promise.finally',
                'es/map',
                'es/set',
                'es.array.for-each',
                'es.object.define-properties',
                'es.object.define-property',
                'es.object.get-own-property-descriptor',
                'es.object.get-own-property-descriptors',
                'es.object.keys',
                'es.object.to-string',
                'web.dom-collections.for-each',
                'esnext.global-this',
                'esnext.string.match-all'
            ]
        }),
        topLevelAwait({
            // The export name of top-level await promise for each chunk module
            promiseExportName: '__tla',
            // The function to generate import names of top-level await promise in each chunk module
            promiseImportName: (i) => `__tla_${i}`
        })
    ]

    // 构建时显示进度条
    vitePlugins.push(ConfigProgressPlugin())

    // 打包分析rollup-plugin-visualizer
    vitePlugins.push(configVisualizerConfig(VITE_REPORT))

    if (VITE_ENV !== 'production') {
        // 调试控制台
        vitePlugins.push(ConfigEruda())
    }

    // 编译开启
    if (isBuild) {
        // 开启.gz压缩  rollup-plugin-gzip
        vitePlugins.push(
            configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
        )

        // 图片压缩
        vitePlugins.push(configImgCompressPlugin())
    }

    return vitePlugins
}
