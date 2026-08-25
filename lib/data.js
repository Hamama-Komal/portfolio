export const profile = {
  name: "Hamama Komal",
  headline: "Flutter Developer — Building Smart Mobile Apps with AI",
  role: "Flutter Developer | AI Engineer & Instructor",
  location: "Bhakkar, Pakistan",
  status: "Open for Mobile & AI Projects",
  catchphrase: ["My main quest is Mobile Development.", "My side quest is AI."],
  phone: "+92 302 1976361",
  phoneHref: "tel:+923021976361",
  email: "Hamama.komal.00@gmail.com",
  linkedin: "https://www.linkedin.com/in/hamama-komal",
  github: "https://github.com/Hamama-Komal",
};

/** Résumé PDF in /public — swap the file, keep the name, and the buttons follow. */
export const CV_FILE = "/Hamama-Komal-CV.pdf";

export const marqueeItems = [
  { label: "Flutter", emoji: "💙" },
  { label: "Dart", emoji: "🎯" },
  { label: "Python", emoji: "🐍" },
  { label: "FastAPI", emoji: "⚡" },
  { label: "RAG", emoji: "📚" },
  { label: "LLMs", emoji: "🧠" },
  { label: "Firebase", emoji: "🔥" },
  { label: "GetX", emoji: "🌀" },
  { label: "Android", emoji: "🤖" },
  { label: "Vector DBs", emoji: "🧬" },
  { label: "Clean Architecture", emoji: "🧱" },
  { label: "Anime", emoji: "🌸" },
];

export const experience = [
  {
    company: "Devlix Technologies",
    role: "Full-Time Flutter App Developer",
    period: "June 2026 – Present",
    current: true,
    icon: "smartphone",
    accent: "azure",
    summary:
      "Shipping production mobile apps end to end — from product requirement to Play Store release.",
    points: [
      "Building and shipping production Flutter applications",
      "Clean architecture, state management and dependency injection",
      "REST API and service integration",
      "Responsive UI development and performance optimization",
    ],
    tags: ["Flutter", "Dart", "Clean Architecture", "REST APIs"],
  },
  {
    company: "XOKSIS",
    role: "Part-Time AI Engineer & AI/ML Instructor",
    period: "Jan 2026 – Present",
    current: true,
    icon: "brain",
    accent: "sky",
    summary:
      "Combining AI engineering with technical education — building AI systems and teaching how they work.",
    points: [
      "Teaching AI/ML concepts and LLM fundamentals",
      "Explaining RAG pipelines and modern AI architectures",
      "Building AI features, RAG systems and automation pipelines",
      "Guiding students through hands-on, job-oriented projects",
    ],
    tags: ["LLMs", "RAG", "Agents", "Teaching"],
  },
  {
    company: "ETOS Way",
    role: "Mobile Application Developer",
    period: "March 2025 – August 2025",
    current: false,
    icon: "layers",
    accent: "navy",
    summary:
      "Moved deeper into cross-platform development and delivered a stack of Flutter products.",
    points: [
      "Built 5+ Flutter applications with AI-powered features",
      "Firebase, REST APIs and GetX state management",
      "Clean architecture and reusable UI systems",
    ],
    tags: ["Flutter", "Firebase", "GetX", "AI Features"],
  },
  {
    company: "BISM Software House",
    role: "Android Developer",
    period: "June 2024 – September 2024",
    current: false,
    icon: "code",
    accent: "sky",
    summary:
      "Where the journey started — native Android development and solid engineering fundamentals.",
    points: [
      "Native Android app development",
      "Firebase, Room and Android Jetpack",
      "MVVM architecture and async programming",
    ],
    tags: ["Android", "Firebase", "MVVM", "Jetpack"],
  },
];

