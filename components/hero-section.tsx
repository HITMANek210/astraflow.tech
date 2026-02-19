"use client";

import { ChevronDown, Linkedin, Mail, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { useI18n } from "@/lib/i18n";

export function HeroSection() {
  const { t } = useI18n();
  return (
    <section aria-label="Hero" className="relative min-h-screen flex flex-col items-center justify-center bg-background px-4 overflow-hidden pt-20 md:pt-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      {/* Decorative geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 border border-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 border border-primary/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <FadeIn>
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-[211px] h-[211px] md:w-[282px] md:h-[282px] rounded-full ring-4 ring-primary/30 overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/picture.jpg"
                  alt="Filip Wyrembak"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground tracking-tight text-balance"
              >
                {t.hero.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground mt-4 px-2 sm:px-0"
              >
                {t.hero.subtitle}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg text-muted-foreground/80 mt-3 max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0"
              >
                {t.hero.description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 justify-center lg:justify-start w-full sm:w-auto px-2 sm:px-0"
              >
                <Link
                  href="/contact"
                  className="bg-primary text-primary-foreground hover:bg-accent px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-center text-sm sm:text-base"
                >
                  {t.hero.bookCall}
                </Link>
                <Link
                  href="#process"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("process");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="border border-primary text-primary hover:bg-primary/10 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-center text-sm sm:text-base"
                >
                  {t.hero.viewProcess}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex gap-6 mt-8 justify-center lg:justify-start"
              >
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
              </motion.div>
            </div>
          </div>
        </div>
      </FadeIn>

      <motion.button
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={(e) => {
          const element = document.getElementById("about");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          // Remove focus after click to prevent focus ring from staying
          (e.currentTarget as HTMLButtonElement).blur();
        }}
        className="hidden md:block absolute bottom-8 text-primary z-10 cursor-pointer hover:text-primary/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full p-2"
        aria-label={t.hero.scrollToNext}
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  );
}
