import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Scheherazade New", "Amiri", "serif"],
      },
      colors: {
        gold: "#C9A84C",
        "gold-light": "#E8C97A",
        "gold-dark": "#9A7B2C",
        beige: "#F5EDD8",
        cream: "#FDFAF3",
        "green-dark": "#1B3A2D",
        "green-mid": "#2C5440",
        "green-light": "#3D7055",
      },
    },
  },
  plugins: [],
};
export default config;
