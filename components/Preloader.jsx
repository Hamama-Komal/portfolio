"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Holds a cover over the page until fonts, images and the first paint are done,
 * so visitors never see the site assemble itself. Progress is real: it tracks how
 * many of the page's images have finished decoding, and the cover only lifts once
 * the window load event has fired.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let settled = false;

    const finish = () => {
      if (settled || cancelled) return;
      settled = true;
      setProgress(100);
      // Let the bar visibly reach 100 before the cover lifts.
      window.setTimeout(() => !cancelled && setDone(true), 320);
    };

    const tick = () => {
      if (cancelled || settled) return;
      const images = Array.from(document.images);
      const loaded = images.filter((img) => img.complete).length;
      const ratio = images.length ? loaded / images.length : 1;
      // Cap at 90 until `load` fires — the last 10% belongs to the real signal.
      setProgress((current) => Math.max(current, Math.min(90, Math.round(ratio * 90))));
    };

    const interval = window.setInterval(tick, 120);
    tick();

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    // Never trap the visitor if an asset stalls.
    const failsafe = window.setTimeout(finish, 6000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.clearTimeout(failsafe);
      window.removeEventListener("load", finish);
    };
  }, []);

  // Keep the page from scrolling underneath the cover.
  useEffect(() => {
    document.documentElement.style.overflow = done ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {done ? null : (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          /* pointer-events stay off: scrolling is already locked via overflow,
             and this guarantees the cover can never swallow a click if its exit
             animation is ever delayed (e.g. loaded in a background tab). */
          className="pointer-events-none fixed inset-0 z-[200] flex flex-col items-center justify-center bg-paper-50"
        >
          {/* Orbiting rings — a nod to the dot grid behind the page */}
          <div className="relative h-24 w-24">
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-ink/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-azure"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="absolute inset-3 rounded-full border-2 border-transparent border-b-sky-400"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-azure"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <p className="mt-8 font-display text-lg font-semibold tracking-tight text-ink">
            Hamama Komal
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
            Flutter · AI
          </p>

          <div className="mt-7 h-[2px] w-44 overflow-hidden rounded-full bg-ink/10">
            <motion.span
              className="block h-full rounded-full bg-gradient-to-r from-azure to-sky-400"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <span className="mt-2.5 font-mono text-[10px] tabular-nums text-ink/35">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
