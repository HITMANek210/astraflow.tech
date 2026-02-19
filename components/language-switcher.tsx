"use client";

import { useI18n } from "@/lib/i18n";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  fullWidth?: boolean;
}

export function LanguageSwitcher({ fullWidth = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useI18n();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pl" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-background/50 ${
        fullWidth ? "w-full justify-start" : ""
      }`}
      aria-label={`Switch to ${language === "en" ? "Polish" : "English"}`}
      title={`Switch to ${language === "en" ? "Polish" : "English"}`}
    >
      <Globe size={18} />
      <span className="uppercase">{language === "en" ? "PL" : "EN"}</span>
    </button>
  );
}
