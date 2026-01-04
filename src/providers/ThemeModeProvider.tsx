import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { useThemeStore } from "@/stores/useThemeStore";

type ThemeModeProviderProps = {
  children: React.ReactNode;
};

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const mode = useThemeStore((state) => state.mode);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (theme) => ({
              /* Define scrollbar styles for the whole app */
              '*': {
                '&::-webkit-scrollbar': {
                  width: '6px',
                  height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: theme.palette.background.default,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: theme.palette.divider,
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                  },
                },
                /* Firefox support */
                scrollbarWidth: 'thin',
                scrollbarColor: `${theme.palette.divider} ${theme.palette.background.default}`,
              },
            }),
          },
        }
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}