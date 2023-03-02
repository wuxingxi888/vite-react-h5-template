import { lazy, ReactNode } from 'react'
import { RouteObject, Navigate } from 'react-router-dom'
const Home = lazy(() => import('@/view/Home'))
const Page404 = lazy(() => import('@/view/404Page'))
const System = lazy(() => import('@/view/System'))

type routeItem = {
    path: string
    meta?: { title?: string }
    element: ReactNode
    children?: routeItem[]
}

const routes: RouteObject[] | routeItem[] = [
    //
    {
        path: '/', // 默认重定向
        element: <Navigate replace to="/home" />
    },
    {
        path: '/*', // 找不到路由404
        element: <Navigate replace to="/err404" />
    },
    {
        path: '/err404',
        meta: { title: '404' },
        element: <Page404 />
    },
    {
        path: '/home',
        meta: { title: '首页' },
        element: <Home />
    },
    {
        path: '/system',
        meta: { title: '开发者模式' },
        element: <System />
    }
]

export default routes
