import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export const ResumeModal = ({ open, onClose }: ResumeModalProps) => {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent background scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="resume-backdrop"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(14px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-black/75"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            key="resume-modal"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-8 pointer-events-none"
          >
            <div
              className="relative w-full max-w-4xl h-[90vh] rounded-2xl overflow-hidden flex flex-col pointer-events-auto"
              style={{
                background: "linear-gradient(180deg, rgba(30,30,30,0.95) 0%, rgba(18,18,18,0.98) 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header bar */}
              <div
                className="flex items-center justify-between px-5 py-3.5 shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-3">
                  {/* macOS-style traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={onClose}
                      className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all"
                      aria-label="Close"
                    />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e] opacity-40" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840] opacity-40" />
                  </div>
                  <span className="text-white/40 text-xs font-mono select-none">resume.pdf</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Download button */}
                  <a
                    href={`${import.meta.env.BASE_URL}resume.pdf`}
                    download
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 transition-all select-none"
                  >
                    <Download className="h-3 w-3" />
                    Download
                  </a>
                </div>
              </div>

              {/* PDF iframe */}
              <div className="flex-1 bg-[#1a1a1a] overflow-hidden">
                <iframe
                  src={`${import.meta.env.BASE_URL}resume.pdf#toolbar=0&navpanes=0&scrollbar=1`}
                  className="w-full h-full border-0"
                  title="Resume PDF"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
