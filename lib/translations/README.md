# Translation Guide

This project uses a simple and clean i18n (internationalization) system that makes it easy to add new languages.

## Current Languages

- **English (en)** - `lib/translations/en.ts`
- **Polish (pl)** - `lib/translations/pl.ts`

## How to Add a New Language

### Step 1: Create Translation File

Create a new file in `lib/translations/` with the language code (e.g., `de.ts` for German, `fr.ts` for French).

### Step 2: Copy Structure

Copy the entire structure from `en.ts` and translate all the strings:

```typescript
export const translations = {
  nav: {
    about: "Your translation here",
    // ... etc
  },
  // ... rest of the structure
};

export type Translations = typeof translations;
```

### Step 3: Register Language

In `lib/i18n.ts`:

1. Import your new translation file:
```typescript
import { translations as de } from "./translations/de";
```

2. Add it to the `Language` type:
```typescript
type Language = "en" | "pl" | "de";
```

3. Add it to the `translationsMap`:
```typescript
const translationsMap: Record<Language, Translations> = {
  en,
  pl,
  de, // Add your new language
};
```

### Step 4: Update Language Switcher (Optional)

The language switcher in `components/language-switcher.tsx` will automatically work with any language you add, as it toggles between all available languages.

## Usage in Components

Use the `useI18n()` hook in any component:

```typescript
import { useI18n } from "@/lib/i18n";

function MyComponent() {
  const { t, language, setLanguage } = useI18n();
  
  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>Current language: {language}</p>
    </div>
  );
}
```

## Translation Structure

The translation object is organized by sections:
- `nav` - Navigation items
- `hero` - Hero section content
- `about` - About section
- `services` - Services section
- `process` - Process section
- `portfolio` - Portfolio section
- `credentials` - Credentials section
- `finalCta` - Final CTA section
- `contact` - Contact page and form
- `footer` - Footer content
- `common` - Common strings

## Best Practices

1. **Keep structure consistent** - All translation files must have the same structure
2. **Use descriptive keys** - Make keys self-documenting (e.g., `hero.title` not `h1`)
3. **Maintain context** - Keep related translations grouped together
4. **Test thoroughly** - After adding a language, test all pages and components

## Default Language

The default language is set to Polish (`pl`) in `lib/i18n.ts`. You can change this by modifying:

```typescript
const [language, setLanguageState] = useState<Language>("pl");
```

The user's language preference is saved in `localStorage` and persists across sessions.
