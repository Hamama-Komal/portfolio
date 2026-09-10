import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { profile } from "@/lib/data";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// A serif for the display sizes only. Against the grotesk body and the mono
// metadata it does most of the work of making the page look set rather than
// generated.
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://hamama-komal.vercel.app";
const title = "Hamama Komal — Flutter Developer";
const description =
  "Flutter developer in Bhakkar, Pakistan. Nine Android apps live on Google Play, built end to end on clean architecture with Provider, GetX and Firebase.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Hamama Komal",
  },
  description,
  keywords: [
    "Hamama Komal",
    "Flutter Developer",
    "Mobile App Developer",
    "Android Developer",
    "Bhakkar",
    "Pakistan",
    "Clean Architecture",
    "Dart",
    "Firebase",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: profile.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0d" },
  ],
};

// Runs before paint so the stored theme is applied without a flash of the wrong one.
const themeScript = `(function(){try{var t=localStorage.getItem("hk-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;

/** Structured data: lets a recruiter's search result show the real role and links. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Bhakkar", addressCountry: "PK" },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: ["Flutter", "Dart", "Android", "Clean Architecture", "Firebase"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
