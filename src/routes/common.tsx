import { articleRoutes } from '@/features/articles/routes/ArticleRoutes';
import { lazily } from 'react-lazily';
import { Outlet, type RouteObject } from 'react-router-dom';

const { Home } = lazily(() => import('@/pages/Home/Home'));
const { NotFound } = lazily(() => import('@/pages/NotFound/NotFound'));
const { Unauthorized } = lazily(() => import('@/pages/Unauthorized/Unauthorized'));

export const commonRoutes = (): RouteObject[] => [
    {
        path: "/",
        children: [
            { index: true, element: <Home /> },
            {
                path: "topics",
                element: <Outlet />,
                children: articleRoutes
            },
            { path: "unauthorized", element: <Unauthorized /> },
            { path: "*", element: <NotFound /> }
        ]
    }
];