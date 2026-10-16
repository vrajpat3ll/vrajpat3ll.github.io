import type { ReactElement, SVGProps } from "react";
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

function GitHub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.25-.02-2.27-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

function LinkedIn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Mail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...strokeProps} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

function LeetCode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...strokeProps} {...props}>
      <path d="M13.5 3.5 6 11a4 4 0 0 0 0 5.66l2.34 2.34a4 4 0 0 0 5.66 0l1.5-1.5" />
      <path d="M9 12h11" />
      <path d="M16.5 8.5 13 5" />
    </svg>
  );
}

function Codeforces(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <rect x="2.5" y="9" width="4.5" height="12" rx="1" />
      <rect x="9.75" y="3" width="4.5" height="18" rx="1" />
      <rect x="17" y="12.5" width="4.5" height="8.5" rx="1" />
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

function Lastfm(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M9.5 15.2c-.6-1.5-1.2-3-1.8-4.5-.4-1-.1-2.1.7-2.8.9-.8 2.3-.7 3.1.2.5.6.7 1.3.5 2-.1.4-.3.8-.1 1.3.2.5.7.8 1.2.8.6 0 1-.3 1.3-.9l1.6-3.4c.6-1.3 1.9-2.1 3.3-2 2 .2 3.4 2 3.1 4-.1.8-.5 1.5-1.1 2l-1.3 1.1c-.5.4-.8 1-.8 1.6 0 1.1.9 2 2 2h3v2.5h-3.3c-2.3 0-4.2-1.9-4.2-4.2 0-1.3.6-2.5 1.6-3.3l1.3-1.1c.2-.2.3-.4.3-.6 0-.4-.4-.7-.8-.7-.3 0-.5.1-.7.4l-1.6 3.4c-.6 1.3-1.9 2.1-3.3 2.1-1.3 0-2.5-.8-3-2z" />
    </svg>
  );
}

const iconMap: Record<IconName, (props: SVGProps<SVGSVGElement>) => ReactElement> =
  {
    github: GitHub,
    linkedin: LinkedIn,
    x: XIcon,
    mail: Mail,
    leetcode: LeetCode,
    codeforces: Codeforces,
    resume: Resume,
    blog: Blog,
    lastfm: Lastfm,
  };

export function Icon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  const Cmp = iconMap[name];
  return <Cmp {...props} />;
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

export function SpotifyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.586 14.424a.75.75 0 0 1-1.031.25c-2.824-1.724-6.377-2.115-10.565-1.159a.75.75 0 1 1-.334-1.462c4.58-1.046 8.508-.604 11.68 1.333a.75.75 0 0 1 .25 1.038zm1.223-2.723a.937.937 0 0 1-1.288.309c-3.232-1.986-8.157-2.561-11.979-1.401a.938.938 0 1 1-.544-1.794c4.364-1.324 9.795-.683 13.502 1.595a.937.937 0 0 1 .309 1.291zm.106-2.835C14.041 8.562 7.795 8.354 4.114 9.472a1.124 1.124 0 1 1-.652-2.152c4.226-1.282 11.122-1.034 15.507 1.57a1.125 1.125 0 0 1-1.15 1.932z" />
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

export function MusicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...strokeProps} {...props}>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </svg>
  );
}
