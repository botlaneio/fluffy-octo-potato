import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SystemCard } from "@/components/SystemCard";
import { StatusBadge, DeploymentBadges } from "@/components/ui/Badge";
import { ProductSection } from "@/components/product/ProductSection";
import { SpecTable, type SpecRow } from "@/components/product/SpecTable";
import { GateChecklist } from "@/components/product/GateChecklist";
import { UpstreamPanel } from "@/components/product/UpstreamPanel";
import { AvailabilityNotice } from "@/components/product/AvailabilityNotice";
import { ProductCta } from "@/components/product/ProductCta";
import { FaqList } from "@/components/product/FaqList";
import { Check } from "@/components/ui/Arrow";

import { systems, systemBySlug, relatedSystems } from "@/content/systems";
import { categoryBySlug } from "@/content/categories";
import { deploymentOptions } from "@/content/site";
import {
  CLASSIFICATION_LABELS,
  DEPLOYMENT_LABELS,
  GATE_TOTAL,
  deriveStatus,
  gatesPassed,
  STATUS_LABELS,
} from "@/lib/status";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return systems.map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const system = systemBySlug(slug);
  if (!system) return {};

  return {
    title: system.shortName,
    description: system.outcome,
    alternates: { canonical: `/systems/${system.slug}` },
    openGraph: {
      title: `${system.name} — BotLane`,
      description: system.outcome,
      type: "website",
    },
  };
}

