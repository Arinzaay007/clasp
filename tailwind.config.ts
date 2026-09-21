import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#f7efdd",
        dim: "#cbb28f",
        faint: "#9c8763",
        abyss: "#161006",
        hull: "#1f160b",
        hull2: "#2a1e0e",
        edge: "rgba(214, 182, 116, 0.16)",
        aqua: "#f0b429",
        volt: "#d99b2e",
        azure: "#d9a13b",
        mint: "#e0ac47",
        rose: "#d99b2e",
        amber: "#e9b95c",
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
