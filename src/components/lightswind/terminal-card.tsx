"use client";

import React, { useEffect, useState } from "react";
import { Copy, Terminal, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Clean the Prism theme style object to strip out background and backgroundColor rules.
// This ensures that neither the wrapper nor any syntax-highlighted tokens ever render a grey background box.
const cleanOneDark = Object.fromEntries(
  Object.entries(oneDark).map(([key, value]) => {
    if (value && typeof value === "object") {
      const { background, backgroundColor, ...rest } = value as any;
      return [key, rest];
    }
    return [key, value];
  })
);

type TerminalCardProps = {
  command: string;
  language?: string;
  className?: string;
};

const TerminalCard: React.FC<TerminalCardProps> = ({ command, language = "tsx", className }) => {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Derived state: show blinking cursor only while actively typing
  const showCursor = index < command.length;

  // Typing animation logic with dynamic delays for a premium, realistic cadence
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (index < command.length) {
      const nextChar = command.charAt(index);
      const prevChar = index > 0 ? command.charAt(index - 1) : "";
      
      // Calculate dynamic speed: average 80ms, but with human-like variance
      let delay = 60 + Math.random() * 50; 
      
      if (nextChar === "\n") {
        delay = 450; // Pause at the end of code lines
      } else if ([";", "{", "}", "(", ")"].includes(nextChar)) {
        delay = 250; // Pause at logic delimiters and statement endings
      } else if (nextChar === " " && [";", ",", "{", "}", ")"].includes(prevChar)) {
        delay = 180; // Short pause after syntax characters
      }

      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + nextChar);
        setIndex((prev) => prev + 1);
      }, delay);
    } else {
      setIsComplete(true);

      // Reset and restart typing after 7 seconds of reader visibility
      timeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
        setIsComplete(false);
      }, 7000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [index, command]);

  // Copy handler
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn(
        "border rounded-lg backdrop-blur-md min-w-[300px] max-w-full",
        "bg-white/70 border-gray-300 text-black",
        "dark:bg-white/10 dark:border-gray-400/30 dark:text-white",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-[#202425] rounded-t-lg text-sm font-semibold text-gray-700 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primarylw" />
          Terminal
        </div>
        <button
          className="p-1 border rounded transition hover:border-gray-600 dark:hover:border-white text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={handleCopy}
          aria-label="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Content with Real-time Syntax Highlighting */}
      <div
        className={cn(
          "rounded-b-lg text-sm p-3.5 bg-black text-white dark:bg-black max-h-[300px] overflow-auto font-mono transition-all duration-300",
          showCursor ? "select-none" : "select-text"
        )}
        style={{
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={cleanOneDark}
            customStyle={{
              background: "transparent",
              margin: 0,
              padding: 0,
              display: "inline",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
            codeTagProps={{
              style: {
                background: "transparent",
              }
            }}
            PreTag="span"
            CodeTag="span"
          >
            {displayedText}
          </SyntaxHighlighter>
          {showCursor && (
            <motion.span
              className="inline-block w-1.5 h-4 bg-primary ml-1 align-middle shadow-[0_0_8px_var(--primary)]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalCard;
