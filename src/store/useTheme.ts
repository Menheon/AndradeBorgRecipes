import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

/**
 * Hook to access theme context
 * @returns Theme context with current theme and toggle function
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
