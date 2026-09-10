"use client";

import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import SectionMarker from "./SectionMarker";
import { work, publishedCount, caseStudyCount } from "@/lib/data";

export default function WorkIndex() {
  const [open, setOpen] = useState(-1);
  const [hover, setHover] = useState(-1);

  // Whatever is being pointed at wins, then whatever is open, then the first
  // row — so the viewer is never empty and never argues with the list.
  const activeIndex = hover > -1 ? hover : open > -1 ? open : 0;
  const active = work[activeIndex];

  return (
    <section id="work" className="band">
      <div className="shell">
        <SectionMarker
          index="01"
          label="Selected work"
          title="Everything I have shipped to Google Play."
          description="Every app is listed with what it does. Open a row for the four that carry a full write-up: what was wrong, and what I built instead."
          aside={`${publishedCount} apps · ${caseStudyCount} case studies`}
        />

        <div className="mt-12 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start lg:gap-12">
          {/* ---- The index ---- */}
          <div className="border-t border-rule">
            {work.map((item, index) => {
              const isOpen = open === index;
              const isHot = hover === index || isOpen;

              return (
                <div
                  key={item.title}
                  className={`border-b border-rule transition-colors duration-200 ${
                    isHot ? "bg-accent-wash" : ""
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : index)}
                      onMouseEnter={() => setHover(index)}
                      onFocus={() => setHover(index)}
                      onMouseLeave={() => setHover(-1)}
                      onBlur={() => setHover(-1)}
                      aria-expanded={isOpen}
                      aria-controls={`work-panel-${index}`}
                      className="group flex w-full items-start gap-4 px-3 py-5 text-left sm:gap-5"
                    >
                      <span
                        className={`meta mt-1.5 w-6 shrink-0 transition-colors duration-200 ${
                          isHot ? "text-accent-ink" : ""
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-display text-[1.35rem] font-semibold leading-tight tracking-tight transition-colors duration-200 sm:text-[1.6rem] ${
                            isHot ? "text-accent-ink" : "text-ink"
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="mt-1.5 block max-w-lg text-[14.5px] leading-snug text-ink-soft">
                          {item.detail}
                        </span>
                      </span>

                      <span className="meta mt-1.5 hidden shrink-0 md:inline">{item.category}</span>

                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-accent bg-accent text-white"
                            : "border-rule text-ink-faint group-hover:border-accent group-hover:text-accent-ink"
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>

                  {/* Collapsed with grid-template-rows rather than unmounted, so
                      the case study — and above all the Play Store link — is in
                      the HTML whether or not anybody opens the row. `inert`
                      keeps the hidden links out of the tab order. */}
                  <div
                    id={`work-panel-${index}`}
                    inert={isOpen ? undefined : true}
                    className={`grid transition-[grid-template-rows] duration-[380ms] ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-3 pb-8 sm:pl-14">
                        {item.problem ? (
                          <dl className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                            <div>
                              <dt className="meta pb-2.5">The problem</dt>
                              <dd className="border-t border-rule pt-3.5 text-[15px] leading-relaxed text-ink-soft">
                                {item.problem}
                              </dd>
                            </div>
                            <div>
                              <dt className="meta pb-2.5 text-accent-ink">What I built</dt>
                              <dd className="border-t border-rule pt-3.5 text-[15px] leading-relaxed text-ink-soft">
                                {item.solution}
                              </dd>
                            </div>
                          </dl>
                        ) : null}

                        {/* The viewer beside the list is desktop-only, so small
                            screens get the screen here instead. */}
                        <div className="mt-7 w-[8.5rem] overflow-hidden rounded-md border border-rule bg-paper-sunken lg:hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.shot}
                            alt={`${item.title} running on a phone`}
                            loading="lazy"
                            className="block aspect-[9/19] w-full object-cover object-top"
                          />
                        </div>

                        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-rule pt-5">
                          <span className="meta">{item.stack.join(" · ")}</span>
                          {item.org ? <span className="meta">at {item.org}</span> : null}
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link ml-auto inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent-ink"
                          >
                            <span className="link-underline decoration-accent-ink/40">
                              View {item.title} on Google Play
                            </span>
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---- The viewer ----
              Sticky rather than pinned to a row: it stays in view for the whole
              list, and nothing has to re-measure when a row opens. */}
          <aside aria-hidden className="hidden lg:sticky lg:top-24 lg:block">
            <div className="overflow-hidden rounded-md border border-rule bg-paper-sunken">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.shot}
                alt=""
                className="block aspect-[9/19] w-full object-cover object-top"
              />
            </div>
            <p className="mt-4 truncate font-display text-[15px] font-semibold text-ink">
              {active.title}
            </p>
            <p className="meta mt-2 truncate text-accent-ink">{active.category}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
