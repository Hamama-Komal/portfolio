"use client";

import { motion } from "framer-motion";

/**
 * The page has exactly one entrance behaviour: a short lift and fade, once.
 * Keeping it to a single primitive is what stops the site feeling like a
 * showreel — everything arrives the same way, so nothing competes for notice.
 */
export default function Reveal({ children, delay = 0, className = "", amount = 0.25 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
