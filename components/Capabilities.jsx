"use client";

import SectionMarker from "./SectionMarker";
import { capabilities } from "@/lib/data";

/**
 * A spec sheet, not a badge wall. Each column states what the group is actually
 * for in a sentence, then lists the tools plainly. Thirty pills in a bento grid
 * says "I typed my CV into a layout"; this says someone chose them.
 */
export default function Capabilities() {
  return (
    <section id="capabilities" className="band">
      <div className="shell">
        <SectionMarker
          index="03"
          label="Capabilities"
          title="What I reach for, and why."
          description="Grouped by the part of the job it belongs to rather than by how impressive the name looks."
        />

        <div className="mt-12 grid gap-x-10 border-t border-rule sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-x-12">
          {capabilities.map((group) => (
            <div key={group.label} className="flex h-full flex-col border-b border-rule py-7">
              <span className="meta text-accent-ink">{group.label}</span>

              <p className="mt-4 text-[15px] leading-snug text-ink">{group.statement}</p>

              <ul className="mt-6 border-t border-rule">
                {group.items.map((entry) => (
                  <li
                    key={entry}
                    className="border-b border-rule py-2.5 text-[13px] text-ink-soft last:border-b-0"
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
