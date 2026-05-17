# Tech Blog Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-themed, professional tech blog with featured articles, search, filtering, and lead generation capabilities in Astro 6.

**Architecture:** Component-driven Astro site with content collections for blog posts, resources, and books. Responsive layout with sidebar on desktop, stacked on mobile. Tailwind CSS for styling with custom dark theme and orange accents. Client-side search and filtering with newsletter integration.

**Tech Stack:** Astro 6, Tailwind CSS, TypeScript, Content Collections (Zod schema validation), Shiki syntax highlighting, responsive HTML/CSS

---

## File Structure

### Layout & Page Components
- `src/layouts/Base.astro` - Main layout with header, footer, global styles
- `src/layouts/BlogPost.astro` - Blog post template with TOC and sidebar
- `src/pages/index.astro` - Homepage (featured + blog list + sidebar)
- `src/pages/blog/index.astro` - Blog listing page
- `src/pages/blog/[slug].astro` - Individual blog post page
- `src/pages/about.astro` - About page
- `src/pages/resources.astro` - Resources page
- `src/pages/reading.astro` - Reading page

### Components (Reusable)
- `src/components/Header.astro` - Navigation header
- `src/components/Sidebar.astro` - Homepage sidebar (search, newsletter, tags)
- `src/components/Footer.astro` - Footer with social links
- `src/components/BlogCard.astro` - Blog post card for lists
- `src/components/FeaturedCard.astro` - Featured article card
- `src/components/CodeBlock.astro` - Syntax-highlighted code with copy button
- `src/components/NewsletterForm.astro` - Newsletter signup form
- `src/components/TableOfContents.astro` - Auto-generated TOC for blog posts
- `src/components/SearchInput.astro` - Search bar
- `src/components/CategoryFilter.astro` - Category/tag filter
- `src/components/SocialLinks.astro` - Social media icons
- `src/components/RelatedPosts.astro` - Related posts sidebar widget
- `src/components/YouTubeEmbed.astro` - Responsive YouTube iframe

### Content Collections
- `src/content/blog/` - Markdown files for blog posts
- `src/content/resources/` - Resources data (JSON or frontmatter)
- `src/content/reading/` - Books data (JSON or frontmatter)
- `src/content/config.ts` - Zod schemas for content validation

### Styles
- `src/styles/global.css` - Global styles, color variables, typography
- `src/styles/components.css` - Component-specific styles (optional, if not using Tailwind)

### Utilities & Config
- `src/utils/search.ts` - Client-side search logic
- `src/utils/formatting.ts` - Date, reading time, slug formatting
- `src/config.ts` - Site metadata, social links, constants
- `tailwind.config.js` - Tailwind configuration with custom colors
- `astro.config.mjs` - Astro configuration

---

## Task Breakdown

### Phase 1: Project Setup & Configuration

#### Task 1: Install Tailwind CSS and Configure Styling

**Files:**
- Modify: `package.json`
- Create: `tailwind.config.js`
- Create: `src/styles/global.css`
- Modify: `astro.config.mjs`

**Steps:**

- [ ] **Step 1: Install Tailwind CSS**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Expected: `tailwind.config.js` and `postcss.config.cjs` created

- [ ] **Step 2: Create Tailwind configuration with custom colors**

Replace `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: '#0f0f0f',
        'dark-lighter': '#1a1a1a',
        'dark-border': '#333333',
        'light-text': '#e0e0e0',
        'accent-orange': '#ff9500',
      },
      fontSize: {
        base: '18px',
      },
      lineHeight: {
        relaxed: '1.7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 3: Update Astro config for Tailwind**

Add to `astro.config.mjs`:

```javascript
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
});
```

- [ ] **Step 4: Create global styles**

Create `src/styles/global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-dark: #0f0f0f;
  --color-dark-lighter: #1a1a1a;
  --color-dark-border: #333333;
  --color-light-text: #e0e0e0;
  --color-accent-orange: #ff9500;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-dark text-light-text;
  font-size: 18px;
  line-height: 1.7;
}

a {
  @apply text-accent-orange hover:underline;
}

code {
  @apply font-mono text-sm;
}
```

- [ ] **Step 5: Install Tailwind plugin**

```bash
npm install -D @astrojs/tailwind
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "setup: configure tailwind css with custom dark theme"
```

---

#### Task 2: Create Site Configuration and Utilities

**Files:**
- Create: `src/config.ts`
- Create: `src/utils/formatting.ts`
- Create: `src/utils/search.ts`

**Steps:**

- [ ] **Step 1: Create site config**

Create `src/config.ts`:

```typescript
export const SITE_TITLE = 'Jeremy Moore';
export const SITE_DESCRIPTION = 'Web Development & Linux Tips for Developers';

export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
};

export const NEWSLETTER_CTA = {
  headline: 'Get web dev & Linux tips',
  description: 'New tips delivered to your inbox every week',
  placeholder: 'your@email.com',
  ctaText: 'Subscribe',
};

export const CATEGORIES = [
  'Web Dev',
  'Linux',
  'DevOps',
  'Frontend',
  'Backend',
  'Tools',
];
```

- [ ] **Step 2: Create formatting utilities**

Create `src/utils/formatting.ts`:

```typescript
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function extractExcerpt(content: string, length = 160): string {
  return content.substring(0, length).replace(/\n/g, ' ') + '...';
}
```

- [ ] **Step 3: Create search utility**

Create `src/utils/search.ts`:

```typescript
export interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export function searchPosts(
  posts: any[],
  query: string
): SearchResult[] {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return posts.filter(post => 
    post.data.title.toLowerCase().includes(lowerQuery) ||
    post.data.excerpt?.toLowerCase().includes(lowerQuery) ||
    post.data.tags?.some((tag: string) => 
      tag.toLowerCase().includes(lowerQuery)
    )
  );
}

