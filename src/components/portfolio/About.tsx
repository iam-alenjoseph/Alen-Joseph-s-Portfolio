import { motion } from "framer-motion";
import { GraduationCap, Code2, Terminal, Settings, FileText, Briefcase } from "lucide-react";
import { CountUp } from "../lightswind/count-up";
import GlassFolder from "../lightswind/glass-folder";

const techStack = [
  "Python", "Java", "C++", "C", "JavaScript", "TypeScript",
  "React", "Tailwind CSS", "Framer Motion", "Vite", "Git", "GitHub",
  "Data Structures", "Algorithms"
];

export const About = () => {
  return (
    <section id="toolkit" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
            01 Toolkit & Feature Grid
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 leading-tight tracking-tight">
            Designed for <span className="font-serif-italic font-normal text-gradient">speed</span>. Built on structure.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">

          {/* Card 1: Profile Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 glass rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 justify-between items-center border border-border/40 relative overflow-hidden group min-h-[320px]"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-2xl rounded-full pointer-events-none" />

            <div className="flex-1 flex flex-col justify-between h-full text-left">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Terminal className="h-5 w-5 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Profile</span>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground max-w-md">
                  <p>
                    Hi, I'm <span className="text-foreground font-medium">Alen Joseph</span>. I'm a developer currently pursuing my Bachelor of Computer Applications.
                  </p>
                  <p>
                    I specialize in building fast, scalable, and beautifully designed web applications. I believe that strong fundamentals in algorithms and data structures are just as important as the visual interfaces that users interact with.
                  </p>
                  <p className="text-foreground font-medium italic">
                    "Good code doesn't announce itself. It just works."
                  </p>
                </div>
              </div>
              <div className="mt-8 font-mono text-[10px] text-muted-foreground/60 italic">
                Alen Joseph, Developer Portfolio, 2026
              </div>
            </div>

            {/* Portrait */}
            <div className="w-full md:w-44 h-44 rounded-2xl overflow-hidden shadow-lg border border-border/40 relative shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}alen.jpg`}
                alt="Alen Joseph"
                className="w-full h-full object-cover object-center transition-all duration-500 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Card 2: Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-[2rem] p-8 flex flex-col justify-between border border-border/40 min-h-[300px]"
          >
            <div className="flex items-center gap-2 mb-6">
              <Settings className="h-5 w-5 text-primary" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Metrics</span>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex items-baseline gap-2">
                  <CountUp value={7} className="font-display font-extrabold text-5xl tracking-tight text-foreground" />
                  <span className="text-muted-foreground font-mono text-sm">Languages</span>
                </div>
                <div className="h-px w-full bg-border/40 mt-3" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <CountUp value={15} className="font-display font-extrabold text-5xl tracking-tight text-foreground" />
                  <span className="text-muted-foreground font-mono text-sm">Git Repositories</span>
                </div>
                <div className="h-px w-full bg-border/40 mt-3" />
              </div>
              <div className="flex items-baseline gap-2">
                <CountUp value={2024} className="font-display font-extrabold text-4xl tracking-tight text-foreground" decimals={0} separator="" />
                <span className="text-muted-foreground font-mono text-sm">BCA Batch</span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest mt-4">
              Live statistics
            </div>
          </motion.div>

          {/* Card 3: Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-[2rem] p-8 flex flex-col justify-between border border-border/40 min-h-[300px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Education</span>
              </div>
              <h3 className="font-display font-bold text-xl text-foreground">
                Bachelor of Computer Applications
              </h3>
              <p className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-wide">
                Noorul Islam Centre for Higher Education
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                2024 – Present
              </p>
            </div>
            <div className="flex justify-center items-center py-4">
              <GlassFolder
                icon={<GraduationCap className="h-10 w-10 text-primary" />}
                className="scale-100 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>

          {/* Card 4: Technologies — dot-separated list style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 glass rounded-[2rem] p-8 md:p-10 flex flex-col justify-between border border-border/40 min-h-[300px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Code2 className="h-5 w-5 text-primary" />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Technologies</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-5">
                Languages, libraries and tools
              </h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                {techStack.join(" · ")}
              </p>
            </div>
          </motion.div>

          {/* Card 5: Internship */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-3 glass rounded-[2rem] p-8 md:p-10 flex flex-col justify-between border border-border/40 min-h-[160px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="h-5 w-5 text-primary" />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Experience</span>
              </div>
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-center">
                <div className="flex-1">
                  <h3 className="font-display font-bold text-2xl text-foreground">
                    VisionX IT Services
                  </h3>
                  <p className="text-sm font-mono text-primary mt-2 uppercase tracking-wide">
                    Full Stack Web Dev Intern
                  </p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-2xl">
                    A brief 15-day stint exploring practical full-stack web development and contributing to real-world projects.
                  </p>
                </div>
                <div className="md:text-right shrink-0 mt-4 md:mt-0">
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-mono mb-2">
                    Completed
                  </div>
                  <p className="text-xs text-muted-foreground/60">
                    June 2026
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
