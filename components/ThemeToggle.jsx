"use client";

import { useEffect, useState } from "react";
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
    const root = document.documentElement;

    // The crossfade is switched on only for the swap itself. Left on permanently
    // it would animate every hairline whenever a colour changed, and the page
    // would shimmer instead of settling.
    root.classList.add("theme-shift");
    root.classList.toggle("dark", next === "dark");
    window.setTimeout(() => root.classList.remove("theme-shift"), 400);

    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private mode — the choice just will not persist */
    }
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-9 w-9 items-center justify-center rounded-sm text-ink-faint transition-colors duration-200 hover:text-ink"
    >
      {/* Rendered before the theme is known, both icons are hidden — which is
          correct: it prevents the wrong one flashing in on hydration. */}
      {theme === null ? (
        <span className="h-[15px] w-[15px]" />
      ) : isDark ? (
        <Moon className="h-[15px] w-[15px]" />
      ) : (
        <Sun className="h-[15px] w-[15px]" />
      )}
    </button>
  );
}
