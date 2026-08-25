"use client";

import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import BubbleGame from "./BubbleGame";

export default function AnimeSection() {
  return (
    <section id="anime" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      <div className="section">
        <SectionHeading
          eyebrow="Off the clock"
          title="A little"
          highlight="about me"
          description="Anime is how I recharge after too much debugging. Here's a bit of it — go on, pop a few."
          align="center"
        />

        <Reveal from="up" className="mt-10" amount={0.15}>
          <BubbleGame />
        </Reveal>

        <Reveal from="up" className="mt-5" amount={0.4}>
          <p className="mx-auto max-w-xl text-center font-mono text-[11px] leading-relaxed text-ink/45">
            Hand-built: 14 pooled nodes on a single requestAnimationFrame loop, transforms written
            straight to the DOM so nothing re-renders per frame. No game library.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
