"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export const THEME_KEY = "hk-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  // The class is already on <html> from the inline script in layout.js — read it
  // rather than deciding again, so the button never disagrees with the page.
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private mode — the choice just won't persist */
    }
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor={isDark ? "light" : "dark"}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 sm:h-8 sm:w-8 text-ink/70 transition-colors duration-300 hover:border-azure/50 hover:text-azure-600"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
        >
          {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