export function filterByCategory(
  posts: any[],
  category: string
): any[] {
  if (!category) return posts;
  return posts.filter(post => post.data.category === category);
}
```

- [ ] **Step 4: Commit**

```bash
git add src/config.ts src/utils/formatting.ts src/utils/search.ts
git commit -m "feat: add site config and utility functions"
```

---

### Phase 2: Content Collections Setup

#### Task 3: Create Content Collection Schemas

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/blog/.gitkeep`
- Create: `src/content/resources/.gitkeep`
- Create: `src/content/reading/.gitkeep`

**Steps:**

- [ ] **Step 1: Create content collections config**

Create `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Jeremy Moore'),
    category: z.enum(['Web Dev', 'Linux', 'DevOps', 'Frontend', 'Backend', 'Tools']),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

const resourcesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    url: z.string().url(),
    notes: z.string().optional(),
  }),
});

const readingCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(['reading', 'finished']),
    rating: z.number().min(0).max(5).optional(),
    notes: z.string().optional(),
    year: z.number(),
    cover: z.string().optional(),
    link: z.string().url().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  resources: resourcesCollection,
  reading: readingCollection,
};
```

- [ ] **Step 2: Create empty content directories**

```bash
mkdir -p src/content/blog
mkdir -p src/content/resources
mkdir -p src/content/reading
touch src/content/blog/.gitkeep
touch src/content/resources/.gitkeep
touch src/content/reading/.gitkeep
```

- [ ] **Step 3: Commit**

```bash
git add src/content/config.ts src/content/
git commit -m "setup: create content collection schemas"
```

---

### Phase 3: Layout Components

#### Task 4: Create Base Layout Component

**Files:**
- Create: `src/layouts/Base.astro`
- Modify: `src/styles/global.css`

**Steps:**

- [ ] **Step 1: Create base layout**

Create `src/layouts/Base.astro`:

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const { title = 'Jeremy Moore', description = 'Web Dev & Linux Tips' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-dark text-light-text">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/Base.astro src/styles/global.css
git commit -m "feat: create base layout component"
```

---

#### Task 5: Create Header Component with Navigation

**Files:**
- Create: `src/components/Header.astro`

**Steps:**

- [ ] **Step 1: Create header component**

Create `src/components/Header.astro`:

```astro
---
import SocialLinks from './SocialLinks.astro';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/resources' },
  { label: 'Reading', href: '/reading' },
];

const currentPath = Astro.url.pathname;
---

