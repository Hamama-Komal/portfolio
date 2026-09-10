/** @type {import('tailwindcss').Config} */

// Every colour resolves through a CSS variable, so `.dark` on <html> repaints the
// whole site without a single class change. Variables hold "R G B" triples.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: token("paper"),
          raised: token("paper-raised"),
          sunken: token("paper-sunken"),
        },
        ink: {
          DEFAULT: token("ink"),
          soft: token("ink-soft"),
          faint: token("ink-faint"),
        },
        accent: {
          DEFAULT: token("accent"),
          ink: token("accent-ink"),
          wash: token("accent-wash"),
        },
        // Fixed alpha rather than <alpha-value>: hairlines want one weight
        // across the whole page, and it changes per theme via --rule-alpha.
        rule: "rgb(var(--rule) / var(--rule-alpha))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
