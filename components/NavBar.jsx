"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { profile } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const socials = [
  { href: `mailto:${profile.email}`, Icon: Mail, label: "Email", external: false },
  { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn", external: true },
  { href: profile.github, Icon: Github, label: "GitHub", external: true },
];

/**
 * Collapsed navigation: at rest it is a single pill showing only the section you
 * are in. Opening it expands the full list with a shared layout animation, so the
 * chrome stays out of the way until it is wanted.
 */
export default function NavBar() {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const sections = links.map((link) => document.getElementById(link.id)).filter(Boolean);

    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.35;
      let current = links[0].id;
      sections.forEach((section) => {
        if (section.offsetTop <= line) current = section.id;
      });
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

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id) => {
    smoothScrollTo(id === "top" ? null : `#${id}`, { offset: 96 });
    window.history.replaceState(null, "", id === "top" ? "#top" : `#${id}`);
    setOpen(false);
  };

  const activeLabel = links.find((link) => link.id === active)?.label ?? "Home";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <motion.nav
        ref={navRef}
        layout
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ layout: { type: "spring", stiffness: 420, damping: 36 }, duration: 0.7 }}
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-ink/10 bg-paper-50/80 p-1.5 shadow-[0_10px_40px_-20px_rgb(var(--shadow)/0.5)] backdrop-blur-xl"
      >
        {/* Toggle — becomes the close button when open */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          data-cursor={open ? "close" : "menu"}
          className="relative flex h-9 items-center gap-2 rounded-full px-3 text-ink transition-colors duration-300 hover:text-azure"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </motion.span>
          </AnimatePresence>

          {/* At rest the pill names the section you're in */}
          <AnimatePresence initial={false}>
            {open ? null : (
              <motion.span
                key={activeLabel}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden whitespace-nowrap text-[13px] font-medium tracking-tight"
              >
                {activeLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Expanded list */}
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="links"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center overflow-hidden"
            >
              <span className="mx-1 h-5 w-px shrink-0 bg-ink/10" />

              {links.map((link, i) => {
                const isActive = active === link.id;
                return (
                  <motion.button
                    key={link.id}
                    type="button"
                    onClick={() => go(link.id)}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.035, duration: 0.25 }}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 ${
                      isActive ? "text-paper-50" : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-azure"
                      />
                    ) : null}
                    <span className="relative">{link.label}</span>
                  </motion.button>
                );
              })}

              <span className="mx-1 hidden h-5 w-px shrink-0 bg-ink/10 sm:block" />

              <div className="hidden items-center gap-0.5 sm:flex">
                {socials.map(({ href, Icon, label, external }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    data-cursor={label.toLowerCase()}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 + i * 0.04, duration: 0.25 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/55 transition-colors duration-300 hover:bg-ink/[0.06] hover:text-azure"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <ThemeToggle />
      </motion.nav>
    </header>
  );
}
