"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import Portrait from "./Portrait";
import Magnetic from "./Magnetic";
import CountUp from "./CountUp";
import { profile, CV_FILE } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stats = [
  { n: 10, suffix: "+", v: "Apps on Google Play" },
  { n: 4, suffix: "", v: "Years building mobile" },
  { n: 30, suffix: "+", v: "Apps built in total" },
];

export default function Hero() {
  return (
    <section id="top" className="relative pt-24 sm:pt-28 lg:pt-32">
      <div className="section">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-6">
          {/* Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-2 lg:order-1"
          >
            <motion.div variants={item} className="flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-sky-600 opacity-60 animate-pulseRing" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-600" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/60">
                {profile.status}
              </span>
              <span className="hidden h-3 w-px bg-ink/15 sm:block" />
              <span className="hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45 sm:flex">
                <MapPin className="h-3 w-3" />
                {profile.location}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-7 font-display text-[3.25rem] font-semibold leading-[0.95] tracking-[-0.03em] sm:text-7xl lg:text-[5.25rem]"
            >
              <span className="block text-ink">Hamama</span>
              <span className="block text-ink">Komal</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-lg font-display text-lg font-medium leading-snug text-ink/80 sm:text-xl"
            >
              Flutter Developer shipping{" "}
              <span className="text-azure-600">production mobile apps</span>.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/55"
            >
              Full-time at Devlix Technologies. I build Android apps in Flutter — clean
              architecture, real users, shipped to the Play Store.
            </motion.p>


            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.25}>
              <a
                href="#projects"
                data-cursor="see work"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper-50 transition-all duration-300 hover:gap-3"
              >
                View my work
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              </Magnetic>
              <Magnetic strength={0.2}>
              <a
                href={CV_FILE}
                download
                data-cursor="download"
                className="group inline-flex items-center gap-2 rounded-full border border-azure/45 bg-azure/10 px-6 py-3 text-sm font-semibold text-azure-700 transition-colors duration-300 hover:border-azure hover:bg-azure/20"
              >
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                Download CV
              </a>
              </Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink/80 transition-colors duration-300 hover:border-ink/35 hover:text-ink"
              >
                Get in touch
              </a>
            </motion.div>

            <motion.dl
              variants={item}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-ink/[0.07] pt-7"
            >
              {stats.map((stat) => (
                <div key={stat.v}>
                  <dt className="font-display text-2xl font-semibold tracking-tight text-ink">
                    <CountUp value={stat.n} suffix={stat.suffix} />
                  </dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink/45">
                    {stat.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Portrait */}
          <div className="order-1 lg:order-2 lg:-mr-6 lg:-mt-6">
            <Portrait />
          </div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mx-auto mt-14 flex w-fit items-center gap-2.5 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/35 transition-colors hover:text-ink/80 sm:mt-16"
        >
          Scroll
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
