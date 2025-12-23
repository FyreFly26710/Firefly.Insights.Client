import * as React from "react";
import { ThemeModeContext } from "../../../providers/ThemeModeProvider";

export function useThemeMode() {
  const context = React.useContext(ThemeModeContext);

  if (!context) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }

  return context;
}
