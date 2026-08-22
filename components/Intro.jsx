"use client";

import { motion } from "framer-motion";
import { Brain, Building2, Quote, Smartphone } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Marquee from "./Marquee";

const focusCards = [
  {
    icon: Smartphone,
    label: "Full-Time",
    title: "Flutter App Developer",
    company: "Devlix Technologies",
    text: "Building, improving and shipping production-ready mobile applications — from product requirement to Play Store release.",
    accent: "flame",
  },
  {
    icon: Brain,
    label: "Part-Time",
    title: "AI Engineer & AI/ML Instructor",
    company: "XOKSIS",
    text: "Exploring LLM applications, RAG pipelines and agentic AI — and teaching the concepts behind them to future engineers.",
    accent: "moss",
  },
];

export default function Intro() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="section">
        <SectionHeading
          eyebrow="Intro"
          title="A developer who likes"
          highlight="shipping things"
          description="I turn ideas into working products. Mobile development is where I live day to day; AI is the thing I can't stop building with at night."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Bio card */}
          <Reveal from="left">
            <div className="glass relative h-full overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-flame/20 blur-3xl" />
              <Quote className="h-7 w-7 text-flame-600/70" />
              <p className="mt-5 text-base leading-relaxed text-ink/80 sm:text-lg">
                I&apos;m a{" "}
                <span className="font-semibold text-ink">
                  Full-Time Flutter Developer at Devlix Technologies
                </span>{" "}
                and a{" "}
                <span className="font-semibold text-ink">
                  Part-Time AI Engineer &amp; Instructor at XOKSIS
                </span>
                . My journey started with native Android and evolved into Flutter, where I found my
                main focus: clean, responsive, user-friendly mobile experiences.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
                Alongside that, I build with LLMs, RAG systems and vector databases. I don&apos;t just
                explore technology —{" "}
                <span className="text-gradient font-semibold">I like putting it into products.</span>
              </p>
            </div>
          </Reveal>

          {/* Dual focus cards */}
          <div className="grid gap-6">
            {focusCards.map((card, i) => {
              const Icon = card.icon;
              const isFlame = card.accent === "flame";
              return (
                <Reveal key={card.company} from="right" delay={i * 0.12}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`glass group relative h-full overflow-hidden p-6 transition-colors ${
                      isFlame ? "hover:border-flame/40" : "hover:border-moss-400/40"
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-x-0 -top-24 h-40 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-40 ${
                        isFlame ? "bg-flame/25" : "bg-moss-400/20"
                      }`}
                    />
                    <div className="relative flex items-start gap-4">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
                          isFlame
                            ? "border-flame/30 bg-flame/10 text-flame-600"
                            : "border-moss-400/30 bg-moss-600/10 text-moss-600"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                            isFlame ? "text-flame-600" : "text-moss-600"
                          }`}
                        >
                          {card.label}
                        </span>
                        <h3 className="mt-1 font-display text-lg font-bold text-ink">
                          {card.title}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/60">
                          <Building2 className="h-3.5 w-3.5" />
                          {card.company}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-ink/60">{card.text}</p>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ticker */}
      <Reveal from="none" className="mt-14" amount={0.2}>
        <Marquee />
      </Reveal>
    </section>
  );
}
