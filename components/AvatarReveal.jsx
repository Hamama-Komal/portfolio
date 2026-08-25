"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const HOVER_RADIUS = 230;
const PINNED_RADIUS = 1200;

/**
 * Two stacked portraits with no frame — the anime layer is masked away around the
 * pointer to uncover the real photo underneath. A second, static mask feathers the
 * whole stack into the page background so it reads as artwork, not a card.
 */
export default function AvatarReveal() {
  const frameRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const radius = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });
  const sr = useSpring(radius, { stiffness: 150, damping: 25, mass: 0.6 });

  const revealMask = useMotionTemplate`radial-gradient(circle ${sr}px at ${sx}px ${sy}px, transparent 0%, transparent 46%, rgba(0,0,0,0.5) 72%, #000 100%)`;

  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" && window.matchMedia("(hover: none)").matches
    );
  }, []);

  useEffect(() => {
    if (pinned) {
      const el = frameRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        x.set(rect.width / 2);
        y.set(rect.height * 0.45);
      }
      radius.set(PINNED_RADIUS);
    } else {
      radius.set(hovered ? HOVER_RADIUS : 0);
    }
  }, [hovered, pinned, radius, x, y]);

  const handleMove = (event) => {
    if (pinned) return;
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <div className="relative mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:max-w-none">
      {/* Ambient light behind the portrait */}
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-azure/25 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-[12%] right-[6%] h-40 w-40 rounded-full bg-sky-400/15 blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative"
      >
        <div
          ref={frameRef}
          onPointerEnter={(event) => {
            if (event.pointerType === "touch") return;
            handleMove(event);
            setHovered(true);
          }}
          onPointerMove={(event) => {
            if (event.pointerType === "touch") return;
            handleMove(event);
          }}
          onPointerLeave={() => setHovered(false)}
          onClick={() => setPinned((v) => !v)}
          role="button"
          tabIndex={0}
          data-cursor={pinned ? "hide anime" : "reveal"}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setPinned((v) => !v);
            }
          }}
          aria-label="Reveal the real photo behind the anime avatar"
          className="relative aspect-[4/5] w-full select-none"
          style={{
            WebkitMaskImage:
              "radial-gradient(78% 68% at 50% 44%, #000 52%, rgba(0,0,0,0.55) 74%, transparent 100%)",
            maskImage:
              "radial-gradient(78% 68% at 50% 44%, #000 52%, rgba(0,0,0,0.55) 74%, transparent 100%)",
          }}
        >
          {/* Bottom layer — the real portrait */}
          <Image
            src="/img/me-orange.webp"
            alt="Hamama Komal"
            fill
            priority
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 30rem, 34rem"
            className="object-cover object-[32%_40%] contrast-[1.05] saturate-[0.9]"
          />

          {/* Top layer — the anime avatar, clipped away around the pointer */}
          <motion.div
            className="absolute inset-0"
            style={{ WebkitMaskImage: revealMask, maskImage: revealMask }}
          >
            <Image
              src="/img/anime.jpg"
              alt="Anime avatar"
              fill
              priority
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 30rem, 34rem"
              className="object-cover object-[50%_16%] contrast-[1.05] saturate-[0.95]"
            />
          </motion.div>

          {/* Colour grade so both layers sit in the page palette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-azure/10 via-transparent to-sky-400/10 mix-blend-overlay" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-paper-50 via-paper-50/25 to-transparent" />

          {/* Soft light that tracks the pointer */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: sx,
              top: sy,
              width: 320,
              height: 320,
              opacity: hovered && !pinned ? 1 : 0,
              background:
                "radial-gradient(circle, rgba(235,227,167,0.18), rgba(235,227,167,0) 65%)",
              transition: "opacity 300ms ease",
            }}
          />
        </div>

        {/* Hint sits outside the artwork so nothing frames the image */}
        <div className="mt-1 flex justify-center lg:justify-start lg:pl-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
            {pinned
              ? isTouch
                ? "tap to bring the anime back"
                : "click to bring the anime back"
              : isTouch
              ? "tap the portrait to reveal"
              : "move over the portrait to reveal"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
