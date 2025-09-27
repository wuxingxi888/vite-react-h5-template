import { useEffect } from 'react';

import useThemeStore from '@/store/modules/useThemeStore';

/**
 * 同步主题状态到 HTML 元素
 * 兼容 antd-mobile 内置深色模式主题
 */
export function useThemeSync() {
    const { themeMode, themeColor } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;

        // 清理旧的类名
        root.classList.remove('light', 'dark');
        root.classList.add(themeMode);

        // 设置颜色方案属性
        root.setAttribute('data-prefers-color-scheme', themeMode === 'dark' ? 'dark' : 'light');

        // 设置主题色
        root.style.setProperty('--adm-color-primary', themeColor);
    }, [themeMode, themeColor]);
}
