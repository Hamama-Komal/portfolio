export const profile = {
  name: "Hamama Komal",
  role: "Flutter Developer & Application Instructor",
  location: "Bhakkar, Pakistan",
  available: "Open to Flutter work",
  phone: "+92 302 1976361",
  phoneHref: "tel:+923021976361",
  email: "hamama.komal.00@gmail.com",
  linkedin: "https://www.linkedin.com/in/hamama-komal",
  github: "https://github.com/Hamama-Komal",
};

/** Résumé PDF in /public — swap the file, keep the name, and the buttons follow. */
export const CV_FILE = "/Hamama-Komal-CV.pdf";

/** The indie label. Client work ships under the employer's account; this one is mine. */
export const studio = {
  name: "HK Craft Labs",
  tagline: "My own Play Console account, for my own ideas.",
  description:
    "Everything else on this page was built to a brief. HK Craft Labs is the other half — my own developer account, where I pick the idea, design it, build it, release it and answer the reviews. Two apps are live so far, both written solo.",
  link: "https://play.google.com/store/apps/developer?id=HK+Craft+Labs",
};

export const experience = [
  {
    company: "HK Craft Labs",
    role: "Founder & Solo Developer",
    type: "Independent",
    period: "2026 — Present",
    current: true,
    summary:
      "My own studio and Play Console account. I pick the idea, design it, build it in Flutter, ship it and support it — no brief handed down, and nobody else to hand the bugs to.",
    tags: ["Flutter", "Product", "Play Console", "Solo"],
  },
  {
    company: "Devlix Technologies",
    role: "Flutter App Developer",
    type: "Full-time",
    period: "Jun 2026 — Present",
    current: true,
    summary:
      "Own Flutter apps end to end: requirement, build, release, then the maintenance that follows. Clean architecture, state management and dependency injection across the codebase.",
    tags: ["Flutter", "Dart", "Clean Architecture", "REST APIs"],
  },
  {
    company: "XOKSIS",
    role: "Flutter Developer & Application Instructor",
    type: "Part-time",
    period: "Jan 2026 — Present",
    current: true,
    summary:
      "Build Flutter applications, and teach them. As Application Instructor I take students from Dart fundamentals through state management and architecture to a real Play Store release — then go back to shipping on the same stack myself.",
    tags: ["Flutter", "Teaching", "Architecture", "Mentoring"],
  },
  {
    company: "ETOS Way",
    role: "Mobile Application Developer",
    type: "Contract",
    period: "Mar 2025 — Aug 2025",
    current: false,
    summary:
      "Delivered five Flutter apps in six months — grammar checking, voice notes, media saving and GPS area measurement — on Firebase, REST APIs and GetX.",
    tags: ["Flutter", "Firebase", "GetX", "AI Features"],
  },
  {
    company: "BISM Software House",
    role: "Android Developer",
    type: "Internship",
    period: "Jun 2024 — Sep 2024",
    current: false,
    summary:
      "Where it started. Native Android in Java — MVVM, Room, Jetpack and Firebase, and the asynchronous patterns everything since has been built on.",
    tags: ["Android", "Java", "MVVM", "Jetpack"],
  },
];

/**
 * Every published app, in one list.
 *
 * `featured` earns an app its screenshots: either the downloads to justify the
 * space, or an idea distinct enough to be worth looking at. Everything else is
 * still here with a line about what it does and a link to the store, because a
 * list that hides the ordinary work misrepresents what shipping looks like.
 *
 * `problem`/`solution` are optional, and nothing was invented to even them out.
 */
