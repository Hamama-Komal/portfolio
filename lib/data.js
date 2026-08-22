export const profile = {
  name: "Hamama Komal",
  role: "Flutter App Developer | AI Explorer | Software Developer",
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
    accent: "flame",
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
    accent: "moss",
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
    accent: "cream",
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
    accent: "moss",
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
    features: [
      "Interactive video Q&A — ask the AI anything about the content",
      "AI Quiz Generator to test what you actually learned",
      "Flashcard Generator that turns key concepts into revision cards",
    ],
    stack: ["Python", "FastAPI", "LLMs", "RAG", "Vector DBs"],
    accent: "flame",
    link: null,
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
    features: [
      "Curated high-resolution wallpaper library",
      "Fast image-based browsing experience",
      "Published and maintained on Google Play",
    ],
    stack: ["Flutter", "Dart", "Android"],
    accent: "moss",
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
    features: [
      "Themed frames, stickers and photo customization",
      "Smooth editing UI built in Flutter",
      "Published and maintained on Google Play",
    ],
    stack: ["Flutter", "Dart", "Image Editing"],
    accent: "cream",
    link: "https://play.google.com/store/apps/details?id=com.appqubit.independenceday.photoeditor",
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
    features: [
      "Real-time voice effects and audio processing",
      "Record, transform and share in a few taps",
      "Published and maintained on Google Play",
    ],
    stack: ["Flutter", "Audio", "Android"],
    accent: "flame",
    link: "https://play.google.com/store/apps/details?id=com.voicechanger.voiceeffects.audioeffects.appqubit",
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
    features: [
      "Photo and video vault with gallery lock",
      "Private, on-device storage flow",
      "Published and maintained on Google Play",
    ],
    stack: ["Flutter", "Android", "Security"],
    accent: "moss",
    link: "https://play.google.com/store/apps/details?id=com.photovault.photolocker.hidephotos.hidevideos.privatevault.gallerylock",
  },
];

export const stacks = [
  {
    title: "Mobile",
    icon: "smartphone",
    accent: "flame",
    blurb: "The main quest.",
    span: "lg:col-span-3",
    items: ["Flutter", "Dart", "Android", "Firebase", "GetX", "Provider", "Dependency Injection"],
  },
  {
    title: "AI / ML",
    icon: "brain",
    accent: "moss",
    blurb: "The side quest.",
    span: "lg:col-span-3",
    items: ["LLMs", "RAG", "LangChain", "LlamaIndex", "CrewAI", "LangGraph", "Vector DBs"],
  },
  {
    title: "Backend",
    icon: "server",
    accent: "cream",
    blurb: "Where the data lives.",
    span: "lg:col-span-2",
    items: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy"],
  },
  {
    title: "Development",
    icon: "gitBranch",
    accent: "moss",
    blurb: "How it ships.",
    span: "lg:col-span-4",
    items: ["Git", "Docker", "REST APIs", "Clean Architecture", "MVVM", "Async Programming"],
  },
];

/** Transparent chibi cut-outs used by the bubble game in the hobby section. */
export const animeChibis = Array.from({ length: 13 }, (_, i) => `/img/anime/${i + 1}.webp`);

export const accents = {
  flame: {
    text: "text-flame-400",
    ring: "ring-flame/40",
    border: "border-flame/35",
    glow: "shadow-[0_0_40px_-12px_rgba(235,125,0,0.8)]",
    from: "from-flame/25",
    dot: "bg-flame",
    grad: "from-flame to-flame-300",
    rgb: "235,125,0",
  },
  moss: {
    text: "text-moss-300",
    ring: "ring-moss-300/40",
    border: "border-moss-300/30",
    glow: "shadow-[0_0_40px_-12px_rgba(120,191,160,0.6)]",
    from: "from-moss-500/30",
    dot: "bg-moss-300",
    grad: "from-moss-600 to-moss-300",
    rgb: "120,191,160",
  },
  cream: {
    text: "text-cream",
    ring: "ring-cream/40",
    border: "border-cream/30",
    glow: "shadow-[0_0_40px_-12px_rgba(235,227,167,0.55)]",
    from: "from-cream/20",
    dot: "bg-cream",
    grad: "from-cream-deep to-cream",
    rgb: "235,227,167",
  },
};
