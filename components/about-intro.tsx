"use client";

import { Target, Zap, Users, TrendingUp } from "lucide-react";
import { FadeIn } from "./fade-in";
import { useI18n } from "@/lib/i18n";

export function AboutIntro() {
  const { t } = useI18n();

  const differentiators = [
    {
      icon: Target,
      title: t.about.differentiators.clearFocus.title,
      description: t.about.differentiators.clearFocus.description,
    },
    {
      icon: Zap,
      title: t.about.differentiators.actionOriented.title,
      description: t.about.differentiators.actionOriented.description,
    },
    {
      icon: Users,
      title: t.about.differentiators.authenticApproach.title,
      description: t.about.differentiators.authenticApproach.description,
    },
    {
      icon: TrendingUp,
      title: t.about.differentiators.provenResults.title,
      description: t.about.differentiators.provenResults.description,
    },
  ];
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-card py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 id="about-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            {t.about.title}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {t.about.description}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="bg-background/50 border border-border rounded-lg p-6 hover:border-primary transition-colors group h-full flex flex-col">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed flex-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