export default async function SystemPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const system = systemBySlug(slug);
  if (!system) notFound();

  const status = deriveStatus(system);
  const passed = gatesPassed(system.gates);
  const category = categoryBySlug(system.categorySlug);
  const related = relatedSystems(system);

  /* Technical specification — only rows we actually have values for. */
  const specRows: SpecRow[] = [
    { label: "Classification", value: CLASSIFICATION_LABELS[system.classification] },
    { label: "Category", value: category?.name ?? system.categorySlug },
    { label: "Release status", value: STATUS_LABELS[status] },
    { label: "Release gates", value: `${passed} of ${GATE_TOTAL}`, mono: true },
    ...(system.tech.distributionVersion
      ? [
          {
            label: "BotLane version",
            value: system.tech.distributionVersion,
            mono: true,
          },
        ]
      : []),
    ...(system.upstream
      ? [
          { label: "Upstream project", value: system.upstream.project },
          {
            label: "Upstream version",
            value: system.upstream.pinnedVersion,
            mono: true,
          },
        ]
      : []),
    { label: "Container", value: system.tech.docker ? "Docker / OCI" : "—" },
    ...(system.tech.supportedOs?.length
      ? [{ label: "Supported OS", value: system.tech.supportedOs.join(", ") }]
      : []),
    ...(system.tech.minCpu ? [{ label: "Minimum CPU", value: system.tech.minCpu, mono: true }] : []),
    ...(system.tech.minRam ? [{ label: "Minimum RAM", value: system.tech.minRam, mono: true }] : []),
    ...(system.tech.minDisk
      ? [{ label: "Minimum disk", value: system.tech.minDisk, mono: true }]
      : []),
    ...(system.license
      ? [{ label: "Package licence", value: system.license.product }]
      : []),
    ...(system.license?.upstream
      ? [{ label: "Upstream licence", value: system.license.upstream }]
      : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: system.name,
    applicationCategory: "BusinessApplication",
    description: system.description ?? system.outcome,
    softwareVersion: system.tech.distributionVersion,
    operatingSystem: system.tech.supportedOs?.join(", "),
    url: `https://botlane.io/systems/${system.slug}`,
    ...(system.upstream
      ? { isBasedOn: { "@type": "SoftwareSourceCode", name: system.upstream.project } }
      : {}),
  };

  return (
    <>
      <Nav />
      <main id="main">
        {/* ---------------------------------------------------------------
            Header
        --------------------------------------------------------------- */}
        <section className="border-b border-line">
          <div className="page-container py-12 lg:py-16">
            <nav aria-label="Breadcrumb">
              <ol
                className="t-mono flex flex-wrap items-center gap-2"
                style={{ color: "var(--color-fg-faint)" }}
              >
                <li>
                  <a href="/" className="transition-colors hover:text-fg-secondary">
                    botlane
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a href="/systems" className="transition-colors hover:text-fg-secondary">
                    systems
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{system.slug}</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip chip-mono">{category?.name}</span>
                  <span className="chip chip-mono uppercase">
                    {CLASSIFICATION_LABELS[system.classification]}
                  </span>
                  <StatusBadge status={status} />
                </div>

                <h1 className="t-h2 mt-6 text-balance text-fg">{system.name}</h1>
                <p className="t-lead mt-4">{system.outcome}</p>

                <div className="mt-8">
                  <ProductCta system={system} />
                </div>
              </div>

              <div className="lg:col-span-5">
                <AvailabilityNotice system={system} />
                {system.upstream ? (
                  <div className={status === "production-ready" ? "" : "mt-4"}>
                    <UpstreamPanel
                      upstream={system.upstream}
                      productName={system.shortName}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            Body
        --------------------------------------------------------------- */}
        <div className="page-container py-12 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Sidebar — technical detail, deliberately dense */}
            <aside className="order-2 lg:order-1 lg:col-span-4">
              <div className="sticky top-24 flex flex-col gap-6">
                <div className="panel p-5">
                  <h2 className="t-label mb-4">Technical specification</h2>
                  <SpecTable rows={specRows} />
                </div>

                <div className="panel p-5">
                  <h2 className="t-label mb-4">Deployment</h2>
                  <DeploymentBadges paths={system.deployment} />
                  <p className="t-small mt-4">
                    Every system can be self-hosted. Deployment and ongoing
                    operation by BotLane are options on top, never a
                    requirement.
                  </p>
                </div>

                {system.docs?.length ? (
                  <div className="panel p-5">
                    <h2 className="t-label mb-4">Documentation</h2>
                    <ul className="flex flex-col gap-2.5">
                      {system.docs.map((doc) => (
                        <li key={doc.href}>
                          <a
                            href={doc.href}
                            className="text-[0.8125rem] text-fg-secondary underline underline-offset-4 transition-colors hover:text-fg"
                          >
                            {doc.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {system.supportPolicy ? (
                  <div className="panel p-5">
                    <h2 className="t-label mb-3">Support</h2>
                    <p className="t-small">{system.supportPolicy}</p>
                  </div>
                ) : null}
              </div>
            </aside>

            {/* Main column */}
            <div className="order-1 flex flex-col gap-10 lg:order-2 lg:col-span-8">
              {system.description ? (
                <section>
                  <h2 className="t-label">Overview</h2>
                  <p className="t-lead mt-4">{system.description}</p>
                </section>
              ) : null}

              <ProductSection id="capabilities" title="Capabilities">
                <ul className="flex flex-wrap gap-2">
                  {system.capabilities.map((capability) => (
                    <li key={capability} className="chip">
                      {capability}
                    </li>
                  ))}
                </ul>
              </ProductSection>

              {system.audience?.length ? (
                <ProductSection id="audience" title="Who it is for">
                  <ul className="flex flex-col gap-2.5">
                    {system.audience.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span
                          className="mt-1 flex-none"
                          style={{ color: "var(--color-accent)" }}
                        >
                          <Check size={13} />
                        </span>
                        <span className="t-body">{line}</span>
                      </li>
                    ))}
                  </ul>
                </ProductSection>
              ) : null}

              {system.useCases?.length ? (
                <ProductSection id="use-cases" title="Use cases">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {system.useCases.map((entry) => (
                      <article key={entry.title} className="panel p-5">
                        <h3 className="t-h3 text-fg">{entry.title}</h3>
                        <p className="t-body mt-2">{entry.body}</p>
                      </article>
                    ))}
                  </div>
                </ProductSection>
              ) : null}

              {system.howItWorks?.length ? (
                <ProductSection id="how-it-works" title="How it works">
                  <ol className="flex flex-col">
                    {system.howItWorks.map((entry, index) => (
                      <li
                        key={entry.title}
                        className="flex gap-5 border-l border-line pb-6 pl-5 last:pb-0"
                      >
                        <div className="min-w-0">
                          <span
                            className="t-mono"
                            style={{ color: "var(--color-accent)" }}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="t-h3 mt-1.5 text-fg">{entry.title}</h3>
                          <p className="t-body mt-1.5">{entry.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </ProductSection>
              ) : null}

              {system.integrations?.length ? (
                <ProductSection id="integrations" title="Integrations">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {system.integrations.map((integration) => (
                      <li
                        key={integration.name}
                        className="panel flex flex-col gap-1 p-4"
                      >
                        <span className="text-[0.875rem] text-fg">
                          {integration.name}
                        </span>
                        {integration.note ? (
                          <span className="t-small">{integration.note}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </ProductSection>
              ) : null}

              {system.architecture?.length ? (
                <ProductSection
                  id="architecture"
                  title="Architecture"
                  note="How the system is put together, top to bottom."
                >
                  <ol className="overflow-hidden rounded-[12px] border border-line">
                    {system.architecture.map((layer, index) => (
                      <li
                        key={layer.layer}
                        className="flex flex-col gap-1 border-line px-5 py-4 sm:flex-row sm:gap-6"
                        style={
                          index < system.architecture!.length - 1
                            ? { borderBottomWidth: 1 }
                            : undefined
                        }
                      >
                        <span
                          className="t-mono w-28 flex-none uppercase"
                          style={{ color: "var(--color-fg-muted)" }}
                        >
                          {layer.layer}
                        </span>
                        <span className="t-body">{layer.detail}</span>
                      </li>
                    ))}
                  </ol>
                </ProductSection>
              ) : null}

              <ProductSection
                id="included"
                title="What's included"
                note="The twelve release gates that turn a repository into a business system. This is the live state of this system, not a description of the process."
              >
                <div className="overflow-hidden rounded-[12px] border border-line">
                  <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
                    <span className="t-mono" style={{ color: "var(--color-fg-muted)" }}>
                      {passed} of {GATE_TOTAL} closed
                    </span>
                    <StatusBadge status={status} />
                  </div>
                  <GateChecklist gates={system.gates} />
                </div>
              </ProductSection>

              {system.security?.length ? (
                <ProductSection
                  id="security"
                  title="Security"
                  note="Properties of how the system is packaged and run. BotLane makes no certification or audit claims."
                >
                  <ul className="flex flex-col gap-2.5">
                    {system.security.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span
                          className="mt-1 flex-none"
                          style={{ color: "var(--color-accent)" }}
                        >
                          <Check size={13} />
                        </span>
                        <span className="t-body">{line}</span>
                      </li>
                    ))}
                  </ul>
                </ProductSection>
              ) : null}

              <ProductSection id="releases" title="Releases">
                {system.releases?.length ? (
                  <ol className="overflow-hidden rounded-[12px] border border-line">
                    {system.releases.map((release, index) => (
                      <li
                        key={release.version}
                        className="flex flex-col gap-1 border-line px-5 py-4 sm:flex-row sm:gap-6"
                        style={
                          index < system.releases!.length - 1
                            ? { borderBottomWidth: 1 }
                            : undefined
                        }
                      >
                        <span className="t-mono w-24 flex-none text-fg">
                          {release.version}
                        </span>
                        <span
                          className="t-mono w-24 flex-none"
                          style={{ color: "var(--color-fg-faint)" }}
                        >
                          {release.date}
                        </span>
                        <span className="t-body">{release.notes}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="t-body">
                    No public releases yet. This system has not reached a tagged
                    release, so there is nothing to download or verify. Releases
                    appear here with their version, date and checksums once
                    published.
                  </p>
                )}
              </ProductSection>

              {system.faq?.length ? (
                <ProductSection id="faq" title="Questions">
                  <FaqList entries={system.faq} />
                </ProductSection>
              ) : null}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------
            Deployment paths
        --------------------------------------------------------------- */}
        <section className="hairline">
          <div className="page-container section">
            <h2 className="t-label">Ways to run it</h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {deploymentOptions.map((option) => (
                <article key={option.id} className="panel p-5">
                  <h3 className="t-h3 text-fg">
                    {DEPLOYMENT_LABELS[option.id]}
                  </h3>
                  <p className="t-body mt-2">{option.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            Related
        --------------------------------------------------------------- */}
        {related.length ? (
          <section className="hairline">
            <div className="page-container section">
              <h2 className="t-label">Other systems</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((other) => (
                  <SystemCard key={other.slug} system={other} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
