import { lazily } from 'react-lazily';
import { ArticlePage } from '../pages/ArticlePage';
import { CategoryListPage } from '../pages/CategoryListPage';
import { TopicPage } from '../pages/TopicPage';


const { NotFound } = lazily(() => import('@/pages/NotFound/NotFound'));

export const ArticleRoutes = () => ([
    {
        index: true,
        element: <CategoryListPage />
    },
    {
        path: ":topicId",
        element: <TopicPage />
    },
    {
        path: ":topicId/articles/:articleId",
        element: <ArticlePage />
    },
    {
        path: "*",
        element: <NotFound />
    }
]);