export const projects = [
  {
    title: "YouTube AI Learning Assistant",
    initials: "AI",
    kind: "Featured AI Project",
    featured: true,
    art: "youtube-ai",
    shots: [],
    tagline: "Turn any YouTube video into an interactive learning experience.",
    problem:
      "Watching a tutorial is passive. You finish a two-hour video with no way to check what actually stuck, and re-scrubbing the timeline to find one explanation wastes more time than the lesson saved.",
    solution:
      "A RAG pipeline that ingests a video's transcript into a vector store, then serves three ways to work with it: ask questions and get answers grounded in the content, generate a quiz to test recall, and turn key concepts into flashcards for revision.",
    features: [
      "Interactive Q&A grounded in the video transcript",
      "AI quiz generator to test what you actually learned",
      "Flashcard generator for spaced revision",
    ],
    stack: ["Python", "FastAPI", "LLMs", "RAG", "Vector DBs"],
    accent: "azure",
    link: null,
  },
  {
    title: "Hide Photos & Videos",
    initials: "HP",
    kind: "Published Mobile App",
    featured: false,
    shots: [
      "/img/apps/hide-photos-1.webp",
      "/img/apps/hide-photos-2.webp",
      "/img/apps/hide-photos-3.webp",
    ],
    tagline: "A private vault that keeps personal photos and videos behind a lock.",
    problem:
      "Handing someone your phone to show one photo exposes your whole gallery. Most vault apps either look untrustworthy or hide files in ways that break the originals.",
    solution:
      "A Flutter vault with a gallery lock that moves selected media into private on-device storage, keeping it out of the system gallery while leaving files intact and recoverable.",
    features: [
      "Photo and video vault with gallery lock",
      "Private, on-device storage — nothing leaves the phone",
      "Published and maintained on Google Play",
    ],
    stack: ["Flutter", "Android", "Local Storage"],
    accent: "navy",
    link: "https://play.google.com/store/apps/details?id=com.photovault.photolocker.hidephotos.hidevideos.privatevault.gallerylock",
  },
  {
    title: "Voice Changer",
    initials: "VC",
    kind: "Published Mobile App",
    featured: false,
    shots: [
      "/img/apps/voice-changer-1.webp",
      "/img/apps/voice-changer-2.webp",
      "/img/apps/voice-changer-3.webp",
    ],
    tagline: "An audio effects engine for real-time voice modification.",
    problem:
      "Voice effect apps usually make you record, wait for a server round-trip, then download the result — slow, and useless without a connection.",
    solution:
      "An on-device audio pipeline that applies effects to a recording and plays the result back immediately, so the record → transform → share loop takes seconds and works offline.",
    features: [
      "Real-time voice effects and audio processing",
      "Record, transform and share in a few taps",
      "Published and maintained on Google Play",
    ],
    stack: ["Flutter", "Audio Processing", "Android"],
    accent: "sky",
    link: "https://play.google.com/store/apps/details?id=com.voicechanger.voiceeffects.audioeffects.appqubit",
  },
  {
    title: "Football Wallpapers",
    initials: "FW",
    kind: "Published Mobile App",
    featured: false,
    shots: [
      "/img/apps/football-wallpapers-1.webp",
      "/img/apps/football-wallpapers-2.webp",
      "/img/apps/football-wallpapers-3.webp",
    ],
    tagline: "High-res wallpapers featuring football stars — Ronaldo, Messi, Neymar and more.",
    problem:
      "Wallpaper apps tend to bury a small library under ads, and full-resolution images make browsing crawl on mid-range phones.",
    solution:
      "A Flutter gallery that serves compressed previews for fast scrolling and fetches the full-resolution file only when a wallpaper is actually applied.",
    features: [
      "Curated high-resolution wallpaper library",
      "Fast, image-first browsing on mid-range hardware",
      "Published and maintained on Google Play",
    ],
    stack: ["Flutter", "Dart", "Image Caching"],
    accent: "azure",
    link: "https://play.google.com/store/apps/details?id=com.football.wallpapers.ronaldo.messi.neymar.appqubit",
  },
  {
    title: "14 August Photo Editor",
    initials: "14",
    kind: "Published Mobile App",
    featured: false,
    shots: [
      "/img/apps/14-august-photo-editor-1.webp",
      "/img/apps/14-august-photo-editor-2.webp",
      "/img/apps/14-august-photo-editor-3.webp",
    ],
    tagline: "Themed photo editing built around Pakistan's Independence Day.",
    problem:
      "Around 14 August everyone wants a themed profile picture, but general-purpose editors bury the few relevant frames under menus most people never learn.",
    solution:
      "A single-purpose editor: pick a photo, choose from Independence Day frames and stickers, adjust, export. The whole flow is three taps deep with no editing knowledge required.",
    features: [
      "Themed frames, stickers and photo customization",
      "Three-tap flow from photo to export",
      "Published and maintained on Google Play",
    ],
    stack: ["Flutter", "Dart", "Image Editing"],
    accent: "navy",
    link: "https://play.google.com/store/apps/details?id=com.appqubit.independenceday.photoeditor",
  },
];

