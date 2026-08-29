"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { stacks, accents } from "@/lib/data";
import { getIcon } from "@/lib/icons";

function StackCard({ stack, index }) {
  const accent = accents[stack.accent];
  const Icon = getIcon(stack.icon);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, rgba(${accent.rgb},0.18), transparent 70%)`;

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set(event.clientX - rect.left);
    my.set(event.clientY - rect.top);
  };

  return (
    <Reveal from="up" delay={index * 0.08} className={`${stack.span} h-full`}>
      <motion.div
        onPointerMove={handleMove}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="glass group relative h-full overflow-hidden p-6 transition-colors duration-300 hover:border-ink/25"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div className="relative flex items-center gap-3">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-2xl border bg-ink/[0.03] transition-all duration-300 ${accent.border} ${accent.text} group-hover:scale-110`}
          >
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-ink">{stack.title}</h3>
            <p className="text-xs text-ink/45">{stack.blurb}</p>
          </div>
        </div>

        <div className="relative mt-5 flex flex-wrap gap-2">
          {stack.items.map((item) => (
            <span
              key={item}
              className={`cursor-default rounded-xl border border-ink/10 bg-ink/[0.04] px-3 py-1.5 text-xs font-medium text-ink/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/30 hover:text-ink`}
            >
              {item}
            </span>
          ))}
        </div>

        <span
          className={`pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r ${accent.grad} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />
      </motion.div>
    </Reveal>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="section">
        <SectionHeading
          eyebrow="Tech Stack"
          title="What I build"
          highlight="with"
          description="Grouped by how often I reach for them on a working day."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {stacks.map((stack, i) => (
            <StackCard key={stack.title} stack={stack} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
