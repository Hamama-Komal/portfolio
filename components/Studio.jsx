"use client";

import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionMarker from "./SectionMarker";
import Shelf from "./Shelf";
import { studio, studioApps } from "@/lib/data";

/**
 * The indie half of the page, and the only section that gets full-width rows.
 *
 * Client work is listed; these two are argued. They are the apps where the idea
 * was mine as well as the code, so each one states the problem it was built
 * against and shows three real screens — the space is the point of difference,
 * not decoration.
 */
export default function Studio() {
  return (
    <section id="studio" className="band">
      <div className="shell">
        <SectionMarker
          index="01"
          label="HK Craft Labs"
          title="My own account, my own ideas."
          description={studio.description}
          aside={`${studioApps.length} live · my Play Console`}
        />

        <Reveal className="mt-7">
          <a
            href={studio.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[14px] font-semibold text-accent-ink"
          >
            <span className="link-underline decoration-accent-ink/40">
              HK Craft Labs on Google Play
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <div className="mt-12 border-t border-rule lg:mt-14">
          {studioApps.map((app, index) => (
            <article
              key={app.slug}
              className="grid items-start gap-x-14 gap-y-8 border-b border-rule py-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:py-14"
            >
              {/* Copy first in the DOM so it is first on a narrow screen too */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="meta text-accent-ink">
                    {String(index + 1).padStart(2, "0")} — {app.category}
                  </span>
                  <span className="meta">{app.downloads} downloads</span>
                </div>

                <h3 className="mt-4 font-display text-[2rem] font-medium leading-[1.08] tracking-tightest text-ink sm:text-[2.6rem]">
                  {app.title}
                </h3>

                <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink">{app.detail}</p>

                <dl className="mt-8 grid max-w-xl gap-6 border-t border-rule pt-6 sm:grid-cols-2 sm:gap-8">
                  <div>
                    <dt className="meta pb-2.5">The problem</dt>
                    <dd className="text-[15px] leading-relaxed text-ink-soft">{app.problem}</dd>
                  </div>
                  <div>
                    <dt className="meta pb-2.5 text-accent-ink">What I built</dt>
                    <dd className="text-[15px] leading-relaxed text-ink-soft">{app.solution}</dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <span className="meta">{app.stack.join("  ·  ")}</span>
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-ink"
                  >
                    Get it on Google Play
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* Three real screens, at their own aspect ratio */}
              <Reveal delay={0.06} className="order-first lg:order-none">
                <Shelf app={app} />
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
