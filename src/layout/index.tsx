import { Outlet, useLocation, useNavigate } from 'react-router';

import { TabBar } from 'antd-mobile';

import ClassIcon from '@/components/ClassIcon';

import { getMenuRoutes } from '@/router/utils/RouteGuard';

function Layout() {
    const menus = getMenuRoutes();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const activeKey = menus.find((item) => pathname.startsWith(item.path || ''))?.path;

    console.log('activeKey', activeKey);

    return (
        <div className="h-full flex flex-col overflow-x-hidden">
            <div className="flex-1 overflow-y-auto overflow-x-hidden">{<Outlet />}</div>
            <TabBar
                className="bg-white dark:bg-black"
                safeArea
                activeKey={activeKey}
                onChange={(key) => navigate(key)}
            >
                {menus.map((item) => (
                    <TabBar.Item
                        key={item.path}
                        icon={ClassIcon({ name: item.meta?.icon || '' })}
                        title={item.meta?.title}
                    />
                ))}
            </TabBar>
        </div>
    );
}

export default Layout;
