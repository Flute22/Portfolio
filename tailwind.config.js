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
        sans: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
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
        surface: token("surface"), // cards, inputs, dialog
        ink: token("ink"), // headings
        body: token("body"), // body copy
        muted: token("muted"), // secondary / meta text
        line: token("line"), // 1px borders
        accent: {
          DEFAULT: token("accent"), // green used as text, borders, dots
          solid: token("accent-solid"), // green used as a fill under white text
          dark: token("accent-dark"), // hover state for solid fills
        },
        tint: {
          DEFAULT: token("tint"), // chip / badge background
          line: token("tint-line"), // chip border
        },
      },
      borderRadius: {
        card: "1.5rem", // 24px
        inner: "1rem", // 16px
        chip: "0.5rem", // 8px
      },
      maxWidth: {
        page: "1920px",
      },
    },
  },
  plugins: [],
};
