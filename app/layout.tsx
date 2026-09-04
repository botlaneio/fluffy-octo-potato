import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://botlane.io"),
  title: {
    default: "BotLane — Production-ready AI systems for real businesses",
    template: "%s — BotLane",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "BotLane — Production-ready AI systems for real businesses",
    description: site.description,
    url: "https://botlane.io",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: "https://botlane.io",
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Fonts are served from this origin — see app/fonts.css. Preload the
            latin subsets, which every page needs; latin-ext loads on demand. */}
        <link
          rel="preload"
          href="/fonts/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/jetbrains-mono-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[6px] focus:bg-fg focus:px-4 focus:py-2 focus:text-[0.875rem] focus:text-black"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
