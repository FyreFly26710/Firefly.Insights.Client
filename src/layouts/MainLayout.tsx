import { Header } from '@/components/Header/Header';
import React from 'react';
type MainLayoutProps = {
    children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};
