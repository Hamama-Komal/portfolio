"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { profile } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "about", label: "Profile" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "capabilities", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];

/**
 * Navigation is the one part of a portfolio that should not be interesting. It
 * names where you are, gets out of the way, and grows a hairline once the page
 * has scrolled far enough for the bar to need separating from the content.
 */
export default function NavBar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const ids = links.map((link) => link.id);

    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const line = window.scrollY + window.innerHeight * 0.3;
      let current = "";
      ids.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= line) current = id;
      });
      // The last section rarely reaches the trigger line, so the page bottom
      // stands in for it.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 80) {
        current = ids[ids.length - 1];
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

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id) => {
    smoothScrollTo(`#${id}`, { offset: 76 });
    window.history.replaceState(null, "", `#${id}`);
    setOpen(false);
  };

  return (
    <header
      /* Only the border transitions. Animating background-color here too would
         make the bar visibly lag the page on a theme switch. */
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-[border-color] duration-300 ${
        scrolled || open ? "border-b border-rule" : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        {/* Wordmark */}
        <a
          href="#top"
          className="group flex shrink-0 items-baseline gap-2"
          aria-label="Back to top"
        >
          <span className="font-display text-[19px] leading-none tracking-tight text-ink">
            {profile.name}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
        </a>

        <div className="flex items-center gap-1">
          {/* Desktop links */}
          <nav className="hidden items-center lg:flex">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                    isActive ? "text-ink" : "text-ink-faint hover:text-ink"
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 480, damping: 40 }}
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                    />
                  ) : null}
                </button>
              );
            })}
          </nav>

          <span className="mx-2 hidden h-4 w-px bg-rule lg:block" />

          <ThemeToggle />

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-9 w-9 items-center justify-center text-ink lg:hidden"
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            ref={panelRef}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-rule lg:hidden"
          >
            <div className="shell flex flex-col py-2">
              {links.map((link, i) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className="flex items-baseline gap-3 border-b border-rule py-3.5 text-left last:border-b-0"
                >
                  <span className="meta w-6 shrink-0 text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[15px] ${
                      active === link.id ? "text-accent-ink" : "text-ink"
                    }`}
                  >
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
