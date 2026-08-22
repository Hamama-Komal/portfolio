"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { smoothScrollTo } from "@/lib/smoothScroll";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "anime", label: "Me" },
  { id: "contact", label: "Contact" },
];

/**
 * Sticky dot navbar — each section is a dot; the active one grows into a labelled
 * pill that slides between positions with a shared layout animation.
 */
export default function NavBar() {
  const [active, setActive] = useState("top");
  const [hovered, setHovered] = useState(null);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const onScroll = () => {
      setCondensed(window.scrollY > 40);

      const line = window.scrollY + window.innerHeight * 0.35;
      let current = links[0].id;
      sections.forEach((section) => {
        if (section.offsetTop <= line) current = section.id;
      });
      // Pin the last section once the page bottom is reached.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 80) {
        current = links[links.length - 1].id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (id) => {
    smoothScrollTo(id === "top" ? null : `#${id}`, { offset: 96 });
    window.history.replaceState(null, "", id === "top" ? "#top" : `#${id}`);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        onMouseLeave={() => setHovered(null)}
        className={`pointer-events-auto flex items-center gap-1 rounded-full border p-1.5 transition-all duration-500 ${
          condensed
            ? "border-ink/10 bg-paper-50/70 shadow-[0_10px_40px_-16px_rgba(46,41,16,0.32)] backdrop-blur-xl"
            : "border-ink/[0.06] bg-paper-50/30 backdrop-blur-md"
        }`}
      >
        {links.map((link) => {
          const isActive = active === link.id;
          const isHovered = hovered === link.id;

          return (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              onMouseEnter={() => setHovered(link.id)}
              aria-label={link.label}
              aria-current={isActive ? "true" : undefined}
              className="relative flex h-9 items-center justify-center rounded-full px-2 outline-none"
            >
              {isActive ? (
                <motion.span
                  layoutId="nav-dot-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
                  className="absolute inset-0 rounded-full bg-ink"
                />
              ) : null}

              <span className="relative flex items-center gap-2 px-1.5">
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-1.5 w-1.5 bg-paper-50"
                      : isHovered
                      ? "h-2 w-2 bg-ink"
                      : "h-1.5 w-1.5 bg-ink/35"
                  }`}
                />
                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.span
                      key="label"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden whitespace-nowrap text-[13px] font-medium tracking-tight text-paper-50"
                    >
                      {link.label}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </span>

              {/* Tooltip for inactive dots */}
              <AnimatePresence>
                {isHovered && !isActive ? (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-ink/10 bg-paper-50/90 px-2.5 py-1 text-[11px] font-medium text-ink backdrop-blur-md"
                  >
                    {link.label}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </button>
          );
        })}

        <span className="mx-1 h-5 w-px bg-ink/10" />
        <ThemeToggle />
      </motion.nav>
    </header>
  );
}
