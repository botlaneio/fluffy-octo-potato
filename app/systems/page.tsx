import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { MarketplaceBrowser } from "@/components/marketplace/MarketplaceBrowser";
import { ClassificationLegend } from "@/components/marketplace/ClassificationLegend";
import { systems } from "@/content/systems";
import { categories } from "@/content/categories";
import { deriveStatus, STATUS_LABELS } from "@/lib/status";

export const metadata: Metadata = {
  title: "AI Systems",
  description:
    "Browse production-ready AI business systems for sales, support, IT, operations, legal and professional services. Self-host them, or have BotLane deploy and operate them.",
  alternates: { canonical: "/systems" },
};

/**
 * The full catalogue is server-rendered into the HTML. The browser is a small
 * client island layered on top, so the page is complete and indexable with
 * JavaScript disabled — filtering is an enhancement, not a dependency.
 */
const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BotLane AI Systems",
  description:
    "Production-ready AI business systems, self-hostable or deployed and managed by BotLane.",
  hasPart: systems.map((system) => ({
    "@type": "SoftwareApplication",
    name: system.name,
    applicationCategory: "BusinessApplication",
    description: system.outcome,
    url: `https://botlane.io/systems/${system.slug}`,
    softwareVersion: system.tech.distributionVersion,
    releaseNotes: STATUS_LABELS[deriveStatus(system)],
  })),
};

export default function SystemsPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="hairline-none border-b border-line">
          <div className="page-container py-14 lg:py-20">
            <nav aria-label="Breadcrumb">
              <ol className="t-mono flex items-center gap-2" style={{ color: "var(--color-fg-faint)" }}>
                <li>
                  <a href="/" className="transition-colors hover:text-fg-secondary">
                    botlane
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">systems</li>
              </ol>
            </nav>

            <div className="mt-8 max-w-[640px]">
              <Eyebrow color="emerald">Marketplace</Eyebrow>
              <h1 className="t-h2 mt-5 text-balance text-fg">
                Every system BotLane packages.
              </h1>
              <p className="t-lead mt-4">
                Complete business systems for specific functions — each one
                versioned, documented, and honest about how far through
                productization it actually is.
              </p>
            </div>

            <ClassificationLegend />
          </div>
        </section>

        <section className="page-container py-12 lg:py-16">
          <MarketplaceBrowser systems={systems} categories={categories} />
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
    </>
  );
}
