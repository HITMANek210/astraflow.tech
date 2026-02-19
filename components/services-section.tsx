"use client";

import { FadeIn } from "./fade-in";
import { useI18n } from "@/lib/i18n";

export function ServicesSection() {
  const { t } = useI18n();

  const services = [
    {
      name: t.services.items.brandBuilding.name,
      description: t.services.items.brandBuilding.description,
    },
    {
      name: t.services.items.contentAuthority.name,
      description: t.services.items.contentAuthority.description,
    },
    {
      name: t.services.items.onlinePresence.name,
      description: t.services.items.onlinePresence.description,
    },
    {
      name: t.services.items.oneOnOne.name,
      description: t.services.items.oneOnOne.description,
    },
  ];
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-background py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            {t.services.title}
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {services.map((service, index) => (
            <FadeIn key={service.name} delay={index * 0.1}>
              <div className="group py-6 border-b border-border hover:border-primary transition-colors">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-base">
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
