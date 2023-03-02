declare module '*.svg' {
    import { ReactElement, SVGProps } from 'react'
    const content: (props: SVGProps<SVGElement>) => ReactElement
    export default content
}

declare type Recordable<T = any> = Record<string, T>

declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
}

declare const __APP_INFO__: {
    pkg: {
        name: string
        version: string
        dependencies: Recordable<string>
        devDependencies: Recordable<string>
    }
    lastBuildTime: string
}

declare interface Window {
    webkit: any
    NativeCallJs: any
    eruda: any
}

interface ImportMetaEnv extends ViteEnv {
    __: unknown
}

declare interface ViteEnv {
    VITE_ENV: string
    VITE_OUTPUT_DIR: string
    VITE_PUBLIC_PATH: string
    VITE_PROXY: [string, string][]
    VITE_REPORT: boolean
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
}

declare class OpenInstall {
    constructor(options?: any, data?: any)
    static parseUrlParams(): void
    wakeupOrInstall(params?: {
        data: {
            inviteKey?: string
        }
        timeout: number
    }): void
}
