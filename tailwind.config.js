/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#100D1B",
        surface: "#1C172B",
        surface2: "#251E38",
        line: "rgba(209,190,255,0.18)",
        ember: {
          DEFAULT: "#DCFF70",
          soft: "#EBFFA9",
          dim: "rgba(220,255,112,0.12)",
        },
        content: {
          DEFAULT: "#F7F2FF",
          muted: "#C5BBD7",
          faint: "#ADA0C3",
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
