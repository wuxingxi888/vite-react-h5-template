import { useEnv as getEnv } from '@/hooks/useEnv';

import { asyncLoadScript } from '@/utils/script';

/**
 * 动态加载脚本
 */
export const initLoadScript = () => {
    const { getEnvMode } = getEnv();

    if (getEnvMode() !== 'production') {
        asyncLoadScript({
            src: 'https://cdn.bootcdn.net/ajax/libs/vConsole/3.15.1/vconsole.min.js',
            id: 'vconsole',
        }).then(() => {
            new window.VConsole({ theme: 'light' });
        });
    }
};

// 兼容旧调用名（不建议继续使用）
export const useLoadScript = initLoadScript;
