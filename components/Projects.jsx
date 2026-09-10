"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Lightbulb, Target } from "lucide-react";
import SectionHeading from "./SectionHeading";
import PhoneMockup from "./PhoneMockup";
import { projects, moreProjects } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1];

/** Copy slides in from the side you came from, and out the opposite way. */
const panel = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 44 : -44 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -44 : 44 }),
};

/** Children stagger so the block assembles rather than sliding as one slab. */
const stack = {
  center: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const line = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

export default function Projects() {
  const [[index, direction], setState] = useState([0, 1]);
  const project = projects[index];
  const total = projects.length;

  const paginate = useCallback(
    (step) => setState(([current]) => [(current + step + total) % total, step]),
    [total]
  );

  // Arrow keys drive the deck whenever the section is on screen.
  useEffect(() => {
    const onKey = (event) => {
      const section = document.getElementById("projects");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;
      if (!onScreen) return;
      if (event.key === "ArrowRight") paginate(1);
      if (event.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="section">
        <SectionHeading
          eyebrow="Projects"
          title="Apps I've"
          highlight="shipped"
          description="Ten apps live on the Play Store. Step through a few of them."
        />

        {/* ---- The card ---- */}
        <div className="relative mx-auto mt-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragEnd={(event, info) => {
              // Commit on a decisive flick or a long drag, otherwise spring back.
              if (info.offset.x < -70 || info.velocity.x < -450) paginate(1);
              else if (info.offset.x > 70 || info.velocity.x > 450) paginate(-1);
            }}
            className="relative cursor-grab overflow-hidden rounded-[1.75rem] border border-ink/10 bg-paper-100 shadow-[0_18px_50px_-30px_rgb(var(--shadow)/0.4)] active:cursor-grabbing"
          >

            <div className="relative grid items-center gap-8 p-6 sm:p-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:p-11">
              {/* ---- Copy ---- */}
              <div className="min-h-[26rem] lg:min-h-[30rem]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={index}
                    custom={direction}
                    variants={panel}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { duration: 0.38, ease: EASE },
                      opacity: { duration: 0.22 },
                    }}
                  >
                    <motion.div variants={stack} initial="enter" animate="center">
                      <motion.div variants={line} className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-ink/40">
                          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-azure px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black">
                          {project.kind}
                        </span>
                      </motion.div>

                      <motion.h3
                        variants={line}
                        className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-[2.1rem]"
                      >
                        {project.title}
                      </motion.h3>

                      <motion.p
                        variants={line}
                        className="mt-2.5 max-w-md text-sm leading-relaxed text-ink/60"
                      >
                        {project.tagline}
                      </motion.p>

                      <motion.dl variants={line} className="mt-6 space-y-4">
                        <div>
                          <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                            <Target className="h-3 w-3 text-azure-600" />
                            Problem
                          </dt>
                          <dd className="mt-1.5 max-w-md text-[13px] leading-relaxed text-ink/65">
                            {project.problem}
                          </dd>
                        </div>
                        <div>
                          <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                            <Lightbulb className="h-3 w-3 text-azure-600" />
                            Solution
                          </dt>
                          <dd className="mt-1.5 max-w-md text-[13px] leading-relaxed text-ink/65">
                            {project.solution}
                          </dd>
                        </div>
                      </motion.dl>

                      <motion.ul variants={line} className="mt-5 space-y-1.5">
                        {project.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2.5 text-[13px] text-ink/60"
                          >
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azure-600" />
                            {feature}
                          </li>
                        ))}
                      </motion.ul>

                      <motion.div variants={line} className="mt-5 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-ink/10 bg-paper-200 px-3 py-1 text-[11px] font-medium text-ink/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </motion.div>

                      {project.link ? (
                        <motion.a
                          variants={line}
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link mt-7 inline-flex items-center gap-2 rounded-full bg-azure px-5 py-2.5 text-[13px] font-semibold text-black transition-all duration-300 hover:gap-3"
                        >
                          View on Google Play
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </motion.a>
                      ) : null}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ---- Handset ---- */}
              <div className="flex justify-center lg:justify-end">
                <PhoneMockup
                  src={project.shots[0]}
                  alt={`${project.title} running on a phone`}
                  screenKey={index}
                  direction={direction}
                />
              </div>
            </div>
          </motion.div>

          {/* ---- Controls ---- */}
          <div className="mt-7 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:border-azure hover:bg-azure hover:text-black active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {projects.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show ${item.title}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group flex h-6 items-center px-0.5"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-400 ${
                      i === index
                        ? "w-7 bg-azure"
                        : "w-1.5 bg-ink/20 group-hover:bg-ink/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:border-azure hover:bg-azure hover:text-black active:scale-95"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ---- The rest ---- */}
        <div className="mt-20">
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
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
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
      </div>
    </section>
  );
}
