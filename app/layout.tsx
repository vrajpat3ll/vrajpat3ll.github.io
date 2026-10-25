import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { ProgressBar } from "@/components/progress-bar";
import { ThemeProvider } from "@/components/providers";
import { Column } from "@/components/ui/panel";
import { connect, site } from "@/lib/content";
import { getBlogs } from "@/lib/blog";
import "./globals.css";

const sameAs = connect
  .map((link) => link.href)
  .filter((href) => href.startsWith("http"));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.username,
  url: site.url,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  sameAs,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    site.name,
    site.username,
    "software developer",
    "portfolio",
    "engineer",
    "IIT Jammu",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  openGraph: {
    type: "profile",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var isDark=(t==='dark')||(t!=='light'&&!(t==='system'&&!window.matchMedia('(prefers-color-scheme: dark)').matches));var r=document.documentElement;if(isDark){r.classList.add('dark');r.style.colorScheme='dark'}else{r.classList.remove('dark');r.style.colorScheme='light'}}catch(e){document.documentElement.classList.add('dark')}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const latest = getBlogs()[0];
  const latestPost = latest
    ? { title: latest.frontmatter.title, slug: latest.slug }
    : undefined;

  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#09090b" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <ThemeProvider>
          <ProgressBar />
          <SiteHeader latestPost={latestPost} />
          <main className="flex max-w-screen flex-1 flex-col overflow-x-clip px-2">
            <Column className="w-full flex-1">{children}</Column>
          </main>
          <div className="px-2">
            <Column>
              <SiteFooter />
            </Column>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
