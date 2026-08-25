# Hamama Komal — Portfolio

An interactive, animated portfolio — warm paper by day, black-and-amber by night — built with **Next.js 15 (App Router)**, **Tailwind CSS**, **Framer Motion** and **Lucide React**. Ready to deploy on Vercel with zero configuration.

## Sections

| # | Section | Highlights |
|---|---------|-----------|
| 1 | Hero | Gradient name, "Open for Mobile & AI Projects" status line, large frameless portrait (orange backdrop) feathered into the page with a cursor **spotlight reveal** — the anime layer clips away to uncover the real photo — plus magnetic CTA buttons |
| 2 | Intro | Glass bio card + dual-role cards, infinite dual-row tech ticker that pauses on hover |
| 3 | Experience | Expanded-card accordion — hover a chapter and it grows (horizontally on desktop, vertically on mobile) to reveal the role, dates, focus points and a chapter marker |
| 4 | Projects | Sticky stacking deck — each card pins a little lower than the last so the next slides over it. Every card states the **problem**, the **solution**, the stack and a live Play Store link, alongside a 3D fan of app screenshots |
| 5 | Skills | Bento grid grouped into Mobile, AI & Teaching, Architecture, Backend and Tools, with a pointer-tracking spotlight per card |
| 6 | A Little About Me | **Chibi Bubble Pop** — a 30-second game: transparent anime cut-outs float up inside glass bubbles, pop them for points, chain them fast for a streak multiplier. Best score is kept in `localStorage`. |
| 7 | Contact | Social pill buttons + a magnetic "Copy Email" button that flashes *Copied to Clipboard!* |

## Site-wide interactions

- **Smooth liquid cursor** — a gooey SVG-filtered blob tail on one rAF loop, with contextual labels via `data-cursor="…"` on any element. Fine-pointer devices only.
- **Sticky dot navbar** — one dot per section; the active dot grows into a labelled pill that slides between positions.
- **Custom smooth scrolling** — a single easing curve for every in-page anchor, cancelled the moment you touch the wheel.
- **3D parallax background** — grid planes in perspective that drift with the pointer and the scroll position.

## Theming

Both themes run off the same class names. Every Tailwind colour resolves to a CSS variable
(`rgb(var(--ink) / <alpha-value>)`), so adding `.dark` to `<html>` repaints the entire site —
no `dark:` variants scattered through the components. Tokens live at the top of
[`app/globals.css`](app/globals.css); the toggle sits at the right end of the navbar.

The choice is stored in `localStorage` under `hk-theme` and applied by a small inline script
in [`app/layout.js`](app/layout.js) before first paint, so there is no flash of the wrong theme.
With nothing stored, the site follows the visitor's system preference.

| Token | Light | Dark | Used for |
|-------|-------|------|----------|
| `paper-50` → `paper-300` | `#FFFFFF` → `#b3d2ff` | `#0B121E` → `#243a59` | Page base and every surface |
| `ink` | `#243a59` | `#d9e9ff` | All type; opacity steps (`text-ink/70`, `/45`) give the hierarchy |
| `azure` | `#33527f` | `#b3d2ff` | Primary accent — CTAs, highlights, links |
| `sky-500` | `#5A82BE` | `#b3d2ff` | Secondary accent — section labels, AI sections |

The four source swatches (`#243a59`, `#33527f`, `#b3d2ff`, `#d9e9ff`) swap roles between themes:
deep navies carry type on light and become surfaces on dark, while the pale blues do the reverse.
The liquid cursor switches from `multiply` to `screen` blending so it stays visible on either ground.

Type: **Inter** for body, **Outfit** for headings, **JetBrains Mono** for labels and metadata.

## Local development

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000

```bash
npm run build
```

## Project structure

```
app/
  layout.js        Fonts, metadata, motion provider
  page.js          Section composition
  globals.css      Tailwind layers, glass/gradient utilities
components/        One file per section + shared Reveal/SectionHeading
lib/
  data.js          ALL content lives here — edit this to update the site
  icons.js         Lucide icon map
public/img/        me.png (real photo) and anime.jpg (anime avatar)
public/img/apps/   app screenshots (see below)
```

To change any text, job, project or tech badge, edit [`lib/data.js`](lib/data.js) — no component changes needed.

## App screenshots

Three screenshots per published app live in `public/img/apps/` (pulled from the Play Store listings and re-encoded to ~25–60 KB WebP each). Each project's `shots` array in `lib/data.js` drives the 3D phone fan; a missing file falls back to a tinted placeholder rather than a broken image.

The YouTube AI Learning Assistant has no store listing, so it renders `components/AiProjectArt.jsx` — a hand-built animated mock of the video → Q&A → quiz → flashcard flow. Swap in a real image by adding a path to its `shots` array.

Bubble-game chibis live in `public/img/anime/` as trimmed, transparent WebP (13 files, ~15 KB each), generated from `assets/anime/`. The count is read from `animeChibis` in `lib/data.js` — add files as `14.webp`, `15.webp`, … and bump the length there.

## CV

The **Download CV** buttons in the hero and the contact block point at `CV_FILE` in [`lib/data.js`](lib/data.js) → `public/Hamama-Komal-CV.pdf`.

That PDF is generated from the site's own content by [`scripts/generate-cv.py`](scripts/generate-cv.py) (PyMuPDF, one A4 page, matches the site palette):

```bash
python scripts/generate-cv.py
```

To use your own résumé instead, just drop it in `public/` and point `CV_FILE` at it.

## Deploy to Vercel

### Option A — GitHub (recommended)

1. Create a repo and push:

```bash
git init && git add -A && git commit -m "Portfolio site" && git branch -M main
```

2. Add your remote and push:

```bash
git remote add origin https://github.com/Hamama-Komal/portfolio.git && git push -u origin main
```

3. Go to [vercel.com/new](https://vercel.com/new), import the repo, and click **Deploy**. Framework preset is detected as Next.js — no settings to change, no environment variables needed.

### Option B — Vercel CLI

```bash
npx vercel --prod
```

Sign in when prompted, accept the defaults, and the site goes live.

After the first deploy, update `siteUrl` in [`app/layout.js`](app/layout.js) to your real domain so the Open Graph/Twitter preview cards point at the right place.

## Notes

- Fully responsive: 375px phones through wide desktops; no horizontal scroll (`overflow-x: clip` keeps `position: sticky` working).
- Respects `prefers-reduced-motion` — animations are disabled for users who ask for it.
- Images are served through `next/image` (automatic AVIF/WebP + sizing on Vercel).
