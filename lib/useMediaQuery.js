"use client";

import { useEffect, useState } from "react";

/** Returns null until mounted, then tracks the query. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    // Some environments (and older Safari) miss the change event on viewport
    // resizes, so resize is watched as a belt-and-braces fallback.
    window.addEventListener("resize", update);
    return () => {
      mql.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [query]);

  return matches;
}
