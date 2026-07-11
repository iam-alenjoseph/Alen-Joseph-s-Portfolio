import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, Terminal, Globe, Code, FileText, Film } from "lucide-react";
import TerminalCard from "../lightswind/terminal-card";
import InteractiveRefactorCard from "./InteractiveRefactorCard";

const projects = [
  {
    index: "01",
    title: "Modern CV Builder",
    tag: "Resume Tooling",
    date: "JUN 2026",
    icon: FileText,
    desc: "A live-preview editor. Every field updates instantly. No reload. No server round-trip. A print-ready resume, straight from the browser.",
    stack: ["React", "TypeScript", "Live Preview"],
    type: "visual",
    imageUrl: "/cvbuilder_1.png",
    aspect: "1024/358",
  },
  {
    index: "02",
    title: "STREAMIX",
    tag: "Media Interfaces",
    date: "2025",
    icon: Film,
    desc: "A front-end prototype for a media streaming platform. Built the full browsing and playback interface. Component architecture, done properly.",
    stack: ["JavaScript", "Component Architecture"],
    type: "visual",
    imageUrl: "/portfolio_mockup.png",
    images: ["/streamix_1.jpg", "/streamix_2.jpg", "/streamix_3.jpg", "/streamix_4.jpg", "/streamix_5.jpg", "/streamix_6.jpg"],
    links: [
      { label: "Streamix Live", url: "https://iam-alenjoseph.github.io/streamix1/" },
      { label: "Weather App Live", url: "https://iam-alenjoseph.github.io/weather/" },
    ],
  },
  {
    index: "03",
    title: "Biodata Maker",
    tag: "Document Generation",
    date: "2025",
    icon: Globe,
    desc: "Structured input in. A fully formatted biodata document out. Seconds, not minutes.",
    stack: ["HTML", "Form Logic"],
    type: "visual",
    imageUrl: "/biodatamaker_1.png",
    aspect: "1024/458",
  },
  {
    index: "04",
    title: "Algorithm Practice Suite",
    tag: "Problem Solving",
    date: "MAY 2026",
    icon: Terminal,
    desc: "Problems solved in Python and Java. Arrays. Recursion. The fundamentals, revisited often.",
    stack: ["Python", "Java", "C++", "C"],
    type: "code",
    codeLanguage: "python",
    command: `# Binary Search in Python
def binary_search(arr, low, high, x):
    if high >= low:
        mid = (high + low) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] > x:
            return binary_search(arr, low, mid - 1, x)
        else:
            return binary_search(arr, mid + 1, high, x)
    return -1
`,
  },
  {
    index: "05",
    title: "OOP Mini Projects",
    tag: "Object-Oriented Design",
    date: "APR 2026",
    icon: Code,
    desc: "Small applications. Real entities, modeled properly. Encapsulation. Inheritance. Polymorphism. Used with intent.",
    stack: ["Java", "C++", "OOP"],
    type: "interactive",
  },
  {
    index: "06",
    title: "Number & Array Utilities",
    tag: "Algorithms",
    date: "FEB 2026",
    icon: Terminal,
    desc: "Search. Sort. Manipulate. Written to build instinct, not just to solve the problem.",
    stack: ["C++", "Algorithms", "C"],
    type: "code",
    codeLanguage: "cpp",
    command: `// Quick Sort in C++
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}
`,
  },
];


const STREAMIX_URL = "https://iam-alenjoseph.github.io/streamix1/";

