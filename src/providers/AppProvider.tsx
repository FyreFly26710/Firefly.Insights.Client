import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from "@mui/material";

import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { AuthProvider } from '@/features/auth';
import { ErrorFallback } from '@/pages/ErrorFallback/ErrorFallback';
import { ThemeModeProvider } from './ThemeModeProvider';

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {


    return (
        <React.Suspense fallback={<PageSpinner />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <AuthProvider>
                    <BrowserRouter>
                        <ThemeModeProvider>
                            <CssBaseline />
                            {children}
                        </ThemeModeProvider>
                    </BrowserRouter>
                </AuthProvider>
            </ErrorBoundary>
        </React.Suspense>
    );
};
