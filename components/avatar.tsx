"use client";

import { useState } from "react";

export function Avatar({
  src = "/avatar.png",
  alt,
  initials,
}: {
  src?: string;
  alt: string;
  initials: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
      {failed ? (
        <div className="flex h-full w-full items-center justify-center font-mono text-xl text-muted-foreground">
          {initials}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={80}
          height={80}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
