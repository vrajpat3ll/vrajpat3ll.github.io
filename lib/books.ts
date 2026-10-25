import { z } from "zod";

const SHELF_URL = process.env.NEXT_PUBLIC_BOOKS_URL;

export type BookStatus = "in_progress" | "finished";

export type Book = {
  id: string;
  title: string;
  author: string | null;
  status: BookStatus;
  progress: number;
  pages: number | null;
  cover: string | null;
  year: number | null;
  startedAt: string | null;
  finishedAt: string | null;
  updatedAt: string;
};

export type ReadingShelf = {
  books: Book[];
};

const bookSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  author: z.string().nullable().optional(),
  status: z.enum(["in_progress", "finished"]),
  progress: z.number().optional(),
  pages: z.number().int().positive().nullable().optional(),
  cover: z.string().nullable().optional(),
  year: z.number().int().nullable().optional(),
  startedAt: z.string().nullable().optional(),
  finishedAt: z.string().nullable().optional(),
  updatedAt: z.string(),
});

function clampProgress(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

/**
 * The worker is the source of truth, but a malformed or half-written entry
 * should never throw on the site. Invalid books are dropped, valid ones kept.
 */
export function parseReadingShelf(json: unknown): ReadingShelf | null {
  if (!json || typeof json !== "object") return null;

  const raw = (json as { books?: unknown }).books;
  if (!Array.isArray(raw)) return null;

  const books: Book[] = [];

  for (const entry of raw) {
    const parsed = bookSchema.safeParse(entry);
    if (!parsed.success) continue;

    const book = parsed.data;
    books.push({
      id: book.id,
      title: book.title,
      author: book.author ?? null,
      status: book.status,
      progress:
        book.status === "finished"
          ? 1
          : clampProgress(book.progress ?? 0),
      pages: book.pages ?? null,
      cover: book.cover ?? null,
      year: book.year ?? null,
      startedAt: book.startedAt ?? null,
      finishedAt: book.finishedAt ?? null,
      updatedAt: book.updatedAt,
    });
  }

  return { books };
}

export function isReadingShelfConfigured(): boolean {
  return Boolean(SHELF_URL);
}

/**
 * Reads the shelf from the books-shelf worker. Safe from the browser (the
 * worker sends `Access-Control-Allow-Origin: *`), so the page can refresh after
 * the static build. Returns `null` when the URL is unset or the request fails.
 *
 * Do not pass `cache: "no-store"` while prerendering — a `no-store` server
 * fetch marks the route dynamic, which `output: "export"` rejects.
 */
export async function fetchReadingShelf(
  options: { signal?: AbortSignal; cache?: RequestCache } = {},
): Promise<ReadingShelf | null> {
  if (!SHELF_URL) return null;

  try {
    const res = await fetch(SHELF_URL, {
      cache: options.cache,
      signal: options.signal,
    });

    if (!res.ok) return null;

    return parseReadingShelf(await res.json());
  } catch {
    return null;
  }
}
