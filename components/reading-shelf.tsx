"use client";

import { useEffect, useState } from "react";
import { ProjectMark, type MarkTone } from "@/components/project-mark";
import {
  fetchReadingShelf,
  isReadingShelfConfigured,
  type Book,
  type ReadingShelf as Shelf,
} from "@/lib/books";
import { cn, formatMonthYear } from "@/lib/utils";

const REFRESH_MS = 15 * 60_000;

const TONES: MarkTone[] = ["foreground", "muted", "info", "live"];

function initials(title: string): string {
  const words = title
    .toUpperCase()
    .replace(/[^A-Z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2);
  return `${words[0][0]}${words[1][0]}`;
}

function toneFor(id: string): MarkTone {
  let hash = 0;
  for (const char of id) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return TONES[hash % TONES.length];
}

function Cover({
  book,
  className,
}: {
  book: Book;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(book.cover) && !failed;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-border bg-muted",
        className,
      )}
    >
      {showImage ? (
        <img
          src={book.cover ?? undefined}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="pattern-dots flex h-full w-full items-center justify-center">
          <ProjectMark
            mark={initials(book.title)}
            tone={toneFor(book.id)}
            anim="pulse"
            className="h-8 w-auto opacity-80 sm:h-9"
          />
        </div>
      )}
    </div>
  );
}

function byRecency(a: Book, b: Book): number {
  return (b.finishedAt ?? b.updatedAt).localeCompare(
    a.finishedAt ?? a.updatedAt,
  );
}

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
      {children}
    </h3>
  );
}

function CurrentlyReading({ book }: { book: Book }) {
  const percent = Math.round(book.progress * 100);
  const pagesRead = book.pages
    ? Math.max(1, Math.round(book.pages * book.progress))
    : null;

  return (
    <li className="flex gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-muted-foreground/40">
      <Cover book={book} className="aspect-2/3 w-16 shrink-0" />

      <div className="flex min-w-0 flex-1 flex-col">
        <h4 className="truncate text-sm font-medium text-foreground">
          {book.title}
        </h4>
        <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
          {book.author ?? "Unknown author"}
          {book.year ? ` · ${book.year}` : ""}
        </p>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline justify-between gap-2 font-mono text-[11px] text-muted-foreground">
            <span>
              {pagesRead && book.pages
                ? `${pagesRead} / ${book.pages} pp.`
                : "In progress"}
            </span>
            <span className="text-foreground">{percent}%</span>
          </div>
          <div
            role="progressbar"
            aria-label={`${book.title} progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-foreground transition-[width] duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            Last read · {formatMonthYear(book.updatedAt)}
          </p>
        </div>
      </div>
    </li>
  );
}

function FinishedBook({ book }: { book: Book }) {
  return (
    <li className="group flex flex-col">
      <Cover
        book={book}
        className="aspect-2/3 w-full transition-colors group-hover:border-muted-foreground/40"
      />
      <h4 className="mt-2 line-clamp-2 text-xs font-medium leading-snug text-foreground">
        {book.title}
      </h4>
      <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
        {book.author ?? "Unknown author"}
        {book.year ? ` · ${book.year}` : ""}
      </p>
      <p className="mt-1 font-mono text-[10px] text-muted-foreground">
        {book.finishedAt
          ? `Finished ${formatMonthYear(book.finishedAt)}`
          : "Finished"}
        {book.pages ? ` · ${book.pages} pp.` : ""}
      </p>
    </li>
  );
}

/**
 * The build-time snapshot is rendered first so the prerendered HTML and the
 * first client render agree; the effect then refreshes it from the worker and
 * keeps it current while the tab is open.
 */
export function ReadingShelf({ initial }: { initial: Shelf | null }) {
  const [shelf, setShelf] = useState<Shelf | null>(initial);
  const configured = isReadingShelfConfigured();

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const refresh = async () => {
      const next = await fetchReadingShelf({
        signal: controller.signal,
        cache: "no-store",
      });
      if (active && next) setShelf(next);
    };

    void refresh();
    const id = setInterval(() => void refresh(), REFRESH_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    const onOnline = () => void refresh();

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onOnline);

    return () => {
      active = false;
      controller.abort();
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  const books = shelf?.books ?? [];
  const reading = books
    .filter((book) => book.status === "in_progress")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const finished = books
    .filter((book) => book.status === "finished")
    .sort(byRecency);

  if (books.length === 0) {
    return (
      <p className="border-t border-border py-8 font-mono text-sm text-muted-foreground">
        {configured
          ? "Nothing on the shelf yet."
          : "The shelf isn't connected yet."}
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {reading.length > 0 && (
        <section>
          <GroupHeading>Currently reading</GroupHeading>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {reading.map((book) => (
              <CurrentlyReading key={book.id} book={book} />
            ))}
          </ul>
        </section>
      )}

      {finished.length > 0 && (
        <section>
          <GroupHeading>Finished</GroupHeading>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4">
            {finished.map((book) => (
              <FinishedBook key={book.id} book={book} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
