"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Check, Plus } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { experience, accents } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { useMediaQuery } from "@/lib/useMediaQuery";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

function JobPanel({ job, index, total, isActive, onActivate, isDesktop }) {
  const accent = accents[job.accent];
  const Icon = getIcon(job.icon);

  // `null` until the media query is read on mount — leave sizing to the CSS
  // classes for that first paint so nothing jumps on desktop.
  const sizing =
    isDesktop === null
      ? {}
      : isDesktop
      ? { flexGrow: isActive ? 4.6 : 1, flexBasis: 0, height: "100%" }
      : { height: isActive ? "31rem" : "5rem" };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onMouseEnter={onActivate}
      onClick={onActivate}
      onFocus={onActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onActivate();
        }
      }}
      data-cursor={isActive ? undefined : "open"}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ ...sizing, transitionTimingFunction: EASE }}
      className="group relative min-w-0 flex-1 overflow-hidden rounded-3xl border border-ink/10 bg-paper-100 transition-[height,flex-grow,border-color] duration-700 hover:border-ink/20"
    >
      {/* Accent wash */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(90% 70% at 12% 0%, rgba(${accent.rgb},0.2), transparent 62%)`,
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper-50 via-paper-50/60 to-transparent" />
      </div>

      {/* Collapsed label */}
      <div
        className={`absolute inset-0 flex items-center justify-between px-5 transition-opacity duration-300 lg:flex-col lg:items-start lg:justify-between lg:px-0 lg:py-6 ${
          isActive ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-4 lg:w-full lg:flex-col lg:gap-3">
          <span className="font-mono text-[11px] text-ink/45 lg:text-center">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Icon className={`hidden h-4 w-4 lg:block ${accent.text}`} />
          <h3 className="font-display text-base font-semibold tracking-tight text-ink lg:hidden">
            {job.company}
          </h3>
        </div>

        <h3 className="hidden font-display text-base font-semibold tracking-tight text-ink/85 lg:block lg:[writing-mode:vertical-rl] lg:rotate-180">
          {job.company}
        </h3>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors group-hover:border-ink/40 group-hover:text-ink lg:mx-auto">
          <Plus className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isActive ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.45, delay: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="relative flex h-full flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:gap-10"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] text-ink/45">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                {job.current ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-600/25 bg-sky-600/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-600 animate-blink" />
                    Current
                  </span>
                ) : null}
              </div>

              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[2rem] sm:leading-tight">
                {job.company}
              </h3>
              <p className={`mt-1.5 text-sm font-semibold ${accent.text}`}>{job.role}</p>

              <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-ink/10 bg-ink/[0.04] px-2.5 py-1 font-mono text-[11px] text-ink/60">
                <Calendar className="h-3 w-3" />
                {job.period}
              </p>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">{job.summary}</p>

              <ul className="mt-5 hidden space-y-2 sm:block">
                {job.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[13px] text-ink/60">
                    <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${accent.text}`} />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/10 bg-ink/[0.04] px-3 py-1 text-[11px] font-medium text-ink/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Chapter marker */}
            <div className="relative hidden w-[13rem] shrink-0 lg:block">
              <div
                className="pointer-events-none absolute inset-2 rounded-full blur-3xl"
                style={{ background: `rgba(${accent.rgb},0.18)` }}
              />
              <div className="relative flex flex-col items-center gap-5 rounded-[1.75rem] border border-ink/10 bg-paper-50/70 px-6 py-8 text-center backdrop-blur-sm">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border bg-paper-100 ${accent.border} ${accent.glow}`}
                >
                  <Icon className={`h-6 w-6 ${accent.text}`} />
                </span>
                <span
                  className={`font-display text-5xl font-semibold leading-none ${accent.text} opacity-90`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Timeline() {
  const [active, setActive] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="section">
        <SectionHeading
          eyebrow="Experience"
          title="The journey so far —"
          highlight="quest log"
          description="From native Android to production Flutter apps, with a growing AI side quest running in parallel. Hover a chapter to open it."
        />

        <div className="mt-12 flex flex-col gap-3 lg:h-[32rem] lg:flex-row">
          {experience.map((job, i) => (
            <JobPanel
              key={job.company}
              job={job}
              index={i}
              total={experience.length}
              isActive={active === i}
              isDesktop={isDesktop}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
