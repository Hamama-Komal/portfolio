"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/** Counts to `value` once, the first time it scrolls into view. */
export default function CountUp({ value, suffix = "", duration = 1200 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  // Starts at the final value so server-rendered HTML and no-JS visitors
  // read the real number; the count only rewinds once it can animate.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    setDisplay(0);
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(easeOut(progress) * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