export const stacks = [
  {
    title: "Mobile Development",
    icon: "smartphone",
    accent: "azure",
    blurb: "Where I spend most days.",
    span: "lg:col-span-3",
    items: [
      "Flutter & Dart",
      "Clean Architecture",
      "Provider",
      "GetX",
      "Dependency Injection",
      "Material Design",
      "Responsive UI",
    ],
  },
  {
    title: "AI & Teaching",
    icon: "brain",
    accent: "sky",
    blurb: "The side that keeps growing.",
    span: "lg:col-span-3",
    items: [
      "LLM Concepts",
      "Prompt Engineering",
      "RAG Pipelines",
      "Agentic AI",
      "Vector Databases",
      "AI Curriculum Design",
    ],
  },
  {
    title: "Architecture & Patterns",
    icon: "layers",
    accent: "navy",
    blurb: "How I keep code honest.",
    span: "lg:col-span-2",
    items: ["MVVM", "Repository Pattern", "SOLID Principles", "State Management"],
  },
  {
    title: "Backend & Integration",
    icon: "server",
    accent: "azure",
    blurb: "What the apps talk to.",
    span: "lg:col-span-2",
    items: ["Firebase", "REST APIs", "Python", "FastAPI", "PostgreSQL", "Auth"],
  },
  {
    title: "Tools",
    icon: "gitBranch",
    accent: "sky",
    blurb: "Daily drivers.",
    span: "lg:col-span-2",
    items: ["Git & GitHub", "Android Studio", "VS Code", "Docker", "Play Console"],
  },
];

/** Transparent chibi cut-outs used by the bubble game in the hobby section. */
export const animeChibis = Array.from({ length: 13 }, (_, i) => `/img/anime/${i + 1}.webp`);

export const accents = {
  azure: {
    text: "text-azure",
    ring: "ring-azure/40",
    border: "border-azure/35",
    glow: "shadow-[0_0_40px_-12px_rgba(51,82,127,0.55)]",
    from: "from-azure/25",
    dot: "bg-azure",
    grad: "from-azure to-azure-400",
    rgb: "51,82,127",
  },
  sky: {
    text: "text-sky-500",
    ring: "ring-sky-500/40",
    border: "border-sky-500/35",
    glow: "shadow-[0_0_40px_-12px_rgba(138,180,235,0.6)]",
    from: "from-sky-400/30",
    dot: "bg-sky-500",
    grad: "from-sky-500 to-sky-300",
    rgb: "108,148,210",
  },
  navy: {
    text: "text-ink-700",
    ring: "ring-ink-700/40",
    border: "border-ink-700/30",
    glow: "shadow-[0_0_40px_-12px_rgba(36,58,89,0.5)]",
    from: "from-ink-700/20",
    dot: "bg-ink-700",
    grad: "from-ink-700 to-ink-500",
    rgb: "36,58,89",
  },
};
