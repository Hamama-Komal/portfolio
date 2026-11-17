"use client";

import { useState } from "react";
import { ArrowUpRight, Minus, Plus, Star } from "lucide-react";
import Reveal from "./Reveal";
import SectionMarker from "./SectionMarker";
import {
  clientApps,
  featuredClientApps,
  indexedClientApps,
  publishedCount,
  topDownloads,
} from "@/lib/data";

/** Downloads and rating, stated the same way everywhere they appear. */
function Figures({ app, className = "" }) {
  return (
    <span className={`meta flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      <span className="text-ink">{app.downloads}</span>
      <span>downloads</span>
      {app.rating ? (
        <span className="inline-flex items-center gap-1 text-accent-ink">
          <Star className="h-3 w-3 fill-current" />
          {app.rating}
        </span>
      ) : null}
    </span>
  );
}

/**
 * A highlighted app: one real screen, cross-fading to a second on hover.
 *
 * The card is a link to the store first and foremost. Where an app has a write-up
 * it gets a disclosure under the copy rather than a second card style, so the grid
 * stays one shape and only the rows that have something to say grow.
 */
function FeaturedCard({ app, index }) {
  const [open, setOpen] = useState(false);
  const [primary, secondary] = app.shots ?? [];

  return (
    <li className="flex h-full flex-col">
      <a
        href={app.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group/card block"
        aria-label={`${app.title} on Google Play`}
      >
        <div className="relative overflow-hidden rounded-sm border border-rule bg-paper-sunken">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={primary}
            alt={`${app.title} running on a phone`}
            loading="lazy"
            decoding="async"
            className={`block aspect-[9/16] w-full object-cover object-top transition-[opacity,transform] duration-[550ms] ease-out ${
              secondary ? "group-hover/card:opacity-0" : "group-hover/card:scale-[1.03]"
            }`}
          />
          {secondary ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={secondary}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute inset-0 block aspect-[9/16] w-full object-cover object-top opacity-0 transition-opacity duration-[550ms] ease-out group-hover/card:opacity-100"
            />
          ) : null}

          {/* Rank, printed on the sheet rather than floated over the art */}
          <span className="absolute left-0 top-0 bg-paper px-2 py-1 font-mono text-[10.5px] font-semibold leading-none tracking-[0.08em] text-ink-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.2rem] font-semibold leading-tight tracking-tight text-ink transition-colors duration-200 group-hover/card:text-accent-ink">
            {app.title}
          </h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-all duration-200 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent-ink" />
        </div>

        <p className="mb-4 mt-1.5 text-[14px] leading-snug text-ink-soft">{app.detail}</p>
      </a>

      {/* Pushed to the foot of the card so the figures line up across a row,
          whatever the title and the summary above them wrapped to. */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-rule pt-3">
        <Figures app={app} />
        <span className="meta hidden sm:inline">{app.category}</span>
      </div>

      {app.problem ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={`case-${app.slug}`}
            className="group/more mt-3 inline-flex items-center gap-2 self-start font-mono text-[11px] font-medium uppercase tracking-[0.11em] text-ink-faint transition-colors duration-200 hover:text-accent-ink"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-rule transition-colors duration-200 group-hover/more:border-accent group-hover/more:text-accent-ink">
              {open ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            </span>
            {open ? "Close" : "Why it was built"}
          </button>

          {/* Collapsed by grid-template-rows rather than unmounted, so the copy
              is in the HTML whether or not anybody opens it. */}
          <div
            id={`case-${app.slug}`}
            inert={open ? undefined : true}
            className={`grid transition-[grid-template-rows] duration-[380ms] ease-out ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <dl className="mt-3 space-y-4 border-t border-rule pt-4">
                <div>
                  <dt className="meta pb-1.5">The problem</dt>
                  <dd className="text-[14px] leading-relaxed text-ink-soft">{app.problem}</dd>
                </div>
                <div>
                  <dt className="meta pb-1.5 text-accent-ink">What I built</dt>
                  <dd className="text-[14px] leading-relaxed text-ink-soft">{app.solution}</dd>
                </div>
              </dl>
            </div>
          </div>
        </>
      ) : null}
    </li>
  );
}

export default function WorkIndex() {
  return (
    <section id="work" className="band">
      <div className="shell">
        <SectionMarker
          index="02"
          label="Client work"
          title="Apps I have shipped for teams."
          description="Built to someone else's brief and released under their Play Console account. The ones with the reach, or an idea worth looking at, are shown with real screens; the rest are listed plainly with a link to the store."
          aside={`${clientApps.length} apps · up to ${topDownloads} downloads`}
        />

        {/* ---- The highlights ---- */}
        <Reveal className="mt-12 lg:mt-14">
          <div className="flex items-baseline justify-between gap-6 border-t border-rule pt-5">
            <h3 className="font-display text-[1.3rem] font-semibold tracking-tight text-ink">
              Highlights
            </h3>
            <span className="meta">{featuredClientApps.length} apps · hover for a second screen</span>
          </div>
        </Reveal>

        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-7 lg:grid-cols-4 lg:gap-x-8">
          {featuredClientApps.map((app, index) => (
            <FeaturedCard key={app.slug} app={app} index={index} />
          ))}
        </ul>

        {/* ---- Everything else ---- */}
        <Reveal className="mt-20 lg:mt-24">
          <div className="flex items-baseline justify-between gap-6 border-t border-rule pt-5">
            <h3 className="font-display text-[1.3rem] font-semibold tracking-tight text-ink">
              Also on the store
            </h3>
            <span className="meta">{indexedClientApps.length} apps</span>
          </div>
        </Reveal>

        <div className="mt-6 border-t border-rule">
          {indexedClientApps.map((app, index) => (
            <a
              key={app.slug}
              href={app.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 border-b border-rule px-2 py-4 transition-colors duration-200 hover:bg-accent-wash sm:grid-cols-[1.75rem_minmax(0,1fr)_11.5rem_auto] sm:gap-x-5"
            >
              <span className="meta transition-colors duration-200 group-hover:text-accent-ink">
                {String(featuredClientApps.length + index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0">
                <span className="block font-display text-[1.1rem] font-semibold leading-tight tracking-tight text-ink transition-colors duration-200 group-hover:text-accent-ink">
                  {app.title}
                </span>
                <span className="mt-1 block text-[14px] leading-snug text-ink-soft">
                  {app.detail}
                </span>
                <Figures app={app} className="mt-2 sm:hidden" />
              </span>

              <Figures app={app} className="hidden sm:flex" />

              <ArrowUpRight className="h-4 w-4 shrink-0 self-center text-ink-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink" />
            </a>
          ))}
        </div>

        <p className="meta mt-6 normal-case tracking-[0.08em]">
          {publishedCount} apps live on Google Play in total, counting the two under my own studio.
        </p>
      </div>
    </section>
  );
}
