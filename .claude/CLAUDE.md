# CLAUDE.md — altay.wtf

Personal website at [altay.wtf](https://altay.wtf). Blog posts, book notes, dictionary, and resume.

## Stack

- **Framework**: Astro 5 (static output)
- **Content**: MDX/Markdown in `data/`, loaded via Astro Content Collections (glob loaders)
- **Styling**: Tailwind CSS 4 + `@tailwindcss/typography`
- **OG Images**: Build-time generation with Satori + resvg
- **Linting**: oxlint (`--ignore-pattern '*.astro'` — false positives in .astro frontmatter)
- **Formatting**: oxfmt
- **Runtime**: Bun (not Node.js)
- **Testing**: `bun:test`
- **Deploy**: Cloudflare Workers (static assets)
- **Dev port**: 1994

## Commands

```sh
bun run dev          # Start dev server on port 1994
bun run build        # Production build (astro build)
bun run preview      # Preview production build
bun run lint         # oxlint --ignore-pattern '*.astro'
bun run format       # oxfmt .
bun run format:check # oxfmt --check .
bun run typecheck    # astro check && tsc --noEmit
bun run knip         # Find unused exports/deps
bun test             # Run tests
```

## Project Structure

```
src/
  pages/             # File-based routing (.astro files)
  content/           # Content Collection definitions
  layouts/           # Base and page layouts
  components/        # Astro + React components
  lib/               # Utilities (og image generation, etc.)
  config/            # Site configuration
  fonts/             # Font files for OG images
  scripts/           # Helper scripts (book creation, image updates)
  styles/            # Global CSS
  content.config.ts  # Content Collection schema
data/
  posts/             # Blog posts (MDX/Markdown)
  books/             # Book notes (MDX/Markdown)
  books.json         # Book metadata (covers, authors, etc.)
  dictionary/        # Word/phrase definitions
  home.md            # Homepage content
  resume.md          # Resume content
public/              # Static assets (images, fonts)
```

## Content

- **Posts**: `data/posts/*.md` — frontmatter: title, oneliner, date
- **Books**: `data/books/*.md` + `data/books.json` — notes with metadata
- **Dictionary**: `data/dictionary/*.md` — word/phrase definitions
- **Pages**: `data/home.md`, `data/resume.md` — standalone pages

## Conventions

- Static components → `.astro` files (no JS shipped)
- Interactive components → React `.tsx` with `client:load` directive
- Only ship JS when interactivity is required (Astro islands)
- All content is Markdown/MDX, rendered at build time
- OG images generated at build time with Satori + resvg

## URLs (Must Preserve)

```
/               → home
/posts          → post list
/posts/[slug]   → individual post
/books          → book list
/books/[slug]   → individual book
/dictionary     → dictionary
/resume         → resume
```
