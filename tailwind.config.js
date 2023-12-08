const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkerGreen: "#5a6b07",
        darkGreen: "#98ae2e",
        pastelGreen: "#f4f6eb",
      },
      fontFamily: {
        caveat: ["Caveat", ...defaultTheme.fontFamily.sans],
        nunito: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
