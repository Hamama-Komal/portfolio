"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Virtual handset.
 *
 * Built as a real 3D object rather than a flat frame: the body sits in a
 * perspective container with `preserve-3d`, and the side buttons are pushed out
 * on the Z axis so they stay attached to the edge as the phone turns. The tilt
 * follows the pointer, which is what makes it read as a physical device.
 */
export default function PhoneMockup({ src, alt, screenKey, direction = 1 }) {
  const ref = useRef(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 140, damping: 18, mass: 0.6 });

  // Rests at a slight three-quarter angle, then leans toward the cursor.
  const rotateY = useTransform(sx, [-0.5, 0.5], [-22, 4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const shine = useTransform(sx, [-0.5, 0.5], ["18%", "82%"]);

  const handleMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="relative flex items-center justify-center [perspective:1300px]"
    >
      {/* Contact shadow on the ground */}
      <div className="pointer-events-none absolute bottom-2 h-10 w-[62%] rounded-[50%] bg-ink/25 blur-2xl dark:bg-black/70" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* ---- Side buttons, pushed out on Z so they ride the edge ---- */}
        <span
          aria-hidden
          style={{ transform: "translateZ(-7px)" }}
          className="absolute -left-[3px] top-[23%] h-[5%] w-[4px] rounded-l-sm bg-gradient-to-r from-[#8b929c] to-[#2b3037]"
        />
        <span
          aria-hidden
          style={{ transform: "translateZ(-7px)" }}
          className="absolute -left-[3px] top-[32%] h-[11%] w-[4px] rounded-l-sm bg-gradient-to-r from-[#8b929c] to-[#2b3037]"
        />
        <span
          aria-hidden
          style={{ transform: "translateZ(-7px)" }}
          className="absolute -left-[3px] top-[45%] h-[11%] w-[4px] rounded-l-sm bg-gradient-to-r from-[#8b929c] to-[#2b3037]"
        />
        <span
          aria-hidden
          style={{ transform: "translateZ(-7px)" }}
          className="absolute -right-[3px] top-[36%] h-[16%] w-[4px] rounded-r-sm bg-gradient-to-l from-[#8b929c] to-[#2b3037]"
        />

        {/* ---- Titanium rail ---- */}
        <div className="relative h-[19rem] w-[9.2rem] rounded-[1.8rem] bg-[linear-gradient(145deg,#9aa2ad_0%,#3d434c_18%,#15181d_42%,#2a2f36_62%,#8f97a2_88%,#41464f_100%)] p-[3px] shadow-[0_30px_60px_-25px_rgb(var(--shadow)/0.55),0_0_0_1px_rgba(0,0,0,0.35)] sm:h-[25rem] sm:w-[12.2rem]">
          {/* Inner bezel */}
          <div className="relative h-full w-full overflow-hidden rounded-[1.65rem] bg-black p-[2px] sm:rounded-[1.95rem]">
            <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] bg-black sm:rounded-[1.85rem]">
              {/* ---- Screen ---- */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={screenKey}
                  src={src}
                  alt={alt}
                  loading="lazy"
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 60 : -60, scale: 1.04 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction > 0 ? -60 : 60, scale: 1.04 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </AnimatePresence>

              {/* Dynamic island */}
              <span
                aria-hidden
                className="absolute left-1/2 top-2 z-20 h-[1rem] w-[3.2rem] sm:h-[1.15rem] sm:w-[3.9rem] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_2px_rgba(255,255,255,0.18)]"
              >
                <span className="absolute right-3 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-[#0b1a2b] ring-1 ring-white/10" />
              </span>

              {/* Glass: a moving specular band plus a fixed corner sheen */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background: useTransform(
                    shine,
                    (x) =>
                      `linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.14) ${x}, transparent calc(${x} + 14%))`
                  ),
                }}
              />
              <span className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/12 via-transparent to-transparent" />

              {/* Home indicator */}
              <span
                aria-hidden
                className="absolute bottom-2 left-1/2 z-20 h-[3px] w-16 sm:w-20 -translate-x-1/2 rounded-full bg-white/70"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
