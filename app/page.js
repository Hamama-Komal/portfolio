import Cursor from "@/components/Cursor";
import SmoothAnchors from "@/components/SmoothAnchors";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import WorkIndex from "@/components/WorkIndex";
import Experience from "@/components/Experience";
import Capabilities from "@/components/Capabilities";
import Profile from "@/components/Profile";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Cursor />
      <SmoothAnchors />
      <NavBar />
      {/* `clip` not `hidden`: it contains the sideways travel of the entry
          animations without creating a scroll container, so sticky still works. */}
      <main className="relative overflow-x-clip">
        <Hero />
        <WorkIndex />
        <Experience />
        <Capabilities />
        <Profile />
        <Contact />
      </main>
    </>
  );
}
