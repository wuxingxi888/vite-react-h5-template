export interface ViteEnvConfig {
    title: string;
    proxy: [string, string][];
    apiUrl: string;
    apiUrlPrefix: string;
    uploadUrl: string;
    imgUrlPrefix: string;
    isHashRoute: boolean;
}

export interface ImportMetaEnv {
    readonly VITE_ENV: string;
    readonly VITE_PORT: string;
    readonly VITE_GLOB_APP_TITLE: string;
    readonly VITE_PUBLIC_PATH: string;
    readonly VITE_USE_MOCK: boolean;
    readonly VITE_HASH_ROUTE: boolean;
    readonly VITE_APP_API_TOKEN: string;
    readonly VITE_OUTPUT_DIR: string;
    readonly VITE_PROXY: [string, string][];
    readonly VITE_GLOB_API_URL: string;
    readonly VITE_GLOB_API_URL_PREFIX: string;
    readonly VITE_GLOB_UPLOAD_URL: string;
    readonly VITE_GLOB_IMG_URL_PREFIX: string;
    readonly VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
}
