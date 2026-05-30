import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        mono: ["VT323", "monospace"],
        pixel: ['"Press Start 2P"', "monospace"],
      },
      colors: {
        "bg-base": "var(--bg-base)",
        "bg-surface": "var(--bg-surface)",
        "bg-card": "var(--bg-card)",
        "bg-elevated": "var(--bg-elevated)",
        "border-subtle": "var(--border-subtle)",
        "border-strong": "var(--border-strong)",
        accent: "var(--cyan)",
        "accent-dim": "var(--cyan-dim)",
        amber: "var(--amber)",
        danger: "var(--red)",
        "text-base": "var(--text-primary)",
        "text-sub": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-dim": "var(--text-dim)",
      },
      fontSize: {
        "2xs": "0.35rem",
        "3xs": "0.38rem",
        "4xs": "0.40rem",
        "5xs": "0.43rem",
        "6xs": "0.45rem",
        "7xs": "0.50rem",
      },
      letterSpacing: {
        pixel: "0.04em",
        wider2: "0.10em",
        wider3: "0.12em",
        wider4: "0.14em",
        wider5: "0.15em",
        wider6: "0.16em",
        wider7: "0.18em",
        wider8: "0.20em",
      },
      boxShadow: {
        "pixel-accent": "2px 2px 0px var(--cyan-dim)",
        "pixel-base": "2px 2px 0px var(--bg-base)",
        "pixel-border": "3px 3px 0px var(--border-strong)",
        "pixel-strong": "4px 4px 0px var(--border-strong)",
        "pixel-hero": "6px 6px 0px var(--cyan-dim)",
        "glow-accent": "0 0 14px var(--cyan-glow-strong)",
        "glow-accent-sm": "0 0 10px var(--cyan-glow)",
        "glow-danger": "0 0 16px rgba(255,60,60,0.2)",
        "typing-box":
          "4px 4px 0px var(--border-strong), 0 0 20px var(--cyan-glow)",
        "hero-box": "6px 6px 0px var(--cyan-dim), 0 0 28px var(--cyan-glow)",
      },
      backgroundImage: {
        "grid-dark":
          "linear-gradient(rgba(93,140,62,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(93,140,62,0.04) 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
        "fade-surface":
          "linear-gradient(to top, var(--bg-surface), transparent)",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
      maxWidth: {
        content: "920px",
      },
      maxHeight: {
        typing: "172px",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
