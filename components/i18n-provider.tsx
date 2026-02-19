"use client";

import { I18nProvider as BaseI18nProvider } from "@/lib/i18n";
import { ReactNode } from "react";

type Language = "en" | "pl";

export function I18nProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage: Language;
}) {
  return <BaseI18nProvider initialLanguage={initialLanguage}>{children}</BaseI18nProvider>;
}
