import Background from "@/components/Background";
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
      <Background />
      <LiquidCursor />
      <SmoothAnchors />
      <ScrollProgress />
      <NavBar />
      <main className="relative">
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
