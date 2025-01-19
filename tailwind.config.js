/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#f29727",
          200: "#fce9c9",
          300: "#f8d18f",
        },
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
          300: "#f8d18f",
        },
        dark: "#111111",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};
