import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ToggleTheme } from "@/components/lightswind/toggle-theme";

const links = [
  { href: "#toolkit", label: "Toolkit" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

// ─── Bezel Ear ────────────────────────────────────────────────────────────────
//
// Each ear is a filled "corner fillet" shape — a right-angled wedge whose
// hypotenuse is a smooth cubic-bezier squircle curve. The curve is
// tangent-continuous: perfectly vertical where it meets the pill's side edge,
// and perfectly horizontal where it meets the top of the pill.
//
// Geometry (size = S = 20):
//   k = 0.65 × S = 13.0   ← smooth squircle/continuous curve approximation (not a circle arc)
//
//   LEFT ear  (sits to the left, fills the top-right wedge):
//     M S,0                    ← top-right  (pill top-left corner)
//     L 0,0                    ← top-left
//     L 0,S                    ← bottom-left
//     C 0,(S-k)  (S-k),S  S,S ← cubic bezier to bottom-right (pill bottom-left)
//     Z
//     — starts at top, goes left along top, down the outer side, then curves
//       smoothly back to the pill. Concave curve faces OUTWARD (lower-left).
//
//   RIGHT ear  (mirror of left, fills the top-left wedge):
//     M 0,0  L S,0  L S,S  C S,(S-k)  k,S  0,S  Z
//
// The ears are placed at bottom-0 so they align with the pill's rounded
// bottom corners (rounded-b-2xl = 16 px radius). Their own curve radius (20 px)
// creates a graceful outward flair that looks premium at any zoom level.

const S = 20;            // ear size in px
const k = 0.65 * S;     // bezier control distance ≈ 13.0 (smooth squircle)

const EAR_LEFT  = `M ${S},0 L 0,0 C ${k},0 ${S},${S - k} ${S},${S} Z`;
const EAR_RIGHT = `M 0,0 L ${S},0 C ${S - k},0 0,${S - k} 0,${S} Z`;

const EAR_LEFT_CURVE  = `M 0,0 C ${k},0 ${S},${S - k} ${S},${S}`;
const EAR_RIGHT_CURVE = `M ${S},0 C ${S - k},0 0,${S - k} 0,${S}`;

export const Navbar = ({ onOpenResume }: { onOpenResume: () => void }) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [glassActive, setGlassActive] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setGlassActive(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // ── Style variants: Solid Apple Black on Hero, Glass on scroll ──────────────
  const bodyStyle = glassActive
    ? {
        background: "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.45) 100%)",
        backdropFilter: "blur(20px) saturate(190%)",
        WebkitBackdropFilter: "blur(20px) saturate(190%)",
        borderColor: "rgba(255,255,255,0.4)",
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.6),
          inset 0 -1px 0 rgba(255,255,255,0.1),
          0 8px 32px rgba(0,0,0,0.08)
        `,
      }
    : {
        background: "#000000",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        borderColor: "transparent",
        boxShadow: "none",
      };

  const transition = "background 0.5s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-[95%] max-w-[620px] pointer-events-auto"
      >
        {/* ── Notch pill + ears ─────────────────────────────────────────────── */}
        <div className="relative">

          {/* LEFT ear — sits to the left of the pill, top-aligned with screen bezel */}
          <div
            className="absolute top-0 right-full mr-[-1px] w-5 h-5 pointer-events-none z-10"
            style={{
              clipPath: `path('${EAR_LEFT}')`,
              WebkitClipPath: `path('${EAR_LEFT}')`,
              ...(glassActive ? bodyStyle : { background: "#000000" }),
              transition,
            }}
          />
          <svg
            className="absolute top-0 right-full mr-[-1px] pointer-events-none z-20"
            width={S}
            height={S}
            viewBox={`0 0 ${S} ${S}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d={EAR_LEFT_CURVE}
              fill="none"
              stroke={glassActive ? "rgba(0,0,0,0.12)" : "transparent"}
              strokeWidth={1}
              style={{ transition: "stroke 0.5s ease" }}
            />
          </svg>

          {/* RIGHT ear — mirror of left ear */}
          <div
            className="absolute top-0 left-full ml-[-1px] w-5 h-5 pointer-events-none z-10"
            style={{
              clipPath: `path('${EAR_RIGHT}')`,
              WebkitClipPath: `path('${EAR_RIGHT}')`,
              ...(glassActive ? bodyStyle : { background: "#000000" }),
              transition,
            }}
          />
          <svg
            className="absolute top-0 left-full ml-[-1px] pointer-events-none z-20"
            width={S}
            height={S}
            viewBox={`0 0 ${S} ${S}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d={EAR_RIGHT_CURVE}
              fill="none"
              stroke={glassActive ? "rgba(0,0,0,0.12)" : "transparent"}
              strokeWidth={1}
              style={{ transition: "stroke 0.5s ease" }}
            />
          </svg>

          {/* ── Notch bar body ───────────────────────────────────────────────── */}
          <div
            className={`rounded-b-2xl border-x border-b px-4 py-2 flex items-center justify-between relative transition-colors duration-500 ${glassActive ? "text-black border-black/10" : "text-white border-transparent"}`}
            style={{ ...bodyStyle, transition }}
          >
            {/* Left: Brand Name */}
            <a href="#home" className="flex items-center gap-2 cursor-pointer">
              <span className={`font-display font-bold text-xs tracking-tight transition-colors duration-500 select-none ${glassActive ? "text-black hover:text-black/80" : "text-white hover:text-white/90"}`}>
                Alen Joseph
              </span>
            </a>

            {/* Center: Nav Links */}
            <ul className="flex items-center gap-1 sm:gap-2 relative">
              {links.map((l) => (
                <li
                  key={l.href}
                  className="relative"
                  onMouseEnter={() => setHoveredLink(l.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <a
                    href={l.href}
                    className={`relative z-10 text-[11px] font-semibold transition-colors duration-500 px-2.5 py-1 block select-none ${glassActive ? "text-black/60 hover:text-black" : "text-[#8e8e93] hover:text-white"}`}
                  >
                    {l.label}
                  </a>
                  <AnimatePresence>
                    {hoveredLink === l.href && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`absolute inset-0 rounded-md z-0 transition-colors duration-500 ${glassActive ? "bg-black/5" : "bg-white/10"}`}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

            {/* Right: CTA + Theme */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                onClick={() => onOpenResume()}
                className={`transition-all duration-500 active:scale-95 text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm select-none cursor-pointer ${glassActive ? "bg-black text-white hover:bg-black/90" : "bg-white text-black hover:bg-white/90"}`}
              >
                <MessageSquare
                  className={`h-3 w-3 transition-colors duration-500 ${glassActive ? "fill-white stroke-white" : "fill-black stroke-black"} ${
                    isButtonHovered ? "rotate-12 scale-110" : ""
                  }`}
                />
                <span>Let's Talk</span>
              </button>
              <ToggleTheme
                animationType="circle-spread"
                className={`h-7 w-7 rounded-full transition-colors duration-500 ${glassActive ? "text-black/60 hover:text-black hover:bg-black/5" : "text-[#8e8e93] hover:text-white hover:bg-white/10"}`}
              />
            </div>
          </div>


        </div>
      </motion.header>
    </div>
  );
};
