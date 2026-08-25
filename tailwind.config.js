/** @type {import('tailwindcss').Config} */

// Every colour resolves through a CSS variable, so `.dark` on <html> repaints the
// whole site without a single class change. Variables hold "R G B" triples.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Page and surfaces
        paper: {
          50: token("paper-50"),
          100: token("paper-100"),
          200: token("paper-200"),
          300: token("paper-300"),
          400: token("paper-400"),
        },
        // Type
        ink: {
          DEFAULT: token("ink"),
          900: token("ink-900"),
          700: token("ink-700"),
          500: token("ink-500"),
          300: token("ink-300"),
        },
        // Secondary accent
        sky: {
          900: token("sky-900"),
          800: token("sky-800"),
          700: token("sky-700"),
          600: token("sky-600"),
          500: token("sky-500"),
          400: token("sky-400"),
          300: token("sky-300"),
        },
        // Primary accent
        azure: {
          DEFAULT: token("azure"),
          700: token("azure-700"),
          600: token("azure-600"),
          400: token("azure-400"),
          300: token("azure-300"),
          100: token("azure-100"),
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 26px -8px rgba(51,82,127,0.45)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-100%,0,0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.7)", opacity: "0" },
          "100%": { transform: "scale(1.7)", opacity: "0" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration,26s) linear infinite",
        pulseRing: "pulseRing 2.4s ease-out infinite",
        blink: "blink 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
