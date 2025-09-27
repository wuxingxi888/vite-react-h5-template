import { type RouteObject, createBrowserRouter } from 'react-router';

import { routes } from './utils/RouteGuard';

export type routeItem = RouteObject & {
    meta?: { title: string; icon?: string };
    children?: routeItem[];
};

export default createBrowserRouter(routes);
