# jeremymoore.dev

Personal blog and portfolio for Jeremy Moore — web development, Linux, and DevOps tips.

Built with [Astro](https://astro.build), styled with [Tailwind CSS v4](https://tailwindcss.com), and deployed to GitHub Pages.

## Development

```sh
npm install
npm run dev      # localhost:4321
npm run build    # production build → ./dist/
npm run preview  # preview the production build
```

## Environment

Copy `.env.example` to `.env` for local Kit.com newsletter embed settings. GitHub Actions uses repository variables for production:

- `PUBLIC_SITE_URL` — e.g. `https://jeremymoore.dev`
- `PUBLIC_BASE_PATH` — `/` for custom domain
- `PUBLIC_KIT_FORM_UID`, `PUBLIC_KIT_EMBED_HOST` — newsletter modal

## Content

- Blog posts live in `src/content/blog/` as Markdown
- Set `draft: true` in frontmatter to hide a post from production builds (still visible in dev)
- Reading list data is in `development-reading-list.json`

## Deploy

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`. Enable GitHub Pages with source **GitHub Actions** and configure the variables above.
