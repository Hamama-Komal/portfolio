"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, RotateCcw, Trophy } from "lucide-react";
import { animeChibis } from "@/lib/data";

const POOL = 14;
const ROUND_MS = 30000;
const COMBO_WINDOW = 900;
const BEST_KEY = "hk-bubble-best";

const rand = (min, max) => min + Math.random() * (max - min);
const pick = (arr) => arr[(Math.random() * arr.length) | 0];

/**
 * Chibi Bubble Pop.
 *
 * A pool of bubble nodes is rendered once and then moved by a single rAF loop that
 * writes transforms straight to the DOM — React state only tracks the score, timer
 * and phase, so nothing re-renders per frame.
 */
export default function BubbleGame() {
  const areaRef = useRef(null);
  const nodeRefs = useRef([]);
  const bubbles = useRef([]);
  const phaseRef = useRef("idle");
  const comboRef = useRef({ count: 0, at: 0 });

  const [phase, setPhase] = useState("idle");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [best, setBest] = useState(0);
  const [remaining, setRemaining] = useState(ROUND_MS);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(BEST_KEY) || 0);
    if (Number.isFinite(stored)) setBest(stored);
  }, []);

  /** Send a bubble back below the floor with fresh properties. */
  const respawn = useCallback((bubble, index, area, immediate = false) => {
    const small = area.width < 560;
    const size = small ? rand(52, 86) : rand(62, 116);
    bubble.size = size;
    bubble.x = rand(6, Math.max(8, area.width - size - 6));
    bubble.y = immediate
      ? rand(area.height * 0.15, area.height - size)
      : area.height + rand(20, area.height * 0.9);
    bubble.speed = rand(26, 58) * (small ? 0.85 : 1);
    bubble.drift = rand(6, 26);
    bubble.phase = rand(0, Math.PI * 2);
    bubble.wobble = rand(0.5, 1.3);
    bubble.dead = false;
    bubble.img = pick(animeChibis);

    const node = nodeRefs.current[index];
    if (!node) return;
    node.style.width = `${size}px`;
    node.style.height = `${size}px`;
    node.dataset.state = "alive";
    const img = node.querySelector("img");
    if (img) img.src = bubble.img;
  }, []);

  // Layout + animation loop
  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let box = { width: area.clientWidth, height: area.clientHeight };

    bubbles.current = Array.from({ length: POOL }, () => ({}));
    bubbles.current.forEach((bubble, i) => respawn(bubble, i, box, true));

    let raf = 0;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const playing = phaseRef.current === "playing";
      const rate = reduced ? 0.35 : playing ? 1 : 0.55;

      bubbles.current.forEach((bubble, i) => {
        const node = nodeRefs.current[i];
        if (!node) return;
        if (bubble.dead) return;

        bubble.y -= bubble.speed * rate * dt;
        bubble.phase += bubble.wobble * dt;

        if (bubble.y + bubble.size < -30) {
          respawn(bubble, i, box);
          return;
        }

        const x = bubble.x + Math.sin(bubble.phase) * bubble.drift;
        node.style.transform = `translate3d(${x}px, ${bubble.y}px, 0)`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      box = { width: area.clientWidth, height: area.clientHeight };
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [respawn]);

  // Round timer
  useEffect(() => {
    if (phase !== "playing") return;

    const startedAt = performance.now();
    const id = setInterval(() => {
      const left = ROUND_MS - (performance.now() - startedAt);
      if (left <= 0) {
        setRemaining(0);
        setPhase("over");
        setScore((final) => {
          setBest((current) => {
            if (final > current) {
              window.localStorage.setItem(BEST_KEY, String(final));
              return final;
            }
            return current;
          });
          return final;
        });
      } else {
        setRemaining(left);
      }
    }, 100);

    return () => clearInterval(id);
  }, [phase]);

  const start = () => {
    setScore(0);
    setCombo(0);
    comboRef.current = { count: 0, at: 0 };
    setRemaining(ROUND_MS);
    const box = {
      width: areaRef.current?.clientWidth || 0,
      height: areaRef.current?.clientHeight || 0,
    };
    bubbles.current.forEach((bubble, i) => respawn(bubble, i, box, true));
    setPhase("playing");
  };

  const pop = (index) => {
    if (phaseRef.current !== "playing") return;
    const bubble = bubbles.current[index];
    const node = nodeRefs.current[index];
    if (!bubble || bubble.dead || !node) return;

    bubble.dead = true;
    node.dataset.state = "popped";

    const now = performance.now();
    const streak = now - comboRef.current.at < COMBO_WINDOW ? comboRef.current.count + 1 : 1;
    comboRef.current = { count: streak, at: now };
    const points = 1 + Math.floor(streak / 4);

    setCombo(streak);
    setScore((value) => value + points);

    window.setTimeout(() => {
      const box = {
        width: areaRef.current?.clientWidth || 0,
        height: areaRef.current?.clientHeight || 0,
      };
      respawn(bubble, index, box);
    }, 320);
  };

  const seconds = Math.ceil(remaining / 1000);
  const progress = (remaining / ROUND_MS) * 100;

  return (
    <div className="relative">
      {/* Scoreboard */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-ink/10 bg-ink/[0.04] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
            Score <span className="ml-1.5 font-semibold text-ink">{score}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-ink/[0.04] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
            <Trophy className="h-3 w-3 text-azure-600" />
            {best}
          </span>
          <AnimatePresence>
            {combo > 2 && phase === "playing" ? (
              <motion.span
                key={combo}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-full border border-azure/40 bg-azure/15 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-azure-600"
              >
                {combo}× streak
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>

        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
          {phase === "playing" ? `${seconds}s left` : "30s round"}
        </span>
      </div>

      {/* Timer bar */}
      <div className="mb-3 h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-azure to-sky-600 transition-[width] duration-100 ease-linear"
          style={{ width: `${phase === "playing" ? progress : 100}%` }}
        />
      </div>

      {/* Play area */}
      <div
        ref={areaRef}
        className="relative h-[24rem] w-full overflow-hidden rounded-[1.75rem] border border-ink/10 bg-paper-100/80 sm:h-[30rem]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_100%,rgba(44,87,69,0.35),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_20%_0%,rgba(235,125,0,0.16),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />

        {Array.from({ length: POOL }).map((_, i) => (
          <button
            key={i}
            type="button"
            ref={(node) => {
              nodeRefs.current[i] = node;
            }}
            onPointerDown={() => pop(i)}
            data-state="alive"
            data-cursor="pop"
            aria-hidden
            tabIndex={-1}
            className="bubble absolute left-0 top-0 will-change-transform"
          >
            <span className="bubble-skin">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" aria-hidden draggable={false} className="bubble-img" />
              <span className="bubble-shine" />
            </span>
            <span className="bubble-burst" />
          </button>
        ))}

        {/* Overlays — the backdrop never takes pointer events, so bubbles stay live
            the moment it starts fading out */}
        <AnimatePresence>
          {phase !== "playing" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-paper-50/70 backdrop-blur-[3px]"
            >
              {phase === "over" ? (
                <>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50">
                    Time!
                  </p>
                  <p className="font-display text-5xl font-semibold text-ink">{score}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-azure-600">
                    {score >= best && score > 0 ? "new best" : `best ${best}`}
                  </p>
                </>
              ) : (
                <p className="max-w-xs px-6 text-center text-sm text-ink/60">
                  Pop the chibis before the timer runs out. Chain them fast for a streak.
                </p>
              )}

              <button
                type="button"
                onClick={start}
                data-cursor={phase === "over" ? "again" : "start"}
                className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper-50 transition-transform duration-300 hover:scale-[1.04] active:scale-95"
              >
                {phase === "over" ? (
                  <RotateCcw className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {phase === "over" ? "Play again" : "Start popping"}
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
