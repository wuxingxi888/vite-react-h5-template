import { fileURLToPath } from 'url'
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import { createBuildJson, getNowTime, wrapperEnv } from './build/utils/utils'
import { createProxy } from './build/config/proxy'
import { createVitePlugins } from './build/plugin'
import { createBuild } from './build/config/build'
import pkg from './package.json'

const { dependencies, devDependencies, name, version } = pkg
// 应用信息
const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: getNowTime()
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    const root = process.cwd() // 当前工作目录
    const isBuild = command === 'build' // 是否是构建 serve
    const env = loadEnv(mode, root) // 加载env环境
    const viteEnv = wrapperEnv(env)

    const { VITE_PUBLIC_PATH, VITE_ENV, VITE_PROXY } = viteEnv

    createBuildJson(VITE_ENV)

    return {
        base: VITE_PUBLIC_PATH,
        root,
        plugins: createVitePlugins(viteEnv, isBuild),
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            host: true,
            open: true,
            hmr: true,
            proxy: createProxy(VITE_PROXY)
        },
        css: {
            preprocessorOptions: {
                scss: {
                    charset: false,
                    additionalData: `
					@import "@/styles/base.scss";
					@import "@/styles/mixin.scss";
					@import "@/styles/variables.scss";
				`,
                    javascriptEnabled: true,
                    modifyVars: {
                        '@primary-color': '#4377FE' //设置antd主题色
                    }
                }
            }
        },
        build: createBuild(viteEnv),
        define: {
            __APP_INFO__: JSON.stringify(__APP_INFO__)
        }
    }
})
