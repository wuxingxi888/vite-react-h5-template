import { useCallback, useEffect, useMemo, useRef } from 'react';

import type { EChartsOption } from 'echarts';
import { debounce } from 'es-toolkit';

import { useThemeStore } from '@/stores';

import echarts from './echarts';

/**
 * 配置选项接口，用于定义 ECharts 图表的主题
 */
interface UseEChartsOptions {
    /**
     * 图表主题模式，可选 'light'、'dark' 或 'default'
     * @default 'default'
     */
    theme?: 'light' | 'dark' | 'default';
}

/**
 * 自定义 React Hook，用于在组件中集成和管理 ECharts 实例
 *
 * @param elRef - 指向 HTMLDivElement 的 ref，用于挂载 ECharts 图表容器
 * @param options - 可选配置项，用于设置图表主题等参数
 * @returns 返回包含操作图表方法的对象：
 *   - setOptions: 设置图表配置项
 *   - resize: 手动触发图表尺寸调整
 *   - echarts: ECharts 实例对象
 *   - getInstance: 获取当前图表实例
 */
export function useECharts(
    elRef: React.RefObject<HTMLDivElement>,
    options: UseEChartsOptions = {},
) {
    const { theme = 'default' } = options;
    const themeMode = useThemeStore((state) => state.themeMode);

    const chartInstanceRef = useRef<echarts.ECharts | null>(null);
    const cacheOptionsRef = useRef<EChartsOption>({});
    const resizeFnRef = useRef<() => void>();
    const timeoutRef = useRef<NodeJS.Timeout>();

    /**
     * 根据传入的 theme 和全局主题状态计算最终使用的主题模式
     */
    const getThemeMode = useMemo(() => {
        const resolvedTheme = theme === 'default' ? themeMode : theme;
        return resolvedTheme === 'light' || resolvedTheme === 'dark' ? resolvedTheme : 'light';
    }, [theme, themeMode]);

    /**
     * 调整图表大小
     */
    const resize = useCallback(() => {
        chartInstanceRef.current?.resize();
    }, []);

    /**
     * 应用暗色模式背景色
     */
    const applyDarkModeBackground = useCallback(
        (options: EChartsOption): EChartsOption => {
            return getThemeMode === 'dark'
                ? { backgroundColor: 'transparent', ...options }
                : options;
        },
        [getThemeMode],
    );

    /**
     * 初始化 ECharts 实例
     */
    const initCharts = useCallback(() => {
        const el = elRef.current;
        if (!el) return;

        // 清理旧实例和事件监听
        if (chartInstanceRef.current) {
            chartInstanceRef.current.dispose();
        }
        if (resizeFnRef.current) {
            window.removeEventListener('resize', resizeFnRef.current);
        }

        const chartTheme = getThemeMode;
        chartInstanceRef.current = echarts.init(el, chartTheme);

        resizeFnRef.current = debounce(resize, 200);
        window.addEventListener('resize', resizeFnRef.current);
    }, [elRef, getThemeMode, resize]);

    /**
     * 设置图表配置项
     *
     * @param options - ECharts 配置对象
     * @param clear - 是否在设置前清空图表，默认为 true
     */
    const setOptions = useCallback(
        (options: EChartsOption, clear = true) => {
            // 清除之前的定时器防止堆积
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            cacheOptionsRef.current = options;

            const newOptions = applyDarkModeBackground(cacheOptionsRef.current);

            if (elRef.current?.offsetHeight === 0) {
                timeoutRef.current = setTimeout(() => {
                    setOptions(newOptions, clear);
                }, 30);
                return;
            }

            timeoutRef.current = setTimeout(() => {
                if (!chartInstanceRef.current) {
                    initCharts();
                    if (!chartInstanceRef.current) return;
                }

                if (clear) {
                    chartInstanceRef.current?.clear();
                }

                chartInstanceRef.current?.setOption(newOptions);
            }, 30);
        },
        [elRef, initCharts, applyDarkModeBackground],
    );

    /**
     * 获取当前 ECharts 实例，如果不存在则先初始化
     *
     * @returns 当前 ECharts 实例或 null
     */
    const getInstance = useCallback((): echarts.ECharts | null => {
        if (!chartInstanceRef.current) {
            initCharts();
        }
        return chartInstanceRef.current;
    }, [initCharts]);

    // 监听主题变化并更新图表样式
    useEffect(() => {
        if (chartInstanceRef.current) {
            const newOptions = applyDarkModeBackground(cacheOptionsRef.current);
            chartInstanceRef.current.setOption(newOptions, true);
        }
    }, [getThemeMode, applyDarkModeBackground]);

    // 组件卸载时清理资源
    useEffect(() => {
        return () => {
            // 清理定时器
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // 清理图表实例
            if (chartInstanceRef.current) {
                chartInstanceRef.current.dispose();
                chartInstanceRef.current = null;
            }

            // 移除resize监听
            if (resizeFnRef.current) {
                window.removeEventListener('resize', resizeFnRef.current);
            }
        };
    }, []);

    return {
        setOptions,
        resize,
        echarts,
        getInstance,
    };
}
