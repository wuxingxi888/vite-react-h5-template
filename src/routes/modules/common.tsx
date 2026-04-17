import { lazy } from 'react';
import { Navigate } from 'react-router';

import type { routeItem } from '../index';
import { LazyLoad } from '../utils/LazyLoad';

const routes: routeItem[] = [
    {
        path: '/*', // 找不到路由404
        element: <Navigate replace to="/err404" />,
    },

    {
        path: '/err404',
        meta: { title: '404' },
        element: LazyLoad(lazy(() => import('@/views/common/err404'))),
    },

    {
        path: '/webview',
        meta: { title: 'webview' },
        element: LazyLoad(lazy(() => import('@/views/common/webview'))),
    },

    {
        path: '/dependence',
        meta: { title: '项目依赖' },
        element: LazyLoad(lazy(() => import('@/views/common/dependence'))),
    },
];

export default routes;
