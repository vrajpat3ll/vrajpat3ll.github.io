import type { Metadata } from "next";
import Link from "next/link";
import { DinoGame } from "@/components/dino-game";
import { Panel } from "@/components/ui/panel";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404",
  description: "This page wandered off.",
};

export default function NotFound() {
  return (
    <Panel title="404">
      <p className="font-mono text-sm text-muted-foreground">
        This page doesn&apos;t exist. You know the drill — while you&apos;re
        here:
      </p>

      <DinoGame />

      <div className="mt-6 flex gap-3">
        <Link href="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
          Back home
        </Link>
      </div>
    </Panel>
  );
}
