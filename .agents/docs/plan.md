# altay.wtf — Astro Migration Plan

## Goal
1:1 migration from Next.js 15 to Astro 5. Same content, same look, same URLs. No redesign.

## Current State
- **Framework**: Next.js 15.1.10 with static export (`output: "export"`)
- **Content**: Markdown files in `data/` (12 posts, 36 books, 1 resume, 1 home, 3 dictionary)
- **Books metadata**: `data/books.json` (title, author, slug, cover, notes URL)
- **Styling**: Tailwind CSS 4 + `@tailwindcss/typography`
- **Interactive components**: `path-history-listener`, `backlink-scroller`, `back-button` (React, client-side)
- **MDX rendering**: `next-mdx-remote` with rehype-pretty-code, rehype-slug, remark-gfm
- **OG images**: Disabled (static fallback `meta-bg.png`)
- **Fonts**: Inter (variable, via `next/font`) + JetBrains Mono
- **Deploy**: CF Workers (static assets via wrangler.jsonc)
- **Dev port**: 1994

## Target State
- **Framework**: Astro 5 with `@astrojs/react` (islands), `@astrojs/mdx`, `@astrojs/tailwind`
- **Content**: Astro Content Collections (type-safe, schema-validated)
- **Styling**: Same Tailwind CSS 4 + typography plugin
- **Interactive**: React islands with `client:load` directive (only 3 small components)
- **MDX**: Native Astro MDX with same rehype/remark plugins
- **OG images**: Build-time generation with Satori + sharp (restore per-page OG images)
- **Deploy**: CF Pages static (`@astrojs/cloudflare` adapter or pure static)
- **Dev port**: 1994

## Migration Steps

### Phase 1: Scaffold
1. Init new Astro project in a fresh branch or directory
2. Install integrations: `@astrojs/react`, `@astrojs/mdx`, `@astrojs/tailwind`, `@astrojs/sitemap`
3. Copy `public/` as-is (images, fonts, _redirects, _headers)
4. Set up Tailwind CSS 4 with same config
5. Configure `astro.config.mjs`: static output, port 1994, site URL

### Phase 2: Content Collections
1. Move `data/posts/*.md` → `src/content/posts/*.md` (keep frontmatter as-is)
2. Move `data/books/*.md` → `src/content/books/*.md`
3. Move `data/home.md`, `data/resume.md` → `src/content/pages/`
4. Move `data/dictionary/*.md` → `src/content/dictionary/`
5. Keep `data/books.json` as a data file (or convert to collection)
6. Define schemas in `src/content/config.ts`:
   - Posts: `{ title, oneliner, date }`
   - Books: derive from books.json + markdown notes
   - Pages: minimal frontmatter

### Phase 3: Layouts & Pages
1. Create `src/layouts/Base.astro` (replaces `layout.tsx` — html, head, body, meta, fonts)
2. Create `src/layouts/Page.astro` (content wrapper with max-w-2xl, padding)
3. Convert pages:
   - `src/app/(home)/page.tsx` → `src/pages/index.astro`
   - `src/app/posts/page.tsx` → `src/pages/posts/index.astro`
   - `src/app/posts/[slug]/page.tsx` → `src/pages/posts/[slug].astro`
   - `src/app/books/page.tsx` → `src/pages/books/index.astro`
   - `src/app/books/[slug]/page.tsx` → `src/pages/books/[slug].astro`
   - `src/app/resume/page.tsx` → `src/pages/resume.astro`
   - `src/app/not-found.tsx` → `src/pages/404.astro`
   - `src/app/robots.txt` → `src/pages/robots.txt.ts` (Astro endpoint)
4. Each page uses `getStaticPaths()` for dynamic routes
5. Metadata via Astro `<head>` in layout (no Next.js metadata API)

### Phase 4: Components
1. Convert static components to `.astro`:
   - `page.tsx` → `Page.astro`
   - `md.tsx` → `Md.astro` (MDX rendering)
   - `book.tsx` → `Book.astro`
   - `post-date-and-reading-time.tsx` → `PostMeta.astro`
   - `backlinks.tsx` → `Backlinks.astro`
2. Keep interactive components as React (`.tsx`) with `client:load`:
   - `back-button.tsx` — needs browser history
   - `backlink-scroller.tsx` — needs DOM interaction
   - `path-history-listener.tsx` — needs window events

### Phase 5: MDX Pipeline
1. Configure rehype-pretty-code, rehype-slug, remark-gfm in astro.config.mjs
2. Render markdown content via `<Content />` component from collection entries
3. Verify syntax highlighting themes match current site
4. Test backlinks system (cross-references between content)

### Phase 6: OG Images (Build-Time)
1. Install `satori` + `@resvg/resvg-js`
2. Create `src/pages/og/[...slug].png.ts` endpoint
3. Generate OG images for all posts, books, and pages at build time
4. Use same design as original (avatar, title, meta-bg background)
5. Reference in page metadata

### Phase 7: Polish & Deploy
1. Verify all 58 pages render correctly
2. Run tests (migrate backlinks.test.ts and md.test.ts to bun:test)
3. Verify `_redirects` (/cv → /resume) works on CF
4. Verify `_headers` (X-Robots-Tag: noindex) works
5. Update `wrangler.jsonc` for Astro output dir (`dist/`)
6. Deploy to CF Pages, verify production

## URL Parity (Must Match)
```
/                    → home
/posts               → post list
/posts/[slug]        → 12 posts
/books               → book list  
/books/[slug]        → 36 books
/resume              → resume
/cv                  → 301 → /resume
/robots.txt          → robots
/apple-icon.png      → favicon
```

## Dependencies

### Remove
- `next`, `next-mdx-remote`, `react` (keep as peer for islands), `react-dom`
- `query-string`, `inquirer` (unused in site)
- `@opennextjs/cloudflare` (already removed)

### Keep
- `react`, `react-dom` (for interactive islands)
- `rehype-pretty-code`, `rehype-slug`, `remark-gfm`
- `date-fns`, `lucide-react`
- `reading-time`, `gray-matter` (may not need with Content Collections)
- `sharp`, `plaiceholder` (book image scripts)
- `tailwindcss`, `@tailwindcss/postcss`, `@tailwindcss/typography`
- `oxlint`, `typescript`, `wrangler`

### Add
- `astro`
- `@astrojs/react`, `@astrojs/mdx`, `@astrojs/tailwind`, `@astrojs/sitemap`
- `satori`, `@resvg/resvg-js` (OG image generation)

## Risks
1. **Backlinks system**: Custom cross-reference system between content — needs careful porting
2. **MDX rendering differences**: `next-mdx-remote` vs Astro native MDX may have subtle differences
3. **Syntax highlighting**: rehype-pretty-code themes must match
4. **Path history**: Custom browser history tracking uses React state — needs `client:load` island
5. **books.json structure**: Non-standard content source, may need custom loader

## Execution
- Spawn Claude Code agent with this plan as context
- Agent works in a fresh `astro` branch
- Verify locally with `bun run dev` on port 1994
- Compare pages side-by-side with current production
- Squash and merge when verified
