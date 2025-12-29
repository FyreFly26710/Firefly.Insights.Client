import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/stores/useUserStore';

type ProtectedRouteProps = {
    children: React.ReactElement;
    allowedRoles?: string[];
};

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useUserStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};