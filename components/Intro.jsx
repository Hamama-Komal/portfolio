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
    accent: "azure",
  },
  {
    icon: Brain,
    label: "Part-Time",
    title: "AI Engineer & AI/ML Instructor",
    company: "XOKSIS",
    text: "Exploring LLM applications, RAG pipelines and agentic AI — and teaching the concepts behind them to future engineers.",
    accent: "sky",
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
          description="Flutter by day, AI by night — and increasingly, both in the same app."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Bio card */}
          <Reveal from="left">
            <div className="glass relative h-full overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-azure/20 blur-3xl" />
              <Quote className="h-7 w-7 text-azure-600/70" />
              <p className="mt-5 text-base leading-relaxed text-ink/80 sm:text-lg">
                Hi, I&apos;m Hamama — a Flutter developer based in{" "}
                <span className="font-semibold text-ink">Bhakkar, Pakistan</span>. My journey started
                with native Android and moved into Flutter, where I found what I actually enjoy:
                building clean, scalable apps. Clean architecture isn&apos;t a checkbox for me —
                separation of concerns is how I keep a codebase worth returning to.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/65 sm:text-base">
                Today I&apos;m a{" "}
                <span className="font-semibold text-ink">
                  Full-Time Flutter Developer at Devlix Technologies
                </span>{" "}
                and a{" "}
                <span className="font-semibold text-ink">
                  Part-Time AI Engineer &amp; Instructor at XOKSIS
                </span>
                , where I build with LLMs, RAG pipelines and vector databases — and teach those
                concepts to developers starting out.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/65 sm:text-base">
                Both halves need the same thing: clarity. Good products and good teaching are
                mostly the work of making something complicated feel obvious.{" "}
                <span className="text-gradient font-semibold">Let&apos;s build something.</span>
              </p>
            </div>
          </Reveal>

          {/* Dual focus cards */}
          <div className="grid gap-6">
            {focusCards.map((card, i) => {
              const Icon = card.icon;
              const isAzure = card.accent === "azure";
              return (
                <Reveal key={card.company} from="right" delay={i * 0.12}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`glass group relative h-full overflow-hidden p-6 transition-colors ${
                      isAzure ? "hover:border-azure/40" : "hover:border-sky-400/40"
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-x-0 -top-24 h-40 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-40 ${
                        isAzure ? "bg-azure/25" : "bg-sky-400/20"
                      }`}
                    />
                    <div className="relative flex items-start gap-4">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
                          isAzure
                            ? "border-azure/30 bg-azure/10 text-azure-600"
                            : "border-sky-400/30 bg-sky-600/10 text-sky-600"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                            isAzure ? "text-azure-600" : "text-sky-600"
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
