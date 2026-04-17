import { type FC, type ReactNode, Suspense, lazy } from 'react';

import { SpinLoading } from 'antd-mobile';

import { useThemeStore } from '@/stores';

const RouteAnimator = lazy(() => import('./RouteAnimation'));

// 定义 Loading 组件
const Loading = () => (
    <div className="flex h-full flex-col items-center justify-center">
        <SpinLoading color="primary" style={{ '--size': '30px' }}></SpinLoading>
        <p>Loading...</p>
    </div>
);

// 定义 LazyLoadWrapper 组件
const LazyLoadWrapper: FC<{ component: FC }> = ({ component: Component }) => {
    const isPageAnimate = useThemeStore((state) => state.isPageAnimate);

    return (
        <>
            {isPageAnimate ? (
                <Suspense fallback={<Component />}>
                    <RouteAnimator>
                        <Component />
                    </RouteAnimator>
                </Suspense>
            ) : (
                <Component />
            )}
        </>
    );
};

/**
 * 创建一个带动画的懒加载包装器
 * @param Component 要包装的组件
 * @returns 包含动画和加载状态的包装组件
 */
export const LazyLoad = (Component: FC): ReactNode => {
    return (
        <Suspense fallback={<Loading />}>
            <LazyLoadWrapper component={Component} />
        </Suspense>
    );
};
