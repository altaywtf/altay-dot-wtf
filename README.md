# altay.wtf

Personal website, [altay.wtf](https://altay.wtf). Blog posts, book notes, dictionary, and resume.

## Stack

- [Astro](https://astro.build) 5 (static output)
- [Tailwind CSS](https://tailwindcss.com) 4 + typography plugin
- Markdown content in `data/`, loaded via `fs` at build time
- Self-hosted fonts (Inter, JetBrains Mono)
- OG images generated at build time with [Satori](https://github.com/vercel/satori) + [resvg](https://github.com/nicolo-ribaudo/resvg-js)
- Deployed to [Cloudflare Workers](https://workers.cloudflare.com) (static assets)

## Development

```sh
bun install
bun run dev          # Start dev server on :1994
bun run build        # Production build
bun run lint         # oxlint
bun run format       # oxfmt
bun run typecheck    # astro check + tsc
bun run knip         # Find unused exports/deps
bun test             # bun:test
```

## Content

Markdown files in `data/`, loaded directly via `fs` at build time:

- `data/posts/`, blog posts
- `data/books/` + `data/books.json`, book notes with metadata
- `data/dictionary/`, word/phrase definitions
- `data/home.md`, `data/resume.md`, standalone pages
