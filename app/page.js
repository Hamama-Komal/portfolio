import DotGridBackground from "@/components/DotGridBackground";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothAnchors from "@/components/SmoothAnchors";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <DotGridBackground />
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
        <Contact />
      </main>
    </>
  );
}
