import { type RouteObject, createBrowserRouter } from 'react-router';

import { routes } from './utils/RouteGuard';

export type routeItem = RouteObject & {
    meta?: { title: string; icon?: string };
    children?: routeItem[];
};

const router = createBrowserRouter(routes);

export default router;
