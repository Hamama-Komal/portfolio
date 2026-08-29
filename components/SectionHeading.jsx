"use client";

import { motion } from "framer-motion";

/**
 * Headings reveal word by word as they enter view — the motion follows the
 * reading order rather than sliding the whole block around.
 */
export default function SectionHeading({ eyebrow, title, highlight, description, align = "left" }) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  const words = `${title} ${highlight ?? ""}`.trim().split(" ");
  const highlightFrom = highlight ? title.trim().split(" ").length : words.length;

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-azure" />
          {eyebrow}
        </motion.span>
      ) : null}

      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">
        {/* The animated words are laid out with flex gaps, which are not spaces —
            assistive tech and copy/paste read this copy instead. */}
        <span className="sr-only">{words.join(" ")}</span>

        <span
          aria-hidden
          className={`flex flex-wrap gap-x-[0.3em] ${align === "center" ? "justify-center" : ""}`}
        >
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden py-[0.05em]">
              <motion.span
              className={`inline-block ${i >= highlightFrom ? "text-azure-600" : ""}`}
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.6,
                delay: i * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      </h2>

      {description ? (
        <motion.p
          className={`max-w-2xl text-sm leading-relaxed text-ink/60 sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
