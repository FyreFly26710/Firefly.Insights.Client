import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, type PaletteMode } from "@mui/material";


import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { AuthProvider } from '@/features/auth';
import { ErrorFallback } from '@/pages/ErrorFallback/ErrorFallback';
import { useEffect, useState } from 'react';

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {

    const [mode, setMode] = useState<PaletteMode>("light");
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setMode(mediaQuery.matches ? 'dark' : 'light');
    }, []);

    const theme = createTheme({
        palette: { mode },
    });
    return (
        <React.Suspense fallback={<PageSpinner />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <AuthProvider>
                    <BrowserRouter>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            {children}
                        </ThemeProvider>
                    </BrowserRouter>
                </AuthProvider>
            </ErrorBoundary>
        </React.Suspense>
    );
};
