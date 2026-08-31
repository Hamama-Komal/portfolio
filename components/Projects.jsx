"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Lightbulb, Target, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import CircularGallery from "./CircularGallery";
import { projects, moreProjects } from "@/lib/data";

/** Detail sheet for the card the visitor picked out of the gallery. */
function ProjectDetail({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[120] flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-t-[1.75rem] border border-ink/10 bg-paper-100 p-6 sm:rounded-[1.75rem] sm:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-ink/40 hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-azure-600">
          {project.kind}
        </span>
        <h3 className="mt-2 max-w-md font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/60">{project.tagline}</p>

        <div className="mt-7 grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <dl className="space-y-5">
              <div>
                <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                  <Target className="h-3 w-3 text-azure-600" />
                  Problem
                </dt>
                <dd className="mt-1.5 text-[13px] leading-relaxed text-ink/70">
                  {project.problem}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                  <Lightbulb className="h-3 w-3 text-azure-600" />
                  Solution
                </dt>
                <dd className="mt-1.5 text-[13px] leading-relaxed text-ink/70">
                  {project.solution}
                </dd>
              </div>
            </dl>

            <ul className="mt-6 space-y-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[13px] text-ink/65">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azure-600" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-ink/10 bg-paper-200 px-3 py-1 text-[11px] font-medium text-ink/70"
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
                className="group/link mt-7 inline-flex items-center gap-2 rounded-full bg-azure px-5 py-2.5 text-[13px] font-semibold text-black transition-all duration-300 hover:gap-3"
              >
                View on Google Play
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            ) : null}
          </div>

          {/* Screenshots */}
          <div className="flex gap-3 lg:flex-col">
            {project.shots.slice(0, 3).map((shot, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={shot}
                src={shot}
                alt={`${project.title} screenshot ${i + 1}`}
                loading="lazy"
                className="h-40 w-full flex-1 rounded-xl border border-ink/10 object-cover object-top lg:h-32"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  // The gallery only needs an image and a caption. Memoised so the WebGL
  // context is not torn down and rebuilt on every render.
  const galleryItems = useMemo(
    () => projects.map((project) => ({ image: project.shots[0], text: project.title })),
    []
  );

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="section">
        <SectionHeading
          eyebrow="Projects"
          title="Apps I've"
          highlight="shipped"
          description="Ten apps live on the Play Store. Drag to browse, tap a card for the detail."
        />
      </div>

      <div className="mt-10 h-[26rem] w-full sm:h-[32rem]">
        <CircularGallery
          items={galleryItems}
          bend={2.5}
          borderRadius={0.06}
          scrollEase={0.035}
          onSelect={(index) => setSelected(projects[index])}
        />
      </div>

      <div className="section mt-4">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">
          Drag or scroll · tap a card for details
        </p>
      </div>

      {/* The rest of what shipped */}
      <div className="section mt-16">
        <h3 className="text-center font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink/50">
          Also on the Play Store
        </h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((app, i) => (
            <motion.a
              key={app.title}
              href={app.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="google play"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper-100 p-3 transition-colors duration-300 hover:border-azure"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={app.shot}
                alt=""
                loading="lazy"
                className="h-16 w-16 shrink-0 rounded-xl border border-ink/10 object-cover object-top"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-sm font-semibold text-ink">
                  {app.title}
                </span>
                <span className="mt-0.5 block truncate text-[12px] text-ink/55">
                  {app.subtitle}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                  {app.org}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-azure-600" />
            </motion.a>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <ProjectDetail project={selected} onClose={() => setSelected(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
