"use client";

import { useEffect, useRef } from "react";

/**
 * Dot Grid Background.
 *
 * A canvas grid of dots that break formation near the pointer and orbit in
 * randomised 3D planes. Each dot is assigned three permanent orbital parameters at
 * build time — an inclination (how tilted its plane is), an ascension (how that
 * plane is rotated around the viewer axis) and a phase offset (where on the orbit
 * it starts) — so the field reads as layered orbital shells rather than a flat 2D
 * swirl.
 *
 * A single global clock advances every orbit at a constant rate: pointer movement
 * decides *which* dots are pulled in, never how fast they travel. Energy rises
 * quickly on approach and eases out slowly on departure, so the field winds down
 * instead of snapping back.
 */

const DEFAULTS = {
  dotSize: 1.6, // radius in CSS px
  spacing: 30, // grid pitch
  orbiting: true,
  orbitSpeed: 1.1,
  impactRadius: 170,
  scaleOnHover: 2.6,
  baseAlpha: 0.2,
};

// Rise fast, fall slow — the "ease-out decay" when the cursor leaves.
const ATTACK = 0.18;
const RELEASE = 0.045;

const smoothstep = (t) => t * t * (3 - 2 * t);

export default function DotGridBackground({
  dotSize = DEFAULTS.dotSize,
  spacing = DEFAULTS.spacing,
  orbiting = DEFAULTS.orbiting,
  orbitSpeed = DEFAULTS.orbitSpeed,
  impactRadius = DEFAULTS.impactRadius,
  scaleOnHover = DEFAULTS.scaleOnHover,
  baseAlpha = DEFAULTS.baseAlpha,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dots = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Pointer lives in CSS pixels; -1 parks it far away so nothing is energised.
    const pointer = { x: -9999, y: -9999, inside: false };

    /** Base and active colours are read from CSS custom properties, so the theme
     *  toggle repaints the field without a re-mount. */
    let base = [10, 25, 41];
    let active = [2, 125, 253];

    const readColors = () => {
      const styles = getComputedStyle(canvas);
      const parse = (name, fallback) => {
        const raw = styles.getPropertyValue(name).trim();
        if (!raw) return fallback;
        const parts = raw.split(/[\s,]+/).map(Number);
        return parts.length === 3 && parts.every((n) => Number.isFinite(n)) ? parts : fallback;
      };
      base = parse("--dot-rgb", base);
      active = parse("--dot-active-rgb", active);
    };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      // clientWidth can read 0 if layout hasn't settled; the viewport is a safe
      // stand-in because this canvas is always fixed to it.
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      // Centre the grid so it stays symmetrical at any viewport size.
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      dots = new Array(cols * rows);
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Permanent, per-dot orbital parameters — assigned once, never re-rolled.
          const inclination = Math.random() * Math.PI;
          const ascension = Math.random() * Math.PI * 2;
          dots[i++] = {
            x: offsetX + c * spacing,
            y: offsetY + r * spacing,
            cosI: Math.cos(inclination),
            sinI: Math.sin(inclination),
            cosA: Math.cos(ascension),
            sinA: Math.sin(ascension),
            phase: Math.random() * Math.PI * 2,
            energy: 0,
          };
        }
      }

      // Paint the resting grid straight away — waiting for the first animation
      // frame would leave the background blank on load.
      draw();
    };

    const orbitMax = spacing * 0.95;
    const impact2 = impactRadius * impactRadius;

    let clock = 0;
    let last = performance.now();
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        const dx = pointer.x - dot.x;
        const dy = pointer.y - dot.y;
        const d2 = dx * dx + dy * dy;

        const target = d2 < impact2 ? smoothstep(1 - Math.sqrt(d2) / impactRadius) : 0;
        dot.energy += (target - dot.energy) * (target > dot.energy ? ATTACK : RELEASE);

        // Fast path: at rest, a dot is just a dot.
        if (dot.energy < 0.002) {
          ctx.globalAlpha = baseAlpha;
          ctx.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        const energy = dot.energy;
        let px = dot.x;
        let py = dot.y;
        let depth = 0;

        if (orbiting && !reduced) {
          const theta = clock + dot.phase;
          const radius = orbitMax * energy;
          const ox = Math.cos(theta) * radius;
          const oy = Math.sin(theta) * radius;

          // Tilt the orbit into its own inclined plane...
          const ty = oy * dot.cosI;
          const tz = oy * dot.sinI;
          // ...then rotate that plane around the viewer axis.
          px += ox * dot.cosA - ty * dot.sinA;
          py += ox * dot.sinA + ty * dot.cosA;
          depth = tz / orbitMax; // -1 (behind) .. 1 (in front)
        }

        // Depth reads as size and brightness, which is what sells the 3D shell.
        const depthScale = 1 + depth * 0.35;
        const scale = (1 + (scaleOnHover - 1) * energy) * depthScale;
        const alpha = Math.min(1, (baseAlpha + (1 - baseAlpha) * energy) * (0.75 + depth * 0.25));

        const r = base[0] + (active[0] - base[0]) * energy;
        const g = base[1] + (active[1] - base[1]) * energy;
        const b = base[2] + (active[2] - base[2]) * energy;

        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.1, dotSize * scale), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // One global clock: orbit speed is independent of pointer movement.
      clock += dt * orbitSpeed;
      draw();
      raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.inside = true;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.inside = false;
    };

    readColors();
    build();
    raf = requestAnimationFrame(frame);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);

    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(canvas);
    // ResizeObserver only delivers during rendering steps; window resize covers
    // the cases where it doesn't fire.
    window.addEventListener("resize", build);

    // Repaint the palette the moment the theme class flips.
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      resizeObserver.disconnect();
      window.removeEventListener("resize", build);
      themeObserver.disconnect();
    };
  }, [dotSize, spacing, orbiting, orbitSpeed, impactRadius, scaleOnHover, baseAlpha]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper-50">
      <canvas ref={canvasRef} className="dot-grid h-full w-full" aria-hidden />
      {/* Keeps type legible where the field runs behind content */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_0%,transparent_35%,rgb(var(--paper-50)/0.72)_100%)]" />
    </div>
  );
}
