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
        "orange-100": "#fff0b5",
        "orange-500": "#feb743",
        "orange-600": "#fd8306",
      },
      fontFamily: {
        caveat: ["Caveat", ...defaultTheme.fontFamily.sans],
        nunito: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
        "russo-one": ["Russo One", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(({ addVariant, addComponents }) => {
      addVariant("search-cancel", "&::-webkit-search-cancel-button");
      addComponents({
        ".base-outline": {
          outlineStyle: "solid",
          outlineWidth: "2px",
          outlineOffset: "2px",
          outlineColor: "#36312d",
        },
      });
    }),
  ],
} satisfies Config;
