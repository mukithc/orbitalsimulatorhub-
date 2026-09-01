import type { Config } from "tailwindcss";
import { oshTheme } from "./tailwind.osh";

export default {
  content: ["./client/index.html", "./client/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          cyan: "#00d9ff",
          pink: "#ff00d9",
          gold: "#ffd700",
        },
        muted: "#6b7280",
        ...oshTheme.colors,
      },
      fontFamily: {
        ...oshTheme.fontFamily,
      },
      borderRadius: {
        ...oshTheme.borderRadius,
      },
      transitionTimingFunction: {
        ...oshTheme.transitionTimingFunction,
      },
    },
  },
  plugins: [],
} satisfies Config;
