# vrajpat3ll.github.io

Personal site — Next.js static export, deployed to GitHub Pages.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Build

```bash
pnpm build        # outputs static site to ./out
```

## Editing content

Everything lives in [`lib/content.ts`](lib/content.ts):

- `site` — name, role, description
- `about` — bio paragraphs
- `connect` — the social/contact cards
- `experience` — work history (currently empty — fill this in)
- `education`
- `projects` — projects page
- `quote` — footer quote

## Assets

- **Resume** → `public/resume.pdf` (served at `/resume.pdf`).
- **Avatar** → drop a file at `public/avatar.png`. Until then the site shows
  your initials. (Edit the `src` in `components/profile-header.tsx` for another
  name/format.)

## Now-playing (Last.fm)

1. Create an API key at <https://www.last.fm/api/account/create>.
2. Copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_LASTFM_API_KEY`.
3. For production, add the same value as a repo **Actions secret**
   (`NEXT_PUBLIC_LASTFM_API_KEY`).

If the key is unset, the widget hides itself.

Tracks link out to Spotify via a **search deep link**
(`open.spotify.com/search/<artist> <title>`), with a small Last.fm credit for
attribution. Exact `open.spotify.com/track/<id>` links aren't possible here:
Last.fm exposes no Spotify ID, and a static export has no server route to
resolve one (the reference site's `/api/spotify` is server-backed).

## GitHub activity

The contribution heatmap is fetched **at build time** and baked into the static
HTML. Set `GH_CONTRIB_TOKEN` (a token with `read:user`) in `.env.local` and as a
repo **Actions secret** to use the GitHub GraphQL API. Without it, the build
falls back to the public `github-contributions-api`; if both fail, the panel
degrades to a short message instead of breaking the build.

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes to GitHub Pages.

One-time setup: **Settings → Pages → Source → GitHub Actions**.
