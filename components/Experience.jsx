"use client";

import SectionMarker from "./SectionMarker";
import { experience, startYear } from "@/lib/data";

/**
 * No accordion here on purpose. The work index already asks to be opened; a
 * second thing that hides its content would make the page feel evasive. Four
 * roles fit on one screen if they are set properly, so they are all just there.
 */
export default function Experience() {
  return (
    <section id="experience" className="band">
      <div className="shell">
        <SectionMarker
          index="02"
          label="Experience"
          title="Native Android to full-time Flutter."
          description="Four teams since 2024 — an internship in Java, a contract run of Flutter apps, and the full-time role I hold now."
          aside={`${experience.length} roles · since ${startYear}`}
        />

        <div className="mt-12 border-t border-rule lg:mt-14">
          {experience.map((job) => (
            <article
              key={job.company}
              className="grid gap-x-10 gap-y-4 border-b border-rule py-8 lg:grid-cols-[11rem_minmax(0,1fr)] lg:py-9"
            >
              {/* Dates hold the left rail so the column scans as a timeline */}
              <div className="flex items-center gap-3 lg:block">
                <span className="meta whitespace-nowrap">{job.period}</span>
                <span className="meta mt-2 hidden lg:block">{job.type}</span>
                <span className="meta lg:hidden">· {job.type}</span>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-[1.6rem] leading-tight tracking-tight text-ink sm:text-[1.9rem]">
                    {job.company}
                  </h3>
                  {job.current ? (
                    <span className="meta flex items-center gap-1.5 text-accent-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Current
                    </span>
                  ) : null}
                </div>

                <p className="mt-1.5 text-[15px] font-medium text-accent-ink">{job.role}</p>

                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                  {job.summary}
                </p>

                <p className="meta mt-5">{job.tags.join("  ·  ")}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
