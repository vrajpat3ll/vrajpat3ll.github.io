const SHELF_KEY = "shelf";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Access-Control-Max-Age": "86400",
};

const UA = "vrajpat3ll-reading-shelf/1.0 (https://vrajpat3ll.github.io)";

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS, ...extra },
  });
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normalizeProgress(value) {
  const number = typeof value === "string" ? Number(value) : value;
  if (typeof number !== "number" || !Number.isFinite(number)) return null;
  const fraction = number > 1 ? number / 100 : number;
  return Math.min(Math.max(fraction, 0), 1);
}

function constantTimeEqual(a, b) {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let i = 0; i < left.length; i += 1) {
    mismatch |= left[i] ^ right[i];
  }
  return mismatch === 0;
}

function authorized(request, env) {
  if (!env.BOOKS_AUTH_TOKEN) return false;
  const header = request.headers.get("Authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  if (token.length < 16) return false;
  return constantTimeEqual(token, env.BOOKS_AUTH_TOKEN);
}

async function readShelf(env) {
  const raw = await env.BOOKS_SHELF.get(SHELF_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeShelf(env, books) {
  await env.BOOKS_SHELF.put(SHELF_KEY, JSON.stringify(books));
}

async function lookupOpenLibrary(title, author) {
  const url = new URL("https://openlibrary.org/search.json");
  url.searchParams.set("title", title);
  if (author) url.searchParams.set("author", author);
  url.searchParams.set("limit", "1");
  url.searchParams.set(
    "fields",
    "title,author_name,first_publish_year,number_of_pages_median,cover_i",
  );

  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;

  const data = await res.json();
  const doc = data?.docs?.[0];
  if (!doc) return null;

  return {
    author: doc.author_name?.[0] ?? null,
    year: Number.isFinite(doc.first_publish_year)
      ? doc.first_publish_year
      : null,
    pages: Number.isFinite(doc.number_of_pages_median)
      ? doc.number_of_pages_median
      : null,
    cover: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
      : null,
  };
}

async function lookupGoogleBooks(title, author) {
  const query = `intitle:${title}${author ? `+inauthor:${author}` : ""}`;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`;

  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;

  const data = await res.json();
  const info = data?.items?.[0]?.volumeInfo;
  if (!info) return null;

  const year = Number.parseInt(String(info.publishedDate ?? "").slice(0, 4), 10);

  return {
    author: info.authors?.[0] ?? null,
    year: Number.isFinite(year) ? year : null,
    pages: Number.isFinite(info.pageCount) ? info.pageCount : null,
    cover: info.imageLinks?.thumbnail
      ? info.imageLinks.thumbnail.replace(/^http:/, "https:")
      : null,
  };
}

/**
 * Best-effort metadata lookup. Open Library wins when it has a cover; otherwise
 * Google Books is tried and the two results are merged. Any failure returns
 * `null` so the book still syncs without a cover (the site falls back to type).
 */
async function enrich(title, author) {
  try {
    const openLibrary = await lookupOpenLibrary(title, author);
    if (openLibrary?.cover) return openLibrary;

    const google = await lookupGoogleBooks(title, author);
    if (!google) return openLibrary;

    return {
      author: google.author ?? openLibrary?.author ?? null,
      year: google.year ?? openLibrary?.year ?? null,
      pages: google.pages ?? openLibrary?.pages ?? null,
      cover: google.cover ?? openLibrary?.cover ?? null,
    };
  } catch {
    return null;
  }
}

function optionalString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function optionalPositiveInt(value) {
  const number = typeof value === "string" ? Number(value) : value;
  return Number.isInteger(number) && number > 0 ? number : null;
}

async function handleUpsert(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const title = optionalString(body?.title);
  if (!title) return json({ error: "missing_title" }, 400);

  const books = await readShelf(env);
  const id = slugify(title);
  const index = books.findIndex((book) => book.id === id);
  const existing = index >= 0 ? books[index] : null;

  const status = body?.status === "finished" ? "finished" : "in_progress";
  const progress = normalizeProgress(body?.progress);
  const now = new Date().toISOString();

  const book = {
    id,
    title,
    author: optionalString(body?.author) ?? existing?.author ?? null,
    status,
    progress:
      status === "finished"
        ? 1
        : (progress ?? (existing ? existing.progress : 0)),
    pages: optionalPositiveInt(body?.pages) ?? existing?.pages ?? null,
    cover: optionalString(body?.cover) ?? existing?.cover ?? null,
    year: optionalPositiveInt(body?.year) ?? existing?.year ?? null,
    startedAt:
      existing?.startedAt ?? (status === "in_progress" ? now : null),
    finishedAt: status === "finished" ? (existing?.finishedAt ?? now) : null,
    updatedAt: now,
  };

  if (!book.cover || !book.pages || !book.year) {
    const meta = await enrich(book.title, book.author);
    if (meta) {
      book.author = book.author ?? meta.author;
      book.cover = book.cover ?? meta.cover;
      book.pages = book.pages ?? meta.pages;
      book.year = book.year ?? meta.year;
    }
  }

  if (index >= 0) books[index] = book;
  else books.push(book);

  await writeShelf(env, books);
  return json({ book });
}

async function handleDelete(request, env) {
  const url = new URL(request.url);
  let id = url.searchParams.get("id");

  if (!id) {
    try {
      const body = await request.json();
      id = optionalString(body?.id) ?? optionalString(body?.title);
      if (id && id !== slugify(id)) id = slugify(id);
    } catch {
      return json({ error: "missing_id" }, 400);
    }
  }

  if (!id) return json({ error: "missing_id" }, 400);

  const books = await readShelf(env);
  const next = books.filter((book) => book.id !== id);
  if (next.length === books.length) return json({ error: "not_found" }, 404);

  await writeShelf(env, next);
  return json({ removed: id });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    if (request.method === "GET") {
      const books = await readShelf(env);
      return json(
        { books },
        200,
        { "Cache-Control": "public, max-age=300" },
      );
    }

    if (!authorized(request, env)) {
      return json({ error: "unauthorized" }, 401);
    }

    if (request.method === "POST") return handleUpsert(request, env);
    if (request.method === "DELETE") return handleDelete(request, env);

    return json({ error: "method_not_allowed" }, 405);
  },
};
