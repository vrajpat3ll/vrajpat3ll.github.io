import type { Metadata } from "next";
import { ReadingShelf } from "@/components/reading-shelf";
import { Panel } from "@/components/ui/panel";
import { fetchReadingShelf } from "@/lib/books";

export const metadata: Metadata = {
  title: "Reading",
  description:
    "What I'm reading and what I've finished, kept in sync from Apple Books.",
};

export default async function ReadingPage() {
  const initial = await fetchReadingShelf({ cache: "force-cache" });

  return (
    <Panel id="reading" title="Reading">
      <p className="mb-8 max-w-prose font-mono text-sm text-muted-foreground">
        Books I&apos;m working through and the ones behind me. Progress is
        logged from Apple Books on my phone, so the shelf is as fresh as my last
        update.
      </p>

      <ReadingShelf initial={initial} />
    </Panel>
  );
}