<header class="sticky top-0 z-50 bg-dark border-b border-dark-border">
  <nav class="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center">
      <a href="/" class="text-2xl font-bold text-light-text hover:text-accent-orange transition">
        Jeremy Moore
      </a>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex gap-8">
        {navItems.map(item => (
          <a 
            href={item.href}
            class={`transition ${
              currentPath === item.href 
                ? 'text-accent-orange font-semibold' 
                : 'text-light-text hover:text-accent-orange'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>

      <!-- Mobile Navigation (Hamburger - simplified for now) -->
      <div class="md:hidden">
        <button class="text-light-text hover:text-accent-orange" aria-label="Menu">
          ☰
        </button>
      </div>
    </div>
  </nav>
</header>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: create header with navigation"
```

---

#### Task 6: Create Footer Component with Social Links

**Files:**
- Create: `src/components/Footer.astro`
- Create: `src/components/SocialLinks.astro`

**Steps:**

- [ ] **Step 1: Create social links component**

Create `src/components/SocialLinks.astro`:

```astro
---
import { SOCIAL_LINKS } from '../config';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

const { size = 'md', showLabels = false } = Astro.props;

const sizeMap = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};
---

<div class="flex gap-4 items-center">
  {SOCIAL_LINKS.github && (
    <a 
      href={SOCIAL_LINKS.github}
      target="_blank"
      rel="noopener noreferrer"
      class="text-light-text hover:text-accent-orange transition"
      aria-label="GitHub"
    >
      <svg class={sizeMap[size]} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      {showLabels && <span>GitHub</span>}
    </a>
  )}
  
  {SOCIAL_LINKS.twitter && (
    <a 
      href={SOCIAL_LINKS.twitter}
      target="_blank"
      rel="noopener noreferrer"
      class="text-light-text hover:text-accent-orange transition"
      aria-label="Twitter"
    >
      <svg class={sizeMap[size]} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 002.856-9.58a6.002 6.002 0 01-1.897.516 2.995 2.995 0 001.311-1.653 6.005 6.005 0 01-1.898.722 2.99 2.99 0 00-5.114 2.73 8.496 8.496 0 01-6.164-3.13 2.993 2.993 0 00-.408 1.504c0 1.039.527 1.956 1.327 2.496A2.987 2.987 0 012.5 4.618v.036c0 1.456.873 2.73 2.032 3.02a3.006 3.006 0 01-1.354.053 2.994 2.994 0 002.797 2.08 6.005 6.005 0 01-3.708.993 8.5 8.5 0 0012.941 7.753c1.654-1.081 2.951-2.547 3.743-4.158a8.502 8.502 0 00.862-4.145c0-.127 0-.255-.003-.383"/>
      </svg>
      {showLabels && <span>Twitter</span>}
    </a>
  )}

  {SOCIAL_LINKS.linkedin && (
    <a 
      href={SOCIAL_LINKS.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      class="text-light-text hover:text-accent-orange transition"
      aria-label="LinkedIn"
    >
      <svg class={sizeMap[size]} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.424-.103.249-.129.597-.129.946v5.435h-3.554s.05-8.814 0-9.752h3.554v1.375c.43-.664 1.199-1.61 2.920-1.61 2.135 0 3.731 1.39 3.731 4.38v5.607zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.953.77-1.71 1.958-1.71 1.187 0 1.914.757 1.938 1.71 0 .951-.751 1.71-1.981 1.71zm1.581 11.597H3.715V9.555h3.203v10.897zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      {showLabels && <span>LinkedIn</span>}
    </a>
  )}
</div>
```

- [ ] **Step 2: Create footer component**

Create `src/components/Footer.astro`:

```astro
---
import SocialLinks from './SocialLinks.astro';
import { SITE_TITLE } from '../config';
---

<footer class="bg-dark-lighter border-t border-dark-border mt-16">
  <div class="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div>
        <h3 class="text-lg font-semibold text-light-text mb-4">{SITE_TITLE}</h3>
        <p class="text-sm text-gray-400">Web development & Linux tips for developers of all levels</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-light-text mb-4">Quick Links</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="/blog" class="text-accent-orange hover:underline">Blog</a></li>
          <li><a href="/about" class="text-accent-orange hover:underline">About</a></li>
          <li><a href="/resources" class="text-accent-orange hover:underline">Resources</a></li>
          <li><a href="/reading" class="text-accent-orange hover:underline">Reading</a></li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-light-text mb-4">Connect</h3>
        <SocialLinks size="md" />
      </div>
    </div>

    <div class="border-t border-dark-border pt-8 text-center text-sm text-gray-400">
      <p>&copy; {new Date().getFullYear()} {SITE_TITLE}. All rights reserved.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro src/components/SocialLinks.astro
git commit -m "feat: create footer with social links"
```

---

### Phase 4: Card Components

#### Task 7: Create Featured and Blog Card Components

**Files:**
- Create: `src/components/FeaturedCard.astro`
- Create: `src/components/BlogCard.astro`

**Steps:**

- [ ] **Step 1: Create featured card component**

Create `src/components/FeaturedCard.astro`:

```astro
---
import { formatDate } from '../utils/formatting';

interface Props {
  title: string;
  excerpt: string;
  date: Date;
  category: string;
  image?: string;
  slug: string;
  readingTime: string;
}

const { title, excerpt, date, category, image, slug, readingTime } = Astro.props;
---

<a href={`/blog/${slug}`} class="group">
  <div class="bg-dark-lighter border-l-4 border-accent-orange rounded-lg overflow-hidden hover:shadow-lg hover:shadow-accent-orange/20 transition-all duration-300">
    {image && (
      <img 
        src={image}
        alt={title}
        class="w-full h-48 object-cover group-hover:opacity-90 transition"
        loading="lazy"
      />
    )}
    <div class="p-6">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs bg-accent-orange text-dark px-2 py-1 rounded">
          {category}
        </span>
        <span class="text-xs text-gray-400">{readingTime}</span>
      </div>
      <h3 class="text-xl font-bold text-light-text mb-2 group-hover:text-accent-orange transition">
        {title}
      </h3>
      <p class="text-gray-400 text-sm line-clamp-2 mb-4">{excerpt}</p>
      <p class="text-xs text-gray-500">{formatDate(date)}</p>
    </div>
  </div>
</a>
```

- [ ] **Step 2: Create blog card component**

Create `src/components/BlogCard.astro`:

```astro
---
import { formatDate } from '../utils/formatting';

interface Props {
  title: string;
  excerpt: string;
  date: Date;
  category: string;
  image?: string;
  slug: string;
  readingTime: string;
  tags: string[];
}

const { title, excerpt, date, category, image, slug, readingTime, tags } = Astro.props;
---

<a href={`/blog/${slug}`} class="group">
  <div class="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-dark-lighter hover:bg-dark-border transition-colors duration-200">
    {image && (
      <img 
        src={image}
        alt={title}
        class="w-full sm:w-32 sm:h-32 object-cover rounded group-hover:opacity-90 transition flex-shrink-0"
        loading="lazy"
      />
    )}
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-2 flex-wrap">
        <span class="text-xs bg-accent-orange text-dark px-2 py-1 rounded font-semibold">
          {category}
        </span>
        <span class="text-xs text-gray-400">{readingTime}</span>
      </div>
      <h3 class="text-lg font-bold text-light-text mb-2 group-hover:text-accent-orange transition line-clamp-2">
        {title}
      </h3>
      <p class="text-gray-400 text-sm line-clamp-2 mb-3">{excerpt}</p>
      <p class="text-xs text-gray-500">{formatDate(date)}</p>
    </div>
  </div>
</a>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/FeaturedCard.astro src/components/BlogCard.astro
git commit -m "feat: create featured and blog card components"
```

---

#### Task 8: Create Code Block, Newsletter, and Search Components

**Files:**
- Create: `src/components/CodeBlock.astro`
- Create: `src/components/NewsletterForm.astro`
- Create: `src/components/SearchInput.astro`

**Steps:**

- [ ] **Step 1: Create code block component with copy button**

Create `src/components/CodeBlock.astro`:

```astro
---
interface Props {
  code: string;
  language?: string;
  title?: string;
}

const { code, language = 'text', title } = Astro.props;
const id = Math.random().toString(36).substring(7);
---

<div class="relative group mb-6">
  <div class="flex items-center justify-between bg-dark-lighter px-4 py-2 rounded-t border-b border-dark-border">
    {title && <span class="text-sm text-gray-400 font-semibold">{title}</span>}
    {!title && <span class="text-sm text-gray-400">{language}</span>}
    <button 
      onclick={`copyCode('${id}')`}
      class="text-xs bg-accent-orange text-dark px-3 py-1 rounded hover:bg-orange-600 transition font-semibold"
      id={`copy-${id}`}
      data-copied="false"
    >
      Copy
    </button>
  </div>
  <pre class="bg-dark-lighter px-4 py-4 rounded-b overflow-x-auto text-light-text text-sm font-mono"><code id={id} class="language-{language}">{code}</code></pre>
</div>

<script>
  function copyCode(id: string) {
    const codeElement = document.getElementById(id);
    const button = document.getElementById(`copy-${id}`);
    if (!codeElement || !button) return;

    const text = codeElement.textContent || '';
    navigator.clipboard.writeText(text).then(() => {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('bg-green-600');
      button.classList.remove('bg-accent-orange');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-600');
        button.classList.add('bg-accent-orange');
      }, 2000);
    });
  }
  
  (window as any).copyCode = copyCode;
</script>
```

- [ ] **Step 2: Create newsletter form component**

Create `src/components/NewsletterForm.astro`:

```astro
---
import { NEWSLETTER_CTA } from '../config';
---

<div class="bg-dark-lighter p-6 rounded-lg border border-dark-border">
  <h3 class="text-lg font-bold text-light-text mb-2">{NEWSLETTER_CTA.headline}</h3>
  <p class="text-sm text-gray-400 mb-4">{NEWSLETTER_CTA.description}</p>
  <form class="space-y-3" id="newsletter-form">
    <input
      type="email"
      placeholder={NEWSLETTER_CTA.placeholder}
      required
      class="w-full px-4 py-2 bg-dark rounded border border-dark-border text-light-text placeholder-gray-500 focus:outline-none focus:border-accent-orange transition"
      name="email"
    />
    <button
      type="submit"
      class="w-full px-4 py-2 bg-accent-orange text-dark font-bold rounded hover:bg-orange-600 transition"
    >
      {NEWSLETTER_CTA.ctaText}
    </button>
  </form>
  <p id="form-message" class="text-xs text-gray-400 mt-2"></p>
</div>

<script>
  const form = document.getElementById('newsletter-form');
  const message = document.getElementById('form-message');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (form.querySelector('input[name="email"]') as HTMLInputElement)?.value;
    
    // TODO: Replace with actual newsletter service integration
    // For now, just show success message
    if (email) {
      message!.textContent = 'Check your inbox!';
      message!.classList.add('text-green-500');
      form.reset();
      setTimeout(() => {
        message!.textContent = '';
        message!.classList.remove('text-green-500');
      }, 3000);
    }
  });
</script>
```

- [ ] **Step 3: Create search input component**

Create `src/components/SearchInput.astro`:

```astro
---
interface Props {
  placeh older?: string;
}

const { placeholder = 'Search posts...' } = Astro.props;
const id = Math.random().toString(36).substring(7);
---

<div class="relative mb-6">
  <input
    type="text"
    placeholder={placeholder}
    id={`search-${id}`}
    class="w-full px-4 py-2 bg-dark rounded border border-dark-border text-light-text placeholder-gray-500 focus:outline-none focus:border-accent-orange transition"
  />
  <svg
    class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
</div>

<script>
  const input = document.getElementById(`search-${id}`);
  // TODO: Implement search logic
  // This will be tied to filtering posts on the homepage
</script>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/CodeBlock.astro src/components/NewsletterForm.astro src/components/SearchInput.astro
git commit -m "feat: create code block, newsletter, and search components"
```

---

#### Task 9: Create Sidebar Components

**Files:**
- Create: `src/components/Sidebar.astro`
- Create: `src/components/CategoryFilter.astro`

**Steps:**

- [ ] **Step 1: Create category filter component**

Create `src/components/CategoryFilter.astro`:

```astro
---
import { CATEGORIES } from '../config';

interface Props {
  selected?: string;
}

const { selected } = Astro.props;
---

<div class="space-y-2">
  <h3 class="font-bold text-light-text text-sm uppercase tracking-wider">Categories</h3>
  <div class="space-y-2">
    <button
      class={`block w-full text-left px-3 py-2 rounded text-sm transition ${
        !selected
          ? 'bg-accent-orange text-dark font-semibold'
          : 'text-light-text hover:bg-dark-border'
      }`}
      data-category="all"
    >
      All Posts
    </button>
    {CATEGORIES.map(category => (
      <button
        class={`block w-full text-left px-3 py-2 rounded text-sm transition ${
          selected === category
            ? 'bg-accent-orange text-dark font-semibold'
            : 'text-light-text hover:bg-dark-border'
        }`}
        data-category={category}
      >
        {category}
      </button>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Create main sidebar component**

Create `src/components/Sidebar.astro`:

```astro
---
import SearchInput from './SearchInput.astro';
import NewsletterForm from './NewsletterForm.astro';
import CategoryFilter from './CategoryFilter.astro';
import SocialLinks from './SocialLinks.astro';

interface Props {
  selected?: string;
}

const { selected } = Astro.props;
---

<aside class="w-full lg:w-64 space-y-8">
  <div>
    <SearchInput />
  </div>

  <div>
    <NewsletterForm />
  </div>

  <div>
    <CategoryFilter selected={selected} />
  </div>

  <div>
    <h3 class="font-bold text-light-text text-sm uppercase tracking-wider mb-4">Follow</h3>
    <SocialLinks size="md" />
  </div>
</aside>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Sidebar.astro src/components/CategoryFilter.astro
git commit -m "feat: create sidebar and category filter components"
```

---

### Phase 5: Page Templates

#### Task 10: Create Homepage

**Files:**
- Create: `src/pages/index.astro`

**Steps:**

- [ ] **Step 1: Create homepage**

Create `src/pages/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../layouts/Base.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import FeaturedCard from '../components/FeaturedCard.astro';
import BlogCard from '../components/BlogCard.astro';
import Sidebar from '../components/Sidebar.astro';
import { formatDate, getReadingTime, extractExcerpt } from '../utils/formatting';

const allPosts = await getCollection('blog');
const sortedPosts = allPosts.sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);
const featured = sortedPosts.filter(post => post.data.featured).slice(0, 3);
const recent = sortedPosts.slice(0, 9);
---

<Base title="Jeremy Moore - Web Dev & Linux Tips">
  <Header />
  
  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Intro Section -->
    <section class="mb-12 max-w-2xl">
      <h1 class="text-4xl sm:text-5xl font-bold text-light-text mb-4">
        Web Development & Linux Tips
      </h1>
      <p class="text-lg text-gray-400">
        Practical tips and how-tos for developers at all levels. From beginner fundamentals to advanced techniques.
      </p>
    </section>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2 space-y-8">
        <!-- Featured Posts -->
        {featured.length > 0 && (
          <section>
            <h2 class="text-2xl font-bold text-light-text mb-6">Featured</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featured.map(post => (
                <FeaturedCard
                  title={post.data.title}
                  excerpt={post.data.excerpt || extractExcerpt(post.body)}
                  date={post.data.date}
                  category={post.data.category}
                  image={post.data.image}
                  slug={post.slug}
                  readingTime={getReadingTime(post.body)}
                />
              ))}
            </div>
          </section>
        )}

        <!-- Recent Posts -->
        <section>
          <h2 class="text-2xl font-bold text-light-text mb-6">Recent Posts</h2>
          <div class="space-y-4">
            {recent.map(post => (
              <BlogCard
                title={post.data.title}
                excerpt={post.data.excerpt || extractExcerpt(post.body)}
                date={post.data.date}
                category={post.data.category}
                image={post.data.image}
                slug={post.slug}
                tags={post.data.tags}
                readingTime={getReadingTime(post.body)}
              />
            ))}
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <Sidebar />
      </div>
    </div>
  </main>

  <Footer />
</Base>

<style>
  main {
    min-height: calc(100vh - 200px);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: create homepage with featured and recent posts"
```

---

#### Task 11: Create Blog Listing Page

**Files:**
- Create: `src/pages/blog/index.astro`

**Steps:**

- [ ] **Step 1: Create blog listing page**

Create `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import BlogCard from '../../components/BlogCard.astro';
import Sidebar from '../../components/Sidebar.astro';
import { formatDate, getReadingTime, extractExcerpt } from '../../utils/formatting';

const allPosts = await getCollection('blog');
const sortedPosts = allPosts.sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);
---

<Base title="Blog - Jeremy Moore">
  <Header />

  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold text-light-text mb-8">Blog</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2">
        <div class="space-y-4">
          {sortedPosts.map(post => (
            <BlogCard
              title={post.data.title}
              excerpt={post.data.excerpt || extractExcerpt(post.body)}
              date={post.data.date}
              category={post.data.category}
              image={post.data.image}
              slug={post.slug}
              tags={post.data.tags}
              readingTime={getReadingTime(post.body)}
            />
          ))}
        </div>
      </div>

      <div class="lg:col-span-1">
        <Sidebar />
      </div>
    </div>
  </main>

  <Footer />
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/blog/index.astro
git commit -m "feat: create blog listing page"
```

---

#### Task 12: Create About Page

**Files:**
- Create: `src/pages/about.astro`

**Steps:**

- [ ] **Step 1: Create about page**

Create `src/pages/about.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import NewsletterForm from '../components/NewsletterForm.astro';
import SocialLinks from '../components/SocialLinks.astro';
---

<Base title="About - Jeremy Moore">
  <Header />

  <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold text-light-text mb-2">About Me</h1>
    <p class="text-gray-400 mb-8">Web developer, tech enthusiast, and educator</p>

    <div class="prose prose-invert max-w-none space-y-6 mb-12">
      <section>
        <h2 class="text-2xl font-bold text-light-text mb-4">Who I Am</h2>
        <p class="text-gray-400 leading-relaxed">
          I'm Jeremy Moore, a full-stack web developer passionate about sharing knowledge with other developers. 
          With experience across frontend, backend, and DevOps, I love breaking down complex concepts into actionable tips.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-bold text-light-text mb-4">My Skills</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Docker', 'Linux', 'AWS', 'Git'].map(skill => (
            <div class="px-4 py-2 bg-dark-lighter border border-dark-border rounded text-center text-sm text-light-text">
              {skill}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-bold text-light-text mb-4">Let's Connect</h2>
        <p class="text-gray-400 mb-6">
          Want to talk about web development, Linux, or anything else tech-related? 
          Reach out on social media or subscribe to my newsletter for regular tips.
        </p>
        <div class="mb-8">
          <NewsletterForm />
        </div>
        <div>
          <h3 class="font-semibold text-light-text mb-4">Follow Me</h3>
          <SocialLinks size="lg" showLabels={true} />
        </div>
      </section>
    </div>
  </main>

  <Footer />
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: create about page"
```

---

#### Task 13: Create Resources Page

**Files:**
- Create: `src/pages/resources.astro`

**Steps:**

- [ ] **Step 1: Create resources page**

Create `src/pages/resources.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

const resources = [
  {
    name: 'VS Code',
    category: 'Editor',
    description: 'Lightweight, powerful code editor with excellent extension ecosystem',
    notes: 'My daily driver for all development',
    url: 'https://code.visualstudio.com',
  },
  {
    name: 'Astro',
    category: 'Framework',
    description: 'Modern web framework for building fast, content-driven websites',
    notes: 'Perfect for blogs and static sites with dynamic features',
    url: 'https://astro.build',
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling',
    description: 'Utility-first CSS framework for rapid UI development',
    notes: 'Speeds up styling significantly with a thoughtful design system',
    url: 'https://tailwindcss.com',
  },
];

const groupedResources = resources.reduce((acc, resource) => {
  if (!acc[resource.category]) {
    acc[resource.category] = [];
  }
  acc[resource.category].push(resource);
  return acc;
}, {} as Record<string, typeof resources>);
---

<Base title="Resources - Jeremy Moore">
  <Header />

  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold text-light-text mb-4">Recommended Resources</h1>
    <p class="text-gray-400 mb-12">
      Tools, frameworks, and services I use and recommend for web development
    </p>

    {Object.entries(groupedResources).map(([category, items]) => (
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-accent-orange mb-6">{category}</h2>
        <div class="space-y-6">
          {items.map(resource => (
            <div class="p-6 bg-dark-lighter border border-dark-border rounded-lg">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-bold text-light-text">{resource.name}</h3>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm bg-accent-orange text-dark px-3 py-1 rounded hover:bg-orange-600 transition font-semibold"
                >
                  Visit
                </a>
              </div>
              <p class="text-gray-400 mb-3">{resource.description}</p>
              {resource.notes && (
                <p class="text-sm text-accent-orange italic">💡 {resource.notes}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    ))}
  </main>

  <Footer />
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/resources.astro
git commit -m "feat: create resources page with categorized tools"
```

---

#### Task 14: Create Reading Page

**Files:**
- Create: `src/pages/reading.astro`

**Steps:**

- [ ] **Step 1: Create reading page**

Create `src/pages/reading.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

const books = [
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    status: 'finished',
    rating: 5,
    notes: 'Essential reading for any developer. Changed how I think about code quality.',
    year: 2008,
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    status: 'finished',
    rating: 5,
    notes: 'Timeless advice on software development practices.',
    year: 2019,
  },
  {
    title: 'System Design Interview',
    author: 'Alex Xu',
    status: 'reading',
    rating: undefined,
    notes: 'Great reference for designing scalable systems.',
    year: 2020,
  },
];

const reading = books.filter(b => b.status === 'reading');
const finished = books.filter(b => b.status === 'finished');
---

<Base title="Reading - Jeremy Moore">
  <Header />

  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold text-light-text mb-4">My Reading List</h1>
    <p class="text-gray-400 mb-12">Books I'm reading and have read</p>

    {reading.length > 0 && (
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-accent-orange mb-6">Currently Reading</h2>
        <div class="space-y-6">
          {reading.map(book => (
            <div class="p-6 bg-dark-lighter border border-accent-orange rounded-lg">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-lg font-bold text-light-text">{book.title}</h3>
                  <p class="text-sm text-gray-400">{book.author}</p>
                </div>
                <span class="text-xs bg-accent-orange text-dark px-3 py-1 rounded font-semibold">
                  Reading
                </span>
              </div>
              {book.notes && (
                <p class="text-gray-400 mt-3">{book.notes}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    )}

    <section>
      <h2 class="text-2xl font-bold text-accent-orange mb-6">Finished</h2>
      <div class="space-y-6">
        {finished.map(book => (
          <div class="p-6 bg-dark-lighter border border-dark-border rounded-lg">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="text-lg font-bold text-light-text">{book.title}</h3>
                <p class="text-sm text-gray-400">{book.author} • {book.year}</p>
              </div>
              {book.rating && (
                <div class="flex gap-1">
                  {Array.from({ length: book.rating }).map(() => (
                    <span class="text-accent-orange">★</span>
                  ))}
                </div>
              )}
            </div>
            {book.notes && (
              <p class="text-gray-400 mt-3">{book.notes}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  </main>

  <Footer />
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/reading.astro
git commit -m "feat: create reading page with book collection"
```

---

### Phase 6: Blog Post Template (Dynamic Routes)

#### Task 15: Create Blog Post Layout and Dynamic Route

**Files:**
- Create: `src/layouts/BlogPost.astro`
- Create: `src/pages/blog/[slug].astro`
- Create: `src/components/TableOfContents.astro`
- Create: `src/components/RelatedPosts.astro`
- Create: `src/components/YouTubeEmbed.astro`

**Steps:**

- [ ] **Step 1: Create YouTube embed component**

Create `src/components/YouTubeEmbed.astro`:

```astro
---
interface Props {
  id: string;
  title?: string;
}

const { id, title = 'Video' } = Astro.props;
const url = `https://www.youtube.com/embed/${id}`;
---

<div class="my-8 aspect-video w-full rounded-lg overflow-hidden">
  <iframe
    src={url}
    title={title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    class="w-full h-full"
  ></iframe>
</div>
```

- [ ] **Step 2: Create table of contents component**

Create `src/components/TableOfContents.astro`:

```astro
---
interface Props {
  headings: Array<{depth: number; slug: string; text: string}>;
}

const { headings } = Astro.props;

const filteredHeadings = headings.filter(h => h.depth === 2 || h.depth === 3);
---

{filteredHeadings.length > 0 && (
  <div class="bg-dark-lighter p-4 rounded-lg border border-dark-border mb-8 sticky top-24">
    <h3 class="font-bold text-light-text text-sm uppercase tracking-wider mb-3">
      Table of Contents
    </h3>
    <nav class="space-y-2 text-sm">
      {filteredHeadings.map(heading => (
        <a
          href={`#${heading.slug}`}
          class={`block text-gray-400 hover:text-accent-orange transition ${
            heading.depth === 3 ? 'pl-4' : ''
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  </div>
)}
```

- [ ] **Step 3: Create related posts component**

Create `src/components/RelatedPosts.astro`:

```astro
---
interface RelatedPost {
  slug: string;
  data: {
    title: string;
    excerpt?: string;
  };
}

interface Props {
  posts: RelatedPost[];
}

const { posts } = Astro.props;
---

{posts.length > 0 && (
  <div class="bg-dark-lighter p-6 rounded-lg border border-dark-border">
    <h3 class="font-bold text-light-text text-sm uppercase tracking-wider mb-4">
      Related Posts
    </h3>
    <ul class="space-y-3">
      {posts.slice(0, 4).map(post => (
        <li>
          <a
            href={`/blog/${post.slug}`}
            class="text-accent-orange hover:underline font-semibold text-sm"
          >
            {post.data.title}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
```

- [ ] **Step 4: Create blog post layout**

Create `src/layouts/BlogPost.astro`:

```astro
---
import Base from './Base.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import TableOfContents from '../components/TableOfContents.astro';
import RelatedPosts from '../components/RelatedPosts.astro';
import SocialLinks from '../components/SocialLinks.astro';
import NewsletterForm from '../components/NewsletterForm.astro';
import { formatDate } from '../utils/formatting';

interface Props {
  frontmatter: {
    title: string;
    description?: string;
    date: Date;
    author?: string;
    category: string;
    tags: string[];
    image?: string;
    excerpt?: string;
  };
  headings: Array<{depth: number; slug: string; text: string}>;
  readingTime?: string;
  relatedPosts?: Array<{slug: string; data: any}>;
}

const { frontmatter, headings, readingTime, relatedPosts = [] } = Astro.props;
---

<Base title={frontmatter.title}>
  <Header />

  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Article Header -->
    <header class="mb-12">
      {frontmatter.image && (
        <img
          src={frontmatter.image}
          alt={frontmatter.title}
          class="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}
      <h1 class="text-4xl sm:text-5xl font-bold text-light-text mb-4">
        {frontmatter.title}
      </h1>
      <div class="flex flex-wrap gap-4 items-center mb-4 text-sm text-gray-400">
        <time datetime={frontmatter.date.toISOString()}>
          {formatDate(frontmatter.date)}
        </time>
        {readingTime && <span>·</span>}
        {readingTime && <span>{readingTime}</span>}
        <span>·</span>
        <span class="text-accent-orange font-semibold">{frontmatter.category}</span>
      </div>
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div class="flex flex-wrap gap-2">
          {frontmatter.tags.map(tag => (
            <span class="text-xs bg-dark-border text-light-text px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>

    <!-- Content -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div class="lg:col-span-3">
        <article class="prose prose-invert max-w-none">
          <slot />
        </article>

        <!-- Share -->
        <div class="border-t border-dark-border mt-12 pt-8">
          <h3 class="font-bold text-light-text mb-4">Share This Article</h3>
          <div class="flex gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontmatter.title)}&url=${Astro.url}`}
              target="_blank"
              rel="noopener noreferrer"
              class="text-accent-orange hover:underline text-sm font-semibold"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(Astro.url.toString())}`}
              target="_blank"
              rel="noopener noreferrer"
              class="text-accent-orange hover:underline text-sm font-semibold"
            >
              Share on LinkedIn
            </a>
            <button
              onclick="navigator.clipboard.writeText(window.location.href); alert('Link copied!')"
              class="text-accent-orange hover:underline text-sm font-semibold"
            >
              Copy Link
            </button>
          </div>
        </div>

        <!-- Newsletter CTA -->
        <div class="border-t border-dark-border mt-12 pt-8">
          <NewsletterForm />
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-8">
        <TableOfContents headings={headings} />
        <RelatedPosts posts={relatedPosts} />
        <div>
          <h3 class="font-bold text-light-text text-sm uppercase tracking-wider mb-4">
            Connect
          </h3>
          <SocialLinks size="md" />
        </div>
      </div>
    </div>
  </main>

  <Footer />
</Base>
```

- [ ] **Step 5: Create dynamic blog post route**

Create `src/pages/blog/[slug].astro`:

```astro
---
import { getCollection } from 'astro:content';
import BlogPostLayout from '../../layouts/BlogPost.astro';
import { getReadingTime } from '../../utils/formatting';

export async function getStaticPaths() {
  const blogEntries = await getCollection('blog');
  return blogEntries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

interface Props {
  entry: any;
}

const { entry } = Astro.props;
const { Content, headings } = await entry.render();

const allPosts = await getCollection('blog');
const relatedPosts = allPosts
  .filter(
    post =>
      post.slug !== entry.slug &&
      (post.data.category === entry.data.category ||
        post.data.tags.some((tag: string) =>
          entry.data.tags.includes(tag)
        ))
  )
  .slice(0, 4);
---

<BlogPostLayout
  frontmatter={entry.data}
  headings={headings}
  readingTime={getReadingTime(entry.body)}
  relatedPosts={relatedPosts}
>
  <Content />
</BlogPostLayout>
```

- [ ] **Step 6: Commit**

```bash
git add src/layouts/BlogPost.astro src/pages/blog/\[slug\].astro src/components/TableOfContents.astro src/components/RelatedPosts.astro src/components/YouTubeEmbed.astro
git commit -m "feat: create blog post layout and dynamic routing"
```

---

### Phase 7: Sample Content & Testing

#### Task 16: Create Sample Blog Posts

**Files:**
- Create: `src/content/blog/sample-post-1.md`
- Create: `src/content/blog/sample-post-2.md`

**Steps:**

- [ ] **Step 1: Create first sample blog post**

Create `src/content/blog/01-getting-started-with-astro.md`:

```markdown
---
title: "Getting Started with Astro 6"
description: "A beginner's guide to building fast websites with Astro"
date: 2026-05-16
author: "Jeremy Moore"
category: "Web Dev"
tags: ["astro", "web-dev", "tutorial"]
featured: true
excerpt: "Learn how to get started with Astro 6 and build your first fast website"
image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800"
---

## What is Astro?

Astro is a modern JavaScript framework for building fast websites. It's perfect for blogs, documentation sites, and content-heavy applications.

### Key Features

- **Island Architecture**: Only ship JavaScript where needed
- **Zero JavaScript by default**: Static HTML pages
- **Integrations**: Works seamlessly with React, Vue, Svelte, and more
- **Performance**: Blazing fast out of the box

## Installation

```bash
npm create astro@latest my-project
cd my-project
npm run dev
```

## Project Structure

```
src/
  components/
  layouts/
  pages/
  styles/
public/
```

## Next Steps

Visit the [Astro documentation](https://astro.build) to learn more.
```

- [ ] **Step 2: Create second sample blog post**

Create `src/content/blog/02-useful-linux-commands.md`:

```markdown
---
title: "10 Useful Linux Commands Every Developer Should Know"
description: "Essential Linux commands that will boost your productivity"
date: 2026-05-15
author: "Jeremy Moore"
category: "Linux"
tags: ["linux", "terminal", "productivity"]
featured: true
excerpt: "Master these 10 Linux commands to become more productive in the terminal"
image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800"
---

## Introduction

Linux is powerful and mastering the command line will make you a better developer. Here are 10 essential commands.

### 1. ls - List Directory Contents

```bash
ls -la  # List all files including hidden ones
```

### 2. cd - Change Directory

```bash
cd ~    # Go to home directory
cd ..   # Go to parent directory
```

### 3. grep - Search for Patterns

```bash
grep "pattern" filename
grep -r "pattern" .  # Search recursively
```

### 4. find - Find Files

```bash
find . -name "*.js"  # Find JavaScript files
find . -type f -name "*.md"  # Find markdown files
```

### 5. git - Version Control

```bash
git status
git add .
git commit -m "message"
git push
```

And 5 more...

## Conclusion

These commands will help you work faster in the terminal. Practice them regularly!
```

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/
git commit -m "feat: add sample blog posts"
```

---

#### Task 17: Verify Site Builds and Works

**Steps:**

- [ ] **Step 1: Install dependencies if needed**

```bash
npm install
```

- [ ] **Step 2: Build the site**

```bash
npm run build
```

Expected: Build succeeds with no errors

- [ ] **Step 3: Start dev server**

```bash
npm run dev
```

Expected: Dev server starts on http://localhost:3000

- [ ] **Step 4: Test homepage**

Visit `http://localhost:3000` and verify:
- Header with navigation displays correctly
- Featured posts appear
- Sidebar with search, newsletter, and categories displays
- Recent posts list appears
- Footer is present
- Dark theme is applied
- Orange accents are visible

- [ ] **Step 5: Test blog post page**

Visit `http://localhost:3000/blog/01-getting-started-with-astro` and verify:
- Post content displays
- Table of contents appears
- Related posts sidebar shows
- Newsletter signup appears
- Syntax highlighting works on code blocks

- [ ] **Step 6: Test other pages**

- [ ] Visit `/about` - verify layout and content
- [ ] Visit `/resources` - verify resource listing
- [ ] Visit `/reading` - verify books display
- [ ] Visit `/blog` - verify blog listing page

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: complete initial build and verify functionality"
```

---

## Summary

This plan covers:

✅ **Project setup** - Tailwind CSS configuration, site config  
✅ **Content structure** - Collections for blog, resources, reading  
✅ **Core components** - Header, footer, cards, sidebar, forms  
✅ **Pages** - Homepage, about, resources, reading, blog listing  
✅ **Blog post template** - Dynamic routing, TOC, related posts  
✅ **Features** - Code copy button, YouTube embeds, search, filtering  
✅ **Styling** - Dark theme, orange accents, responsive design  
✅ **Sample content** - Example blog posts to verify functionality  

**Next:** Implementation using subagent-driven development or inline execution.
