import { Suspense, useEffect, useMemo, useRef } from 'react'
import { useRoutes, useLocation, matchPath } from 'react-router-dom'
import { SpinLoading, Dialog } from 'antd-mobile'
import styles from './index.module.scss'
import routes from '@/router'
import { useNavigate } from 'react-router-dom'
import useSystem from '@/hooks/useSystem'
import PasscodeInput from '@/components/PasscodeInput'

// 树形转数组
export const treeToArray = (arrayList: any) => {
    const list: any = []
    const listFun = (ll: any) => {
        ll.map((li: any) => {
            list.push(li)
            const children = li.children
            if (children && Array.isArray(children)) {
                listFun(children.slice(0))
            }
            return list
        })
        return list
    }
    listFun(arrayList)
    return list
}

const loading = (
    <div className={styles.wrap}>
        <SpinLoading style={{ '--size': '60px' }}></SpinLoading>
        <p>Loading...</p>
    </div>
)

const RouterView = () => {
    const element: any = useRoutes(routes)
    const { pathname } = useLocation()

    const routerMeta = useMemo(() => {
        const list = treeToArray(routes) // 如果你的路由不是树形的，可以不用转

        const meta = list.filter((route: any) => route['meta'] && matchPath(route.path, pathname))
        return Array.isArray(meta) && meta[0] !== undefined
            ? meta[0].meta
            : pathname === '/'
            ? { title: '首页' }
            : { title: 'err404' } // 针对home重定向 和 404err做的处理
    }, [routes, pathname])

    useEffect(() => {
        // 动态改变标题
        document.title = routerMeta.title
    }, [])

    const { execute } = useSystem()

    const domRef = useRef<any>(null)

    const navigate = useNavigate()

    const sysDialog = () => {
        Dialog.confirm({
            title: '开发者模式',
            content: (
                <div>
                    <PasscodeInput ref={domRef} />
                </div>
            ),
            onConfirm: async () => {
                const pwd = domRef.current.getPwdStr()
                if (pwd === '123456') return navigate('/System')
                domRef.current.setErr(true)
                throw new Error()
            }
        })
    }

    return (
        <div className="fix-iphone" onClick={() => execute(sysDialog)}>
            <Suspense fallback={loading}>
                <div className="content" title={routerMeta.title}>
                    {element}
                </div>
            </Suspense>
        </div>
    )
}

export default RouterView
