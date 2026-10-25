# AGENTS.md

Personal site: Next.js App Router, **static export** to GitHub Pages. See `README.md` for env setup and deploy details.

## Commands

- `pnpm install`, `pnpm dev`, `pnpm build` (writes `./out`).
- Verify with `pnpm typecheck` (`tsc --noEmit`). **There is no lint or test suite** — don't invent `pnpm lint`/`pnpm test`.
- pnpm only (lockfile v9); CI uses pnpm 10 + Node 22. Path alias `@/*` maps to repo root.

## Static-export constraints

- `next.config.ts` sets `output: "export"`, `trailingSlash: true`, `images.unoptimized`. No server runtime, no API routes, no `next start`, no `next/image` optimization.
- All pages are prerendered. Blog uses `dynamicParams = false` + `generateStaticParams` — new posts only exist after a rebuild.
- Anything env-dependent is baked in at build time. `NEXT_PUBLIC_*` vars are inlined into the client bundle; `GH_CONTRIB_TOKEN` is build-only. Never assume runtime env. The GitHub heatmap is the exception: it hydrates from the build snapshot, then re-fetches the public contributions API in the browser (see `lib/contributions.ts`).

## Content

- All site copy (site/about/connect/nav/experience/education/projects/quotes) lives in `lib/content.ts` — edit there, not in components.
- Blog posts: `content/blogs/*.mdx`. Frontmatter is zod-validated in `lib/blog.ts` (`title`, `summary`, `category`, `status`, `date`); `status` must be one of `EXPLORING | IN PROGRESS | VALIDATING | COMPLETE`. Invalid frontmatter **fails the build**.

## Gotchas

- **Brand marks** live in `assets/brands/*.svg` (not `public/`). They're rendered as CSS `mask-image` in `components/brand-mark.tsx`, so each SVG must be a single-colour mark that inherits `currentColor` — don't bake in brand colours.
- **Quote of the day** (`lib/quotes.ts`) is day-stable. `app/page.tsx` passes the build-day index down so prerender and first client render match; client re-syncs in `components/quote.tsx`. Don't compute `new Date()` unconditionally at render.
- `workers/spotify-resolver/` is a **separate Cloudflare Worker** (plain JS, wrangler), not part of the Next build. It returns `{ songUrl }` and is optional — the widget falls back to a Spotify search link.
- `workers/books-shelf/` is the reading shelf backend (separate Worker + KV). The site reads `NEXT_PUBLIC_BOOKS_URL`: build-time snapshot in `app/reading/page.tsx`, browser refresh in `components/reading-shelf.tsx`. Apple Books can't be read automatically on iOS — books are logged via Shortcuts (see the worker README). Cover lookup happens in the Worker, never client-side.
- Build artifacts `out/` and `.next/` are gitignored; never edit them.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
