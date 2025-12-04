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

    const getSystemMode = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

    const [mode, setMode] = useState<PaletteMode>(getSystemMode);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handler = (event: MediaQueryListEvent) => {
            setMode(event.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
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
