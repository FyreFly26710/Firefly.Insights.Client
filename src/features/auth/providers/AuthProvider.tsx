import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { apiAuthGetLoginUser } from '../api';

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const token = useUserStore((state) => state.token);
    const user = useUserStore((state) => state.user);
    const setAuth = useUserStore((state) => state.setAuth);
    const logout = useUserStore((state) => state.logout);

    useEffect(() => {
        const initializeAuth = async () => {
            // If we have a token but no user, fetch the user
            if (token && !user) {
                try {
                    const userData = await apiAuthGetLoginUser();
                    setAuth(userData, token);
                } catch (error) {
                    // If fetching user fails, remove the token
                    console.error('Failed to fetch user:', error);
                    logout();
                }
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, [token, user, setAuth, logout]);

    if (isLoading) {
        return <PageSpinner />;
    }

    return <>{children}</>;
};
