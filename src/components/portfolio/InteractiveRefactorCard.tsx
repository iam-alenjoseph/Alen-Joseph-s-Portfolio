import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

type Step = "raw" | "refactoring" | "encapsulated";

export default function InteractiveRefactorCard() {
  const [step, setStep] = useState<Step>("raw");

  useEffect(() => {
    if (step === "refactoring") {
      const timer = setTimeout(() => {
        setStep("encapsulated");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleAction = () => {
    if (step === "raw") setStep("refactoring");
    else if (step === "encapsulated") setStep("raw");
  };

  return (
    <div
      className="w-full aspect-[16/10] rounded-xl flex flex-col font-mono text-xs select-none overflow-hidden"
      style={{
        background: "#000000",
        boxShadow: "none",
        border: "1px solid #3a3a3a",
      }}
    >
      {/* macOS Title Bar — gradient like Terminal.app */}
      <div
        className="relative flex items-center shrink-0 px-3"
        style={{
          height: "38px",
          background: "linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%)",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        {/* Traffic light dots — left aligned */}
        <div className="flex items-center gap-[6px] z-10">
          {/* Red — close */}
          <button
            onClick={handleAction}
            disabled={step === "refactoring"}
            title={step === "encapsulated" ? "Reset" : "Refactor"}
            className="group relative w-3 h-3 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-60"
            style={{ background: "#ff5f57", boxShadow: "0 0 0 0.5px rgba(0,0,0,0.3)" }}
          >
            <span className="opacity-0 group-hover:opacity-100 text-[7px] text-[#4a0000] font-black leading-none transition-opacity">
              {step === "encapsulated" ? "↺" : "▶"}
            </span>
          </button>
          {/* Yellow — minimize */}
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "#febc2e", boxShadow: "0 0 0 0.5px rgba(0,0,0,0.3)" }}
          />
          {/* Green — fullscreen */}
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "#28c840", boxShadow: "0 0 0 0.5px rgba(0,0,0,0.3)" }}
          />
        </div>

        {/* Centered Window Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[11px] font-medium" style={{ color: "#999", letterSpacing: "0.01em" }}>
            zsh — 80×24
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        className="flex-1 flex flex-col justify-center px-5 py-4 leading-[1.6] overflow-hidden"
        style={{ background: "#000000" }}
      >
        {/* zsh Prompt Line */}
        <div className="flex flex-wrap items-baseline gap-x-1 mb-2 text-[11.5px]">
          <span style={{ color: "#27c93f" }}>alen</span>
          <span style={{ color: "#888" }}>@</span>
          <span style={{ color: "#27c93f" }}>MacBook-Pro</span>
          <span style={{ color: "#888" }}>:</span>
          <span style={{ color: "#5fafff" }}>~/projects/portfolio</span>
          <span style={{ color: "#888" }}>%</span>
          <span style={{ color: "#e8e8e8" }}>&nbsp;cat user.cpp</span>
        </div>

        <AnimatePresence mode="wait">
          {step === "raw" && (
            <motion.div
              key="raw"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.18 }}
              className="space-y-[3px] text-[11.5px]"
            >
              <div style={{ color: "#6a6a6a" }}>// Raw design — public fields</div>
              <div>
                <span style={{ color: "#c586c0" }}>class</span>
                {" "}<span style={{ color: "#4ec9b0" }}>User</span>
                {" "}<span style={{ color: "#e8e8e8" }}>&#123;</span>
              </div>
              <div><span style={{ color: "#569cd6" }}>public:</span></div>
              <div className="pl-5">
                <span style={{ color: "#4ec9b0" }}>string</span>
                {" "}<span style={{ color: "#9cdcfe" }}>username</span>
                <span style={{ color: "#e8e8e8" }}>;</span>
              </div>
              <div className="pl-5">
                <span style={{ color: "#4ec9b0" }}>int</span>
                {" "}<span style={{ color: "#9cdcfe" }}>age</span>
                <span style={{ color: "#e8e8e8" }}>;</span>
              </div>
              <div><span style={{ color: "#e8e8e8" }}>&#125;;</span></div>
            </motion.div>
          )}

          {step === "refactoring" && (
            <motion.div
              key="refactoring"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
              className="space-y-[3px] text-[11.5px]"
            >
              <div style={{ color: "#febc2e" }}>▶ Analyzing class structure...</div>
              <div style={{ color: "#febc2e" }}>▶ Applying encapsulation rules...</div>
              <div style={{ color: "#febc2e" }}>▶ Restructuring access control...</div>
            </motion.div>
          )}

          {step === "encapsulated" && (
            <motion.div
              key="encapsulated"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.18 }}
              className="space-y-[3px] text-[11.5px]"
            >
              <div style={{ color: "#6a6a6a" }}>// Refactored — encapsulated &amp; safe</div>
              <div>
                <span style={{ color: "#c586c0" }}>class</span>
                {" "}<span style={{ color: "#4ec9b0" }}>User</span>
                {" "}<span style={{ color: "#e8e8e8" }}>&#123;</span>
              </div>
              <div><span style={{ color: "#f44747" }}>private:</span></div>
              <div className="pl-5">
                <span style={{ color: "#4ec9b0" }}>string</span>
                {" "}<span style={{ color: "#9cdcfe" }}>username</span>
                <span style={{ color: "#e8e8e8" }}>;</span>
              </div>
              <div className="pl-5">
                <span style={{ color: "#4ec9b0" }}>int</span>
                {" "}<span style={{ color: "#9cdcfe" }}>age</span>
                <span style={{ color: "#e8e8e8" }}>;</span>
              </div>
              <div><span style={{ color: "#569cd6" }}>public:</span></div>
              <div className="pl-5">
                <span style={{ color: "#dcdcaa" }}>User</span>
                <span style={{ color: "#e8e8e8" }}>(</span>
                <span style={{ color: "#4ec9b0" }}>string</span>
                {" "}<span style={{ color: "#9cdcfe" }}>u</span>
                <span style={{ color: "#e8e8e8" }}>, </span>
                <span style={{ color: "#4ec9b0" }}>int</span>
                {" "}<span style={{ color: "#9cdcfe" }}>a</span>
                <span style={{ color: "#e8e8e8" }}>) : username(u), age(a) &#123;&#125;</span>
              </div>
              <div className="pl-5">
                <span style={{ color: "#4ec9b0" }}>string</span>
                {" "}<span style={{ color: "#dcdcaa" }}>getUsername</span>
                <span style={{ color: "#e8e8e8" }}>()</span>
                {" "}<span style={{ color: "#569cd6" }}>const</span>
                <span style={{ color: "#e8e8e8" }}> &#123; </span>
                <span style={{ color: "#c586c0" }}>return</span>
                {" "}<span style={{ color: "#9cdcfe" }}>username</span>
                <span style={{ color: "#e8e8e8" }}>; &#125;</span>
              </div>
              <div><span style={{ color: "#e8e8e8" }}>&#125;;</span></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blinking cursor */}
        {step !== "refactoring" && (
          <motion.span
            className="inline-block mt-2 w-[7px] h-[13px] align-middle"
            style={{ background: "#e8e8e8", opacity: 0.7 }}
            animate={{ opacity: [0.7, 0, 0.7] }}
            transition={{ repeat: Infinity, duration: 1, ease: "steps(1)" }}
          />
        )}
      </div>

      {/* macOS Terminal Bottom Status Bar */}
      <div
        className="flex items-center justify-between px-4 shrink-0 text-[10px]"
        style={{
          height: "22px",
          background: "linear-gradient(to bottom, #2a2a2a 0%, #242424 100%)",
          borderTop: "1px solid #1a1a1a",
          color: "#777",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${step === "refactoring" ? "animate-pulse" : ""}`}
            style={{
              background: step === "encapsulated" ? "#28c840" : step === "refactoring" ? "#febc2e" : "#ff5f57",
            }}
          />
          <span className="uppercase tracking-widest text-[9px]">
            {step === "raw" && "STATE: RAW ACCESS"}
            {step === "refactoring" && "STATE: REFACTORING"}
            {step === "encapsulated" && "STATE: ENCAPSULATED & SAFE"}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[9px]">
          {step === "encapsulated" && (
            <button
              onClick={handleAction}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-2.5 w-2.5" />
              <span>Reset</span>
            </button>
          )}
          {step === "raw" && (
            <button
              onClick={handleAction}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span className="uppercase tracking-widest">▶ Run Refactor</span>
            </button>
          )}
          <span style={{ color: "#555" }}>UTF-8</span>
        </div>
      </div>
    </div>
  );
}
