import { lazily } from 'react-lazily';
import type { RouteObject } from 'react-router-dom';

const { Login } = lazily(() => import('@/pages/Login/Login'));
// const { Register } = lazily(() => import('@/pages/Register/Register'));

export const publicRoutes = (): RouteObject[] => [
    // { path: '/login', element: !user ? <Login /> : <Navigate to='/profile' replace /> },
    // { path: '/register', element: !user ? <Register /> : <Navigate to='/profile' replace /> },
    { path: '/login', element: <Login /> },
];
