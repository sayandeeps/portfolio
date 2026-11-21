/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080A08",
        surface: "#101510",
        surface2: "#151E16",
        line: "rgba(130,190,143,0.18)",
        ember: {
          DEFAULT: "#6CF58C",
          soft: "#9AFFAF",
          dim: "rgba(108,245,140,0.12)",
        },
        content: {
          DEFAULT: "#C9FBD1",
          muted: "#9EBBA2",
          faint: "#88A68D",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
      maxWidth: {
        content: "72rem",
      },
      fontSize: {
        display: ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        section: ["clamp(1.75rem, 3.5vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
    },
  },
  plugins: [],
};
