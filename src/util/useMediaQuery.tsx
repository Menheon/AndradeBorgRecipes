import { useMemo, useState, useEffect } from "react";
import tailwindConfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const fullConfig = resolveConfig(tailwindConfig);
type Breakpoints = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export const useMediaQuery = (query: Breakpoints) => {
  const targetWidth = fullConfig.theme.screens[query];
  console.log(targetWidth);

  const media = useMemo(
    () => window.matchMedia(`(min-width: ${targetWidth})`),
    [targetWidth],
  );
  const [matches, setMatches] = useState(media.matches);

  useEffect(() => {
    media.onchange = (mediaQueryList) => {
      setMatches(mediaQueryList.matches);
    };
  }, [media]);

  return matches;
};