const ImageSlider = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Slider — click to open Streamix in-app */}
      <div className="block cursor-pointer group" onClick={() => setOpen(true)}>
        <div
          className="relative w-full overflow-hidden rounded-xl bg-black border border-border"
          style={{ aspectRatio: "1024/532" }}
        >
          {images.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              animate={{
                opacity: i === current ? 1 : 0,
                scale: i === current ? 1 : 1.015,
                filter: i === current ? "brightness(1)" : "brightness(0.85)",
              }}
              transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-contain rounded-xl"
              style={{ willChange: "opacity, transform" }}
            />
          ))}

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <motion.button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                animate={{ width: i === current ? 20 : 6, opacity: i === current ? 1 : 0.45 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="h-1.5 rounded-full bg-white"
                style={{ minWidth: 6 }}
              />
            ))}
          </div>

          {/* Hover hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-xl">
            <span className="text-white text-xs font-mono bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
              Launch Streamix
            </span>
          </div>
        </div>
      </div>

      {/* In-app iframe modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="streamix-backdrop"
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9998] bg-black/75"
              onClick={() => setOpen(false)}
            />

            {/* Modal panel container */}
            <motion.div
              key="streamix-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 lg:p-8 pointer-events-none"
            >
              <div
                className="relative w-full h-full md:h-[88vh] max-w-[1360px] md:rounded-2xl overflow-hidden flex flex-col pointer-events-auto border border-white/10"
                style={{
                  background: "linear-gradient(180deg, rgba(30,30,30,0.95) 0%, rgba(18,18,18,0.98) 100%)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Browser chrome bar */}
                <div className="flex items-center gap-3 px-4 h-12 bg-[#1c1c1e] border-b border-white/10 shrink-0">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setOpen(false)}
                      className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
                      title="Close"
                    />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>

                  {/* URL bar */}
                  <div className="flex-1 flex items-center bg-white/5 rounded-md px-3 h-7 gap-2 mx-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                    <span className="text-white/50 text-xs font-mono truncate">{STREAMIX_URL}</span>
                  </div>

                  {/* Open in new tab */}
                  <a
                    href={STREAMIX_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-white/40 hover:text-white/80 transition-colors p-1.5 rounded hover:bg-white/10"
                    title="Open in new tab"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>

                {/* iframe */}
                <iframe
                  src={STREAMIX_URL}
                  className="flex-1 w-full border-0 bg-[#0f0f0f]"
                  title="Streamix"
                  allow="fullscreen"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};


export const Projects = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
              02 Projects History
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 leading-tight tracking-tight">
              What I've built. <span className="font-serif-italic font-normal text-gradient">In order.</span>
            </h2>
          </div>
          <a
            href="https://github.com/iam-alenjoseph"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-2 group transition-colors"
          >
            See all on GitHub
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-border/40 pl-8 md:pl-12 space-y-16 ml-4 md:ml-6">

          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[53px] md:-left-[69px] top-1.5 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-background border border-border/50 flex items-center justify-center text-primary shadow-sm z-10 group-hover:border-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
                  <p.icon className="h-4.5 w-4.5" />
                </div>
              </div>

              {/* Grid: Info left, visual right */}
              <div className="grid md:grid-cols-12 gap-8 items-start">

                {/* Text column */}
                <div className="md:col-span-5 flex flex-col justify-start">
                  <div className="flex items-center gap-3 font-mono text-xs mb-3 text-muted-foreground flex-wrap">
                    <span className="text-primary font-bold">{p.index}</span>
                    <span>·</span>
                    <span>{p.date}</span>
                    <span>·</span>
                    <span className="uppercase tracking-widest font-semibold text-[10px] text-primary/85 px-2 py-0.5 rounded">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3 tracking-tight">
                    {p.title}
                  </h3>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono px-3 py-1 rounded-full border border-border/80 text-muted-foreground bg-muted/40"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {p.links && (
                    <div className="flex flex-wrap gap-2.5">
                      {p.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/5 border border-primary/10 rounded-full px-3.5 py-1.5 hover:bg-primary/10"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Visual column */}
                <div className="md:col-span-7">
                  {p.type === "code" && p.command ? (
                    <TerminalCard
                      command={p.command}
                      language={p.codeLanguage}
                      className="w-full bg-black/80 border-transparent shadow-inner"
                    />
                  ) : p.type === "interactive" ? (
                    <InteractiveRefactorCard />
                  ) : p.images ? (
                    <ImageSlider images={p.images} />
                  ) : (
                    <img
                      src={p.imageUrl || "/portfolio_mockup.png"}
                      alt={p.title}
                      className="w-full h-auto object-cover rounded-xl border border-border"
                      style={{ aspectRatio: p.aspect || "16/10" }}
                    />
                  )}
                </div>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};
