# Tech Blog Theme Design Spec

**Date:** 2026-05-16  
**Project:** Personal tech blog (Astro 6)  
**Audience:** Beginner to advanced developers  
**Purpose:** Personal brand building, lead generation, sharing web dev & Linux tips

---

## Design Principles

- **Technical & Authoritative:** Dark theme, code-centric aesthetic, professional polish
- **Approachable:** Clean, minimal design that welcomes all skill levels
- **Readable:** Generous font sizes (18px base) and line height (1.7) for comfortable reading
- **Conversion-Focused:** Clear CTAs, newsletter signup, social integration

---

## Color Palette

| Element | Color | Usage |
|---------|-------|-------|
| Background | #0f0f0f | Main page background |
| Text | #e0e0e0 | Body text, readable contrast |
| Accent | #ff9500 | Links, buttons, featured borders, highlights |
| Borders | #333333 | Subtle dividers, borders |
| Code Background | #1a1a1a | Code block background |

---

## Typography

**Font Stack:**
- **Headings:** Inter, Poppins, or system sans-serif
- **Body:** Inter, -apple-system, Segoe UI, or system sans-serif
- **Code:** Fira Code, JetBrains Mono, or system monospace

**Font Sizes:**
- Body text: **18px**
- H1 (page title): **48px**
- H2 (section heading): **32px**
- H3 (subsection): **24px**
- H4: **20px**
- Code blocks: **16px**
- Navigation/UI: **16-18px**

**Line Height:** 1.7 (generous for readability)  
**Letter Spacing:** Slight increase on headings for elegance

---

## Layout Architecture

### Global Navigation
- **Header:** Logo/site name + horizontal navigation
- **Nav items:** Home, Blog, About, Resources, Reading
- **Fixed or sticky:** Sticky recommended for accessibility
- **Mobile:** Hamburger menu for responsive

### Homepage

**Two-column layout (desktop) / Single-column (mobile):**

**Left column (main content):**
1. **Tagline/Intro section** (2-3 lines)
   - Brief description of blog purpose and author
   - Who this is for
   
2. **Featured articles** (3 cards in responsive grid)
   - Featured image (landscape, 16:9 ratio)
   - Orange accent border on top
   - Title (bold, large)
   - Excerpt (2-3 lines)
   - Date + reading time
   - Category tag (orange background)
   - Hover effect: subtle shadow/glow
   
3. **Blog post list** (recent posts below featured)
   - Grid or stacked cards
   - Featured image thumbnail
   - Title, excerpt, date, category, reading time
   - Click to read full article

**Right sidebar (sticky):**
1. **Search input** (search across all posts)
2. **Newsletter signup** (headline + email input + CTA button in orange)
3. **Categories/Tags** (clickable filters, highlight selected)
4. **Social links** (GitHub, Twitter, LinkedIn, etc. - icons with hover effects)

---

### About Page

**Single-column layout, centered content**

1. **Hero section**
   - Name/title
   - Professional photo (optional, left-aligned)
   
2. **Bio**
   - 2-3 paragraphs about expertise and mission
   - Why follow this blog
   
3. **Skills section**
   - Grid or list of technical skills
   - Organized by category (Languages, Frameworks, Tools, etc.)
   
4. **CTA section**
   - "Let's work together" or "Get my tips"
   - Newsletter signup or contact form
   - Orange accent button
   
5. **Social links**
   - Same styling as homepage sidebar

---

### Resources Page

**Single-column card layout or two-column**

**Structure:**
- Intro paragraph explaining the page
- Resources organized by **category** (Web Dev Tools, Linux Tools, DevOps, Productivity, etc.)

**Each resource card includes:**
- Resource/tool name
- Category badge (orange)
- Description (1-2 sentences)
- Optional personal notes (why you use it, alternatives)
- Link to resource (orange button or styled link)

**Example:**
```
Web Development Tools
├─ VS Code - Lightweight code editor - Perfect for web dev - Notes: Extensions make it powerful
├─ Prettier - Code formatter - Keeps code consistent automatically
└─ ...
```

---

### Reading Page

**Card grid or list view**

**Structure:**
- "Currently Reading" section
- "Finished" section

**Each book card shows:**
- Book cover image
- Title + Author
- Your rating (stars or quick take: "Loved it", "Good reference", etc.)
- Optional personal notes/thoughts
- Publication year
- Link to Goodreads or purchase link

---

### Blog Post Page

**Single column with right sidebar**

**Header:**
- Full-width featured image
- Title (H1, very large)
- Meta: Date, author, category tags, reading time
- Social share buttons (Twitter, LinkedIn, copy link)

**Body:**
- Markdown rendered with consistent typography
- Table of contents (auto-generated from headings, sticky on scroll)
- Code blocks with syntax highlighting + copy button
- YouTube embeds (responsive, full-width up to 800px)
- Callout boxes (Note, Warning, Tip) with orange left border

**Right sidebar:**
- Table of contents (sticky)
- Related posts (3-4 based on tags)
- Newsletter signup CTA
- Reading time estimation

**Footer:**
- Newsletter CTA: "Get new tips in your inbox"
- Social share buttons

---

## Component Specifications

### Featured Article Card
- **Image:** Landscape (16:9), full-width in card
- **Border:** Orange accent border (top or left, 4px)
- **Title:** H2 size (32px), bold, clickable
- **Excerpt:** 2 lines, truncated
- **Meta:** Date + reading time (small, gray)
- **Category:** Orange badge with rounded corners
- **Hover effect:** Subtle shadow lift, orange glow optional
- **Spacing:** 16px padding inside card

