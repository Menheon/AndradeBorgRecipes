import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      screens: {
        xs: "540px",
        "2xs": "300px",
      },
      colors: {
        whiteSmoke: "#f2f2f2",
        "brown-100": "#d1ccc8",
        "brown-200": "#bfbab6",
        "brown-300": "#a29c98",
        "brown-500": "#49433e",
        "brown-600": "#36312d",
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
