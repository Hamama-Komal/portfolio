"use client";

import { useEffect } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

/** Intercepts every in-page #anchor click so navigation uses one easing curve. */
export default function SmoothAnchors() {
  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      const href = anchor?.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = href === "#top" ? null : document.querySelector(href);
      if (href !== "#top" && !target) return;

      event.preventDefault();
      smoothScrollTo(target, { offset: 96 });
      window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
