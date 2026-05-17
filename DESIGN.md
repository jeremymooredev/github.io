# Design System

## Color

**Strategy:** Restrained with intentional orange accents (≤15% of surface). Dark theme for developer credibility.

**Palette (OKLCH-influenced, accessible hex):**
- **Background:** `#0f0f0f` (near-black, slightly tinted)
- **Surface:** `#1a1a1a` (elevated surfaces, cards, header)
- **Border:** `#333333` (subtle dividers)
- **Text:** `#e0e0e0` (high contrast, comfortable to read)
- **Accent:** `#ff9500` (orange—energy, CTAs, highlights ≤15%)

**Rationale:** Dark theme suits developers; orange lifts the design from generic "dark tech" without being aggressive.

## Typography

**System Fonts:**
- **Headings:** Inter, -apple-system, sans-serif (18px base, 1.7 line-height from Tailwind)
- **Body:** Same as headings
- **Code:** Menlo, Monaco, monospace

**Scale (cap body at 65–75ch for readability):**
- **H1:** 48px (2.67× base)
- **H2:** 32px (1.78×)
- **H3:** 24px (1.33×)
- **Body:** 18px (base)
- **Small:** 14px

**Hierarchy via weight + size contrast.** No gradient text, no decorative sizing.

## Spacing & Rhythm

**Grid:** 8px base. Padding/margins in 8px increments or 1rem (18px) for prose.

**Key distances:**
- **Card padding:** 1.5rem
- **Section gap:** 2rem–3rem (mb-12 for visual rhythm)
- **Inline spacing:** 0.5rem–1rem

**Variation over uniformity:** Not every edge has the same margin. Cards/sections breathe differently.

## Components

### Header
- **Background:** `#1a1a1a` (darker than page, creates separation)
- **Border-bottom:** 1px solid `#333333`
- **Sticky:** z-50, top: 0
- **Text:** Logo 2xl bold, nav items 16–18px, orange on hover/active
- **Padding:** 1rem (py-4 px-4) — enough to breathe

### Cards
- **Background:** `#1a1a1a`
- **Border:** 1px solid `#333333`
- **Padding:** 1.5rem
- **Rounded:** 0.5rem
- **Hover:** subtle shadow, no scale transform (prevents layout shift)

### Buttons
- **Primary (CTA):** `#ff9500` bg, dark text, 0.5rem pad, 600 weight
- **Secondary:** orange border + text, dark bg on hover
- **No rounded:** `border-radius: 0.5rem` (0.375rem if more subtle desired)

### Code Blocks
- **Background:** `#1a1a1a`
- **Text:** `#e0e0e0`
- **Accent (code keywords):** `#ff9500`
- **Padding:** 1rem
- **Font:** 16px monospace
- **Copy button:** orange, "Copied!" confirmation

## Layout

### Homepage
- **Header:** Sticky, full-width, `#1a1a1a` bg
- **Hero/intro:** Centered, 2-3 lines, max-width 2xl
- **Featured posts:** 2-col grid, orange left border on cards
- **Recent posts:** vertical stack, card style
- **Sidebar (desktop):** sticky, search → newsletter → categories → socials
- **All:** max-w-6xl container, centered

### Blog Post
- **Header image:** Full-width, rounded-lg
- **Title:** h1 (48px), dark text
- **Metadata:** date, reading time, category (orange badge), tags
- **Prose:** max 65–75ch for readability
- **Code blocks:** full-width within prose, copy button
- **Sidebar:** sticky TOC, related posts, social links
- **Share buttons:** Twitter, LinkedIn, copy link (orange on hover)

## Motion

**Transitions:** 0.2s ease-out on color, opacity, underline only. No layout shifts.

**Hover effects:**
- Links: underline
- Buttons: opacity shift or color shift
- Cards: subtle shadow increase (no scale)

**No:** animations on layout props, bounce/elastic easing, decorative motion.

## Edge Cases & Assertions

- **Transparent header fix:** Header must use `#1a1a1a`, not `#0f0f0f` (was same as page bg).
- **No side-stripe borders:** Only full borders or background tints.
- **No nested cards:** Cards are the leaf component.
- **Headings always visible:** No transparent overlays; header has solid bg.
- **Prose max-width:** Body text capped at 65–75ch (prevents reading fatigue).
