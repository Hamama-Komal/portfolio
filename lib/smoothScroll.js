const EASE = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

let activeAnimation = null;

/** Animated scroll with a longer, softer curve than the browser default. */
export function smoothScrollTo(target, { offset = 0, duration = 900 } = {}) {
  if (typeof window === "undefined") return;

  const el = typeof target === "string" ? document.querySelector(target) : target;
  const destination =
    el === null || el === undefined
      ? 0
      : Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);

  const start = window.scrollY;
  const distance = destination - start;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, destination);
    return;
  }

  if (activeAnimation) cancelAnimationFrame(activeAnimation);
  const startedAt = performance.now();

  // Any manual scroll input hands control straight back to the user.
  const stop = () => {
    if (activeAnimation) cancelAnimationFrame(activeAnimation);
    activeAnimation = null;
    detach();
  };
  const detach = () => {
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
  };
  window.addEventListener("wheel", stop, { passive: true, once: true });
  window.addEventListener("touchstart", stop, { passive: true, once: true });
  window.addEventListener("keydown", stop, { once: true });

  const step = (now) => {
    const elapsed = now - startedAt;
    const progress = Math.min(1, elapsed / duration);
    window.scrollTo(0, start + distance * EASE(progress));
    if (progress < 1) {
      activeAnimation = requestAnimationFrame(step);
    } else {
      activeAnimation = null;
      detach();
    }
  };

  activeAnimation = requestAnimationFrame(step);
}
