# Implementation Kickstart Plan

## Project Overview

Single-page dark minimalist portfolio for a personal branding consultant. One conversion goal: **"Book a Strategy Call"** -- every CTA funnels to `#booking` (placeholder). Static site, no database or backend needed.

---

## Decisions Made

| Decision | Answer |
|---|---|
| Name / tagline | "Filip Wyrembak" / "Building brands that command attention" |
| Booking URL | `#booking` placeholder |
| Profile / headshot images | Generate with `GenerateImage` tool |
| Portfolio content | Realistic placeholder case studies |
| Favicon | Generate a purple gradient "A" icon |

---

## Current Codebase Snapshot

| File | Status | Notes |
|---|---|---|
| `app/page.tsx` | Empty (`return null`) | Will compose all sections here |
| `app/layout.tsx` | Default starter | Uses Geist fonts -- must swap to Inter |
| `app/globals.css` | Default shadcn light/dark tokens | Must override with dark-first purple theme |
| `tailwind.config.ts` | Default shadcn config | Must add custom color tokens + font family |
| `next.config.mjs` | Minimal config | No changes needed |
| `package.json` | Has lucide-react, next 16, react 19 | Must add `framer-motion` |
| `components/ui/*` | Empty (no shadcn components installed yet) | Will use shadcn Button only if needed |
| `lib/utils.ts` | Has `cn()` helper | No changes needed |

---

## New Dependency

| Package | Purpose |
|---|---|
| `framer-motion` | Subtle scroll-triggered fade-in animations |

No other new packages needed. `lucide-react` is already installed for icons.

---

## Design System (Theme Tokens)

### Color Palette (5 colors)

| Role | Token Name | HSL Value | Hex Equivalent | Usage |
|---|---|---|---|---|
| Background | `--background` | `0 0% 4%` | `#0A0A0A` | Page background, primary sections |
| Card / Surface | `--card` | `0 0% 10%` | `#1A1A1A` | Alternating section backgrounds, cards |
| Accent | `--primary` | `263 70% 76%` | `#A78BFA` | CTAs, borders, highlights, interactive elements |
| Accent hover | `--ring` | `258 90% 66%` | `#8B5CF6` | Hover states, focused accents |
| Text primary | `--foreground` | `0 0% 100%` | `#FFFFFF` | Headings, primary text |

Additional text tokens:
- `--muted-foreground`: `0 0% 90%` (`#E5E5E5`) -- body text
- `--muted`: `0 0% 16.5%` (`#2A2A2A`) -- subtle borders, dividers

### Typography

- **Font**: Inter (Google Fonts) -- single font family
- **Weights**: 400 (body), 500 (labels), 600 (subheadings), 700 (headings)
- Applied via `next/font/google` in `layout.tsx`, mapped to `font-sans` in Tailwind config

---

## File-by-File Changes

### 1. `app/globals.css` -- Override theme tokens

**What changes:**
- Replace `:root` light theme values with the dark palette as the default (no `.dark` class needed -- the site is dark-only)
- Set `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--card`, `--card-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--border`, `--input`, `--ring` to the dark purple palette values
- Remove the body `font-family: Arial` line (Inter will come from `next/font`)
- Keep `@layer base` rules for `border-border` and `bg-background text-foreground`

**Key token mappings:**
```
--background: 0 0% 4%          /* #0A0A0A deep charcoal */
--foreground: 0 0% 100%        /* #FFFFFF white text */
--card: 0 0% 10%               /* #1A1A1A dark grey surfaces */
--card-foreground: 0 0% 100%   /* #FFFFFF */
--primary: 263 70% 76%         /* #A78BFA purple accent */
--primary-foreground: 0 0% 100% /* #FFFFFF text on purple */
--secondary: 0 0% 10%          /* #1A1A1A */
--secondary-foreground: 0 0% 90% /* #E5E5E5 */
--muted: 0 0% 16.5%            /* #2A2A2A */
--muted-foreground: 0 0% 90%   /* #E5E5E5 body text */
--accent: 258 90% 66%          /* #8B5CF6 darker purple */
--accent-foreground: 0 0% 100% /* #FFFFFF */
--border: 0 0% 16.5%           /* #2A2A2A subtle borders */
--input: 0 0% 16.5%            /* #2A2A2A */
--ring: 258 90% 66%            /* #8B5CF6 focus ring */
```

