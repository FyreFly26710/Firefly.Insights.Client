import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from "@mui/material";

import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { ErrorFallback } from '@/pages/ErrorFallback/ErrorFallback';
import { ThemeModeProvider } from './ThemeModeProvider';
import { AuthProvider } from '@/features/auth';

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {


    return (
        <React.Suspense fallback={<PageSpinner />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <BrowserRouter>
                    <ThemeModeProvider>
                        <CssBaseline />
                        <AuthProvider>
                            {children}
                        </AuthProvider>
                    </ThemeModeProvider>
                </BrowserRouter>
            </ErrorBoundary>
        </React.Suspense>
    );
};
