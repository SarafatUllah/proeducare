/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        dx: "1366px",
        "2dx": "1440px",
        "3xl": "1920px",
        "4xl": "2100px",
      },
      colors: {
        "primary-red": "#EC1F27",
        orange: {
          primary: "#FF6E1F",
        },
        gray: {
          primary: "#313131",
          secondary: "#515B6F",
          dark: "#202430",
          light: "#D6DDEB",
          1000: "#79747E",
          1100: "#1C1B1F",
        },
      },
      spacing: {},
      borderRadius: {
        "5px": "5px",
        "100px": "100px",
      },
      fontFamily: {
        "red-hat-display": ['"Red Hat Display"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
