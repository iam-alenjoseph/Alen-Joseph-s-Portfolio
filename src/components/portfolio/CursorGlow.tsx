import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── Liquid Glass Orb Component ──────────────────────────────────────────────
function LiquidGlassOrb({ x, y, size, blur, speed }: {
  x: any;
  y: any;
  size: number;
  blur: number;
  speed: { stiffness: number; damping: number; mass: number };
}) {
  const springX = useSpring(x, speed);
  const springY = useSpring(y, speed);

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
        borderRadius: "50%",
        // Multi-layer liquid glass — kept to 2 stops for perf
        background: `
          radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.35) 0%, transparent 55%),
          radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 80%)
        `,
        // backdropFilter only on hero area — keep cheap
        backdropFilter: `blur(${blur}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.5),
          inset 0 -1px 0 rgba(255,255,255,0.06),
          0 8px 32px rgba(0,0,0,0.10)
        `,
        // Crucial: tell GPU to composite this layer independently
        willChange: "transform",
      }}
    >
      {/* Top specular highlight */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "12%",
          right: "12%",
          height: "30%",
          borderRadius: "50%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.0) 100%)",
          filter: "blur(4px)",
        }}
      />
      {/* Prismatic iridescent rim overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: `conic-gradient(
            from 0deg,
            rgba(255,120,120,0.07),
            rgba(120,120,255,0.09),
            rgba(120,255,200,0.07),
            rgba(255,200,120,0.07),
            rgba(200,120,255,0.09),
            rgba(255,120,120,0.07)
          )`,
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );
}

// ─── Global Background Component ──────────────────────────────────────────────
export const CursorGlow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);

  // All positions are viewport-relative (fixed positioning)
  const orb1X = useMotionValue(300);
  const orb1Y = useMotionValue(300);
  const orb2X = useMotionValue(500);
  const orb2Y = useMotionValue(400);
  const orb3X = useMotionValue(200);
  const orb3Y = useMotionValue(500);

  useEffect(() => {
    // ── Scroll activity tracking ──────────────────────────────────────────
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let currentOpacity = 0;

    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── Animation Loop ────────────────────────────────────────────────────
    let t = 0;
    let currentScale = 0;
    let rafId: number;

    const animate = () => {
      t += 0.003;

      // Always use VIEWPORT dimensions — fixed positioning, never off-screen
      const W = window.innerWidth;
      const H = window.innerHeight;
      const cx = W / 2;
      const cy = H / 2;

      // Lissajous curves scaled to viewport — orbs stay fully on-screen
      orb1X.set(cx + Math.cos(t)       * (W * 0.30) + Math.sin(t * 0.7)  * 30);
      orb1Y.set(cy + Math.sin(t * 0.8) * (H * 0.28) + Math.cos(t * 0.4)  * 20);

      orb2X.set(cx + Math.sin(t * 1.3) * (W * 0.32) + Math.cos(t * 0.6)  * 25);
      orb2Y.set(cy + Math.cos(t * 1.1) * (H * 0.30) + Math.sin(t * 0.5)  * 15);

      orb3X.set(cx + Math.cos(t * 2.0) * (W * 0.35) + Math.sin(t * 0.9)  * 35);
      orb3Y.set(cy + Math.sin(t * 1.7) * (H * 0.33) + Math.cos(t * 0.7)  * 25);

      // Fade in/out based on scroll state
      const target = isScrolling ? 1.0 : 0.0;
      const speed  = isScrolling ? 0.12 : 0.035;
      if (Math.abs(target - currentOpacity) > 0.002) {
        currentOpacity += (target - currentOpacity) * speed;
        if (containerRef.current) containerRef.current.style.opacity = currentOpacity.toFixed(3);
      }

      // SVG liquid warp — gentle autonomous undulation
      const targetScale = 20 + Math.sin(t * 2.2) * 10;
      currentScale += (targetScale - currentScale) * 0.04;
      dispRef.current?.setAttribute("scale", currentScale.toFixed(2));
      if (turbRef.current) {
        const freq = 0.013 + Math.sin(t * 1.3) * 0.002;
        turbRef.current.setAttribute("baseFrequency", `${freq.toFixed(5)} 0.010`);
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      {/* SVG Liquid Filter — hidden, zero size */}
      <svg
        style={{ position: "fixed", width: 0, height: 0, overflow: "hidden", top: 0, left: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="liquid-glass-filter"
            x="-30%" y="-30%"
            width="160%" height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.013 0.010"
              numOctaves="2"
              seed="5"
              result="turbulence"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="turbulence"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="0.3" />
          </filter>
        </defs>
      </svg>

      {/* Orb container — position:fixed so it NEVER touches the document bottom */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0, opacity: 0 }}
      >
        {/* Soft ambient blobs (background layer, no backdrop filter — cheap) */}
        <motion.div
          className="fixed pointer-events-none"
          style={{
            x: useSpring(orb1X, { stiffness: 45, damping: 18, mass: 1.2 }),
            y: useSpring(orb1Y, { stiffness: 45, damping: 18, mass: 1.2 }),
            translateX: "-50%",
            translateY: "-50%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.13) 0%, transparent 70%)",
            mixBlendMode: "overlay",
            filter: "blur(40px)",
            willChange: "transform",
          }}
        />
        <motion.div
          className="fixed pointer-events-none"
          style={{
            x: useSpring(orb2X, { stiffness: 25, damping: 16, mass: 2 }),
            y: useSpring(orb2Y, { stiffness: 25, damping: 16, mass: 2 }),
            translateX: "-50%",
            translateY: "-50%",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.17) 0%, transparent 65%)",
            mixBlendMode: "screen",
            filter: "blur(25px)",
            willChange: "transform",
          }}
        />

        {/* Liquid Glass Orbs (SVG filter layer) */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ filter: "url(#liquid-glass-filter)" }}
        >
          <LiquidGlassOrb
            x={orb1X}
            y={orb1Y}
            size={250}
            blur={22}
            speed={{ stiffness: 40, damping: 20, mass: 1.4 }}
          />
          <LiquidGlassOrb
            x={orb2X}
            y={orb2Y}
            size={130}
            blur={14}
            speed={{ stiffness: 22, damping: 15, mass: 2.2 }}
          />
          <LiquidGlassOrb
            x={orb3X}
            y={orb3Y}
            size={65}
            blur={10}
            speed={{ stiffness: 10, damping: 11, mass: 3.5 }}
          />
        </div>
      </div>
    </>
  );
};
