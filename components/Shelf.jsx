"use client";

/**
 * Three screens in a row, at the aspect ratio the Play Store actually serves.
 *
 * Nothing is cropped to a shared box here: these are the studio apps, and the
 * one place on the page where the whole screen is worth seeing. The frames are
 * hairlines on a sunken ground, matching the portrait, so the group reads as a
 * contact sheet rather than three floating phones.
 */
export default function Shelf({ app }) {
  const shots = app.shots ?? [];
  if (!shots.length) return null;

  return (
    <div className="relative">
      {/* Crop mark, echoing the portrait */}
      <span
        aria-hidden
        className="absolute -left-2 -top-2 hidden h-5 w-5 border-l border-t border-accent lg:block"
      />

      <ul className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {shots.slice(0, 3).map((shot, index) => (
          <li
            key={shot}
            className="overflow-hidden rounded-sm border border-rule bg-paper-sunken transition-transform duration-500 ease-out hover:-translate-y-1"
          >
            {/* The box is declared up front so twelve lazy images further down
                the page cannot shift the anchor you just jumped to. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot}
              alt={`${app.title} — screen ${index + 1}`}
              width={560}
              height={996}
              loading="lazy"
              decoding="async"
              className="block aspect-[9/16] w-full object-cover object-top"
            />
          </li>
        ))}
      </ul>

      <p className="meta mt-4 normal-case tracking-[0.08em]">
        {shots.length > 3 ? `3 of ${shots.length} screens` : "Screens from the Play Store listing"}
      </p>
    </div>
  );
}
