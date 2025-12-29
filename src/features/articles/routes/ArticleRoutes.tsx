import { ArticleLayout } from '@/layouts/ArticleLayout';
import { ArticlePage } from '../pages/ArticlePage';
import { CategoryListPage } from '../pages/CategoryListPage';
import { TopicPage } from '../pages/TopicPage';
import type { RouteObject } from 'react-router-dom';


export const articleRoutes: RouteObject[] = [
    {
        index: true,
        element: <CategoryListPage />
    },
    {
        path: ":topicId",
        element: <ArticleLayout />,
        children: [
            {
                index: true,
                element: <TopicPage />
            },
            {
                path: "articles/:articleId",
                element: <ArticlePage />
            }
        ]
    }
];