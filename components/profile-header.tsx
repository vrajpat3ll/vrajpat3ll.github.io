"use client";

import { BadgeCheck, Camera, Eye } from "lucide-react";
import { useState } from "react";
import { AnimatedText } from "@/components/animated-text";
import { ActivityStatus } from "@/components/activity-status";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip } from "@/components/ui/tooltip";
import { rolePhrases, site } from "@/lib/content";
import { cn } from "@/lib/utils";

function CornerMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute z-10 size-3", className)}
    >
      <span className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-zinc-300 dark:bg-zinc-600" />
      <span className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-zinc-300 dark:bg-zinc-600" />
    </span>
  );
}

function AvatarImage({
  failed,
  onError,
  className,
}: {
  failed: boolean;
  onError: () => void;
  className?: string;
}) {
  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted font-pixel text-2xl text-muted-foreground",
          className,
        )}
      >
        VP
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/avatar.png"
      alt={`${site.name}'s avatar`}
      onError={onError}
      className={cn("select-none object-cover", className)}
    />
  );
}

export function ProfileHeader() {
  const [glitching, setGlitching] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <>
      <div className="relative h-[70px] w-full px-1.5 pattern-dots sm:h-[110px]" />

      <div className="relative flex border-t border-edge">
        <CornerMark className="-top-1.5 left-0 -translate-x-1/2" />
        <CornerMark className="-top-1.5 right-0 translate-x-1/2" />

        <div className="w-[35%] shrink-0 p-2 sm:w-auto sm:p-5">
          <div className="aspect-square rounded-xl border border-border p-1 transition duration-300 hover:brightness-90 sm:size-32">
            <Dialog>
              <DialogTrigger asChild>
                <div
                  data-glitching={glitching}
                  className="avatar-glitch relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg"
                >
                  <AvatarImage
                    failed={failed}
                    onError={() => setFailed(true)}
                    className="h-full w-full"
                  />
                  <span
                    aria-hidden="true"
                    className="avatar-glitch__scanlines pointer-events-none absolute inset-0 rounded-lg"
                  />
                  <span
                    aria-hidden="true"
                    className="avatar-glitch__rgb pointer-events-none absolute inset-0 rounded-lg"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="w-[85vw] max-w-sm">
                <DialogTitle className="sr-only">{site.name}</DialogTitle>
                <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl">
                  <AvatarImage
                    failed={failed}
                    onError={() => setFailed(true)}
                    className="aspect-square w-full rounded-xl"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-1 py-2 pl-2 sm:pl-4">
          <div className="flex items-center justify-between pr-2 sm:pr-4">
            <Tooltip label="Toggle glitch effect">
              <button
                type="button"
                aria-label="Toggle glitch effect"
                onClick={() => setGlitching((v) => !v)}
                className="inline-flex size-5 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Camera className="size-3.5" />
              </button>
            </Tooltip>
            <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <Eye className="size-3.5" />
              <span className="tabular-nums">—</span>
            </span>
          </div>

          <div className="flex items-center gap-2 pt-2 pb-2">
            <h1 className="font-pixel text-xl leading-none font-black sm:text-3xl">
              {site.name}
            </h1>
            <BadgeCheck
              aria-label="Verified"
              className="size-4.5 shrink-0 text-info"
            />
          </div>

          <AnimatedText
            phrases={rolePhrases}
            className="min-h-5 overflow-hidden font-mono text-sm text-muted-foreground"
          />

          <ActivityStatus />
        </div>
      </div>
    </>
  );
}
