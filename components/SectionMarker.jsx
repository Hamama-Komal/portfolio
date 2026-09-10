"use client";

import Reveal from "./Reveal";

/**
 * Section header.
 *
 * The band's own top rule does the dividing, so this adds no box of its own: a
 * mono strip sits directly under the rule carrying the section number and a
 * factual aside, then the title and its description sit on one baseline below.
 * It reads like a printed contents page rather than a card.
 */
export default function SectionMarker({ index, label, title, description, aside }) {
  return (
    <header>
      <div className="flex items-baseline justify-between gap-6">
        <span className="meta">
          <span className="text-accent-ink">{index}</span>
          <span className="px-2 text-ink-faint">/</span>
          {label}
        </span>
        {aside ? <span className="meta hidden sm:inline">{aside}</span> : null}
      </div>

      <Reveal className="mt-7 grid gap-4 lg:mt-9 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-12">
        <h2 className="balance font-display text-[2.5rem] font-normal leading-[1.05] tracking-tightest text-ink sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h2>
        {description ? (
          <p className="max-w-md text-[15px] leading-relaxed text-ink-soft lg:pb-1.5">
            {description}
          </p>
        ) : null}
      </Reveal>
    </header>
  );
}
