import type { ReactElement, SVGProps } from "react";
import type { BrandName } from "@/components/brand-mark";
import { BrandMark, SPOTIFY_GREEN } from "@/components/brand-mark";
import type { IconName } from "@/lib/content";

const base = {
  viewBox: "0 0 24 24",
  width: 20,
  height: 20,
  xmlns: "http://www.w3.org/2000/svg",
} as const;

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Mail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...strokeProps} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

function Resume(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...strokeProps} {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

function Blog(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...strokeProps} {...props}>
      <path d="M12 6.5C10.5 5 8.5 4.5 4 4.5v13c4.5 0 6.5.5 8 2 1.5-1.5 3.5-2 8-2v-13c-4.5 0-6.5.5-8 2z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

/** Brand icons come from the official marks in `assets/brands/`. */
const brandIcons: Partial<Record<IconName, BrandName>> = {
  github: "github",
  linkedin: "linkedin",
  x: "x",
  leetcode: "leetcode",
  codeforces: "codeforces",
  lastfm: "lastfm",
};

const strokeIcons: Record<string, (props: SVGProps<SVGSVGElement>) => ReactElement> =
  {
    mail: Mail,
    resume: Resume,
    blog: Blog,
  };

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const brand = brandIcons[name];
  if (brand) return <BrandMark name={brand} className={className} />;

  const Cmp = strokeIcons[name];
  return Cmp ? <Cmp className={className} /> : null;
}

export function SpotifyIcon({ className }: { className?: string }) {
  return (
    <BrandMark name="spotify" className={className} style={{ color: SPOTIFY_GREEN }} />
  );
}

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...strokeProps} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...strokeProps} {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...strokeProps} {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}
