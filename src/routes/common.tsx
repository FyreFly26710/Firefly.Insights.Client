import { lazily } from 'react-lazily';

const { Home } = lazily(() => import('@/pages/Home/Home'));
const { NotFound } = lazily(() => import('@/pages/NotFound/NotFound'));
const { Topics } = lazily(() => import('@/pages/Topics/Topics'));
// const { Posts } = lazily(() => import('@/pages/Posts/Posts'));

export const commonRoutes = () => [
    { path: '/', element: <Home /> },
    { path: '/topics', element: <Topics /> },
    { path: '*', element: <NotFound /> },
];
