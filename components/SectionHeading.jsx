"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, highlight, description, align = "left" }) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-flame shadow-glow" />
          {eyebrow}
        </motion.span>
      ) : null}

      <motion.h2
        className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {title} {highlight ? <span className="text-gradient">{highlight}</span> : null}
      </motion.h2>

      {description ? (
        <motion.p
          className={`max-w-2xl text-sm leading-relaxed text-ink/60 sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
