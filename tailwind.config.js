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
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        background: "#020617",
        surface: "#0f172a",
        surfaceHighlight: "#1e293b",
        primary: "#38bdf8",
        secondary: "#2dd4bf",
        accent: "#818cf8",
        muted: "#94a3b8",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
      },
      animation: {
        "name-reveal":
          "nameReveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards",
        "glide-in": "glideIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        typing: "typing 1.2s steps(20) forwards",
        blink: "blink 0.7s step-end infinite",
        "text-shine": "textShine 5s linear infinite",
      },
      keyframes: {
        nameReveal: {
          "0%": { transform: "translateY(100%)", opacity: "0", filter: "blur(5px)" },
          "100%": { transform: "translateY(0)", opacity: "1", filter: "blur(0)" },
        },
        glideIn: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        blink: {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "#38bdf8" },
        },
        borderGlowPulse: {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(56, 189, 248, 0.15)",
            borderColor: "rgba(56, 189, 248, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(56, 189, 248, 0.45)",
            borderColor: "rgba(56, 189, 248, 0.8)",
          },
        },
        textShine: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
    },
  },
  plugins: [],
};
