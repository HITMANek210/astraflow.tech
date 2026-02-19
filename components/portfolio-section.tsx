"use client";

import { ArrowRight, ExternalLink, TrendingUp, Clock, Users, X, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "./fade-in";
import { useI18n } from "@/lib/i18n";

export function PortfolioSection() {
  const { t } = useI18n();
  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="bg-background py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 id="portfolio-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t.portfolio.title}
          </h2>
          <p className="text-muted-foreground text-lg mb-12">{t.portfolio.subtitle}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <article className="bg-card rounded-lg p-8 md:p-12 border border-border hover:border-primary transition-colors">
            {/* Project Header */}
            <div className="mb-10 pb-8 border-b border-border">
              <div className="mb-4">
                <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest border border-primary/40 rounded-full px-3 py-1 bg-primary/5">
                  {t.portfolio.caseStudy}
                </span>
              </div>
              <div className="flex items-start gap-5">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border flex-shrink-0 bg-white p-2">
                  <Image
                    src="/favicon-nutritionist.png"
                    alt="Kornel Odchudza Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
                    {t.portfolio.nutritionist.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                    <span className="text-muted-foreground">
                      {t.portfolio.nutritionist.client}: <span className="text-foreground font-medium">{t.portfolio.nutritionist.clientName}</span>
                    </span>
                    <span className="hidden sm:inline text-border">•</span>
                    <a
                      href="https://kornelodchudza.pl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent transition-colors inline-flex items-center gap-1.5 font-medium"
                    >
                      kornelodchudza.pl
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* The Goal */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-foreground mb-3">{t.portfolio.nutritionist.goal}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {t.portfolio.nutritionist.goalDescription}
              </p>
            </div>

            {/* Before vs After */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Before */}
              <div className="bg-background/50 rounded-lg p-6 border border-border">
                <h5 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">{t.portfolio.nutritionist.before}</h5>
                <ul className="space-y-2.5 text-muted-foreground text-sm">
                  <li className="flex items-start gap-3">
                    <X size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{t.portfolio.nutritionist.beforeItems.manualCalculations}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{t.portfolio.nutritionist.beforeItems.limitedCapacity}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{t.portfolio.nutritionist.beforeItems.noScalability}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{t.portfolio.nutritionist.beforeItems.bottlenecked}</span>
                  </li>
                </ul>
              </div>

              {/* After */}
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/30">
                <h5 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">{t.portfolio.nutritionist.after}</h5>
                <ul className="space-y-2.5 text-muted-foreground text-sm">
                  <li className="flex items-start gap-3">
                    <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{t.portfolio.nutritionist.afterItems.digitalAuthority}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{t.portfolio.nutritionist.afterItems.algorithmicEngine}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{t.portfolio.nutritionist.afterItems.platformUSP}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{t.portfolio.nutritionist.afterItems.leadMagnet}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* The Strategy */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-foreground mb-3">{t.portfolio.nutritionist.solution}</h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.portfolio.nutritionist.solutionDescription}
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <h6 className="text-sm font-semibold text-foreground mb-2">{t.portfolio.nutritionist.solutionItems.algorithmicEngine.title}</h6>
                  <p className="text-xs text-muted-foreground">
                    {t.portfolio.nutritionist.solutionItems.algorithmicEngine.description}
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <h6 className="text-sm font-semibold text-foreground mb-2">{t.portfolio.nutritionist.solutionItems.patientPanel.title}</h6>
                  <p className="text-xs text-muted-foreground">
                    {t.portfolio.nutritionist.solutionItems.patientPanel.description}
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <h6 className="text-sm font-semibold text-foreground mb-2">{t.portfolio.nutritionist.solutionItems.brandInfrastructure.title}</h6>
                  <p className="text-xs text-muted-foreground">
                    {t.portfolio.nutritionist.solutionItems.brandInfrastructure.description}
                  </p>
                </div>
              </div>
            </div>

            {/* The Results */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 border border-primary/20">
              <h4 className="text-lg font-semibold text-foreground mb-6">{t.portfolio.nutritionist.result}</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    <Users className="text-primary" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">200+</div>
                  <div className="text-sm text-muted-foreground">{t.portfolio.nutritionist.results.activeUsers}</div>
                  <div className="text-xs text-muted-foreground/80 mt-1">{t.portfolio.nutritionist.results.activeUsersDesc}</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">90%</div>
                  <div className="text-sm text-muted-foreground">{t.portfolio.nutritionist.results.timeReduction}</div>
                  <div className="text-xs text-muted-foreground/80 mt-1">{t.portfolio.nutritionist.results.timeReductionDesc}</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    <TrendingUp className="text-primary" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">∞</div>
                  <div className="text-sm text-muted-foreground">{t.portfolio.nutritionist.results.scalability}</div>
                  <div className="text-xs text-muted-foreground/80 mt-1">{t.portfolio.nutritionist.results.scalabilityDesc}</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-border">
              <Link
                href="/contact"
                className="text-primary hover:text-accent transition-colors inline-flex items-center gap-2 font-medium"
              >
                {t.portfolio.nutritionist.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        </FadeIn>
      </div>
    </section>
  );
}
