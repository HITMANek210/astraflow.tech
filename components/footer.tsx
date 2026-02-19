"use client";

import { Linkedin, Mail, Instagram } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-background border-t border-border py-12 px-4 relative overflow-hidden">
      {/* Subtle cosmic dust effect background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-primary rounded-full blur-sm"></div>
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-primary/60 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-primary/40 rounded-full blur-sm"></div>
        <div className="absolute bottom-0 right-1/4 w-1 h-1 bg-primary/50 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/30 rounded-full blur-sm"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 relative">
          {/* AstraFlow.tech Brand */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition-opacity">
            <motion.div
              className="relative w-9 h-9 flex-shrink-0"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src="/favicon.svg"
                alt="AstraFlow.tech logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <div className="flex items-baseline gap-0 whitespace-nowrap">
              <span className="text-foreground font-bold text-lg md:text-xl">AstraFlow</span>
              <span className="text-primary font-bold text-lg md:text-xl">.tech</span>
            </div>
          </Link>
          
          {/* Center: Built by text - absolutely positioned on desktop, normal flow on mobile */}
          <div className="text-muted-foreground text-sm text-center md:absolute md:left-1/2 md:-translate-x-1/2">
            {t.footer.builtBy}
          </div>
          
          {/* Social links */}
          <div className="flex gap-6 flex-shrink-0 md:ml-auto">
            <a
              href="https://linkedin.com/in/filip-wyrembak"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/filip_wyrembak/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="mailto:filip@astraflow.tech"
              aria-label="Email"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Mail size={20} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
        <div className="text-center text-muted-foreground text-xs">
          © {new Date().getFullYear()} Filip Wyrembak. {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
