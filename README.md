# vrajpat3ll.github.io

Personal site and portfolio — Next.js (App Router) static export, deployed to
GitHub Pages.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Build

```bash
pnpm build        # outputs static site to ./out
pnpm typecheck    # tsc --noEmit
```

There is no lint or test suite.

## Editing content

Everything lives in [`lib/content.ts`](lib/content.ts):

- `site` — name, username, role, location, email, canonical `url`, page title/description, bio
- `about` — bio paragraphs
- `connect` — the social/contact cards
- `nav` / `moreNav` — header navigation entries
- `rolePhrases` — the rotating phrases in the profile header
- `experience` — work history
- `education` — degrees
- `projects` — the projects page
- `lastfm` — username for the now-playing widget
- `quotes` — the pool the daily quote is drawn from (rotates once per day)

## Blog

Posts live in `content/blogs/*.mdx`. Frontmatter is zod-validated in
[`lib/blog.ts`](lib/blog.ts) at build time; invalid frontmatter fails the build.

```yaml
---
title: "…"
summary: "…"
category: "…"
status: "IN PROGRESS"   # EXPLORING | IN PROGRESS | VALIDATING | COMPLETE
date: "2026-08-01"
---
```

Because the blog uses `dynamicParams = false` + `generateStaticParams`, a new
post only exists after a rebuild — pushing to `main` triggers one.

## Assets

- **Resume** → `public/resume.pdf` (served at `/resume.pdf`).
- **Avatar** → drop a file at `public/avatar.png`. Until then the site shows
  your initials. (Edit the `src` in `components/profile-header.tsx` for another
  name/format.)
- **Brand marks** → `assets/brands/*.svg` (official marks, sourced from
  [Simple Icons](https://simpleicons.org)). They're painted via `mask-image` in
  `components/brand-mark.tsx`, so each mark takes the current text colour and
  stays legible in both themes. Swap a file to update the mark.

## Quote of the day

`lib/content.ts` holds the quote pool; `lib/quotes.ts` maps the current UTC day
onto an entry, so the quote is stable all day and changes at the day boundary.
Because this is a static export, the rotation runs client-side: `app/page.tsx`
passes the build-day index down so the prerendered HTML and first client render
agree, and `components/quote.tsx` re-checks on mount and every few minutes.

## Now-playing (Last.fm)

1. Create an API key at <https://www.last.fm/api/account/create>.
2. Copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_LASTFM_API_KEY`.
3. For production, add the same value as a repo **Actions secret**
   (`NEXT_PUBLIC_LASTFM_API_KEY`).

If the key is unset, the widget hides itself.

Tracks link out to Spotify, with a small Last.fm credit for attribution. By
default that's a **search deep link** (`open.spotify.com/search/<artist> <title>`)
because Last.fm exposes no Spotify ID, and every keyless cross-platform resolver
(Odesli/song.link, Songwhip) has shut down.

For **exact track links** (`open.spotify.com/track/<id>`), deploy the companion
resolver, which holds the Spotify credentials that a static bundle cannot:

```bash
cd workers/spotify-resolver
npx wrangler deploy
npx wrangler secret put SPOTIFY_CLIENT_ID
npx wrangler secret put SPOTIFY_CLIENT_SECRET
```

Create the app at <https://developer.spotify.com/dashboard> (Client Credentials
is enough — no redirect URI or user login). Then set the Worker URL as
`NEXT_PUBLIC_SPOTIFY_RESOLVER_URL` in `.env.local` and as a repo **Actions
variable** of the same name. The widget asks the resolver per track, caches the
answer, and silently falls back to the search link if it's unset or errors.

## Reading shelf (Apple Books)

Apple Books has no public API, and its library is sandboxed on iOS/iPadOS, so
progress can't be read automatically without a Mac. Instead, a pair of iOS
**Shortcuts** posts the current book and percentage to a small Cloudflare
Worker, which enriches the entry with a cover + page count and stores it in KV.
The `/reading/` page is prerendered from a build-time snapshot and then
refreshes from the Worker in the browser, so updates show up without a redeploy.

```bash
cd workers/books-shelf
npx wrangler kv namespace create BOOKS_SHELF   # paste id into wrangler.toml
npx wrangler secret put BOOKS_AUTH_TOKEN
npx wrangler deploy
```

Then set the Worker URL as `NEXT_PUBLIC_BOOKS_URL` in `.env.local` and as a repo
**Actions variable** of the same name. Shortcut recipes and the full API live in
[`workers/books-shelf/README.md`](workers/books-shelf/README.md). Without the
URL the page still builds and shows an empty state.

## GitHub activity

The contribution heatmap is **prerendered from a build-time snapshot** and then
refreshed in the browser from the public `github-contributions-api`, so it keeps
up with new contributions without a redeploy. Set `GH_CONTRIB_TOKEN` (a token
with `read:user`) in `.env.local` and as a repo **Actions secret** to build the
snapshot via the GitHub GraphQL API; without it, the build falls back to the
same public API. The token is never shipped to the client, so the browser
refresh only sees public contributions. If both the snapshot and the refresh
fail, the panel degrades to a short message instead of breaking the build.

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes to GitHub Pages.

One-time setup: **Settings → Pages → Source → GitHub Actions**.
