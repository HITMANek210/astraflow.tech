"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations as en } from "./translations/en";
import { translations as pl } from "./translations/pl";
import type { Translations } from "./translations/en";

type Language = "en" | "pl";

const translationsMap: Record<Language, Translations> = {
  en,
  pl,
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage: Language;
}) {
  // Start with detected language, will be updated on mount if localStorage has a preference
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    // On mount, check localStorage for user preference
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pl")) {
        // User has a saved preference, use it
        setLanguageState(savedLanguage);
      } else {
        // No saved preference, use detected language and save it for next time
        setLanguageState(initialLanguage);
        localStorage.setItem("language", initialLanguage);
      }
    }
  }, [initialLanguage]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    // Update HTML lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    // Update HTML lang attribute when language changes
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value: I18nContextType = {
    language,
    setLanguage,
    t: translationsMap[language],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
