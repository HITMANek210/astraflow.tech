"use client";

import Link from "next/link";
import { FadeIn } from "./fade-in";
import { useI18n } from "@/lib/i18n";

export function FinalCta() {
  const { t } = useI18n();
  return (
    <section 
      id="booking" 
      aria-label="Book a call" 
      className="bg-gradient-to-r from-violet-600 to-primary py-24 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-balance">
            {t.finalCta.title}
          </h2>
          <Link
            href="/contact"
            className="bg-white text-background font-semibold hover:bg-white/90 px-8 py-3 rounded-lg mt-8 inline-block transition-colors"
          >
            {t.finalCta.bookCall}
          </Link>
          <p className="text-white/80 text-sm mt-4">
            {t.finalCta.description}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
