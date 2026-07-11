import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { ResumeModal } from "@/components/portfolio/ResumeModal";
import { ScrollReveal } from "@/components/lightswind/scroll-reveal";
import { useState } from "react";

const Index = () => {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Modal at root level — above every stacking context */}
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <CursorGlow />
      <Navbar onOpenResume={() => setResumeOpen(true)} />
      <main className="relative z-10 pb-28">
        <ScrollReveal baseRotation={0}>
          <Hero onOpenResume={() => setResumeOpen(true)} />
        </ScrollReveal>
        <ScrollReveal>
          <About />
        </ScrollReveal>
        <ScrollReveal>
          <Projects />
        </ScrollReveal>
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
