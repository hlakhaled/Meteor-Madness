/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jaini: ["Jaini", "cursive"],
        nunito: ["Nunito Sans", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
