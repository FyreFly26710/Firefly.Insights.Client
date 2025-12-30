import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/components/Routing/ProtectedRoute';
import { lazily } from 'react-lazily';

const { Articles: AdminArticles } = lazily(() => import('@/features/admins/pages/Articles'));

export const protectedRoutes = () => [
    {
        path: '/agents',
        element: (
            <ProtectedRoute>
                <div>Agents Page</div>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute allowedRoles={['admin']}>
                <Outlet />
            </ProtectedRoute>
        ),
        children: [
            // { index: true, element: <div>Admin Dashboard</div> },
            { path: 'articles', element: <AdminArticles /> },
            { path: 'topics', element: <div>Topics Management</div> },
            { path: 'categories', element: <div>Categories Management</div> },
            { path: 'tags', element: <div>Tags Management</div> },
        ]
    }
];