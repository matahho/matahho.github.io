import Nav from "@/components/ui/Nav";
import ScrollProgress from "@/components/ui/ScrollProgress";
import NeuralHero from "@/components/sections/NeuralHero";
import Research from "@/components/sections/Research";
import Work from "@/components/sections/Work";
import Fun from "@/components/sections/Fun";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="relative z-10">
        <NeuralHero />
        <Research />
        <Work />
        <Fun />
        <Contact />
      </main>
    </>
  );
}