export const work = [
  /* ---- HK Craft Labs — my own account ---------------------------------- */
  {
    slug: "posely",
    title: "Posely: Pose Guide Camera",
    detail: "Puts a pose outline on the live camera so you can line yourself up before the shot.",
    category: "Camera · Guide",
    studio: true,
    featured: true,
    downloads: "10+",
    shots: ["/img/apps/posely-1.webp", "/img/apps/posely-2.webp", "/img/apps/posely-3.webp"],
    problem:
      "Posing for a photo is guesswork from inside the frame. You describe what you want, the other person angles the phone somewhere else, and you find out it did not work once you are already home.",
    solution:
      "A pose outline sits over the live camera feed at an opacity you control. Line yourself up against it and shoot — manual, timer or burst — with solo, couple and group poses, and a mirror mode for flipping a pose to the other side.",
    stack: ["Flutter", "Camera", "Custom Painting"],
    link: "https://play.google.com/store/apps/details?id=com.hkcraftlabs.posely",
  },
  {
    slug: "studydesk",
    title: "Study Desk",
    detail: "Pomodoro timer, notes, flashcards and a daily plan in one offline desk.",
    category: "Productivity · Offline",
    studio: true,
    featured: true,
    downloads: "50+",
    shots: [
      "/img/apps/studydesk-1.webp",
      "/img/apps/studydesk-2.webp",
      "/img/apps/studydesk-3.webp",
    ],
    problem:
      "A study session usually needs four apps — a timer, a notes app, a flashcard deck and a to-do list — and three of them want an account before they will hold anything.",
    solution:
      "One desk with all four, kept deliberately quiet: a focus timer with automatic breaks, notes, flashcards and the day's plan. Everything is stored on the device, so it works with no connection and asks for no sign-up.",
    stack: ["Flutter", "Local Storage", "Offline-first"],
    link: "https://play.google.com/store/apps/details?id=com.hkcraftlabs.studydesk",
  },

  /* ---- Client work — the highlights ------------------------------------ */
  {
    slug: "tiranga",
    title: "15 August Tiranga Photo Frames",
    detail: "Independence Day frames, flags and wallpapers — the widest reach of anything I have shipped.",
    category: "Editor · Seasonal",
    org: "Devlix Technologies",
    featured: true,
    downloads: "10K+",
    shots: ["/img/apps/tiranga-1.webp", "/img/apps/tiranga-2.webp", "/img/apps/tiranga-3.webp"],
    stack: ["Flutter", "Image Editing", "Asset Pipeline"],
    link: "https://play.google.com/store/apps/details?id=com.appqubit.independenceday.frames.wallpapers",
  },
  {
    slug: "14-august-photo-editor",
    title: "14 August Photo Frames",
    detail: "Independence Day frames and stickers, three taps from photo to export.",
    category: "Editor · Seasonal",
    featured: true,
    downloads: "1K+",
    shots: [
      "/img/apps/14-august-photo-editor-1.webp",
      "/img/apps/14-august-photo-editor-2.webp",
      "/img/apps/14-august-photo-editor-3.webp",
    ],
    problem:
      "Around 14 August everyone wants a themed profile picture, but general-purpose editors hide the few relevant frames behind menus most people never learn.",
    solution:
      "One purpose, one flow: pick a photo, choose a frame, export. No editing knowledge assumed, and no feature that is not on that path.",
    stack: ["Flutter", "Dart", "Image Editing"],
    link: "https://play.google.com/store/apps/details?id=com.appqubit.independenceday.photoeditor",
  },
  {
    slug: "football-wallpapers",
    title: "Football Wallpapers",
    detail: "A wallpaper library that stays fast by loading full resolution only on apply.",
    category: "Wallpapers · Gallery",
    featured: true,
    downloads: "1K+",
    shots: [
      "/img/apps/football-wallpapers-1.webp",
      "/img/apps/football-wallpapers-2.webp",
      "/img/apps/football-wallpapers-3.webp",
    ],
    problem:
      "Wallpaper apps bury a small library under ads, and serving full-resolution files straight to the grid makes scrolling crawl on mid-range phones.",
    solution:
      "Compressed previews feed the grid so browsing stays smooth; the full-resolution file is fetched only at the moment a wallpaper is actually applied.",
    stack: ["Flutter", "Dart", "Image Caching"],
    link: "https://play.google.com/store/apps/details?id=com.football.wallpapers.ronaldo.messi.neymar.appqubit",
  },
  {
    slug: "diwali-wallpapers",
    title: "Diwali Wallpapers: 4K & Live",
    detail: "4K and animated live wallpapers — diyas, rangoli, lanterns and fireworks.",
    category: "Wallpapers · Live",
    featured: true,
    downloads: "1K+",
    shots: [
      "/img/apps/diwali-wallpapers-1.webp",
      "/img/apps/diwali-wallpapers-2.webp",
      "/img/apps/diwali-wallpapers-3.webp",
    ],
    stack: ["Flutter", "Live Wallpaper", "Image Caching"],
    link: "https://play.google.com/store/apps/details?id=com.diwali.wallpapers.happydiwali.aq",
  },
  {
    slug: "voice-changer",
    title: "Voice Changer",
    detail: "Records, transforms and plays back audio entirely on the handset.",
    category: "Audio · Effects",
    featured: true,
    downloads: "500+",
    shots: [
      "/img/apps/voice-changer-1.webp",
      "/img/apps/voice-changer-2.webp",
      "/img/apps/voice-changer-3.webp",
    ],
    problem:
      "Voice effect apps usually make you record, wait on a server round-trip, then download the result — slow, and useless with no connection.",
    solution:
      "The whole pipeline runs on the handset. Record, apply an effect, hear it back immediately. The loop takes seconds and works with the phone in aeroplane mode.",
    stack: ["Flutter", "Audio Processing", "Android"],
    link: "https://play.google.com/store/apps/details?id=com.voicechanger.voiceeffects.audioeffects.appqubit",
  },
  {
    slug: "gps-area",
    title: "GPS Land Area Calculator",
    detail: "Measures land area on a map by walking the boundary or dropping points.",
    category: "Maps · Measurement",
    org: "ETOS Way",
    featured: true,
    downloads: "500+",
    rating: "4.4",
    shots: ["/img/apps/gps-area-1.webp", "/img/apps/gps-area-2.webp", "/img/apps/gps-area-3.webp"],
    stack: ["Flutter", "Google Maps", "Geolocation"],
    link: "https://play.google.com/store/apps/details?id=com.land.area.landareacalculator.gps",
  },
  {
    slug: "diwali-photo-frame",
    title: "Diwali Photo Frame Editor",
    detail: "Festive frames, stickers, wishes and greeting cards for Diwali.",
    category: "Editor · Seasonal",
    featured: true,
    downloads: "500+",
    shots: [
      "/img/apps/diwali-photo-frame-1.webp",
      "/img/apps/diwali-photo-frame-2.webp",
      "/img/apps/diwali-photo-frame-3.webp",
    ],
    stack: ["Flutter", "Image Editing", "Canvas"],
    link: "https://play.google.com/store/apps/details?id=com.happy.diwali.photoeditor.photoframe.aq.diwaliwallpaper",
  },
  {
    slug: "christmas-wallpaper",
    title: "Christmas Wallpaper",
    detail: "4K Christmas wallpapers and festive holiday backgrounds.",
    category: "Wallpapers · Seasonal",
    featured: true,
    downloads: "500+",
    shots: [
      "/img/apps/christmas-wallpaper-1.webp",
      "/img/apps/christmas-wallpaper-2.webp",
      "/img/apps/christmas-wallpaper-3.webp",
    ],
    stack: ["Flutter", "Image Caching", "Dart"],
    link: "https://play.google.com/store/apps/details?id=com.christmas.wallpaper.xmas.wallpaper.santa.wallpaper",
  },
  {
    slug: "ghost-detector",
    title: "Ghost Detector: Radar & Scan",
    detail: "Paranormal prank with a radar sweep, horror camera effects and scary stories.",
    category: "Prank · Sensors",
    featured: true,
    downloads: "100+",
    shots: [
      "/img/apps/ghost-detector-1.webp",
      "/img/apps/ghost-detector-2.webp",
      "/img/apps/ghost-detector-3.webp",
    ],
    problem:
      "A prank app only works if the illusion holds. Most ghost detectors give the game away immediately — a static graphic and a random number, nothing that reacts to the room you are standing in.",
    solution:
      "A radar sweep and a spectral camera driven by the device's own sensors, paced so a scan takes long enough to build tension before it reports anything. Labelled as entertainment, and still convincing for the ten seconds that matter.",
    stack: ["Flutter", "Sensors", "Camera", "Animation"],
    link: "https://play.google.com/store/apps/details?id=com.ghostdetector.ghostradar.ghosttracker.ghosthunter.ghostdetectorprank.aq",
  },
  {
    slug: "pop-color",
    title: "Pop Color: Coloring & Painting",
    detail: "Digital coloring book with anime, animal, cartoon and fantasy pages.",
    category: "Kids · Creative",
    featured: true,
    downloads: "100+",
    shots: [
      "/img/apps/pop-color-1.webp",
      "/img/apps/pop-color-2.webp",
      "/img/apps/pop-color-3.webp",
    ],
    stack: ["Flutter", "Canvas", "Flood Fill"],
    link: "https://play.google.com/store/apps/details?id=com.appqubit.kids.coloring.book.color.painting.coloring.learn",
  },
  {
    slug: "nails-art",
    title: "Nails Art — Nails Makeover",
    detail: "Virtual nail salon with shapes, colours, glitter and stickers.",
    category: "Game · Beauty",
    featured: true,
    downloads: "100+",
    shots: [
      "/img/apps/nails-art-1.webp",
      "/img/apps/nails-art-2.webp",
      "/img/apps/nails-art-3.webp",
    ],
    stack: ["Flutter", "Animation", "Layered Assets"],
    link: "https://play.google.com/store/apps/details?id=com.nailsalon.nailart.nailsmakeover.diy.makeovergame.aq",
  },
  {
    slug: "hide-photos",
    title: "Photo Vault: Lock & Hide",
    detail: "Locked on-device storage for photos and video, kept out of the gallery.",
    category: "Privacy · Vault",
    featured: true,
    downloads: "10+",
    shots: [
      "/img/apps/hide-photos-1.webp",
      "/img/apps/hide-photos-2.webp",
      "/img/apps/hide-photos-3.webp",
    ],
    problem:
      "Handing someone your phone to show one photo exposes the whole gallery. Most vault apps either look untrustworthy or hide files in ways that corrupt the originals.",
    solution:
      "Selected media moves into private on-device storage, out of the system gallery, with the files left intact and recoverable. Nothing is uploaded and nothing is re-encoded.",
    stack: ["Flutter", "Android", "Local Storage"],
    link: "https://play.google.com/store/apps/details?id=com.photovault.photolocker.hidephotos.hidevideos.privatevault.gallerylock",
  },

  /* ---- Client work — the rest ------------------------------------------ */
  {
    slug: "grammar",
    title: "AI Grammar Checker",
    detail: "Writing assistant that corrects grammar and explains the correction.",
    category: "Writing · AI",
    org: "ETOS Way",
    downloads: "100+",
    rating: "4.5",
    stack: ["Flutter", "REST APIs", "AI"],
    link: "https://play.google.com/store/apps/details?id=com.ai.grammar.checker.learnenglishgrammar.english",
  },
  {
    slug: "halloween-wallpaper",
    title: "Halloween Wallpaper: Live & HD",
    detail: "Animated and HD Halloween wallpapers, from cute pumpkins to haunted houses.",
    category: "Wallpapers · Live",
    downloads: "100+",
    stack: ["Flutter", "Live Wallpaper"],
    link: "https://play.google.com/store/apps/details?id=com.halloweenwallpapers.halloweenlive.wallpapers.aq",
  },
  {
    slug: "voice-notes",
    title: "Voice Notes",
    detail: "Voice diary and memo recorder, stored on the device.",
    category: "Audio · Notes",
    org: "ETOS Way",
    downloads: "100+",
    stack: ["Flutter", "Audio", "Local Storage"],
    link: "https://play.google.com/store/apps/details?id=com.voicenotescreator.notepadapp",
  },
  {
    slug: "gps-speedometer",
    title: "GPS Speedometer: Speed Tracker",
    detail: "Real-time speed, distance, trip time and odometer for any journey.",
    category: "Utility · GPS",
    downloads: "50+",
    rating: "4.5",
    stack: ["Flutter", "Geolocation", "Sensors"],
    link: "https://play.google.com/store/apps/details?id=com.gps.speedometer.odometer.aq",
  },
  {
    slug: "baby-photo-editor",
    title: "Baby Photo Editor",
    detail: "Baby photo frames, stickers and monthly milestone templates.",
    category: "Editor · Family",
    downloads: "50+",
    stack: ["Flutter", "Image Editing"],
    link: "https://play.google.com/store/apps/details?id=com.babyphotoeditor.babyphotoframe.babymonthlymilestonephotos.babypics.babystory.aq",
  },
  {
    slug: "christmas-photo-editor",
    title: "Christmas Photo Editor",
    detail: "Christmas photo frames, greeting cards, posters and wallpapers.",
    category: "Editor · Seasonal",
    downloads: "50+",
    stack: ["Flutter", "Image Editing"],
    link: "https://play.google.com/store/apps/details?id=com.christmas.photoeditor.frames.wallpapers.posters",
  },
  {
    slug: "status-saver",
    title: "Status Saver",
    detail: "Downloads and manages saved status media.",
    category: "Media · Utility",
    org: "ETOS Way",
    downloads: "50+",
    stack: ["Flutter", "File I/O", "Android"],
    link: "https://play.google.com/store/apps/details?id=com.ct.tatussaver.videodownloader.statusdownloader",
  },
  {
    slug: "lie-detector",
    title: "Lie Detector Test — Prank",
    detail: "Fingerprint-scanner prank that reveals funny truth-or-lie results.",
    category: "Prank · Sensors",
    downloads: "10+",
    rating: "4.9",
    stack: ["Flutter", "Animation", "Sensors"],
    link: "https://play.google.com/store/apps/details?id=com.lie.detector.test.aq",
  },
  {
    slug: "christmas-photo-frames",
    title: "Christmas Photo Frames Editor",
    detail: "Christmas frames, stickers, text and holiday greeting cards.",
    category: "Editor · Seasonal",
    downloads: "5+",
    stack: ["Flutter", "Image Editing"],
    link: "https://play.google.com/store/apps/details?id=com.christmas.photo.frames.editor.wallpapers.santa.wallpaper.aq",
  },
  {
    slug: "christmas-live-wallpaper",
    title: "Christmas Live Wallpaper 4K",
    detail: "Animated snowfall, twinkling lights and Santa live wallpapers.",
    category: "Wallpapers · Live",
    downloads: "1+",
    stack: ["Flutter", "Live Wallpaper"],
    link: "https://play.google.com/store/apps/details?id=com.christmaslivewallpaper.christmaswallpaper.xmas.wallpaper.santa.wallpaper.aq",
  },
];

