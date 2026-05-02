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
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      colors: {
        bg: "#f0ede6",
        hero: "#20201e",
        ink: {
          DEFAULT: "#111110",
          secondary: "#1c1c1a",
          muted: "#6b6a67",
        },
        surface: "#1a1a18",
        accent: "#c8f04a",
        border: "#d8d5ce",
        primary: "#0961bb",
        // Derived white-alpha tokens (used in dark sections)
        "white-5":  "#ffffff0d",
        "white-7":  "#ffffff12",
        "white-8":  "#ffffff14",
        "white-12": "#ffffff1f",
        "white-14": "#ffffff24",
        "white-20": "#ffffff33",
        "white-25": "#ffffff40",
        "white-35": "#ffffff59",
        "white-55": "#ffffff8c",
        // Accent alpha tokens
        "accent-5":  "#c8f04a0d",
        "accent-25": "#c8f04a40",
        // Scrollbar colors
        "scrollbar-thumb": "#c5c2bb",
        "scrollbar-thumb-hover": "#999891",
      },
      fontSize: {
        "2xs": "0.72rem",
      },
      letterSpacing: {
        "widest-2": "0.12em",
        "widest-3": "0.16em",
        "widest-4": "0.18em",
        "widest-5": "0.20em",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      transitionDuration: {
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
        "1200": "1200ms",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
