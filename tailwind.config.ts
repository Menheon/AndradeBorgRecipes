import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      screens: {
        'xs': '540px',
        '2xs': '300px',
      },
      colors: {
        whiteSmoke: "#f2f2f2",
        lightGrey: "#d1ccc8",
        darkGrey: "#a29c98",
        lightSlateGrey: "#49433e",
        darkSlateGrey: "#36312d",
      },
      fontFamily: {
        caveat: ["Caveat", ...defaultTheme.fontFamily.sans],
        nunito: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("search-cancel", "&::-webkit-search-cancel-button");
    }),
  ],
} satisfies Config;
