import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  type PaletteMode,
} from "@mui/material";

type ThemeModeContextValue = {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
  toggleMode: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeModeContext =
  React.createContext<ThemeModeContextValue | undefined>(undefined);

type ThemeModeProviderProps = {
  children: React.ReactNode;
  initialMode?: PaletteMode;
};

export function ThemeModeProvider({
  children,
  initialMode = "light",
}: ThemeModeProviderProps) {
  const [mode, setMode] = React.useState<PaletteMode>(initialMode);

  const toggleMode = React.useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );

  const value = React.useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, toggleMode]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
