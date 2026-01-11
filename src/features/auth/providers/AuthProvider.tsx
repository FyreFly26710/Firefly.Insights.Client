import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { authApi } from '../api/authApi';

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    // const [isLoading, setIsLoading] = useState(true);

    const token = useUserStore((state) => state.token);
    const user = useUserStore((state) => state.user);
    const setAuth = useUserStore((state) => state.setAuth);
    const setToken = useUserStore((state) => state.setToken);
    const logout = useUserStore((state) => state.logout);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // if (event.origin !== window.location.origin) return;

            if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
                const jwtToken = event.data.token;
                if (!jwtToken) return;

                setToken(jwtToken);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [setToken]);

    useEffect(() => {
        const initializeAuth = async () => {
            if (token && !user) {
                try {
                    const userData = await authApi.getLoginUser();
                    setAuth(userData, token);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    logout();
                }
            }
            // setIsLoading(false);
        };

        initializeAuth();
    }, [token, user, setAuth, logout]);

    // if (isLoading) {
    //     return <PageSpinner />;
    // }

    return <>{children}</>;
};
