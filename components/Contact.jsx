"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Check,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { profile, CV_FILE } from "@/lib/data";

const socials = [
  {
    label: "Phone",
    value: profile.phone,
    href: profile.phoneHref,
    icon: Phone,
    color: "hover:border-sky-600/50 hover:text-sky-600 hover:shadow-[0_0_28px_-8px_rgba(52,211,153,0.8)]",
    iconColor: "text-sky-600",
  },
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    color: "hover:border-azure/50 hover:text-azure-600 hover:shadow-[0_0_28px_-8px_rgba(139,92,246,0.9)]",
    iconColor: "text-azure-600",
  },
  {
    label: "LinkedIn",
    value: "hamama-komal",
    href: profile.linkedin,
    icon: Linkedin,
    color: "hover:border-sky-400/50 hover:text-sky-600 hover:shadow-[0_0_28px_-8px_rgba(56,189,248,0.9)]",
    iconColor: "text-sky-600",
    external: true,
  },
  {
    label: "GitHub",
    value: "Hamama-Komal",
    href: profile.github,
    icon: Github,
    color: "hover:border-ink/50 hover:text-ink hover:shadow-[0_0_28px_-8px_rgba(255,255,255,0.6)]",
    iconColor: "text-ink",
    external: true,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        const area = document.createElement("textarea");
        area.value = profile.email;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        document.body.removeChild(area);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer id="contact" className="relative scroll-mt-24 overflow-hidden pb-12 pt-24 sm:pt-28">
      <div className="section">
        <Reveal from="up">
          <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-gradient-to-b from-ink/[0.06] to-ink/[0.02] p-8 text-center backdrop-blur-2xl sm:p-14">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-azure/20 blur-[100px]" />
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000,transparent)]" />

            <span className="eyebrow relative">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
              Contact
            </span>

            <h2 className="relative mt-5 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Let&apos;s build <span className="text-gradient">something</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-base">
              Mobile development, AI, or something completely experimental — if it makes me stop and
              think &ldquo;okay… how can I build this?&rdquo;, I&apos;m probably interested.
            </p>

            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className={`group flex items-center gap-2.5 rounded-full border border-ink/12 bg-ink/[0.04] px-5 py-3 text-sm font-medium text-ink/80 backdrop-blur-md transition-all duration-300 ${social.color}`}
                  >
                    <Icon className={`h-4 w-4 ${social.iconColor}`} />
                    <span className="hidden sm:inline">{social.value}</span>
                    <span className="sm:hidden">{social.label}</span>
                  </motion.a>
                );
              })}
            </div>

            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
              <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={copyEmail}
                data-cursor="copy"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-azure to-sky-400 px-6 py-3.5 text-sm font-bold text-paper-50 transition-transform duration-300 hover:scale-[1.03] active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-ink/30 transition-transform duration-700 group-hover:translate-x-full" />
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="relative flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Copied to Clipboard!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="relative flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Email
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              </Magnetic>

              <a
                href={CV_FILE}
                download
                data-cursor="download"
                className="group inline-flex items-center gap-2.5 rounded-2xl border border-ink/15 bg-paper-50/60 px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-azure/50 hover:text-azure-700"
              >
                <Download className="h-4 w-4 text-azure transition-transform duration-300 group-hover:translate-y-0.5" />
                Download CV
              </a>
            </div>

            <AnimatePresence>
              {copied ? (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="relative mt-3 font-mono text-xs text-sky-600"
                >
                  {profile.email}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-ink/45">
            © {new Date().getFullYear()} Hamama Komal — Flutter App Developer &amp; AI Explorer.
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.04] px-4 py-2.5 text-xs text-ink/60 transition-colors hover:border-azure/40 hover:text-ink"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
