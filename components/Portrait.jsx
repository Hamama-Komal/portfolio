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
        {/* One file per theme so the photo's backdrop always matches the page */}
        <Image
          src="/img/me-light.webp"
          alt="Hamama Komal, Flutter developer"
          fill
          priority
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 24rem, 34rem"
          className="scale-[1.18] object-cover object-[30%_35%] dark:hidden"
        />
        <Image
          src="/img/me-dark.webp"
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 24rem, 34rem"
          className="hidden scale-[1.18] object-cover object-[30%_35%] dark:block"
        />
      </motion.div>
    </div>
  );
}
