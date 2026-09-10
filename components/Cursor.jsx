"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor: a precise centre dot with a ring that trails a beat behind it.
 *
 * The ring is what makes it feel like a tool rather than a decoration — it lags
 * on movement, snaps square to the element under it on hover, and contracts on
 * press. One rAF loop writes transforms straight to the DOM; no React state per
 * frame. Fine-pointer devices only, so touch keeps its native behaviour.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(
      window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const ring = { x: pointer.x, y: pointer.y };
    let scale = 1;
    let targetScale = 1;
    let radius = 999; // px; drops to a square-ish corner over interactive elements
    let targetRadius = 999;
    let visible = 0;
    let targetVisible = 0;
    let raf = 0;

    const onMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      targetVisible = 1;
    };

    const onOver = (event) => {
      const target =
        event.target instanceof Element
          ? event.target.closest('a, button, [role="button"], input, textarea, select')
          : null;
      targetScale = target ? 1.9 : 1;
      targetRadius = target ? 8 : 999;
    };

    const onDown = () => (targetScale = targetScale > 1 ? 1.5 : 0.7);
    const onUp = () => (targetScale = targetScale < 1 ? 1 : targetScale);
    const onLeave = () => (targetVisible = 0);
    const onEnter = () => (targetVisible = 1);

    const tick = () => {
      // Ring eases toward the pointer; the dot is pinned to it exactly.
      ring.x += (pointer.x - ring.x) * 0.16;
      ring.y += (pointer.y - ring.y) * 0.16;
      scale += (targetScale - scale) * 0.16;
      radius += (targetRadius - radius) * 0.2;
      visible += (targetVisible - visible) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = String(visible);
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderRadius = `${radius}px`;
        ringRef.current.style.opacity = String(visible * 0.9);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <span ref={ringRef} aria-hidden className="cursor-ring" />
      <span ref={dotRef} aria-hidden className="cursor-dot" />
    </>
  );
}
