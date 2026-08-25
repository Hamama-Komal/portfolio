"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * 3D parallax backdrop: two grid planes laid out in perspective, drifting with the
 * pointer and the scroll position, over soft warm light pools.
 */
export default function Background() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 60, damping: 22, mass: 0.8 });
  const my = useSpring(py, { stiffness: 60, damping: 22, mass: 0.8 });

  const { scrollYProgress } = useScroll();
  const scroll = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  const rotateX = useTransform(my, [-1, 1], [58, 68]);
  const rotateZ = useTransform(mx, [-1, 1], [-6, 6]);
  const floorShift = useTransform(scroll, [0, 1], [0, -240]);
  const ceilShift = useTransform(scroll, [0, 1], [0, 200]);
  const hazeShift = useTransform(scroll, [0, 1], [0, -120]);
  const rotateXInverse = useTransform(rotateX, (v) => -v);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event) => {
      px.set((event.clientX / window.innerWidth) * 2 - 1);
      py.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Ambient light pools */}
      <motion.div
        style={{ y: hazeShift }}
        className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-azure/[0.16] blur-[130px]"
      />
      <motion.div
        style={{ y: ceilShift }}
        className="absolute -right-24 top-1/4 h-[30rem] w-[30rem] rounded-full bg-sky-400/[0.18] blur-[130px]"
      />
      <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-azure-300/[0.14] blur-[130px]" />

      {/* Perspective stage */}
      <div className="absolute inset-0 [perspective:900px]">
        <motion.div
          style={{ rotateX, rotateZ, y: floorShift }}
          className="absolute -left-1/2 top-[52%] h-[120vh] w-[200vw] origin-top grid-bg opacity-70 [mask-image:linear-gradient(to_bottom,#000,transparent_65%)]"
        />
        <motion.div
          style={{ rotateX: rotateXInverse, rotateZ, y: ceilShift }}
          className="absolute -left-1/2 bottom-[62%] h-[90vh] w-[200vw] origin-bottom grid-bg opacity-40 [mask-image:linear-gradient(to_top,#000,transparent_70%)]"
        />
      </div>

      {/* Horizon glow where the planes meet */}
      <div className="absolute inset-x-0 top-[46%] h-40 bg-[radial-gradient(60%_100%_at_50%_50%,rgba(235,125,0,0.14),transparent_70%)]" />

      <div className="absolute inset-0 noise opacity-[0.035] mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_45%,rgb(var(--paper-50)/0.9)_100%)]" />
    </div>
  );
}
