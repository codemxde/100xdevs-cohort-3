/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          500: "blue",
        },
        blue: {
          900: "#002b5b",
          800: "#19406a",
        },
        green: {
          500: "#36c6c0",
        },
        slate: {
          500: "#8094ad",
        },
      },
    },
  },
  plugins: [],
};
