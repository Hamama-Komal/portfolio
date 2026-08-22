"use client";

import { motion } from "framer-motion";

const directions = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
};

export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
  amount = 0.35,
  duration = 0.7,
}) {
  const offset = directions[from] || directions.up;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
