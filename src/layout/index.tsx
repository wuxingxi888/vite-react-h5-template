import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { TabBar } from 'antd-mobile';

import ClassIcon from '@/components/ClassIcon';

import { getMenuRoutes } from '@/routes/utils/RouteGuard';

const menus = getMenuRoutes();

function isRouteActive(currentPathname: string, routePath: string) {
    if (currentPathname === routePath) {
        return true;
    }

    return currentPathname.startsWith(`${routePath}/`);
}

function Layout() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const activeKey = useMemo(
        () => menus.find((item) => item.path && isRouteActive(pathname, item.path))?.path,
        [pathname],
    );

    return (
        <div className="h-full flex flex-col overflow-x-hidden">
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <Outlet />
            </div>
            <TabBar
                className="bg-white dark:bg-black"
                safeArea
                activeKey={activeKey}
                onChange={(key) => navigate(key)}
            >
                {menus.map((item) => (
                    <TabBar.Item
                        key={item.path}
                        icon={<ClassIcon name={item.meta?.icon || ''} />}
                        title={item.meta?.title}
                    />
                ))}
            </TabBar>
        </div>
    );
}

export default Layout;
