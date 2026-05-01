import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      // Map design tokens (defined in globals.css) onto Tailwind colors so we
      // can use bg-paper, text-ink, border-hairline etc. throughout.
      colors: {
        paper: "var(--bg)",
        elev: "var(--bg-elev)",
        subtle: "var(--bg-subtle)",
        hairline: "var(--border)",
        rule: "var(--border-strong)",
        ink: {
          DEFAULT: "var(--fg)",
          muted: "var(--fg-muted)",
          subtle: "var(--fg-subtle)",
          faint: "var(--fg-faint)",
        },
      },
      letterSpacing: {
        crunched: "-0.025em",
        tightish: "-0.015em",
      },
      boxShadow: {
        "card": "0 0 0 1px rgba(255,255,255,0.7) inset, 0 1px 0 rgba(28,25,23,0.02)",
        "card-lift": "0 0 0 1px rgba(255,255,255,0.5) inset, 0 4px 12px -4px rgba(28,25,23,0.06), 0 1px 2px rgba(28,25,23,0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
