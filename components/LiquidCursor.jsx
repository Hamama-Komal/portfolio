"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Smooth liquid cursor.
 *
 * A crisp dot pinned to the pointer, followed by a tail of blobs on progressively
 * softer springs. The whole tail sits inside an SVG gooey filter, so the blobs melt
 * into one another instead of reading as separate circles — that is what gives the
 * "liquid" feel. Everything runs on one rAF loop writing transforms directly to the
 * DOM: no React state per frame.
 */

const TAIL = [
  { size: 26, ease: 0.16 },
  { size: 21, ease: 0.115 },
  { size: 16, ease: 0.085 },
  { size: 12, ease: 0.06 },
  { size: 8, ease: 0.042 },
];

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor]';

export default function LiquidCursor() {
  const wrapRef = useRef(null);
  const dotRef = useRef(null);
  const blobRefs = useRef([]);
  const labelRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-liquid-cursor");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { x: pointer.x, y: pointer.y };
    const blobs = TAIL.map(() => ({ x: pointer.x, y: pointer.y }));

    let hoverScale = 1;
    let targetScale = 1;
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
        event.target instanceof Element ? event.target.closest(HOVER_SELECTOR) : null;
      targetScale = target ? 1.7 : 1;
      const label = target?.getAttribute("data-cursor");
      if (labelRef.current) {
        labelRef.current.textContent = label || "";
        labelRef.current.style.opacity = label ? "1" : "0";
      }
    };

    const onDown = () => {
      targetScale *= 0.7;
    };
    const onUp = () => {
      targetScale = targetScale < 1 ? 1 : targetScale;
    };
    const onLeave = () => {
      targetVisible = 0;
    };
    const onEnter = () => {
      targetVisible = 1;
    };

    const tick = () => {
      // Crisp dot: quick, near-1:1 follow.
      dot.x += (pointer.x - dot.x) * 0.35;
      dot.y += (pointer.y - dot.y) * 0.35;

      hoverScale += (targetScale - hoverScale) * 0.14;
      visible += (targetVisible - visible) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${
          hoverScale * 0.55 + 0.45
        })`;
      }

      let lead = pointer;
      blobs.forEach((blob, i) => {
        const { ease } = TAIL[i];
        blob.x += (lead.x - blob.x) * (ease * 4.2);
        blob.y += (lead.y - blob.y) * (ease * 4.2);

        // Velocity-driven stretch: the blob elongates along its direction of travel.
        const dx = lead.x - blob.x;
        const dy = lead.y - blob.y;
        const speed = Math.min(Math.hypot(dx, dy), 160);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const stretch = 1 + speed / 190;
        const squash = 1 - speed / 460;

        const node = blobRefs.current[i];
        if (node) {
          node.style.transform = `translate3d(${blob.x}px, ${blob.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${
            stretch * hoverScale
          }, ${squash * hoverScale})`;
        }
        lead = blob;
      });

      if (wrapRef.current) wrapRef.current.style.opacity = String(visible);
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y + 34}px, 0) translate(-50%, 0)`;
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
      document.documentElement.classList.remove("has-liquid-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <svg className="pointer-events-none fixed h-0 w-0" aria-hidden>
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        ref={wrapRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] opacity-0"
      >
        <div className="absolute inset-0" style={{ filter: "url(#liquid-goo)" }}>
          {TAIL.map((blob, i) => (
            <span
              key={i}
              ref={(node) => {
                blobRefs.current[i] = node;
              }}
              className="cursor-blob absolute left-0 top-0 rounded-full will-change-transform"
              style={{ width: blob.size, height: blob.size }}
            />
          ))}
        </div>

        <span
          ref={dotRef}
          className="cursor-dot absolute left-0 top-0 h-1.5 w-1.5 rounded-full will-change-transform"
        />

        <span
          ref={labelRef}
          className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-ink/15 bg-paper-50/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink opacity-0 backdrop-blur-md transition-opacity duration-200 will-change-transform"
        />
      </div>
    </>
  );
}
