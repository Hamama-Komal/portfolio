"use client";

import { marqueeItems } from "@/lib/data";

function Badge({ item }) {
  return (
    <span className="flex shrink-0 items-center gap-2 rounded-2xl border border-ink/10 bg-ink/[0.04] px-4 py-2.5 text-sm font-medium text-ink/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-azure/40 hover:bg-azure/10 hover:text-ink">
      <span className="text-base leading-none" aria-hidden>
        {item.emoji}
      </span>
      {item.label}
    </span>
  );
}

function Track({ items, reverse = false, duration = "24s" }) {
  const style = {
    "--marquee-duration": duration,
    animationDirection: reverse ? "reverse" : "normal",
  };

  return (
    <div className="group relative flex overflow-hidden mask-fade-x py-1">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          style={style}
          className="flex min-w-full shrink-0 items-center gap-3 pr-3 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {items.map((item, i) => (
            <Badge key={`${item.label}-${i}`} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const half = Math.ceil(marqueeItems.length / 2);
  const shifted = [...marqueeItems.slice(half), ...marqueeItems.slice(0, half)];

  return (
    <div className="relative w-full space-y-3 overflow-hidden">
      <Track items={marqueeItems} duration="22s" />
      <Track items={shifted} reverse duration="28s" />
    </div>
  );
}
