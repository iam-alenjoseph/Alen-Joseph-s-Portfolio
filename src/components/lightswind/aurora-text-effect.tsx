import React from "react";
import { cn } from "../../lib/utils";

export interface AuroraTextEffectProps {
  text: string;
  className?: string;
  textClassName?: string;
  fontSize?: string;
  colors?: {
    first?: string;
    second?: string;
    third?: string;
    fourth?: string;
  };
  blurAmount?:
  | "blur-none"
  | "blur-sm"
  | "blur-md"
  | "blur-lg"
  | "blur-xl"
  | "blur-2xl"
  | "blur-3xl"
  | string;
  animationSpeed?: {
    border?: number;
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };
}

export function AuroraTextEffect({
  text,
  className,
  textClassName,
  fontSize = "clamp(3rem, 8vw, 7rem)",
  colors,
  blurAmount = "blur-lg",
  animationSpeed = {
    border: 6,
    first: 5,
    second: 5,
    third: 3,
    fourth: 13,
  },
}: AuroraTextEffectProps) {
  // Define fallback colors matching the user's gradients
  const activeColors = {
    first: colors?.first ?? "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fec194 100%)",
    second: colors?.second ?? "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    third: colors?.third ?? "linear-gradient(135deg, #ece9e6 0%, #0f2027 100%)",
    fourth: colors?.fourth ?? "linear-gradient(135deg, #300030 0%, #800000 100%)",
  };

  // Define keyframes as a style object
  const keyframes = `
    @keyframes aurora-1 {
      0% { top: 0; right: 0; }
      50% { top: 100%; right: 75%; }
      75% { top: 100%; right: 25%; }
      100% { top: 0; right: 0; }
    }
    @keyframes aurora-2 {
      0% { top: -50%; left: 0%; }
      60% { top: 100%; left: 75%; }
      85% { top: 100%; left: 25%; }
      100% { top: -50%; left: 0%; }
    }
    @keyframes aurora-3 {
      0% { bottom: 0; left: 0; }
      40% { bottom: 100%; left: 75%; }
      65% { bottom: 40%; left: 50%; }
      100% { bottom: 0; left: 0; }
    }
    @keyframes aurora-4 {
      0% { bottom: -50%; right: 0; }
      50% { bottom: 0%; right: 40%; }
      90% { bottom: 50%; right: 25%; }
      100% { bottom: -50%; right: 0; }
    }
    @keyframes aurora-border {
      0% { border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%; }
      25% { border-radius: 47% 29% 39% 49% / 61% 19% 66% 26%; }
      50% { border-radius: 57% 23% 47% 72% / 63% 17% 66% 33%; }
      75% { border-radius: 28% 49% 29% 100% / 93% 20% 64% 25%; }
      100% { border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%; }
    }
  `;

  const renderLayer = (colorVal?: string, animationName = "", speed = 5) => {
    if (!colorVal) return null;
    const isCss = colorVal.startsWith("linear-gradient") || 
                  colorVal.startsWith("radial-gradient") || 
                  colorVal.startsWith("#") || 
                  colorVal.startsWith("rgb") || 
                  colorVal.startsWith("hsl");
    
    return (
      <div
        className={cn(
          "absolute w-[60vw] h-[60vw] rounded-[37%_29%_27%_27%/28%_25%_41%_37%] filter mix-blend-overlay",
          isCss ? "" : colorVal,
          blurAmount
        )}
        style={{
          background: isCss ? colorVal : undefined,
          animationName: `aurora-border, ${animationName}`,
          animationDuration: `${animationSpeed.border}s, ${speed}s`,
          animationTimingFunction: "ease-in-out, ease-in-out",
          animationIterationCount: "infinite, infinite",
          animationDirection: "normal, alternate",
        }}
      />
    );
  };

  return (
    <div
      className={cn(
        // Updated to support light and dark modes
        "bg-white dark:bg-black flex items-center justify-center overflow-hidden",
        className
      )}
    >
      <style>{keyframes /* This injects the keyframes into the DOM */}</style>
      <div className="text-center">
        <h2
          className={cn(
            // Added theme-aware text color for visibility
            "font-extrabold tracking-tight relative overflow-hidden text-black dark:text-white",
            textClassName
          )}
          style={{ fontSize }}
        >
          {text}
          <div
            // Switched blend mode based on theme to preserve the effect
            className="absolute inset-0 z-10 mix-blend-lighten dark:mix-blend-darken pointer-events-none"
          >
            {renderLayer(activeColors.first, "aurora-1", animationSpeed.first)}
            {renderLayer(activeColors.second, "aurora-2", animationSpeed.second)}
            {renderLayer(activeColors.third, "aurora-3", animationSpeed.third)}
            {renderLayer(activeColors.fourth, "aurora-4", animationSpeed.fourth)}
          </div>
        </h2>
      </div>
    </div>
  );
}
