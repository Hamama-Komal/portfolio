"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import SectionMarker from "./SectionMarker";
import { work, publishedCount, caseStudyCount } from "@/lib/data";

const PREVIEW_W = 184; // px
const PREVIEW_H = 392;

/** Screenshots, framed plainly. The evidence should read as evidence. */
function Screens({ shots, title }) {
  return (
    <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
      {shots.map((shot, i) => (
        <div
          key={shot}
          className="w-[7.5rem] shrink-0 overflow-hidden rounded-md border border-rule bg-paper-sunken lg:w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shot}
            alt={`${title} screen ${i + 1}`}
            loading="lazy"
            className="block aspect-[9/19] w-full object-cover object-top"
          />
        </div>
      ))}
    </div>
  );
}

export default function WorkIndex() {
  const [open, setOpen] = useState(-1);
  const [hover, setHover] = useState(-1);
  const [previewY, setPreviewY] = useState(0);
  // Screenshots mount on first open and stay mounted, so reopening is instant
  // while a visitor who never opens a row downloads none of them.
  const [seen, setSeen] = useState(() => new Set());

  const toggle = (index) => {
    setOpen((current) => (current === index ? -1 : index));
    setSeen((current) => (current.has(index) ? current : new Set(current).add(index)));
  };

  const listRef = useRef(null);
  const rowsRef = useRef([]);

  /* The preview is parked in a reserved right-hand gutter and slides to line up
     with whichever row is pointed at — anchored, so it never collides with the
     custom cursor the way a pointer-following panel would. */
  const alignPreview = (index) => {
    const row = rowsRef.current[index];
    const list = listRef.current;
    if (!row || !list) return;
    const centre = row.offsetTop + row.offsetHeight / 2 - PREVIEW_H / 2;
    const max = Math.max(0, list.offsetHeight - PREVIEW_H);
    setPreviewY(Math.min(Math.max(centre, 0), max));
    setHover(index);
  };

  const showPreview = hover > -1 && open === -1;
  const previewItem = work[hover > -1 ? hover : 0];

  return (
    <section id="work" className="band">
      <div className="shell">
        <SectionMarker
          index="01"
          label="Selected work"
          title="Everything I have shipped to Google Play."
          description="Open a row for the detail. Four of them carry the full write-up: what was wrong, and what I built instead."
          aside={`${publishedCount} apps · ${caseStudyCount} case studies`}
        />

        <div className="relative mt-12 lg:mt-14">
          <div ref={listRef} className="relative border-t border-rule lg:pr-[15rem]">
            {work.map((item, index) => {
              const isOpen = open === index;
              const isHot = hover === index || isOpen;

              return (
                <div
                  key={item.title}
                  ref={(node) => (rowsRef.current[index] = node)}
                  className="border-b border-rule"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      onMouseEnter={() => alignPreview(index)}
                      onFocus={() => alignPreview(index)}
                      onMouseLeave={() => setHover(-1)}
                      onBlur={() => setHover(-1)}
                      aria-expanded={isOpen}
                      aria-controls={`work-panel-${index}`}
                      className="group flex w-full items-center gap-4 py-5 text-left transition-colors duration-200 sm:gap-6 sm:py-6"
                    >
                      <span
                        className={`meta w-6 shrink-0 transition-colors duration-200 ${
                          isHot ? "text-accent-ink" : ""
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`min-w-0 flex-1 truncate font-display text-[1.4rem] leading-tight tracking-tight transition-colors duration-200 sm:text-[1.75rem] ${
                          isHot ? "text-accent-ink" : "text-ink"
                        }`}
                      >
                        {item.title}
                      </span>

                      <span className="meta hidden shrink-0 sm:inline">{item.category}</span>

                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-accent bg-accent text-white"
                            : "border-rule text-ink-faint group-hover:border-ink/40 group-hover:text-ink"
                        }`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </h3>

                  {/* Collapsed with grid-template-rows rather than unmounted,
                      so the case study — and above all the Play Store link —
                      is in the HTML whether or not anybody opens the row.
                      `inert` keeps the hidden links out of the tab order. */}
                  <div
                    id={`work-panel-${index}`}
                    inert={isOpen ? undefined : true}
                    className={`grid transition-[grid-template-rows] duration-[380ms] ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {/* The preview is hidden while a row is open, so the
                            panel reclaims its gutter and the screenshots get
                            room to be readable. */}
                      <div className="grid gap-8 pb-9 pt-1 lg:-mr-[15rem] lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-12">
                        <div className="lg:pl-10">
                          {item.tagline ? (
                            <p className="max-w-xl text-[17px] leading-snug text-ink">
                              {item.tagline}
                            </p>
                          ) : null}

                          {item.problem ? (
                            <dl className="mt-7 grid gap-6 sm:grid-cols-2">
                              <div>
                                <dt className="meta pb-2">The problem</dt>
                                <dd className="border-t border-rule pt-3 text-[14px] leading-relaxed text-ink-soft">
                                  {item.problem}
                                </dd>
                              </div>
                              <div>
                                <dt className="meta pb-2 text-accent-ink">What I built</dt>
                                <dd className="border-t border-rule pt-3 text-[14px] leading-relaxed text-ink-soft">
                                  {item.solution}
                                </dd>
                              </div>
                            </dl>
                          ) : null}

                          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-rule pt-5">
                            <span className="meta">{item.stack.join(" · ")}</span>
                            {item.org ? <span className="meta">at {item.org}</span> : null}
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link ml-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-ink"
                            >
                              <span className="link-underline decoration-accent-ink/40">
                                View {item.title} on Google Play
                              </span>
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                            </a>
                          </div>
                        </div>

                        {seen.has(index) ? (
                          <Screens shots={item.shots ?? [item.shot]} title={item.title} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Anchored preview — desktop only, and only while nothing is open */}
            <motion.div
              aria-hidden
              animate={{ y: previewY, opacity: showPreview ? 1 : 0 }}
              transition={{
                y: { type: "spring", stiffness: 210, damping: 28 },
                opacity: { duration: 0.2 },
              }}
              style={{ width: PREVIEW_W, height: PREVIEW_H }}
              className="pointer-events-none absolute right-0 top-0 hidden overflow-hidden rounded-md border border-rule bg-paper-sunken lg:block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewItem.shot}
                alt=""
                className="block h-full w-full object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
