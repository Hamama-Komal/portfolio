import { ArrowDown, ArrowUpRight } from "lucide-react";
import Portrait from "./Portrait";
import { profile, CV_FILE, stats, publishedCount } from "@/lib/data";

/**
 * The hero is a server component with a CSS entrance.
 *
 * Framer would hold this copy at opacity 0 until hydration, and on a slow
 * connection that is a blank first paint of the largest element on the page.
 * `.rise` starts the moment the stylesheet applies instead, and this section
 * ships no JavaScript of its own.
 *
 * The name and the availability line carry no animation at all. They are the
 * identity of the page, so they are painted rather than assembled — which also
 * means their visibility can never depend on an animation having run.
 */
const rise = (delay) => ({ animationDelay: `${delay}ms` });

export default function Hero() {
  return (
    <section id="top" className="shell pb-14 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32">
      {/* Standing details, stated once, in the technical register */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-rule pb-4">
        <span className="meta flex items-center gap-2 text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {profile.available}
        </span>
        <span className="meta">{profile.location}</span>
        <span className="meta ml-auto hidden sm:inline">Available from Bhakkar · Remote</span>
      </div>

      <div className="grid gap-12 pt-10 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16 lg:pt-14">
        <div>
          <h1 className="font-display text-[clamp(3.25rem,13vw,7.5rem)] font-normal leading-[0.9] tracking-tightest text-ink">
            <span className="block">Hamama</span>
            <span className="block">Komal</span>
          </h1>

          <p
            style={rise(140)}
            className="rise mt-8 max-w-xl text-lg leading-snug text-ink sm:text-[22px]"
          >
            I build Android apps in Flutter and take them all the way to release —{" "}
            <span className="text-accent-ink">{publishedCount} of them are on Google Play</span>.
          </p>

          <p
            style={rise(200)}
            className="rise mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft"
          >
            Full-time at Devlix Technologies. I started in native Android with Java and MVVM, moved
            across to Flutter, and have been shipping there since — mostly solo, from the
            requirement through to the Play Console.
          </p>

          <div style={rise(260)} className="rise mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-ink"
            >
              Selected work
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
            <a
              href={CV_FILE}
              download
              className="inline-flex items-center gap-2 rounded-sm border border-ink/25 px-5 py-3 text-[13px] font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper"
            >
              Download CV
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-1.5 px-1 py-3 text-[13px] font-medium text-ink-soft transition-colors duration-200 hover:text-accent-ink"
            >
              Email me
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div style={rise(200)} className="rise lg:pb-2">
          <Portrait />
        </div>
      </div>

      {/* Figures, each one counted from the data rather than typed */}
      <dl style={rise(340)} className="rise mt-14 grid grid-cols-3 border-t border-rule sm:mt-16">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-rule py-5 pr-4 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
          >
            <dt className="font-display text-[2.25rem] leading-none tracking-tight text-ink sm:text-[2.75rem]">
              {stat.value}
            </dt>
            <dd className="meta mt-2.5 normal-case tracking-[0.1em]">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
