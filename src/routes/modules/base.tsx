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
        path: '/theme-setting',
        meta: { title: '主题设置' },
        element: LazyLoad(lazy(() => import('@/views/mine/components/ThemeSetting'))),
    },
    {
        path: '/svg-icons',
        meta: { title: 'SVG图标' },
        element: LazyLoad(lazy(() => import('@/views/example/components/SvgIcon'))),
    },
    {
        path: '/uno-css',
        meta: { title: 'UnoCss示例' },
        element: LazyLoad(lazy(() => import('@/views/example/components/UnoCss'))),
    },
    {
        path: '/open-install',
        meta: { title: 'OpenInstall示例' },
        element: LazyLoad(lazy(() => import('@/views/example/components/OpenInstall'))),
    },
    {
        path: '/framer-motion',
        meta: { title: 'FramerMotion动画示例' },
        element: LazyLoad(lazy(() => import('@/views/example/components/FramerMotion'))),
    },
    {
        path: '/figma-demo',
        meta: { title: 'Figma演示' },
        element: LazyLoad(lazy(() => import('@/views/example/components/FigmaDemo'))),
    },
];

export default routes;
