"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Portrait with a light source that tracks the pointer: the frame tilts a few
 * degrees toward the cursor and a soft highlight follows it across the image.
 * Restrained on purpose — the motion should read as depth, not decoration.
 */
export default function Portrait() {
  const frameRef = useRef(null);

  // -0.5 .. 0.5 across the frame
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 150, damping: 20, mass: 0.6 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [7, -7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-7, 7]);
  const lightX = useTransform(sx, [-0.5, 0.5], ["25%", "75%"]);
  const lightY = useTransform(sy, [-0.5, 0.5], ["25%", "75%"]);

  const handleMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[24rem] lg:max-w-none">
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-azure/20 blur-[80px]" />

      {/* Slow arc that traces the frame */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-[4%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgb(var(--azure)) 320deg, transparent 360deg)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 0)",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 0)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        ref={frameRef}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="relative aspect-square w-full select-none overflow-hidden rounded-full ring-1 ring-inset ring-ink/10"
      >
        <Image
          src="/img/me-blue.webp"
          alt="Hamama Komal, Flutter developer"
          fill
          priority
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 24rem, 34rem"
          className="scale-[1.18] object-cover object-[30%_35%]"
        />

        {/* Highlight that follows the pointer */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: useTransform(
              [lightX, lightY],
              ([x, y]) =>
                `radial-gradient(45% 45% at ${x} ${y}, rgba(255,255,255,0.22), transparent 70%)`
            ),
          }}
        />
      </motion.div>
    </div>
  );
}
