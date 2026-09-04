import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { CatalogueStatus } from "@/components/trust/CatalogueStatus";
import { ArrowRight } from "@/components/ui/Arrow";

import {
  provenancePoints,
  licensingModel,
  securityPosture,
  notClaimed,
} from "@/content/trust";
import {
  GATE_KEYS,
  GATE_TOTAL,
  RELEASE_GATE_LABELS,
  RELEASE_GATE_DESCRIPTIONS,
  CLASSIFICATION_LABELS,
  CLASSIFICATION_DESCRIPTIONS,
} from "@/lib/status";
import type { Classification } from "@/lib/types";

export const metadata: Metadata = {
  title: "Trust",
  description:
    "How BotLane gates releases, pins upstream provenance, handles licensing and describes security — including what BotLane does not claim.",
  alternates: { canonical: "/trust" },
};

const CLASSIFICATION_ORDER: Classification[] = [
  "original",
  "distribution",
  "integration",
];

const CONTENTS = [
  { id: "status", label: "Catalogue status" },
  { id: "gates", label: "The twelve gates" },
  { id: "classifications", label: "Classifications" },
  { id: "provenance", label: "Provenance" },
  { id: "licensing", label: "Licensing" },
  { id: "security", label: "Security" },
  { id: "not-claimed", label: "What we don't claim" },
];

/** Thin wrapper so every section on this page shares one heading treatment. */
function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <SectionHeader
      id={`${id}-heading`}
      eyebrow={eyebrow}
      title={title}
      lead={lead}
      size="md"
    />
  );
}

