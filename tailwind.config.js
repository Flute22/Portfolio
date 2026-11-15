/** @type {import('tailwindcss').Config} */

// Colours are CSS variables (see index.css) so one class works in light and dark.
// "<alpha-value>" keeps opacity modifiers like border-accent/40 working.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./constants.tsx",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      colors: {
        page: token("page"), // page background
        surface: token("surface"), // cards ("tiles"), inputs
        chip: token("chip"), // chips, badges, icon wells
        line: token("line"), // 1px borders
        line2: token("line2"), // stronger borders (buttons, hover)
        ink: token("ink"), // primary text
        muted: token("muted"), // secondary text
        danger: token("danger"), // form errors
        accent: {
          DEFAULT: token("accent"), // green as text, borders, primary-button fill
          on: token("on-accent"), // text on an accent fill
        },
        fill: token("fill"), // solid green panels (white text on top)
        nav: "var(--nav)", // translucent navbar background
      },
      maxWidth: {
        page: "1320px",
      },
      keyframes: {
        "fade-down": {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "fade-down": "fade-down 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        "soft-ping": "ping 2.6s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
