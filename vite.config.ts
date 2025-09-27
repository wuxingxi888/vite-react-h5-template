import autoprefixer from 'autoprefixer';
import { type ConfigEnv, type UserConfig, defineConfig, loadEnv } from 'vite';

import { getNowTime, pathResolve, wrapperEnv } from './build/utils';
import { createBuild } from './build/vite/build';
import { createVitePlugins } from './build/vite/plugin';
import { postcssPxToViewProtConfig } from './build/vite/plugin/postcssPxToView';
import { createProxy } from './build/vite/proxy';
import pkg from './package.json';

// 应用信息
const __APP_INFO__ = {
    pkg,
    lastBuildTime: getNowTime(),
};

/**
 * https://vite.dev/config/
 * @type {import('vite').UserConfig}
 * @param command dev/serve || build 命令模式
 * @param mode development || production 环境模式
 * */
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    // 当前工作目录
    const root = process.cwd();
    // 是否是构建 (dev/serve 或 build)
    const isBuild = command === 'build';
    // 加载env环境 (root目录下的 .env开头的环境文件)
    const env = loadEnv(mode, root);
    // 将env环境变量转换为对象
    const viteEnv = wrapperEnv(env);

    const { VITE_PUBLIC_PATH, VITE_PORT } = viteEnv;

    return {
        base: VITE_PUBLIC_PATH,
        root,
        plugins: createVitePlugins(viteEnv, isBuild),
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: pathResolve('src'),
                },
            ],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    charset: false,
                    // additionalData的内容会在每个scss文件的开头自动注入
                    additionalData: `@use "@/styles/scss/index.scss" as *;`, // 引入全局scss变量、样式工具函数等
                },
            },
            postcss: {
                plugins: [
                    autoprefixer({
                        // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
                        overrideBrowserslist: [
                            'Android 4.1',
                            'iOS 7.1',
                            'Chrome > 31',
                            'ff > 31',
                            'ie >= 8',
                        ],
                    }),
                    postcssPxToViewProtConfig(),
                ],
            },
        },
        server: {
            host: true,
            open: true,
            hmr: true, // 开启热更新
            port: Number(VITE_PORT),
            proxy: createProxy(),
        },
        build: createBuild(viteEnv),
        esbuild: {
            // 使用esbuild来构建去掉console和debugger，
            drop: mode === 'production' ? ['console', 'debugger'] : [],
        },
        define: {
            __APP_INFO__: JSON.stringify(__APP_INFO__),
        },
    };
});
