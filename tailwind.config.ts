import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16110c",
        paper: "#f7f0e4",
        sand: "#efe0c6",
        ember: "#a94922",
        pine: "#245346",
        haze: "#fdf9f2",
      },
      boxShadow: {
        pane: "0 18px 60px rgba(22, 17, 12, 0.08)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
