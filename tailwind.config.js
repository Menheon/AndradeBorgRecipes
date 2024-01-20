const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        whiteSmoke: "#f2f2f2",
        lightGrey: "#d1ccc8",
        darkGrey: "#a29c98",
        darkSlateGrey: "#36312d",
      },
      fontFamily: {
        caveat: ["Caveat", ...defaultTheme.fontFamily.sans],
        nunito: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tailwindcss/plugin")(({ addVariant }) => {
      addVariant("search-cancel", "&::-webkit-search-cancel-button");
    }),
  ],
};
