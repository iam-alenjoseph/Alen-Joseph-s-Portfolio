import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const quotes = [
  "Simple isn't the starting point. It's what's left after everything unnecessary is removed.",
  "The parts nobody sees are the ones I care about most.",
  "I'd rather finish one thing properly than start ten.",
  "Nothing ships until it's right. Then it ships.",
  "Good work doesn't need to explain itself.",
];

const slogans = [
  { line1: "Design once.", line2: "Build forever." },
  { line1: "Nothing extra.", line2: "Nothing missing." },
  { line1: "做得对，", line2: "就一次." },
  { line1: "Peu importe,", line2: "sauf l'essentiel." },
  { line1: "Quiet", line2: "by design." },
  { line1: "Nicht mehr. Nicht weniger.", line2: "Genau richtig." },
  { line1: "Every line", line2: "earns its place." },
  { line1: "引き算の", line2: "美学。" },
  { line1: "Built to last.", line2: "Not to impress." },
  { line1: "Function is", line2: "the aesthetic." },
  { line1: "Precision first.", line2: "Everything else follows." },
  { line1: "What stays", line2: "is what matters." },
  { line1: "Less,", line2: "but better." },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.35,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

const childVariants = {
  initial: {
    opacity: 0,
    y: 25
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15
    }
  }
};

