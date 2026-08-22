"use client";

import { useState } from "react";

/**
 * App screenshot with a graceful fallback: until the real file exists in
 * public/img/apps/, the slot renders a tinted placeholder instead of a broken image.
 */
export default function AppShot({ src, alt, initials, accentRgb, className = "", blur = false }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{
          background: `radial-gradient(120% 100% at 50% 0%, rgba(${accentRgb},0.35), rgb(var(--paper-100)) 70%)`,
        }}
      >
        <span className="font-display text-3xl font-bold tracking-tight text-ink/30">
          {initials}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${className} ${blur ? "scale-110 blur-2xl" : ""}`}
    />
  );
}
