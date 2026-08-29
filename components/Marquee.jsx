"use client";

import { marqueeItems } from "@/lib/data";

/** A single slow band of the tools I actually work in. Pauses on hover. */
export default function Marquee() {
  return (
    <div className="group relative flex overflow-hidden mask-fade-x border-y border-ink/[0.07] py-4">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          style={{ "--marquee-duration": "45s" }}
          className="flex min-w-full shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {marqueeItems.map((item, i) => (
            <span key={`${item}-${i}`} className="flex shrink-0 items-center">
              <span className="whitespace-nowrap px-6 font-display text-sm font-medium tracking-tight text-ink/45 transition-colors duration-300 hover:text-azure-600">
                {item}
              </span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-azure/30" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
