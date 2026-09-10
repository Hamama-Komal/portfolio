"use client";

import { useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Download } from "lucide-react";
import Reveal from "./Reveal";
import { profile, CV_FILE } from "@/lib/data";

const channels = [
  { label: "LinkedIn", value: "hamama-komal", href: profile.linkedin, external: true },
  { label: "GitHub", value: "Hamama-Komal", href: profile.github, external: true },
  { label: "Phone", value: profile.phone, href: profile.phoneHref, external: false },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        // http:// or an older browser — the hidden textarea still works there.
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
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer id="contact" className="band pb-10">
      <div className="shell">
        <div className="flex items-baseline justify-between gap-6">
          <span className="meta">
            <span className="text-accent-ink">05</span>
            <span className="px-2 text-ink-faint">/</span>
            Contact
          </span>
          <span className="meta hidden sm:inline">{profile.location}</span>
        </div>

        <Reveal className="mt-8 lg:mt-10">
          <h2 className="balance max-w-3xl font-display text-[2.5rem] leading-[1.05] tracking-tightest text-ink sm:text-5xl lg:text-[3.75rem]">
            Available for Flutter work — say what you are building.
          </h2>
        </Reveal>

        {/* The email is the whole call to action, so it gets the display size */}
        <Reveal delay={0.06} className="mt-10 lg:mt-12">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex min-w-0 items-baseline gap-3 font-display text-[1.4rem] leading-tight tracking-tight text-ink transition-colors duration-200 hover:text-accent-ink sm:text-[2rem]"
            >
              <span className="truncate underline decoration-rule decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-accent-ink">
                {profile.email}
              </span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-rule px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint transition-colors duration-200 hover:border-ink/40 hover:text-ink"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-accent-ink" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </Reveal>

        {/* Everything else, as a plain index */}
        <div className="mt-12 border-t border-rule lg:mt-14">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-5 border-b border-rule py-4 transition-colors duration-200"
            >
              <span className="meta w-24 shrink-0 transition-colors duration-200 group-hover:text-accent-ink">
                {channel.label}
              </span>
              <span className="min-w-0 flex-1 truncate text-[15px] text-ink transition-colors duration-200 group-hover:text-accent-ink">
                {channel.value}
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink" />
            </a>
          ))}

          <a
            href={CV_FILE}
            download
            className="group flex items-center gap-5 border-b border-rule py-4 transition-colors duration-200"
          >
            <span className="meta w-24 shrink-0 transition-colors duration-200 group-hover:text-accent-ink">
              CV
            </span>
            <span className="min-w-0 flex-1 truncate text-[15px] text-ink transition-colors duration-200 group-hover:text-accent-ink">
              Hamama-Komal-CV.pdf
            </span>
            <Download className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-y-0.5 group-hover:text-accent-ink" />
          </a>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="meta normal-case tracking-[0.06em]">
            © {new Date().getFullYear()} {profile.name} · Designed and built in Next.js, Tailwind
            and Framer Motion
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint transition-colors duration-200 hover:text-ink"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
