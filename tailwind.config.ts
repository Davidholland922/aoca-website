import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1C3945",
          50: "#F2F6F8",
          100: "#DEE9EE",
          200: "#B9CFD9",
          300: "#8FB1C0",
          400: "#5E8CA0",
          500: "#3E6B7E",
          600: "#2C5062",
          700: "#22404E",
          800: "#1C3945",
          900: "#132832",
          950: "#0C1B22",
        },
        brand: {
          DEFAULT: "#C8202F",
          dark: "#A31A26",
          light: "#E04552",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        site: "76rem",
      },
    },
  },
  plugins: [],
};

export default config;
