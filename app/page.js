import DotGridBackground from "@/components/DotGridBackground";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import LiquidCursor from "@/components/LiquidCursor";
import SmoothAnchors from "@/components/SmoothAnchors";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import AnimeSection from "@/components/AnimeSection";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <DotGridBackground />
      <LiquidCursor />
      <SmoothAnchors />
      <ScrollProgress />
      <NavBar />
      {/* `clip` not `hidden`: it contains the sideways travel of the entry
          animations without creating a scroll container, so sticky still works. */}
      <main className="relative overflow-x-clip">
        <Hero />
        <Intro />
        <Timeline />
        <Projects />
        <TechStack />
        <AnimeSection />
        <Contact />
      </main>
    </>
  );
}
