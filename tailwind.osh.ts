// tailwind.config.ts — merge into your existing `theme.extend`
// Tokens live in styles/osh-theme.css; this maps them onto Tailwind utilities
// so you can write text-osh-muted, bg-osh-panel, font-mono, rounded-osh-md, etc.

export const oshTheme = {
  colors: {
    "osh-void": "var(--osh-void)",
    "osh-bg": "var(--osh-bg)",
    "osh-panel": "var(--osh-panel)",
    "osh-panel-solid": "var(--osh-panel-solid)",
    "osh-line": "var(--osh-line)",
    "osh-line-strong": "var(--osh-line-strong)",
    "osh-text": "var(--osh-text)",
    "osh-muted": "var(--osh-muted)",
    "osh-faint": "var(--osh-faint)",
    "osh-amber": "var(--osh-amber)",
    "osh-amber-dim": "var(--osh-amber-dim)",
    "osh-cyan": "var(--osh-cyan)",
    "osh-cyan-dim": "var(--osh-cyan-dim)",
  },
  fontFamily: {
    sans: ["Archivo", "system-ui", "sans-serif"],
    mono: ["JetBrains Mono", "ui-monospace", "monospace"],
  },
  borderRadius: {
    "osh-sm": "8px",
    "osh-md": "14px",
    "osh-lg": "20px",
  },
  transitionTimingFunction: {
    osh: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
} as const;
