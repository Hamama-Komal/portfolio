"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, Lightbulb, Play, Sparkles, Target } from "lucide-react";
import SectionHeading from "./SectionHeading";
import AppShot from "./AppShot";
import AiProjectArt from "./AiProjectArt";
import { projects, moreProjects, accents } from "@/lib/data";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Stacking deck: every card sticks below the header at a slightly lower offset than
 * the one before it, so scrolling slides each new card over the previous one. Cards
 * already in the stack scale down and dim, which sells the depth.
 */
function ProjectCard({ project, index, total, progress, stacked }) {
  const accent = accents[project.accent];
  const start = index / total;

  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - index) * 0.035]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, 0.5]);

  const shots = project.shots.length ? project.shots : [null];

  return (
    <div
      // Below lg a card is taller than the viewport, so pinning it would hide its
      // own bottom half. There the deck simply becomes a stack of cards.
      className={stacked ? "sticky flex justify-center pb-6" : "flex justify-center pb-6"}
      style={stacked ? { top: `calc(5.5rem + ${index * 0.9}rem)` } : undefined}
    >
      <motion.article
        style={stacked ? { scale, transformOrigin: "top center" } : undefined}
        className={`relative w-full overflow-hidden rounded-[1.75rem] border bg-paper-100 shadow-[0_-8px_60px_-20px_rgba(46,41,16,0.32)] ${accent.border}`}
      >
        {/* Accent spine */}
        <span
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.grad} opacity-80`}
        />

        {/* Card ground — opaque so the deck reads as stacked paper */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(95% 75% at 8% 0%, rgba(${accent.rgb},0.18), transparent 60%)`,
            }}
          />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper-50 via-paper-50/55 to-transparent" />
        </div>

        <div className="relative flex flex-col gap-7 p-6 sm:p-9 lg:h-[34rem] lg:flex-row lg:items-center lg:gap-12">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] text-ink/45">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${accent.border} ${accent.text}`}
              >
                {project.featured ? (
                  <Sparkles className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
                {project.kind}
              </span>
            </div>

            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[2.1rem] sm:leading-[1.1]">
              {project.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/60">
              {project.tagline}
            </p>

            <dl className="mt-6 space-y-4">
              <div>
                <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                  <Target className={`h-3 w-3 ${accent.text}`} />
                  Problem
                </dt>
                <dd className="mt-1.5 max-w-lg text-[13px] leading-relaxed text-ink/65">
                  {project.problem}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                  <Lightbulb className={`h-3 w-3 ${accent.text}`} />
                  Solution
                </dt>
                <dd className="mt-1.5 max-w-lg text-[13px] leading-relaxed text-ink/65">
                  {project.solution}
                </dd>
              </div>
            </dl>

            <ul className="mt-5 space-y-1.5">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[13px] text-ink/60">
                  <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${accent.text}`} />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-ink/10 bg-ink/[0.04] px-3 py-1 text-[11px] font-medium text-ink/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="google play"
                className="group/link mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper-50 transition-all duration-300 hover:gap-3"
              >
                View on Google Play
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            ) : (
              <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
                Side quest · in progress
              </p>
            )}
          </div>

          {/* Desktop: a shallow 3D fan of phones */}
          <div className="relative hidden h-[21rem] w-[19rem] shrink-0 items-center justify-center perspective lg:flex">
            <div
              className="pointer-events-none absolute inset-4 rounded-full blur-3xl"
              style={{ background: `rgba(${accent.rgb},0.2)` }}
            />
            {shots.slice(0, 3).map((shot, i, arr) => {
              const offset = i - (arr.length - 1) / 2;
              return (
                <div
                  key={shot || "art"}
                  style={{
                    zIndex: 10 - Math.abs(offset) * 2,
                    transform: `translateX(${offset * 46}%) rotateY(${offset * -20}deg) scale(${
                      offset === 0 ? 1 : 0.82
                    })`,
                  }}
                  className="absolute h-[21rem] w-[10rem] overflow-hidden rounded-[1.6rem] border border-ink/15 bg-paper-50 shadow-[0_30px_80px_-30px_rgba(46,41,16,0.32)]"
                >
                  {shot ? (
                    <AppShot
                      src={shot}
                      alt={`${project.title} screenshot ${i + 1}`}
                      initials={project.initials}
                      accentRgb={accent.rgb}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <AiProjectArt />
                  )}
                  <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-ink/10" />
                  {offset !== 0 ? (
                    <div className="pointer-events-none absolute inset-0 bg-paper-50/45" />
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Mobile: a compact row of screenshots */}
          <div className="flex gap-3 lg:hidden">
            {shots.slice(0, 3).map((shot, i) => (
              <div
                key={shot || "art-m"}
                className="h-40 w-[5.5rem] shrink-0 overflow-hidden rounded-2xl border border-ink/15 bg-paper-50"
              >
                {shot ? (
                  <AppShot
                    src={shot}
                    alt={`${project.title} screenshot ${i + 1}`}
                    initials={project.initials}
                    accentRgb={accent.rgb}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <AiProjectArt />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cards deeper in the stack fade back */}
        {stacked ? (
          <motion.div
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-paper-50"
          />
        ) : null}
      </motion.article>
    </div>
  );
}

/** Compact card for the shipped-apps grid behind the "view more" toggle. */
function MoreCard({ app, index }) {
  return (
    <motion.a
      href={app.link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="google play"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper-100 transition-colors duration-300 hover:border-azure/40"
    >
      <div className="relative h-36 overflow-hidden bg-paper-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={app.shot}
          alt={`${app.title} screenshot`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper-100 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-sm font-semibold leading-tight text-ink">{app.title}</h4>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-azure" />
        </div>
        <p className="mt-1 text-[12px] leading-snug text-ink/55">{app.subtitle}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {app.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-ink/10 bg-ink/[0.04] px-2 py-0.5 text-[10px] font-medium text-ink/60"
            >
              {tech}
            </span>
          ))}
        </div>

        <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/35">
          {app.org}
        </span>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const stacked = useMediaQuery("(min-width: 1024px)") === true;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="section">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built and"
          highlight="shipped"
          description="30+ apps built, 10+ live on Google Play. Here are the highlights — keep scrolling, the cards stack like a deck."
        />
      </div>

      <div ref={containerRef} className="section mt-12">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
            stacked={stacked}
          />
        ))}
        {/* Lets the last card sit at the top of the deck for a beat */}
        {stacked ? <div className="h-[28vh]" /> : null}
      </div>

      {/* Everything else that shipped */}
      <div className="section">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            data-cursor={showMore ? "collapse" : "expand"}
            className="group inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-paper-50/70 px-6 py-3 text-sm font-semibold text-ink backdrop-blur-md transition-colors duration-300 hover:border-azure/50 hover:text-azure-600"
          >
            {showMore ? "Show fewer" : `View ${moreProjects.length} more projects`}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                showMore ? "rotate-180" : "group-hover:translate-y-0.5"
              }`}
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showMore ? (
            <motion.div
              key="more"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-3">
                {moreProjects.map((app, i) => (
                  <MoreCard key={app.title} app={app} index={i} />
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
