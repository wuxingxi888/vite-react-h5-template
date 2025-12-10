import { lazy } from 'react';

import type { routeItem } from '../index';
import { LazyLoad } from '../utils/LazyLoad';

const routes: routeItem[] = [
    {
        path: '/login',
        meta: { title: '登录' },
        element: LazyLoad(lazy(() => import('@/views/login'))),
    },
    {
        path: '/themeSetting',
        meta: { title: '主题设置' },
        element: LazyLoad(lazy(() => import('@/views/mine/ThemeSetting'))),
    },
    {
        path: '/svgIcons',
        meta: { title: 'SVG图标' },
        element: LazyLoad(lazy(() => import('@/views/example/SvgIcon'))),
    },
    {
        path: '/unoCss',
        meta: { title: 'UnoCss示例' },
        element: LazyLoad(lazy(() => import('@/views/example/UnoCss'))),
    },
    {
        path: '/openInstall',
        meta: { title: 'OpenInstall示例' },
        element: LazyLoad(lazy(() => import('@/views/example/OpenInstall'))),
    },
    {
        path: '/framerMotion',
        meta: { title: 'FramerMotion动画示例' },
        element: LazyLoad(lazy(() => import('@/views/example/FramerMotion'))),
    },
    {
        path: '/figmaDemo',
        meta: { title: 'Figma演示' },
        element: LazyLoad(lazy(() => import('@/views/example/FigmaDemo'))),
    },
];

export default routes;
