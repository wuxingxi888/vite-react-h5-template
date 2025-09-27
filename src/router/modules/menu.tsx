import { lazy } from 'react';

import type { routeItem } from '../index';
import { LazyLoad } from '../utils/LazyLoad';

const Layout = lazy(() => import('@/layout'));

const routes: routeItem[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/home',
                element: LazyLoad(lazy(() => import('@/views/home'))),
                meta: {
                    title: '首页',
                    icon: 'i-mage:dashboard-2-fill',
                },
            },
            {
                path: '/example',
                element: LazyLoad(lazy(() => import('@/views/example'))),
                meta: {
                    title: '示例',
                    icon: 'i-mingcute:list-expansion-fill',
                },
            },
            {
                path: '/chart',
                element: LazyLoad(lazy(() => import('@/views/chart'))),
                meta: {
                    title: '图表',
                    icon: 'i-bxs:chart',
                },
            },
            {
                path: '/mine',
                element: LazyLoad(lazy(() => import('@/views/mine'))),
                meta: {
                    title: '我的',
                    icon: 'i-tabler:brand-minecraft',
                },
            },
        ],
    },
];

export default routes;
