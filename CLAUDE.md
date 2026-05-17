# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based personal blog and portfolio site for Jeremy Moore focused on web development, Linux, and DevOps content. The site uses Astro's content collections to manage blog posts, resources, and a reading list, with Tailwind CSS v4 for styling.

## Development Commands

All commands run from the repository root:

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` with hot reload |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands (e.g., `npm run astro add`) |

## Project Structure & Architecture

### Content Collections (`src/content.config.ts`)

Three main content collections power the site:

- **Blog** (`src/content/blog/`): Markdown posts with schema including title, description, date, author, category, tags, featured flag, and optional image/excerpt. Categories are: Web Dev, Linux, DevOps, Frontend, Backend, Tools.
- **Resources** (`src/content/resources/index.json`): JSON-based curated links with name, description, category, URL, and optional notes.
- **Reading** (`src/content/reading/index.json`): JSON-based reading list tracking books with author, status (reading/finished), optional rating, notes, year, cover image, and purchase link.

Each collection uses Astro's loader API—blog uses `glob()` for markdown discovery, resources and reading use `file()` to load from JSON.

### Page Structure

- **Blog index** (`src/pages/blog/index.astro`): Lists all posts with filtering and search
- **Blog post dynamic route** (`src/pages/blog/[slug].astro`): Renders individual posts from markdown, extracts headings for TOC, calculates reading time, finds related posts by category/tags
- **Other pages** (`src/pages/`): index, about, resources, reading

### Layout Hierarchy

- **Base layout** (`src/layouts/Base.astro`): Root HTML with metadata, global CSS, font loading (Inter and Fira Code), dark theme setup
- **Layout** (`src/layouts/Layout.astro`): Header + footer wrapper (used by most pages)
- **BlogPost layout** (`src/layouts/BlogPost.astro`): Blog-specific layout with post metadata, TOC, reading time

### Components

UI components in `src/components/` include: Header, Footer, BlogCard, FeaturedCard, CategoryFilter, SearchInput, Sidebar, TableOfContents, RelatedPosts, NewsletterForm, SocialLinks, CodeBlock, YouTubeEmbed. Most are Astro components; some may include client-side interactivity.

### Utilities

- **`src/utils/formatting.ts`**: Post-related utilities (e.g., reading time calculation)
- **`src/utils/search.ts`**: Search/filtering logic for blog posts
- **`src/config.ts`**: Site-wide constants (title, description, social links, newsletter CTA, categories)

## Styling & Design

**Tailwind CSS v4** (`tailwind.config.js`) with custom dark theme:
- Custom colors: `dark`, `dark-lighter`, `dark-border`, `light-text`, `accent-orange`
- Custom font sizing (18px base) and line heights
- Custom font families: Inter (sans) and Menlo/Monaco (mono)
- PostCSS integration (`postcss.config.mjs`) for Tailwind processing

The site uses a dark-first design with orange accents. Global styles in `src/styles/global.css`.

## Important Implementation Details

### Markdown Processing in Blog Posts

The `[slug].astro` route uses custom regex-based markdown-to-HTML conversion rather than a library. This handles headers, bold/italic, links, inline code, lists, code blocks, and blockquotes. For improvements or fixes to markdown rendering, update the `convertMarkdownToHtml()` function in that file.

### Related Posts

Related posts are found by matching category or tags, then sorted by date and limited to 4 results. This logic is in the blog post route's `getStaticPaths()` function.

### Reading Time

Calculated in `utils/formatting.ts`. Used on blog posts via the `getReadingTime()` function.

## Configuration Files

- **`tsconfig.json`**: Extends Astro's strict config
- **`astro.config.mjs`**: Minimal—can be expanded for integrations
- **`package.json`**: Node ≥22.12.0 required

## Key Dependencies

- **astro** ^6.3.3
- **tailwindcss** ^4.3.0
- **@tailwindcss/postcss** ^4.3.0
- **postcss** and **autoprefixer** for CSS processing
