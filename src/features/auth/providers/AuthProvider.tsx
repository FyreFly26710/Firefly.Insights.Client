import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { useEffect, useState } from 'react';
// import { useInitAuth } from '..';

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    }, []);

    if (isLoading) {
        return <PageSpinner />;
    }

    return <>{children}</>;
};