### 2. `tailwind.config.ts` -- Add font family

**What changes:**
- Add `fontFamily: { sans: ['var(--font-inter)'] }` under `theme.extend`
- All existing color/radius/animation config stays as-is (colors already reference CSS vars)

### 3. `app/layout.tsx` -- Swap font, update metadata

**What changes:**
- Replace `Geist` / `Geist_Mono` imports with `Inter` from `next/font/google`
- Configure Inter with `subsets: ['latin']`, `variable: '--font-inter'`, `weight: ['400', '500', '600', '700']`
- Apply `className={inter.variable}` to `<html>`
- Update metadata: `title: "Your Name | Personal Branding Consultant"`, `description: "..."`, proper `themeColor: '#0A0A0A'`
- Add favicon reference (after generating the image)

### 4. `app/page.tsx` -- Compose all sections

**What it becomes:**
```tsx
import { HeroSection } from "@/components/hero-section"
import { AboutIntro } from "@/components/about-intro"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { CredentialsSection } from "@/components/credentials-section"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <HeroSection />
      <AboutIntro />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <CredentialsSection />
      <FinalCta />
      <Footer />
    </main>
  )
}
```

---

## Component Specifications

### Shared: `components/fade-in.tsx` -- Scroll animation wrapper

- Client component using Framer Motion
- Uses `useInView` hook + `motion.div` with `opacity` and `translateY` animation
- Props: `children`, `delay?` (number), `className?`
- All section components wrap their content in `<FadeIn>` for consistent entrance animation

---

### Section 1: `components/hero-section.tsx`

