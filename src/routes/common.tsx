import { ArticleRoutes } from '@/features/articles/routes/ArticleRoutes';
import { lazily } from 'react-lazily';

const { Home } = lazily(() => import('@/pages/Home/Home'));
const { NotFound } = lazily(() => import('@/pages/NotFound/NotFound'));
// const { Posts } = lazily(() => import('@/pages/Posts/Posts'));

export const commonRoutes = () => [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/topics",
        children: ArticleRoutes()
    },
    {
        path: "*",
        element: <NotFound />
    }
];