import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Connect } from "@/components/connect";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Connect />
      <Experience />
      <Education />
    </>
  );
}
