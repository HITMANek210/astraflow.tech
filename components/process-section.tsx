"use client";

import { FadeIn } from "./fade-in";
import { useI18n } from "@/lib/i18n";

export function ProcessSection() {
  const { t } = useI18n();

  const steps = [
    {
      number: t.process.steps.discovery.number,
      title: t.process.steps.discovery.title,
      description: t.process.steps.discovery.description,
    },
    {
      number: t.process.steps.strategy.number,
      title: t.process.steps.strategy.title,
      description: t.process.steps.strategy.description,
    },
    {
      number: t.process.steps.execution.number,
      title: t.process.steps.execution.title,
      description: t.process.steps.execution.description,
    },
  ];
  return (
    <section 
      id="process" 
      aria-labelledby="process-heading" 
      className="bg-card py-24 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 id="process-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            {t.process.title}
          </h2>
        </FadeIn>

        <div className="flex flex-col md:flex-row gap-8">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.15}>
              <div className={`flex-1 ${index < steps.length - 1 ? "md:border-r md:border-border md:pr-8" : ""}`}>
                <div className="text-5xl font-bold text-primary">{step.number}</div>
                <h3 className="text-xl font-semibold text-foreground mt-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
