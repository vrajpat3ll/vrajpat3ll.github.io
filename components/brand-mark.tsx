import type { CSSProperties } from "react";
import codeforces from "@/assets/brands/codeforces.svg";
import github from "@/assets/brands/github.svg";
import lastfm from "@/assets/brands/lastdotfm.svg";
import leetcode from "@/assets/brands/leetcode.svg";
import linkedin from "@/assets/brands/linkedin.svg";
import medium from "@/assets/brands/medium.svg";
import spotify from "@/assets/brands/spotify.svg";
import x from "@/assets/brands/x.svg";
import { cn } from "@/lib/utils";

export type BrandName =
  | "spotify"
  | "lastfm"
  | "github"
  | "linkedin"
  | "x"
  | "leetcode"
  | "codeforces"
  | "medium";

/**
 * Official brand marks, kept as SVG files in `assets/brands/`. They're painted
 * with `mask-image` so the mark takes the element's current colour, which keeps
 * the monochrome UI intact while the geometry stays brand-accurate.
 */
const SOURCES: Record<BrandName, string | { src: string }> = {
  spotify,
  lastfm,
  github,
  linkedin,
  x,
  leetcode,
  codeforces,
  medium,
};

/** Next hands back `StaticImageData` for image imports; take the URL. */
function urlOf(asset: string | { src: string }): string {
  return typeof asset === "string" ? asset : asset.src;
}

export function BrandMark({
  name,
  className,
  style,
}: {
  name: BrandName;
  className?: string;
  style?: CSSProperties;
}) {
  const src = urlOf(SOURCES[name]);

  return (
    <span
      aria-hidden="true"
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        ...style,
      }}
    />
  );
}
