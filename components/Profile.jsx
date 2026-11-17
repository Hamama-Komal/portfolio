"use client";

import Reveal from "./Reveal";
import SectionMarker from "./SectionMarker";
import { profile, publishedCount } from "@/lib/data";

const glance = [
  { term: "Based in", detail: "Bhakkar, Pakistan — remote or on site" },
  { term: "Currently", detail: "Flutter Developer & Application Instructor, XOKSIS" },
  { term: "And", detail: "Flutter App Developer at Devlix Technologies" },
  { term: "Own studio", detail: "HK Craft Labs — my own apps on Google Play" },
  { term: "Open to", detail: "Flutter roles, contract or full-time" },
];

export default function Profile() {
  return (
    <section id="about" className="band">
      <div className="shell">
        <SectionMarker
          index="05"
          label="Profile"
          title="How I work."
          description="The short version of what it is like to hand me an app."
        />

        <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div>
            <Reveal>
              <p className="max-w-2xl border-l-2 border-accent pl-6 font-display text-[1.7rem] font-medium leading-[1.25] tracking-tight text-ink sm:text-[2.1rem]">
                Most of these apps were built alone, which means the structure has to hold up with
                nobody around to ask.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-9 grid max-w-2xl gap-5 text-[16px] leading-relaxed text-ink-soft sm:grid-cols-2 sm:gap-8">
                <p>
                  {publishedCount} releases in, that habit is fixed. I pick an architecture at the
                  start and keep to it, because the version of me opening the project six months
                  later to fix a crash report has no context left. Clean architecture, one state
                  management choice per app, dependencies injected rather than reached for.
                </p>
                <p>
                  Teaching keeps that honest. As Application Instructor at XOKSIS I take students
                  from Dart through to a real Play Store release, and there is no hiding a
                  half-understood concept in front of a room. The same standard ends up in my pull
                  requests and handover notes.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
                HK Craft Labs is where that gets tested without a brief to hide behind. Picking the
                idea, drawing the screens, writing the store listing and reading the one-star review
                is a different job from taking a spec and building it well, and it has made me
                better at the second one.
              </p>

              <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
                What I want next is more of the same with a bigger surface: a product with real
                users, a team to review against, and the room to own a codebase properly rather than
                only shipping to it.
              </p>
            </Reveal>
          </div>

          {/* At a glance — the four things a screener actually needs */}
          <Reveal delay={0.08}>
            <dl className="border-t border-rule">
              {glance.map((row) => (
                <div key={row.term} className="border-b border-rule py-4">
                  <dt className="meta">{row.term}</dt>
                  <dd className="mt-2 text-[15px] leading-snug text-ink">{row.detail}</dd>
                </div>
              ))}
              <div className="border-b border-rule py-4">
                <dt className="meta">Reach me</dt>
                <dd className="mt-2 text-[15px] leading-snug">
                  <a href={`mailto:${profile.email}`} className="link-underline text-accent-ink">
                    {profile.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