const gradients = [
  {
    css: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fec194 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #ece9e6 0%, #0f2027 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #300030 0%, #800000 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #534b2a 0%, #a29267 50%, #dcd7c5 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #10002b 0%, #8a00c2 50%, #ffbde6 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #4ef2d2 0%, #8be2ec 50%, #a4b4ec 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #1f0b35 0%, #7d3345 50%, #d4592a 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #0b2b64 0%, #006fff 50%, #0080ff 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/20"
  },
  {
    css: "linear-gradient(135deg, #e2dcd0 0%, #e9a18c 50%, #e55b6c 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #ccd6ff 0%, #e6e9f5 50%, #b8c5e6 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #e1e3e0 0%, #ffffff 50%, #cccccc 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #8c8793 0%, #5a4e61 50%, #2c1236 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #120c08 0%, #453327 50%, #8c7769 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #6e0600 0%, #310d0a 50%, #141517 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #0a2e1a 0%, #1a5c30 50%, #2d8a4e 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #f7d4c8 0%, #f5b8c4 50%, #f0a0bc 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #003d4d 0%, #006672 50%, #009fa3 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #d9c98a 0%, #c5a84e 50%, #a07c2b 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #0d0d2b 0%, #1a1a5e 50%, #252592 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #7a2e0e 0%, #b84c1f 50%, #d4743b 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #d4e8d4 0%, #b0d4b0 50%, #8ab88a 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #2d0845 0%, #5b0f7a 50%, #8b1fc4 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #b0bec5 0%, #78909c 50%, #546e7a 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #4a0010 0%, #8b0020 50%, #c40030 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #fdf6e3 0%, #f5e6c8 50%, #e8d3a8 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #404040 0%, #262626 50%, #171717 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #c4170c 0%, #e06b12 50%, #ffcc00 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #5c2c7d 0%, #4d748f 50%, #3ea1a1 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #2b2b2b 0%, #6e1a1a 50%, #cc0000 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-white hover:bg-white/90 text-black border-white/20"
  },
  {
    css: "linear-gradient(135deg, #b8c8f5 0%, #7b7fd4 50%, #3b2a9e 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-white hover:bg-white/90 text-black border-white/20"
  },
  {
    css: "linear-gradient(135deg, #b86aaa 0%, #8b3a8b 50%, #4a0060 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-white hover:bg-white/90 text-black border-white/20"
  },
  {
    css: "linear-gradient(135deg, #0a5cc5 0%, #6aacce 50%, #f5f5e0 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #2a2a1a 0%, #7a8a2a 35%, #b8803a 65%, #b84a38 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-white hover:bg-white/90 text-black border-white/20"
  },
  {
    css: "linear-gradient(135deg, #2a0a6e 0%, #d04020 25%, #d0d8d0 50%, #78c030 75%, #1a6010 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/20"
  },
  {
    css: "linear-gradient(135deg, #cc0028 0%, #7a0040 50%, #2a0030 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-white hover:bg-white/90 text-black border-white/20"
  },
  {
    css: "linear-gradient(135deg, #1a3d30 0%, #4a8f70 50%, #a0e8c0 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #9b30e8 0%, #f59a10 50%, #ffffff 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #d8f5d0 0%, #ede8e0 50%, #d8a8e8 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #FD8012 0%, #0084C9 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #BBD1C4 0%, #282E48 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #242527 0%, #424345 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #B69890 0%, #93706A 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #FD746C 0%, #FF9068 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #000000 0%, #434343 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #5514B0 0%, #DBD75C 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #0099F7 0%, #F01712 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #000328 0%, #004E91 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #56AA2E 0%, #A7DF62 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #F85033 0%, #E73827 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #F69E00 0%, #64F28C 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #FEAC60 0%, #C779CF 50%, #4BC0C9 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #BA8A02 0%, #69500D 50%, #181818 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #BF2324 0%, #D8782E 50%, #EFCA34 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #B04490 0%, #D25285 50%, #F15E78 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #414D0B 0%, #727A17 100%)",
    darkText: false,
    titleText: "text-white",
    descText: "text-white/75",
    manifestoText: "text-white/60",
    metaText: "text-white/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-white/10"
  },
  {
    css: "linear-gradient(135deg, #225F00 0%, #E4E4D8 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
  {
    css: "linear-gradient(135deg, #BA93D6 0%, #8CA5DB 100%)",
    darkText: true,
    titleText: "text-black",
    descText: "text-black/70",
    manifestoText: "text-black/55",
    metaText: "text-black/45",
    btnBg: "bg-black hover:bg-black/90 text-white border-black/10"
  },
];

// ─── Hero ──────────────────────────────────────────────────────────────────────
export const Hero = ({ onOpenResume }: { onOpenResume: () => void }) => {
  const [sloganIndex, setSloganIndex] = useState(0);
  const [prevSloganIndex, setPrevSloganIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevSloganIndex(sloganIndex);
      // Use 3770 (Least Common Multiple of 13, 5, and 58) so that we cycle through all slogans and all gradients.
      setSloganIndex((prev) => (prev + 1) % 3770);
    }, 5000);
    return () => clearInterval(timer);
  }, [sloganIndex]);

  const quoteIndex = sloganIndex % quotes.length;
  const index = sloganIndex % gradients.length;
  const prevIndex = prevSloganIndex % gradients.length;
  const currentSloganIndex = sloganIndex % slogans.length;
  const g = gradients[index];

  return (
    <>
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[85vh] pt-36 pb-24 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* ── Background gradient crossfade ──────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{ background: gradients[index].css }}
        />
        <motion.div
          key={prevIndex + "-" + index}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ background: gradients[prevIndex].css }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="container relative z-10 max-w-3xl flex flex-col items-center px-6">

        <div className="relative w-full min-h-[8.5rem] sm:min-h-[11rem] md:min-h-[13.5rem] flex items-center justify-center overflow-hidden z-10">
          <AnimatePresence mode="popLayout">
            <motion.h1
              key={sloganIndex}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`absolute font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight transition-colors duration-1000 ${g.titleText} flex flex-col items-center w-full px-4`}
            >
              <motion.span variants={childVariants} className="block text-center">
                {slogans[currentSloganIndex].line1}
              </motion.span>
              <motion.span
                variants={childVariants}
                className="font-serif-italic font-normal italic mt-1 block text-center"
              >
                {slogans[currentSloganIndex].line2}
              </motion.span>
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Cycling quote */}
        <div className={`mt-7 text-base sm:text-lg leading-relaxed max-w-xl h-16 flex items-center justify-center overflow-hidden`}>
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`transition-colors duration-1000 ${g.descText} text-center`}
            >
              {quotes[quoteIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={`mt-6 font-mono text-xs sm:text-sm leading-loose transition-colors duration-1000 ${g.manifestoText} max-w-xl text-center space-y-0.5`}
        >
          <p>I'm a full-stack developer. I work in Python, Java, and C++.</p>
          <p>I build resume tools. Media interfaces. Document generators.</p>
          <p>Complete products. Not fragments.</p>
          <p className="font-semibold">I ship them.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
            <a href="#toolkit" style={{ cursor: "pointer" }}>
              <button
                type="button"
                className={`font-semibold rounded-full px-8 py-3.5 flex items-center gap-2 shadow-2xl transition-all hover:scale-105 active:scale-95 border cursor-pointer text-sm md:text-base ${g.btnBg}`}
              >
                Explore Toolkit <ArrowRight className="h-4 w-4" />
              </button>
            </a>
            <button
              type="button"
              onClick={() => onOpenResume()}
              style={{ cursor: "pointer" }}
              className={`font-semibold rounded-full px-8 py-3.5 flex items-center gap-2 shadow-2xl transition-all hover:scale-105 active:scale-95 border text-sm md:text-base ${
                g.darkText
                  ? "bg-black/5 hover:bg-black/10 text-black border-black/15"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/20"
              }`}
            >
              View Resume
            </button>
          </div>

          <div className={`flex items-center gap-2 transition-colors duration-1000 ${g.metaText} text-[10px] md:text-xs font-mono mt-1 tracking-wide uppercase select-none`}>
            <span>BCA Student</span>
            <span>·</span>
            <span>Noorul Islam University</span>
            <span>·</span>
            <span>Available for Internships</span>
          </div>
        </motion.div>

      </div>
    </section>
    </>
  );
};
