"use client";

import { motion } from "framer-motion";

/**
 * Stand-in artwork for the YouTube AI Learning Assistant, which has no store
 * screenshots: a stylised phone UI showing the video → Q&A → quiz → flashcard flow.
 */
export default function AiProjectArt() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-paper-100">
      {/* Warm depth */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(235,125,0,0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_20%_100%,rgba(44,87,69,0.18),transparent_70%)]" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative flex h-full flex-col gap-3 p-4">
        {/* Video card with play glyph */}
        <div className="relative overflow-hidden rounded-xl border border-ink/15 bg-paper-50/70">
          <div className="aspect-video w-full bg-[linear-gradient(135deg,rgba(235,125,0,0.45),rgba(44,87,69,0.55))]" />
          <motion.span
            className="absolute inset-0 m-auto flex h-9 w-9 items-center justify-center rounded-full bg-ink"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-paper-50" />
          </motion.span>
          <div className="absolute bottom-2 left-2 right-2 h-1 rounded-full bg-ink/20">
            <motion.span
              className="block h-full rounded-full bg-azure"
              animate={{ width: ["12%", "78%", "12%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Chat bubbles */}
        <div className="space-y-2">
          <div className="ml-auto w-3/4 rounded-2xl rounded-br-sm border border-ink/10 bg-ink/[0.07] px-3 py-2">
            <span className="block h-1.5 w-full rounded-full bg-ink/35" />
            <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-ink/20" />
          </div>
          <div className="w-5/6 rounded-2xl rounded-bl-sm border border-azure/25 bg-azure/[0.12] px-3 py-2">
            <span className="block h-1.5 w-full rounded-full bg-azure/60" />
            <span className="mt-1.5 block h-1.5 w-4/5 rounded-full bg-azure/35" />
            <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-azure/25" />
          </div>
        </div>

        {/* Quiz + flashcard tiles */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <motion.div
            className="rounded-xl border border-sky-600/25 bg-sky-600/10 p-2.5"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-sky-600">
              Quiz
            </span>
            <span className="mt-1.5 block h-1 w-full rounded-full bg-sky-600/40" />
            <span className="mt-1 block h-1 w-3/4 rounded-full bg-sky-600/25" />
          </motion.div>
          <motion.div
            className="rounded-xl border border-ink/20 bg-ink/[0.07] p-2.5"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/70">
              Flashcards
            </span>
            <span className="mt-1.5 block h-1 w-full rounded-full bg-ink/35" />
            <span className="mt-1 block h-1 w-2/3 rounded-full bg-ink/20" />
          </motion.div>
        </div>

        <p className="text-center font-mono text-[8px] uppercase tracking-[0.2em] text-ink/35">
          concept artwork
        </p>
      </div>
    </div>
  );
}
