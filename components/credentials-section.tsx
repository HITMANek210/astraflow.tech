"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, Instagram } from "lucide-react";
import { FadeIn } from "./fade-in";
import { useI18n } from "@/lib/i18n";

export function CredentialsSection() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="credentials-heading" className="bg-card py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 lg:flex-1 flex flex-col items-center lg:items-start">
              <div className="relative rounded-full w-[211px] h-[211px] ring-4 ring-primary overflow-hidden">
                <Image
                  src="/images/picture.jpg"
                  alt="Filip Wyrembak"
                  width={211}
                  height={211}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex gap-6 mt-6">
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

              <Link
                href="/contact"
                className="bg-primary text-primary-foreground hover:bg-accent px-8 py-3 rounded-lg font-semibold transition-colors mt-6"
              >
                {t.credentials.bookCall}
              </Link>
            </div>

            <div className="flex-1 lg:flex-[1.5]">
              <div className="text-primary text-sm font-medium uppercase tracking-widest mb-4">
                {t.credentials.greeting}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.credentials.description1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.credentials.description2}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.credentials.description3}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
