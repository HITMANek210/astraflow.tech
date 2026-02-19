"use client";

import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <main>
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-background px-4 overflow-hidden pt-32 pb-24">
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

        <div className="max-w-2xl mx-auto relative z-10 w-full">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
              {t.contact.title}
            </h1>
            <p className="text-muted-foreground text-center mb-12 text-lg">
              {t.contact.description}
            </p>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>
      <Footer />
    </main>
  );
}
