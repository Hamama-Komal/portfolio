import { Outfit, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://hamama-komal.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hamama Komal — Flutter App Developer & AI Explorer",
  description:
    "Portfolio of Hamama Komal — Full-Time Flutter App Developer at Devlix Technologies and Part-Time AI Engineer & AI/ML Instructor at XOKSIS. Main quest: Mobile Development. Side quest: AI.",
  keywords: [
    "Hamama Komal",
    "Flutter Developer",
    "Mobile App Developer",
    "AI Engineer",
    "RAG",
    "LLM",
    "FastAPI",
    "Portfolio",
  ],
  authors: [{ name: "Hamama Komal" }],
  openGraph: {
    title: "Hamama Komal — Flutter App Developer & AI Explorer",
    description:
      "My main quest is Mobile Development. My side quest is AI.",
    url: siteUrl,
    siteName: "Hamama Komal",
    type: "website",
    images: [{ url: "/img/me-orange.webp", width: 1024, height: 1024, alt: "Hamama Komal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamama Komal — Flutter App Developer & AI Explorer",
    description: "My main quest is Mobile Development. My side quest is AI.",
    images: ["/img/me-orange.webp"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDFBF4" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
};

// Runs before paint so the stored theme is applied without a flash of the wrong one.
const themeScript = `(function(){try{var t=localStorage.getItem("hk-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
