import SunIcon from "@/assets/sun.svg?react";
import MoonIcon from "@/assets/moon.svg?react";
import { useTheme } from "@/store/useTheme";

/**
 * Toggle button for switching between light and dark themes
 * Displays sun icon in dark mode, moon icon in light mode
 */
export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="focus-visible:base-outline rounded-lg p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 fill-amber-400 transition-colors" />
      ) : (
        <MoonIcon className="h-6 w-6 fill-neutral-600 transition-colors hover:fill-neutral-800" />
      )}
    </button>
  );
};
