# books-shelf

A tiny Cloudflare Worker that stores the reading shelf shown at `/reading/`.

Apple Books has no public API, and on iOS/iPadOS its library is sandboxed — no
app or Shortcut can read a book's progress. This worker is the compromise: an
iOS **Shortcut** posts the current book and percentage to the worker, the worker
enriches the entry with a cover + page count, and the site reads the shelf back.

`GET /` is public (the shelf is public on the site). Writes need the
`BOOKS_AUTH_TOKEN` secret as a bearer token.

## Deploy

```bash
cd workers/books-shelf

# 1. Create the KV namespace and paste the returned id into wrangler.toml
npx wrangler kv namespace create BOOKS_SHELF

# 2. Pick a long random token (this is what the Shortcuts send)
npx wrangler secret put BOOKS_AUTH_TOKEN

# 3. Ship it
npx wrangler deploy
```

Then set the deployed URL as `NEXT_PUBLIC_BOOKS_URL` in `.env.local` and as a
repository **Actions variable** (same name) for the GitHub Pages build. Without
it the `/reading/` page still builds and shows the "not connected" state.

Smoke test:

```bash
curl https://books-shelf.<account>.workers.dev/

curl -X POST https://books-shelf.<account>.workers.dev/ \
  -H "Authorization: Bearer $BOOKS_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"The Pragmatic Programmer","author":"Andrew Hunt","status":"in_progress","progress":0.35}'
```

## API

- `GET /` → `{ books: Book[] }`
- `POST /` (auth) → upsert by title
  ```json
  {
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt",
    "status": "in_progress",
    "progress": 0.35,
    "cover": "https://…",
    "pages": 352,
    "year": 1999
  }
  ```
  `progress` accepts `0–1` or `0–100`. Only `title` is required. `cover`,
  `pages`, `year`, and `author` override the automatic lookup when provided.
  `status: "finished"` sets progress to 1 and stamps `finishedAt`.
- `DELETE /?id=<slug>` or `DELETE /` with `{ "id": "…" }` (auth) → removes a book.

Metadata lookup runs on write only when a field is still missing: Open Library
search → Google Books fallback. A lookup failure never blocks the write; the
site draws the title typographically instead.

## Shortcuts (iPhone / iPad)

Create two shortcuts, then add them to the Home Screen and give them Siri
phrases.

**1. Book progress**

1. _Ask for Input_ — Text, prompt `Book title`
2. _Ask for Input_ — Text, prompt `Author (optional)`
3. _Ask for Input_ — Number, prompt `Percent read`
4. _Calculate Expression_ — `Provided Input / 100` (the percent from step 3)
5. _Get Contents of URL_
   - URL: `https://books-shelf.<account>.workers.dev/`
   - Method: `POST`
   - Headers: `Authorization` = `Bearer <BOOKS_AUTH_TOKEN>`
   - Request Body: `JSON`, fields:
     - `title` = Provided Input from step 1
     - `author` = Provided Input from step 2
     - `progress` = Calculation Result
     - `status` = `in_progress`
6. _Show Notification_ — `Logged: <title>`

**2. Finish book**

Same as above, but body `status` = `finished` (progress is optional; the worker
sets it to 100%).

To remove a book, use _Get Contents of URL_ with method `DELETE`, URL
`https://books-shelf.<account>.workers.dev/?id=<slug>`, and the same
Authorization header.

> The title is slugified (`The Pragmatic Programmer` → `the-pragmatic-programmer`)
> and used as the entry id. Logging the same title again updates the existing
> entry rather than adding a duplicate.
