import { lazy } from 'react';
import { type LoaderFunctionArgs } from 'react-router';

import type { routeItem } from '..';
import { LazyLoad } from './LazyLoad';

const routeErrorElement = LazyLoad(lazy(() => import('@/views/common/err404')));

/** 路由列表 */
export const routes = getRoutesFromModules();

/** 路由白名单 */
export const WHITE_LIST = new Set(['/login']);

/**
 * 基于 router/modules 文件导出的内容动态生成路由
 */
export function getRoutesFromModules() {
    const routes: routeItem[] = [];

    const modules = import.meta.glob('../modules/**/*.tsx', { eager: true }) as Record<
        string,
        Record<'default', routeItem[]>
    >;
    const addConfigurationToRoute = (route: routeItem) => {
        route.loader = (options: LoaderFunctionArgs) => {
            // 设置标题
            document.title = route.meta?.title ?? import.meta.env.VITE_GLOB_APP_TITLE;
            return loader(options);
        };
        route.errorElement ??= routeErrorElement;

        if (route.children) {
            route.children = route.children.map((child) => addConfigurationToRoute(child));
        }
        return route;
    };

    Object.keys(modules).forEach((key) => {
        const mod = modules[key].default || {};
        const modList = Array.isArray(mod) ? [...mod] : [mod];
        // 为每个路由添加 loader 并递归处理子路由
        const processedRoutes = modList.map((route) => {
            return addConfigurationToRoute(route);
        });
        routes.push(...processedRoutes);
    });
    return routes;
}

/**
 * 使用 loader 作路由守卫
 * @see https://reactrouter.com/start/data/route-object#loader
 */
export function loader({ request }: LoaderFunctionArgs) {
    console.log('request', request);
    // 权限校验
    // const pathname = getPathName(request.url);
    // const token = localStorage.getItem('token');
    // 未登录且不在白名单中，跳转到登录页
    // if (!token && !WHITE_LIST.has(pathname)) {
    //     window.location.replace(`/login?callback=${encodeURIComponent(window.location.href)}`);
    //     return false;
    // }
    return true;
}

/**
 * 从给定的 URL 中获取 pathname
 */
export function getPathName(url: string): string {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.pathname;
    } catch {
        return window.location.pathname;
    }
}

export function getMenuRoutes() {
    const menu: routeItem[] = [];

    const modules = import.meta.glob('../modules/menu.tsx', { eager: true }) as Record<
        string,
        Record<'default', routeItem[]>
    >;

    Object.keys(modules).forEach((key) => {
        const mod = modules[key].default || [];
        const modList = Array.isArray(mod) ? mod : [mod];
        modList.forEach((route) => {
            if (Array.isArray(route.children) && route.children.length > 0) {
                menu.push(
                    ...route.children.filter(
                        (child): child is routeItem =>
                            typeof child.path === 'string' && Boolean(child?.meta?.title),
                    ),
                );
            }
        });
    });

    return menu;
}
