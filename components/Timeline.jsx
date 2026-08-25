"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Check, ChevronDown, Plus } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { experience, accents } from "@/lib/data";
import { getIcon } from "@/lib/icons";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

/* ------------------------------------------------------------------ *
 * Desktop (lg+): panels that expand sideways.
 * ------------------------------------------------------------------ */
function JobPanel({ job, index, total, isActive, onActivate }) {
  const accent = accents[job.accent];
  const Icon = getIcon(job.icon);

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
      style={{
        flexGrow: isActive ? 4.6 : 1,
        flexBasis: 0,
        height: "100%",
        transitionTimingFunction: EASE,
      }}
      className="group relative min-w-0 flex-1 overflow-hidden rounded-3xl border border-ink/10 bg-paper-100 transition-[flex-grow,border-color] duration-700 hover:border-ink/20"
    >
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

      {/* Collapsed spine */}
      <div
        className={`absolute inset-0 flex flex-col items-start justify-between py-6 transition-opacity duration-300 ${
          isActive ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex w-full flex-col items-center gap-3">
          <span className="font-mono text-[11px] text-ink/45">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Icon className={`h-4 w-4 ${accent.text}`} />
        </div>

        <h3 className="font-display text-base font-semibold tracking-tight text-ink/85 [writing-mode:vertical-rl] rotate-180">
          {job.company}
        </h3>

        <span className="mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors group-hover:border-ink/40 group-hover:text-ink">
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
            className="relative flex h-full flex-row items-center gap-10 p-8"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] text-ink/45">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                {job.current ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-azure/30 bg-azure/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-azure-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-azure animate-blink" />
                    Current
                  </span>
                ) : null}
              </div>

              <h3 className="mt-3 font-display text-[2rem] font-semibold leading-tight tracking-tight text-ink">
                {job.company}
              </h3>
              <p className={`mt-1.5 text-sm font-semibold ${accent.text}`}>{job.role}</p>

              <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-ink/10 bg-ink/[0.04] px-2.5 py-1 font-mono text-[11px] text-ink/60">
                <Calendar className="h-3 w-3" />
                {job.period}
              </p>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">{job.summary}</p>

              <ul className="mt-5 space-y-2">
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
            <div className="relative w-[13rem] shrink-0">
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

/* ------------------------------------------------------------------ *
 * Phone / tablet: a real accordion. The header carries the whole story
 * — role, company and dates — so a closed row is still worth reading.
 * ------------------------------------------------------------------ */
function JobRow({ job, index, isOpen, onToggle }) {
  const accent = accents[job.accent];
  const Icon = getIcon(job.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl border bg-paper-100 transition-colors duration-300 ${
        isOpen ? accent.border : "border-ink/10"
      }`}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(80% 60% at 0% 0%, rgba(${accent.rgb},0.14), transparent 60%)`,
        }}
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        data-cursor={isOpen ? "close" : "open"}
        className="relative flex w-full items-center gap-3.5 p-4 text-left"
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-paper-50 ${accent.border}`}
        >
          <Icon className={`h-5 w-5 ${accent.text}`} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="truncate font-display text-[15px] font-semibold tracking-tight text-ink">
              {job.company}
            </span>
            {job.current ? (
              <span className="shrink-0 rounded-full bg-azure/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-azure-600">
                Now
              </span>
            ) : null}
          </span>
          <span className={`mt-0.5 block truncate text-[12px] font-medium ${accent.text}`}>
            {job.role}
          </span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
            {job.period}
          </span>
        </span>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/60">
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <div className="border-t border-ink/10 px-4 pb-5 pt-4">
              <p className="text-[13px] leading-relaxed text-ink/60">{job.summary}</p>

              <ul className="mt-4 space-y-2">
                {job.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[13px] text-ink/60">
                    <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${accent.text}`} />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/10 bg-ink/[0.04] px-2.5 py-1 text-[11px] font-medium text-ink/70"
                  >
                    {tag}
                  </span>
                ))}
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
  const [openRow, setOpenRow] = useState(0);

  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="section">
        <SectionHeading
          eyebrow="Experience"
          title="The journey so far —"
          highlight="quest log"
          description="From native Android to production Flutter apps, with a growing AI side quest running in parallel."
        />

        {/* Phones and tablets get the accordion; the two layouts are swapped in
            CSS rather than JS so neither flashes before hydration. */}
        <div className="mt-10 space-y-3 lg:hidden">
          {experience.map((job, i) => (
            <JobRow
              key={job.company}
              job={job}
              index={i}
              isOpen={openRow === i}
              onToggle={() => setOpenRow(openRow === i ? -1 : i)}
            />
          ))}
        </div>

        <div className="mt-12 hidden h-[32rem] gap-3 lg:flex">
          {experience.map((job, i) => (
            <JobPanel
              key={job.company}
              job={job}
              index={i}
              total={experience.length}
              isActive={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
