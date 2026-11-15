/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./constants.tsx",
  ],
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
        ink: "#111111", // headings
        body: "#4B5563", // body copy
        muted: "#6B7280", // secondary / meta text
        line: "#E5E7EB", // 1px borders
        accent: {
          DEFAULT: "#0A795D", // measured from the mockup (white on it = 5.4:1)
          dark: "#075E48",
        },
        tint: {
          DEFAULT: "#EDF2EF", // chip / badge background
          line: "#DCE4E0", // chip border
        },
      },
      borderRadius: {
        card: "1.5rem", // 24px
        inner: "1rem", // 16px
        chip: "0.5rem", // 8px
      },
      maxWidth: {
        page: "1120px",
      },
    },
  },
  plugins: [],
};
