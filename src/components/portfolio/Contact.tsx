import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, FileText } from "lucide-react";
import { MagneticButton } from "../lightswind/magnetic-button";

export const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass rounded-[2.5rem] p-8 md:p-16 overflow-hidden border border-border/40 shadow-2xl text-center flex flex-col items-center justify-center"
        >
          {/* Subtle backgrounds */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          {/* Label */}
          <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold relative">
            03 Contact
          </span>

          {/* Heading */}
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 leading-tight tracking-tight relative max-w-2xl">
            Let's build <br />
            <span className="font-serif-italic font-normal text-gradient">something worth keeping</span>.
          </h2>

          {/* Description */}
          <div className="mt-6 text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed relative space-y-1 font-mono text-sm">
            <p>I'm open to internships. Entry-level roles. Good collaborations.</p>
            <p>If the work is good, I want to hear about it.</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4 relative">
            <MagneticButton
              variant="outline"
              size="md"
              onClick={() => window.location.href = "mailto:alenjoseph4115@gmail.com"}
            >
              <Mail className="mr-2 h-4 w-4" /> Send Email
            </MagneticButton>
            <MagneticButton
              variant="outline"
              size="md"
              onClick={() => window.open("https://www.linkedin.com/in/alen-joseph-a96b2537b?utm_source=share_via&utm_content=profile&utm_medium=member_android", "_blank")}
            >
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </MagneticButton>
            <MagneticButton
              variant="outline"
              size="md"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              <FileText className="mr-2 h-4 w-4" /> Resume
            </MagneticButton>
          </div>

          {/* Small social list */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs font-mono text-muted-foreground/60 relative">
            <a
              href="tel:+919747518522"
              className="hover:text-foreground transition-colors"
            >
              <Phone className="h-3.5 w-3.5 inline mr-1" /> +91 97475 18522
            </a>
            <span>·</span>
            <a
              href="https://github.com/iam-alenjoseph"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <Github className="h-3.5 w-3.5 inline mr-1" /> GitHub
            </a>
            <span>·</span>
            <a
              href="https://www.instagram.com/alen___joseph____?igsh=MXVraDY0dXYzb2xjcg=="
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <svg className="h-3.5 w-3.5 inline mr-1 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
