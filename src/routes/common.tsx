import { ArticleLayout } from '@/layouts/ArticleLayout';
import { lazily } from 'react-lazily';
import { Outlet, type RouteObject } from 'react-router-dom';

const { Home } = lazily(() => import('@/pages/Home/Home'));
const { NotFound } = lazily(() => import('@/pages/NotFound/NotFound'));
const { Unauthorized } = lazily(() => import('@/pages/Unauthorized/Unauthorized'));
const { CategoryListPage } = lazily(() => import('@/features/articles/pages/CategoryListPage'));
const { TopicPage } = lazily(() => import('@/features/articles/pages/TopicPage'));
const { ArticlePage } = lazily(() => import('@/features/articles/pages/ArticlePage'));
const { ArticlesPage } = lazily(() => import('@/features/articles/pages/ArticlesPage'));

export const commonRoutes: RouteObject[] = [
    {
        path: '/',
        children: [
            { index: true, element: <Home /> },
            {
                path: 'topics',
                element: <Outlet />,
                children: [
                    { index: true, element: <CategoryListPage /> },
                    {
                        path: ':topicId',
                        element: <ArticleLayout />,
                        children: [
                            { index: true, element: <TopicPage /> },
                            { path: 'articles/:articleId', element: <ArticlePage /> },
                        ],
                    },
                ],
            },
            { path: 'articles', element: <ArticlesPage /> },
            { path: 'unauthorized', element: <Unauthorized /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];
