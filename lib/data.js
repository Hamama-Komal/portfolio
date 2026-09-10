export const profile = {
  name: "Hamama Komal",
  role: "Flutter Developer",
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

export const experience = [
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
    role: "AI Engineer & AI/ML Instructor",
    type: "Part-time",
    period: "Jan 2026 — Present",
    current: true,
    summary:
      "Teach LLM fundamentals and RAG architecture, and build the AI features and automation pipelines that go with them. Explaining a system out loud keeps my own handover documents honest.",
    tags: ["LLMs", "RAG", "Python", "Teaching"],
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
 * Every published app in one list — the index renders all of them.
 *
 * `problem`/`solution` are optional. A row that has them expands into a case
 * study; a row that doesn't links straight to the store. Nothing is invented to
 * even the two out.
 */
export const work = [
  {
    title: "Hide Photos & Videos",
    category: "Privacy · Vault",
    shot: "/img/apps/hide-photos-1.webp",
    shots: [
      "/img/apps/hide-photos-1.webp",
      "/img/apps/hide-photos-2.webp",
      "/img/apps/hide-photos-3.webp",
    ],
    tagline: "A private vault that keeps personal photos and video behind a lock.",
    problem:
      "Handing someone your phone to show one photo exposes the whole gallery. Most vault apps either look untrustworthy or hide files in ways that corrupt the originals.",
    solution:
      "Selected media moves into private on-device storage, out of the system gallery, with the files left intact and recoverable. Nothing is uploaded and nothing is re-encoded.",
    stack: ["Flutter", "Android", "Local Storage"],
    link: "https://play.google.com/store/apps/details?id=com.photovault.photolocker.hidephotos.hidevideos.privatevault.gallerylock",
  },
  {
    title: "Voice Changer",
    category: "Audio · Effects",
    shot: "/img/apps/voice-changer-1.webp",
    shots: [
      "/img/apps/voice-changer-1.webp",
      "/img/apps/voice-changer-2.webp",
      "/img/apps/voice-changer-3.webp",
    ],
    tagline: "An on-device effects engine for reshaping a recording.",
    problem:
      "Voice effect apps usually make you record, wait on a server round-trip, then download the result — slow, and useless with no connection.",
    solution:
      "The whole pipeline runs on the handset. Record, apply an effect, hear it back immediately. The loop takes seconds and works with the phone in aeroplane mode.",
    stack: ["Flutter", "Audio Processing", "Android"],
    link: "https://play.google.com/store/apps/details?id=com.voicechanger.voiceeffects.audioeffects.appqubit",
  },
  {
    title: "Football Wallpapers",
    category: "Media · Gallery",
    shot: "/img/apps/football-wallpapers-1.webp",
    shots: [
      "/img/apps/football-wallpapers-1.webp",
      "/img/apps/football-wallpapers-2.webp",
      "/img/apps/football-wallpapers-3.webp",
    ],
    tagline: "High-resolution wallpapers, browsable without the stutter.",
    problem:
      "Wallpaper apps bury a small library under ads, and serving full-resolution files straight to the grid makes scrolling crawl on mid-range phones.",
    solution:
      "Compressed previews feed the grid so browsing stays smooth; the full-resolution file is fetched only at the moment a wallpaper is actually applied.",
    stack: ["Flutter", "Dart", "Image Caching"],
    link: "https://play.google.com/store/apps/details?id=com.football.wallpapers.ronaldo.messi.neymar.appqubit",
  },
  {
    title: "14 August Photo Editor",
    category: "Editor · Seasonal",
    shot: "/img/apps/14-august-photo-editor-1.webp",
    shots: [
      "/img/apps/14-august-photo-editor-1.webp",
      "/img/apps/14-august-photo-editor-2.webp",
      "/img/apps/14-august-photo-editor-3.webp",
    ],
    tagline: "Independence Day framing, three taps from photo to export.",
    problem:
      "Around 14 August everyone wants a themed profile picture, but general-purpose editors hide the few relevant frames behind menus most people never learn.",
    solution:
      "One purpose, one flow: pick a photo, choose a frame, export. No editing knowledge assumed, and no feature that isn't on that path.",
    stack: ["Flutter", "Dart", "Image Editing"],
    link: "https://play.google.com/store/apps/details?id=com.appqubit.independenceday.photoeditor",
  },
  {
    title: "AI Grammar Checker",
    category: "Writing · AI",
    org: "ETOS Way",
    shot: "/img/apps/grammar-1.webp",
    stack: ["Flutter", "REST APIs", "AI"],
    link: "https://play.google.com/store/apps/details?id=com.ai.grammar.checker.learnenglishgrammar.english",
  },
  {
    title: "Voice Notes",
    category: "Audio · Notes",
    org: "ETOS Way",
    shot: "/img/apps/voice-notes-1.webp",
    stack: ["Flutter", "Audio", "Local Storage"],
    link: "https://play.google.com/store/apps/details?id=com.voicenotescreator.notepadapp",
  },
  {
    title: "Status Saver",
    category: "Media · Utility",
    org: "ETOS Way",
    shot: "/img/apps/status-saver-1.webp",
    stack: ["Flutter", "File I/O", "Android"],
    link: "https://play.google.com/store/apps/details?id=com.ct.tatussaver.videodownloader.statusdownloader",
  },
  {
    title: "GPS Land Area Calculator",
    category: "Maps · Measurement",
    org: "ETOS Way",
    shot: "/img/apps/gps-area-1.webp",
    stack: ["Flutter", "Google Maps", "Geolocation"],
    link: "https://play.google.com/store/apps/details?id=com.land.area.landareacalculator.gps",
  },
  {
    title: "15 August Tiranga Frames",
    category: "Editor · Seasonal",
    org: "Devlix Technologies",
    shot: "/img/apps/tiranga-1.webp",
    stack: ["Flutter", "Image Editing"],
    link: "https://play.google.com/store/apps/details?id=com.appqubit.independenceday.frames.wallpapers",
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
    label: "Alongside",
    statement: "The AI half of the week — building the systems, then teaching them.",
    items: ["Python", "FastAPI", "LLMs", "RAG pipelines", "Prompt engineering"],
  },
];

/* ---- Derived figures ----------------------------------------------------
   Counting the source data means the page can never contradict itself the way
   three hardcoded app counts did.
------------------------------------------------------------------------- */

export const publishedCount = work.length;
export const caseStudyCount = work.filter((item) => item.problem).length;
export const employerCount = experience.length;

/** First year on record, read off the oldest role rather than typed twice. */
export const startYear =
  experience[experience.length - 1].period.match(/\d{4}/)?.[0] ?? "2024";

export const stats = [
  { value: String(publishedCount), label: "Apps on Google Play" },
  { value: String(employerCount), label: "Teams worked with" },
  { value: startYear, label: "Building since" },
];
