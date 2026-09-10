"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pointer: a hairline ring that trails a beat behind a dot pinned to the exact
 * position. Over anything interactive the ring squares off and thickens; on
 * press it contracts. One rAF loop writes transforms straight to the DOM, so
 * there is no React state per frame.
 *
 * Fine pointers only. Touch keeps its native behaviour, and reduced-motion
 * hands the real cursor back.
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
    let radius = 999; // px — squares off over interactive elements
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
      const hit =
        event.target instanceof Element
          ? event.target.closest('a, button, [role="button"], input, textarea, select, summary')
          : null;
      targetScale = hit ? 1.75 : 1;
      targetRadius = hit ? 5 : 999;
      if (ringRef.current) ringRef.current.style.borderWidth = hit ? "1.5px" : "1px";
    };

    const onDown = () => (targetScale = targetScale > 1 ? 1.4 : 0.65);
    const onUp = () => (targetScale = targetScale < 1 ? 1 : targetScale);
    const onLeave = () => (targetVisible = 0);
    const onEnter = () => (targetVisible = 1);

    const tick = () => {
      ring.x += (pointer.x - ring.x) * 0.17;
      ring.y += (pointer.y - ring.y) * 0.17;
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
        ringRef.current.style.opacity = String(visible * 0.85);
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
