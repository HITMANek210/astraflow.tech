type Language = "en" | "pl";

/**
 * Detects user's preferred language from Accept-Language header
 * Returns "en" for English, "pl" for Polish, defaults to "pl"
 */
export function detectLanguageFromHeader(acceptLanguage: string | null): Language {
  if (!acceptLanguage) {
    return "pl"; // Default to Polish
  }

  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,pl;q=0.8")
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, q = "q=1"] = lang.trim().split(";");
      const quality = parseFloat(q.replace("q=", "")) || 1;
      return {
        code: code.split("-")[0].toLowerCase(), // Extract base language code
        quality,
      };
    })
    .sort((a, b) => b.quality - a.quality); // Sort by quality

  // Find first supported language
  for (const lang of languages) {
    if (lang.code === "en") return "en";
    if (lang.code === "pl") return "pl";
  }

  // Default to Polish if no match
  return "pl";
}
