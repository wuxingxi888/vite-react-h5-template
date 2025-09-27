import type { ImportMetaEnv, ViteEnvConfig } from '@/types/env';

export function useEnv() {
    const getEnvConfig = (): Readonly<ViteEnvConfig> => {
        const env = import.meta.env as unknown as ImportMetaEnv;
        return {
            title: env.VITE_GLOB_APP_TITLE,
            proxy: env.VITE_PROXY,
            apiUrl: env.VITE_GLOB_API_URL,
            apiUrlPrefix: env.VITE_GLOB_API_URL_PREFIX,
            uploadUrl: env.VITE_GLOB_UPLOAD_URL,
            imgUrlPrefix: env.VITE_GLOB_IMG_URL_PREFIX,
            isHashRoute: env.VITE_HASH_ROUTE,
        };
    };

    const getEnvMode = (): string => {
        return import.meta.env.MODE;
    };

    const isDevMode = (): boolean => {
        return import.meta.env.MODE === 'development';
    };

    const isProdMode = (): boolean => {
        return import.meta.env.MODE === 'production';
    };

    return {
        getEnvConfig,
        getEnvMode,
        isDevMode,
        isProdMode,
    };
}
