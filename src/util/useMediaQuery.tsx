import { useMemo, useState, useEffect } from "react";

export type BreakpointsKey = keyof typeof breakpoints;
export type MinMaxBreakpointsKey = keyof typeof minMaxBreakpoints;

export const breakpoints = {
  "2xs": 300,
  xs: 540,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const minMaxBreakpoints = {
  min2Xs: `(min-width: ${breakpoints["2xs"]}px)`,
  minXs: `(min-width: ${breakpoints.xs}px)`,
  minSm: `(min-width: ${breakpoints.sm}px)`,
  minMd: `(min-width: ${breakpoints.md}px)`,
  minLg: `(min-width: ${breakpoints.lg}px)`,
  minXl: `(min-width: ${breakpoints.xl}px)`,
  min2Xl: `(min-width: ${breakpoints["2xl"]}px)`,
  max2Xs: `(max-width: ${breakpoints["2xs"]}px)`,
  maxXs: `(max-width:${breakpoints.xs}px)`,
  maxSm: `(max-width:${breakpoints.md}px)`,
  maxMd: `(max-width: ${breakpoints.lg}px)`,
  maxLg: `(max-width: ${breakpoints.xl}px)`,
  maxXl: `(max-width: ${breakpoints["2xl"]}px)`,
  max2Xl: `(max-width: ${breakpoints["2xl"]}px)`,
};

/**
 * @param query - The breakpoint name to match against (e.g., 'sm', 'md', 'lg')
 */
export function useMediaQuery(query: MinMaxBreakpointsKey) {
  const queryString = minMaxBreakpoints[query];

  const media = useMemo(() => window.matchMedia(queryString), [queryString]);

  const [matches, setMatches] = useState(media.matches);

  useEffect(() => {
    media.onchange = (mediaQueryList) => {
      setMatches(mediaQueryList.matches);
    };
  }, [media]);

  return matches;
}
