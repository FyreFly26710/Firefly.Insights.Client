import { ArticleLayout } from '@/layouts/ArticleLayout';
import type { RouteObject } from 'react-router-dom';


export const adminRoutes: RouteObject[] = [
    {
        index: true,
        element: <div> Admin Dashboard </div>
    },
    {
        path: "tags",
        element: <div> Tags Management </div>
    },
    {
        path: "categories",
        element: <div> Categories Management </div>
    },
    {
        path: "topics",
        element: <div> Topics Management </div>
    },
    {
        path: "articles",
        element: <div> Articles Management </div>
    }
];