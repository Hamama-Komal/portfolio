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
      </div>
    </section>
  );
}
