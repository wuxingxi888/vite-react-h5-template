import react from '@vitejs/plugin-react-swc';
import UnoCSS from 'unocss/vite';
import type { Plugin } from 'vite';
import checker from 'vite-plugin-checker';

import type { ImportMetaEnv } from '@/types/env';

import { configCdnImportPlugin } from './cdnImport';
import { configCompressPlugin } from './compress';
import { configImageminCompressPlugin } from './imageminCompress';
import { configLegacyPlugin } from './legacy';
import { configMockPlugin } from './mock';
import { configSvgIconsPlugin } from './svgSprite';
import { configVisualizerConfig } from './visualizer';

export function createVitePlugins(viteEnv: ImportMetaEnv, isBuild: boolean) {
    const { VITE_USE_MOCK, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;

    const vitePlugins: (Plugin | Plugin[])[] = [
        // UnoCSS支持
        UnoCSS(),

        // react
        react(),

        // 在浏览器中直接看到上报的类型错误（更严格的类型校验）
        checker({
            typescript: true,
            eslint: {
                useFlatConfig: true,
                lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
            },
        }),
    ];

    // es兼容性支持
    vitePlugins.push(configLegacyPlugin());

    // mock数据
    vitePlugins.push(configMockPlugin(VITE_USE_MOCK));

    // svgIcon
    vitePlugins.push(configSvgIconsPlugin(isBuild));

    // 编译开启
    if (isBuild) {
        // 开启.gz压缩  rollup-plugin-gzip （nginx也需要配合修改）
        vitePlugins.push(
            configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
        );

        // 图片压缩（此插件需使用魔法下载，根据实际情况使用）
        vitePlugins.push(configImageminCompressPlugin());

        // CDN导入
        vitePlugins.push(configCdnImportPlugin());

        // 打包分析rollup-plugin-visualizer
        vitePlugins.push(configVisualizerConfig());
    }

    return vitePlugins;
}