### Blog Post Card (in list)
- **Layout:** Horizontal (image left, content right on desktop)
- **Image:** Square or 4:3 ratio thumbnail
- **Title:** H3 size (24px), clickable
- **Excerpt:** 2-3 lines
- **Meta:** Date, category, reading time
- **Mobile:** Stack vertically (image on top)

### Code Block
- **Background:** #1a1a1a (darker than page)
- **Language badge:** Top-right corner ("js", "python", "bash", etc.)
- **Copy button:** Top-right, orange accent on hover
  - Text: "Copy"
  - Icon: Optional copy icon
  - Feedback: "Copied!" message briefly
- **Syntax highlighting:** Dark theme compatible colors
- **Line numbers:** Optional, can be toggled
- **Overflow:** Horizontal scroll on long lines
- **Font size:** 16px, monospace
- **Padding:** 16px

### Newsletter Signup Box
- **Headline:** "Get web dev & Linux tips"
- **Description:** 1 line (optional)
- **Email input:** Full-width
- **Button:** Orange (#ff9500) with hover effect
- **Success message:** "Check your inbox!"
- **Styling:** Light background card (slightly lighter than page bg)

### Category/Tag Filter
- **Display:** Clickable pills or list
- **Default style:** Gray text, no background
- **Active/selected:** Orange background, white text
- **Hover:** Orange background
- **Interaction:** Filter blog posts immediately

### Social Links
- **Icons:** Simple, clean (use Font Awesome or similar)
- **Colors:** White/light gray default, orange on hover
- **Platforms:** GitHub, Twitter, LinkedIn (add others as needed)
- **Size:** Consistent across page

---

## Interactive Features

### Code Block Copy Button
- **Trigger:** Click "Copy" button
- **Action:** Copy code to clipboard
- **Feedback:** Button text changes to "Copied!" for 2 seconds
- **Visual:** Orange accent on button
- **Accessibility:** Keyboard accessible (Tab + Enter)

### YouTube Embed
- **Display:** Responsive iframe
- **Sizing:** Full-width up to 800px max-width
- **Aspect ratio:** 16:9
- **Fallback:** Link to YouTube if iframe not available

### Search
- **Scope:** Search post titles, excerpts, and tags
- **Results:** Display matching posts below search box
- **Live:** Search as you type (debounced)
- **Clearing:** X button to clear search

### Category Filter
- **Scope:** Filter homepage blog posts by category
- **Interaction:** Click category → posts update
- **Multiple select:** Allow selecting multiple categories (AND/OR logic TBD)
- **Clear filters:** "Clear all" or "Reset" button

---

## Responsive Design

### Desktop (1200px+)
- Two-column layout (content + sidebar)
- Featured cards: 3 in a row
- Blog cards: 2 in a row

### Tablet (768px - 1199px)
- Featured cards: 2 in a row
- Blog cards: 1 or 2 per row
- Sidebar: Below content or collapsible

### Mobile (under 768px)
- Single column
- Sidebar: Below main content
- Featured cards: Stack vertically
- Navigation: Hamburger menu
- Code blocks: Horizontal scroll for long lines

---

## Accessibility

- **Contrast:** Text meets WCAG AA standards (#e0e0e0 on #0f0f0f ≥ 4.5:1)
- **Font size:** Large base (18px) supports readability
- **Focus states:** Clear, orange-accented focus indicators
- **Semantic HTML:** Proper heading hierarchy, landmarks
- **Keyboard navigation:** All interactive elements accessible via Tab
- **Images:** Alt text for all meaningful images
- **Captions:** Optional captions for YouTube embeds
- **Skip link:** Skip to main content link

---

## Technical Notes

- **Framework:** Astro 6
- **Styling:** CSS (or Tailwind if preferred)
- **Code highlighting:** Astro's built-in Shiki or Prism
- **Form handling:** Newsletter signup → email service (ConvertKit, Beehiiv, etc.)
- **Search:** Client-side search or external service (Algolia, etc.)
- **Image optimization:** Astro's Image component for optimization
- **Performance:** Aim for <3s Largest Contentful Paint, <50ms First Input Delay

---

## Content Structure

### Featured Posts
- Managed via frontmatter `featured: true` flag in markdown
- Shows up to 3 featured posts on homepage
- Featured posts also appear in blog list

### Tags/Categories
- Each post has: `category` (single) and `tags` (array)
- Filterable on homepage
- Display on post cards and blog post pages

### Blog Post Frontmatter
```yaml
---
title: "Post Title"
date: 2026-05-16
author: "Jeremy Moore"
category: "Web Dev" or "Linux"
tags: ["astro", "tailwind", "deployment"]
featured: false
excerpt: "Brief excerpt..."
image: "./image.jpg"
readingTime: "5 min read"
---
```

---

## Success Metrics

- **Readability:** Larger font size (18px) adopted, comfortable for long-form reading
- **Lead generation:** Newsletter signup visible and accessible on every page
- **Engagement:** Social links prominent, featured posts highlighting best content
- **Technical credibility:** Code blocks with copy buttons, YouTube embeds, clean design
- **Conversion:** Clear CTAs on About and Resources pages

---

## Next Steps

1. Implement core layout with Astro components
2. Set up Tailwind CSS or CSS modules for styling
3. Create reusable components (BlogCard, FeaturedCard, CodeBlock, etc.)
4. Implement search and filtering logic
5. Set up content collection for blog posts
6. Add newsletter integration
7. Testing and refinement
