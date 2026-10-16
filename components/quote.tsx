import { Quote as QuoteIcon } from "lucide-react";
import { FullLine } from "@/components/ui/divider";
import { quote } from "@/lib/content";

export function Quote() {
  return (
    <div className="relative px-4 py-10 sm:px-5">
      <FullLine className="top-0" />
      <QuoteIcon className="size-9 fill-current text-zinc-300 dark:text-zinc-700" />
      <blockquote className="mb-6 mt-2 max-w-2xl text-xl font-medium italic text-zinc-700 dark:text-zinc-300 sm:text-2xl">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-border" />
        <span className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          {quote.author}
        </span>
        <span className="h-px w-8 bg-border" />
      </div>
    </div>
  );
}
