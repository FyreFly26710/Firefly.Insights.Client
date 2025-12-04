import Flex from '@/components/Elements/Flex/Flex';
import { Header } from '@/components/Header/Header';
import React from 'react';
type MainLayoutProps = {
    children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <Flex direction="column" height="100vh" width="100vw">
            <Header />
            {children}
        </Flex>
    );
};