**Layout:** Full viewport height (`min-h-screen`), flex column, centered content
**Background:** `bg-background` (#0A0A0A)

**Content (top to bottom):**
1. Large bold name: `text-5xl md:text-7xl font-bold text-foreground tracking-tight text-balance` -- "Filip Wyrembak"
2. Tagline: `text-lg md:text-xl text-muted-foreground mt-4` -- "Helping leaders build personal brands that open doors"
3. Two CTA buttons side by side (`flex gap-4 mt-8`):
   - Primary: `bg-primary text-primary-foreground hover:bg-accent` -- "Book a Call" links to `#booking`
   - Secondary: `border border-primary text-primary hover:bg-primary/10` -- "View My Process" scrolls to `#process`
4. Social icons row (`flex gap-6 mt-8`): LinkedIn, Mail, (optional GitHub) -- `text-foreground hover:text-primary transition-colors`, 20px Lucide icons
5. Scroll indicator: `ChevronDown` icon in `text-primary`, subtle bounce animation via Framer Motion

**Accessibility:** `<section aria-label="Hero">`, buttons as `<a>` tags with proper href, sr-only labels on icon links

---

### Section 2: `components/about-intro.tsx`

**Layout:** Two-column asymmetric (`flex flex-col lg:flex-row gap-12 items-center`), max-width container, generous padding
**Background:** `bg-card` (#1A1A1A)

**Left column (wider, ~60%):**
- Bold statement block with `bg-primary/10 border-l-4 border-primary p-8 rounded-r-lg`
- Statement text: `text-2xl md:text-3xl font-bold text-foreground leading-relaxed` -- "Building brands that command attention and drive results"

**Right column (~40%):**
- Generated professional headshot image (`rounded-lg`, `ring-2 ring-primary/30`)
- Below image: 2-3 lines of descriptive text in `text-muted-foreground` explaining the consultant's unique approach

**Accessibility:** `<section aria-labelledby="about-heading">`, alt text on image

---

### Section 3: `components/services-section.tsx`

**Layout:** Single column, max-width container
**Background:** `bg-background` (#0A0A0A)

**Content:**
- Section title: "What I Offer" -- `text-3xl md:text-4xl font-bold text-foreground mb-12`
- 3-4 service items stacked vertically, each is a `group` div:
  - Flex row: service name (`text-xl font-semibold text-foreground`) + `ArrowRight` icon in `text-primary` at far right
  - Description below: `text-muted-foreground text-base`
  - Divider: `border-b border-border` between items
  - Hover: `group-hover:border-primary transition-colors` on the border, subtle translate on arrow

**Placeholder services:**
1. "Brand Strategy & Positioning" -- Define your unique value and market position
2. "Content & Thought Leadership" -- Build authority through strategic content
3. "Digital Presence Optimization" -- Align every touchpoint with your brand
4. "Executive Coaching" -- One-on-one guidance for lasting impact

**Accessibility:** `<section aria-labelledby="services-heading">`

---

### Section 4: `components/process-section.tsx`

**Layout:** Three columns on desktop, stacked on mobile (`flex flex-col md:flex-row gap-8`)
**Background:** `bg-card` (#1A1A1A)
**ID:** `id="process"` (scroll target from hero)

**Content:**
- Section title: "How We'll Work Together" -- same heading style as services
- 3 step cards, each:
  - Large number: `text-5xl font-bold text-primary` -- "01", "02", "03"
  - Title: `text-xl font-semibold text-foreground mt-4`
  - Description: `text-muted-foreground mt-2 leading-relaxed`
  - Vertical dividers between steps on desktop: `border-r border-border` (not on last item)

**Placeholder steps:**
1. "Discovery" -- We dive deep into your goals, audience, and current positioning
2. "Strategy" -- I craft a tailored brand blueprint with clear milestones
3. "Execution" -- We implement together, refining as results come in

**Accessibility:** `<section aria-labelledby="process-heading">`, ordered list semantics

---

### Section 5: `components/portfolio-section.tsx`

**Layout:** 2-3 column grid on desktop (`grid md:grid-cols-2 lg:grid-cols-3 gap-6`)
**Background:** `bg-background` (#0A0A0A)

**Content:**
- Section title: "Recent Work"
- 3 project cards, each:
  - `bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors`
  - Project name: `text-lg font-semibold text-foreground`
  - Description: `text-muted-foreground mt-2`
  - "View Details" link at bottom: `text-primary hover:underline mt-4 inline-flex items-center gap-1` + small `ArrowRight` icon -- links to `#booking`

**Placeholder projects:**
1. "SaaS Founder Rebrand" -- Repositioned a B2B founder from unknown to keynote speaker in 6 months
2. "Executive LinkedIn Strategy" -- Grew a VP's LinkedIn following from 2K to 45K with a content-first approach
3. "Personal Brand Launch" -- Built a coach's brand from zero to a fully booked consulting practice

**Accessibility:** `<section aria-labelledby="portfolio-heading">`, each card as an `<article>`

---

### Section 6: `components/credentials-section.tsx`

**Layout:** Two-column (`flex flex-col lg:flex-row gap-12 items-center`)
**Background:** `bg-card` (#1A1A1A)

**Left column (~40%):**
- Circular profile photo: `rounded-full w-48 h-48 object-cover ring-4 ring-primary`
- Social links below: row of icon links (LinkedIn, Mail) -- same style as hero
- "Hire Me" button: `bg-primary text-primary-foreground` -- links to `#booking`

**Right column (~60%):**
- Small label: `text-primary text-sm font-medium uppercase tracking-widest mb-2` -- "Hello"
- Brief personal intro: 2-3 paragraphs in `text-muted-foreground leading-relaxed`
- Stats row (`flex gap-8 mt-8`): 3 stat blocks, each with:
  - Number: `text-3xl font-bold text-primary` -- "10+", "50+", "100%"
  - Label: `text-sm text-muted-foreground` -- "Years Experience", "Projects Completed", "Happy Clients"

**Accessibility:** `<section aria-labelledby="credentials-heading">`, alt text on photo, sr-only labels

---

### Section 7: `components/final-cta.tsx`

**Layout:** Full-width, centered content, generous vertical padding
**Background:** Gradient from `#7C3AED` to `#A78BFA` (solid purple gradient) via `bg-gradient-to-r from-violet-600 to-primary` -- using custom classes since this is the one intentional gradient
**ID:** `id="booking"` (anchor target for all CTAs)

**Content:**
- Headline: `text-3xl md:text-5xl font-bold text-white text-balance` -- "Ready to Build Your Authority?"
- White button with dark text: `bg-white text-background font-semibold hover:bg-white/90 px-8 py-3 rounded-lg mt-8` -- "Book Your Strategy Call"
- Reassurance text: `text-white/80 text-sm mt-4` -- "Free 30-minute consultation. No strings attached."

**Accessibility:** `<section aria-label="Book a call">`

---

### Section 8: `components/footer.tsx`

**Layout:** Three columns on desktop, stacked on mobile
**Background:** `bg-background` (#0A0A0A), with `border-t border-border`

**Content:**
- Left: Placeholder logo text or "A" in `text-primary font-bold text-xl`
- Center: "Built by Filip Wyrembak" in `text-muted-foreground text-sm`
- Right: Social icon links (same style as elsewhere)
- Below: Copyright line `text-muted-foreground text-xs` centered

**Accessibility:** `<footer>` element, sr-only labels on links

---

## Generated Image Assets

| Asset | Tool | Saved To | Prompt Summary |
|---|---|---|---|
| Professional headshot | `GenerateImage` | `public/images/headshot.jpg` | Professional portrait photo, neutral background, warm lighting, business casual |
| Circular profile photo | Same image reused | (same file, styled with CSS `rounded-full`) | -- |
| Favicon | `GenerateImage` | `public/favicon.jpg` | Abstract purple gradient "A" lettermark icon, dark background, minimal |

---

## Build Order

This is a single cohesive page, so it will be built as **one task** (no todo list needed):

1. **Theme setup** -- `globals.css` token overrides, `tailwind.config.ts` font family
2. **Layout update** -- `layout.tsx` with Inter font, metadata, favicon
3. **Generate images** -- headshot + favicon via `GenerateImage`
4. **Shared utility** -- `components/fade-in.tsx` scroll animation wrapper
5. **Build all 8 section components** -- in order from hero to footer
6. **Compose in `page.tsx`** -- import and stack all sections
7. **Add `framer-motion`** -- will be auto-installed when added to imports in package.json

---

## Files Created / Modified Summary

| Action | File |
|---|---|
| MODIFY | `app/globals.css` |
| MODIFY | `tailwind.config.ts` |
| MODIFY | `app/layout.tsx` |
| MODIFY | `app/page.tsx` |
| CREATE | `components/fade-in.tsx` |
| CREATE | `components/hero-section.tsx` |
| CREATE | `components/about-intro.tsx` |
| CREATE | `components/services-section.tsx` |
| CREATE | `components/process-section.tsx` |
| CREATE | `components/portfolio-section.tsx` |
| CREATE | `components/credentials-section.tsx` |
| CREATE | `components/final-cta.tsx` |
| CREATE | `components/footer.tsx` |
| CREATE | `public/images/headshot.jpg` |
| CREATE | `public/favicon.jpg` |

**Total: 4 modified files, 11 new files**

---

## What This Plan Does NOT Include (Out of Scope)

- No database, no API routes, no server actions
- No authentication
- No contact form (all CTAs link to external booking)
- No blog or dynamic content
- No dark/light mode toggle (dark-only by design)
- No analytics or tracking scripts
