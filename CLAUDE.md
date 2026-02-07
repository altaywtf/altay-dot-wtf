# CLAUDE.md — altay.wtf

Personal website at [altay.wtf](https://altay.wtf). Content site with blog posts, book notes, and resume.

## Stack
- **Framework**: Astro 5 with React islands (migrating from Next.js 15)
- **Content**: Astro Content Collections (Markdown/MDX in `src/content/`)
- **Styling**: Tailwind CSS 4 + `@tailwindcss/typography`
- **Linting**: oxlint (not ESLint/Biome)
- **Formatting**: oxfmt
- **Runtime**: Bun (not Node.js)
- **Testing**: `bun:test`
- **Deploy**: Cloudflare Pages (static output)
- **Dev port**: 1994

## Commands
```sh
bun run dev          # Start dev server on port 1994
bun run build        # Production build
bun run preview      # Preview production build
bun test             # Run tests
bun run lint         # oxlint
bun run format       # oxfmt
bun run typecheck    # tsc --noEmit
```

## Project Structure
```
src/
  content/           # Content Collections (posts, books, pages)
  pages/             # File-based routing
  layouts/           # Base and page layouts
  components/        # Astro + React components
  lib/               # Utilities
  styles/            # Global CSS
public/              # Static assets (images, fonts)
data/                # Legacy data files (books.json)
.agents/docs/        # Agent working memory (plan, assumptions, notes)
```

## Content
- **Posts**: `src/content/posts/*.md` — frontmatter: title, oneliner, date
- **Books**: `src/content/books/*.md` — metadata from `data/books.json`
- **Pages**: `src/content/pages/` — home, resume

## Conventions
- Static components → `.astro` files (no JS shipped)
- Interactive components → React `.tsx` with `client:load` directive
- Only ship JS when interactivity is required (Astro islands)
- All content is Markdown, rendered at build time
- OG images generated at build time with Satori

## URLs (Must Preserve)
```
/               → home
/posts          → post list
/posts/[slug]   → individual post
/books          → book list
/books/[slug]   → individual book
/resume         → resume
/cv             → 301 redirect to /resume
```