export const capabilities = [
  {
    label: "Mobile",
    statement: "Flutter is the working day — building screens, cutting builds, watching them land.",
    items: [
      "Flutter",
      "Dart",
      "Android",
      "Material Design",
      "Responsive layout",
      "Animation",
      "Play Console releases",
    ],
  },
  {
    label: "Architecture",
    statement: "Structure picked so the app is still workable six months after release.",
    items: [
      "Clean Architecture",
      "MVVM",
      "Repository pattern",
      "Provider",
      "GetX",
      "Dependency injection",
    ],
  },
  {
    label: "Around the app",
    statement: "The services an app talks to, and the tooling that gets it out the door.",
    items: [
      "Firebase",
      "REST APIs",
      "Authentication",
      "Local storage",
      "Git & GitHub",
      "Android Studio",
    ],
  },
  {
    label: "Teaching",
    statement: "The instructor half of the week, and the AI work that runs alongside it.",
    items: ["Curriculum", "Code review", "Python", "LLMs", "RAG pipelines"],
  },
];

/* ---- Derived figures ----------------------------------------------------
   Counting the source data means the page can never contradict itself the way
   three hardcoded app counts did.
------------------------------------------------------------------------- */

export const studioApps = work.filter((item) => item.studio);
export const clientApps = work.filter((item) => !item.studio);
export const featuredClientApps = clientApps.filter((item) => item.featured);
export const indexedClientApps = clientApps.filter((item) => !item.featured);

export const publishedCount = work.length;
export const studioCount = studioApps.length;
export const caseStudyCount = work.filter((item) => item.problem).length;
export const employerCount = experience.filter((job) => job.type !== "Independent").length;

/** First year on record, read off the oldest role rather than typed twice. */
export const startYear = experience[experience.length - 1].period.match(/\d{4}/)?.[0] ?? "2024";

/** The headline figure, read off the data rather than typed: 10K+ beats 1K+ beats 500+. */
const downloadRank = (value = "") => {
  const match = value.match(/^([\d.]+)([KMB]?)/);
  if (!match) return 0;
  const multiplier = { "": 1, K: 1e3, M: 1e6, B: 1e9 }[match[2]] ?? 1;
  return Number(match[1]) * multiplier;
};

export const topDownloads = work.reduce(
  (best, item) => (downloadRank(item.downloads) > downloadRank(best) ? item.downloads : best),
  "0",
);

export const stats = [
  { value: String(publishedCount), label: "Apps on Google Play" },
  { value: topDownloads, label: "Downloads on the biggest" },
  { value: String(studioCount), label: "Under my own studio" },
];