export default function TrustPage() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* Header */}
        <section className="border-b border-line">
          <div className="page-container py-14 lg:py-20">
            <nav aria-label="Breadcrumb">
              <ol
                className="t-mono flex items-center gap-2"
                style={{ color: "var(--color-fg-faint)" }}
              >
                <li>
                  <a href="/" className="transition-colors hover:text-fg-secondary">
                    botlane
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">trust</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Eyebrow color="emerald">Trust</Eyebrow>
                <h1 className="t-h2 mt-5 text-balance text-fg">
                  What BotLane will actually stand behind.
                </h1>
                <p className="t-lead mt-4">
                  Selling packaged open source only works if the packaging is
                  inspectable. This page sets out how releases are gated, how
                  upstream provenance is pinned, how licensing works across the
                  three product classifications — and, at the end, the things
                  BotLane does not claim.
                </p>
              </div>

              <nav aria-label="On this page" className="lg:col-span-5">
                <div className="panel p-5" style={{ backgroundColor: "var(--color-bg-raised)" }}>
                  <p className="t-label mb-4">On this page</p>
                  <ol className="flex flex-col gap-2.5">
                    {CONTENTS.map((item, index) => (
                      <li key={item.id} className="flex items-baseline gap-3">
                        <span
                          className="t-mono flex-none"
                          style={{ color: "var(--color-fg-faint)" }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <a
                          href={`#${item.id}`}
                          className="text-[0.8125rem] text-fg-secondary transition-colors hover:text-fg"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>
            </div>
          </div>
        </section>

        {/* Catalogue status */}
        <section id="status" aria-labelledby="status-heading" className="section">
          <div className="page-container">
            <SectionHeading
              id="status"
              eyebrow="Live status"
              title="Every system, and how far through it really is."
              lead="This table is generated from the same data as the badges on the product pages. There is no separate marketing copy that could say something kinder."
            />
            <div className="mt-10">
              <CatalogueStatus />
            </div>
          </div>
        </section>

        {/* The gates */}
        <section id="gates" aria-labelledby="gates-heading" className="section hairline">
          <div className="page-container">
            <SectionHeading
              id="gates"
              eyebrow="Release gates"
              title="The twelve gates, and what closing one means."
              lead="A gate that cannot be checked is not a gate. Each of these is a thing someone did, not an adjective someone chose."
            />

            <ol className="mt-10 grid gap-px overflow-hidden rounded-[12px] border border-line md:grid-cols-2"
                style={{ backgroundColor: "var(--color-line)" }}>
              {GATE_KEYS.map((key, index) => (
                <li
                  key={key}
                  className="flex gap-4 p-5"
                  style={{ backgroundColor: "var(--color-bg)" }}
                >
                  <span
                    className="t-mono flex-none pt-0.5"
                    style={{ color: "var(--color-fg-faint)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="t-h3 text-fg">{RELEASE_GATE_LABELS[key]}</h3>
                    <p className="t-body mt-1.5">
                      {RELEASE_GATE_DESCRIPTIONS[key]}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="t-body mt-8 max-w-[620px]">
              A system is badged production ready when all {GATE_TOTAL} are
              closed, and not before. The badge is computed from the gates
              rather than written by hand, so the site cannot describe a system
              as finished while its checklist says otherwise.
            </p>
          </div>
        </section>

        {/* Classifications */}
        <section
          id="classifications"
          aria-labelledby="classifications-heading"
          className="section hairline"
        >
          <div className="page-container">
            <SectionHeading
              id="classifications"
              eyebrow="Classifications"
              title="Three kinds of product, labelled as such."
              lead="What BotLane built, what BotLane packaged, and what BotLane merely operates are different things, and a buyer is entitled to know which one they are looking at."
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {CLASSIFICATION_ORDER.map((key) => (
                <article key={key} className="panel flex flex-col p-6">
                  <h3 className="t-h3 text-fg">{CLASSIFICATION_LABELS[key]}</h3>
                  <p className="t-body mt-3">{CLASSIFICATION_DESCRIPTIONS[key]}</p>
                  <p
                    className="t-small mt-4 border-t border-line pt-4"
                    style={{ color: "var(--color-fg-muted)" }}
                  >
                    {
                      licensingModel.find((l) => l.classification === CLASSIFICATION_LABELS[key])
                        ?.body
                    }
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Provenance */}
        <section
          id="provenance"
          aria-labelledby="provenance-heading"
          className="section hairline"
        >
          <div className="page-container">
            <SectionHeading
              id="provenance"
              eyebrow="Provenance"
              title="You can tell exactly what you are running."
              lead="The value of a distribution is that somebody pinned it, tested that pin, and told you which one it was."
            />

            <ol className="mt-10 flex flex-col gap-px overflow-hidden rounded-[12px] border border-line"
                style={{ backgroundColor: "var(--color-line)" }}>
              {provenancePoints.map((point, index) => (
                <li
                  key={point.title}
                  className="flex flex-col gap-2 p-5 sm:flex-row sm:gap-6"
                  style={{ backgroundColor: "var(--color-bg)" }}
                >
                  <span
                    className="t-mono w-8 flex-none pt-1"
                    style={{ color: "var(--color-fg-faint)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="t-h3 text-fg">{point.title}</h3>
                    <p className="t-body mt-1.5 max-w-[620px]">{point.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Licensing */}
        <section
          id="licensing"
          aria-labelledby="licensing-heading"
          className="section hairline"
        >
          <div className="page-container">
            <SectionHeading
              id="licensing"
              eyebrow="Licensing"
              title="BotLane does not relicense work it did not write."
              lead="Where a system is built on an open-source project, that project keeps its own licence and its own authors. BotLane licenses the packaging around it."
            />

            <dl className="mt-10 overflow-hidden rounded-[12px] border border-line">
              {licensingModel.map((entry, index) => (
                <div
                  key={entry.classification}
                  className="flex flex-col gap-2 border-line px-5 py-5 sm:flex-row sm:gap-8"
                  style={index < licensingModel.length - 1 ? { borderBottomWidth: 1 } : undefined}
                >
                  <dt className="w-56 flex-none text-[0.875rem] text-fg">
                    {entry.classification}
                  </dt>
                  <dd className="t-body max-w-[620px]">{entry.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Security */}
        <section
          id="security"
          aria-labelledby="security-heading"
          className="section hairline"
        >
          <div className="page-container">
            <SectionHeading
              id="security"
              eyebrow="Security"
              title="Properties, not adjectives."
              lead="Everything below is either a release gate you can check per system, or a statement about how BotLane operates. None of it is a certification."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {securityPosture.map((item) => (
                <article key={item.title} className="panel p-6">
                  <h3 className="t-h3 text-fg">{item.title}</h3>
                  <p className="t-body mt-2.5">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* What we don't claim */}
        <section
          id="not-claimed"
          aria-labelledby="not-claimed-heading"
          className="section hairline"
        >
          <div className="page-container">
            <SectionHeading
              id="not-claimed"
              eyebrow="Limits"
              title="What BotLane does not claim."
              lead="A trust page that only lists strengths is marketing. These are the limits, stated so you do not have to discover them later."
            />

            <ul className="mt-10 flex flex-col gap-px overflow-hidden rounded-[12px] border border-line"
                style={{ backgroundColor: "var(--color-line)" }}>
              {notClaimed.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-4 p-5"
                  style={{ backgroundColor: "var(--color-bg)" }}
                >
                  <span
                    className="mt-2 h-px w-4 flex-none"
                    style={{ backgroundColor: "var(--color-line-strong)" }}
                    aria-hidden="true"
                  />
                  <p className="t-body max-w-[720px]">{line}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="/systems" className="btn btn-primary">
                Browse the catalogue
                <ArrowRight />
              </a>
              <a href="/contact" className="btn btn-secondary">
                Ask us something specific
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
