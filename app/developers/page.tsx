import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ArrowRight, Check } from "@/components/ui/Arrow";
import { ResponsibilitySplit } from "@/components/service/ResponsibilitySplit";

import {
  selfHostIncludes,
  baselineRequirements,
  operationsTopics,
  supportBoundary,
} from "@/content/developers";
import { systems } from "@/content/systems";
import { deriveStatus, gatesPassed, GATE_TOTAL, STATUS_LABELS } from "@/lib/status";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Self-host BotLane AI systems on your own infrastructure: requirements, release artifacts, configuration, secrets handling, upgrades, backups and rollback.",
  alternates: { canonical: "/developers" },
};

const CONTENTS = [
  { id: "included", label: "What self-hosting includes" },
  { id: "quickstart", label: "Quickstart" },
  { id: "requirements", label: "Requirements" },
  { id: "verification", label: "Verifying a release" },
  { id: "configuration", label: "Configuration & secrets" },
  { id: "operations", label: "Operations" },
  { id: "availability", label: "Release availability" },
  { id: "boundary", label: "Where self-host ends" },
];

export default function DevelopersPage() {
  /* Only systems that have reached a tagged BotLane release can be downloaded. */
  const withReleases = systems.filter((s) => s.tech.distributionVersion);
  const withSpecs = systems.filter((s) => s.tech.minRam || s.tech.minCpu);

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
                <li aria-current="page">developers</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Eyebrow color="cyan">Self-hosting</Eyebrow>
                <h1 className="t-h2 mt-5 text-balance text-fg">
                  Run it on your own infrastructure.
                </h1>
                <p className="t-lead mt-4">
                  Self-hosting is the default path, not a downgrade. You get the
                  release package, the images, the configuration and the
                  documentation, and BotLane is involved only if you decide it
                  should be.
                </p>
              </div>

              <nav aria-label="On this page" className="lg:col-span-5">
                <div
                  className="panel p-5"
                  style={{ backgroundColor: "var(--color-bg-raised)" }}
                >
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

        {/* What self-hosting includes */}
        <section id="included" className="section">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="The package"
              color="emerald"
              title="What arrives with a self-hosted system."
              lead="These are the things that separate a release from a repository. Each one corresponds to a release gate you can check on the system's own page."
            />

            {/* Separated cards rather than a hairline grid: the list has an odd
                count, and an absent cell in a gap-px grid renders as a grey box. */}
            <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selfHostIncludes.map((item) => (
                <li key={item.title} className="panel p-5">
                  <h3 className="t-h3 text-fg">{item.title}</h3>
                  <p className="t-body mt-2">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quickstart */}
        <section id="quickstart" className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Quickstart"
              color="amber"
              title="The shape of a deployment."
              lead="Every BotLane system follows the same four steps. The commands below are illustrative — each system's page carries its own exact release URL and variables."
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-2 [&>*]:min-w-0">
              <div className="flex flex-col gap-4">
                <div>
                  <span className="t-mono" style={{ color: "var(--color-accent)" }}>
                    01
                  </span>
                  <h3 className="t-h3 mt-1.5 text-fg">Fetch the release</h3>
                  <p className="t-body mt-1.5">
                    Pull the pinned release bundle for the version you intend to
                    run. Never track a floating tag in production.
                  </p>
                </div>
                <CodeBlock label="shell">{`# Illustrative — use the release URL from the system's page
curl -fsSLO https://<release-url>/botlane-<system>-<version>.tar.gz
curl -fsSLO https://<release-url>/botlane-<system>-<version>.tar.gz.sha256

sha256sum -c botlane-<system>-<version>.tar.gz.sha256
tar -xzf botlane-<system>-<version>.tar.gz && cd botlane-<system>`}</CodeBlock>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <span className="t-mono" style={{ color: "var(--color-accent)" }}>
                    02
                  </span>
                  <h3 className="t-h3 mt-1.5 text-fg">Configure</h3>
                  <p className="t-body mt-1.5">
                    Copy the environment template and fill it in. Configuration
                    is validated at startup, so a missing variable fails
                    immediately rather than at the first request.
                  </p>
                </div>
                <CodeBlock label="shell">{`cp .env.example .env
$EDITOR .env

# Validate before starting anything
./botlane config validate`}</CodeBlock>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <span className="t-mono" style={{ color: "var(--color-accent)" }}>
                    03
                  </span>
                  <h3 className="t-h3 mt-1.5 text-fg">Start</h3>
                  <p className="t-body mt-1.5">
                    Bring the stack up against the pinned images and wait for the
                    health endpoint to report ready — not merely started.
                  </p>
                </div>
                <CodeBlock label="shell">{`docker compose up -d
docker compose ps

curl -fsS http://localhost:8080/healthz`}</CodeBlock>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <span className="t-mono" style={{ color: "var(--color-accent)" }}>
                    04
                  </span>
                  <h3 className="t-h3 mt-1.5 text-fg">Verify and back up</h3>
                  <p className="t-body mt-1.5">
                    Run the smoke suite, then take a backup and restore it once
                    before you put real work through the system.
                  </p>
                </div>
                <CodeBlock label="shell">{`./botlane smoke-test
./botlane backup create --out ./backups

# Prove the restore works before you need it
./botlane backup restore ./backups/<snapshot>`}</CodeBlock>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section id="requirements" className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Requirements"
              color="blue"
              title="What the host needs."
              lead="Baseline requirements apply to every system. Per-system figures are listed where a system has been sized; the rest are sized during productization."
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-2 [&>*]:min-w-0">
              <div>
                <h3 className="t-label mb-4">Baseline</h3>
                <dl className="overflow-hidden rounded-[12px] border border-line">
                  {baselineRequirements.map((row, index) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-1 border-line px-5 py-3.5 sm:flex-row sm:gap-6"
                      style={
                        index < baselineRequirements.length - 1
                          ? { borderBottomWidth: 1 }
                          : undefined
                      }
                    >
                      <dt className="w-40 flex-none text-[0.8125rem] text-fg">
                        {row.label}
                      </dt>
                      <dd className="t-small">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="t-label mb-4">Per system</h3>
                <div className="overflow-hidden rounded-[12px] border border-line">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[420px] border-collapse text-left">
                      <caption className="sr-only">
                        Minimum resources by system
                      </caption>
                      <thead>
                        <tr style={{ backgroundColor: "var(--color-bg-raised)" }}>
                          <th scope="col" className="t-label px-5 py-3 font-normal">
                            System
                          </th>
                          <th scope="col" className="t-label px-5 py-3 font-normal">
                            CPU
                          </th>
                          <th scope="col" className="t-label px-5 py-3 font-normal">
                            RAM
                          </th>
                          <th scope="col" className="t-label px-5 py-3 font-normal">
                            Disk
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {withSpecs.map((system) => (
                          <tr key={system.slug} className="border-t border-line">
                            <td className="px-5 py-3.5">
                              <a
                                href={`/systems/${system.slug}`}
                                className="text-[0.8125rem] text-fg transition-colors hover:text-fg-secondary"
                              >
                                {system.shortName}
                              </a>
                            </td>
                            <td className="t-mono px-5 py-3.5" style={{ color: "var(--color-fg-muted)" }}>
                              {system.tech.minCpu ?? "—"}
                            </td>
                            <td className="t-mono px-5 py-3.5" style={{ color: "var(--color-fg-muted)" }}>
                              {system.tech.minRam ?? "—"}
                            </td>
                            <td className="t-mono px-5 py-3.5" style={{ color: "var(--color-fg-muted)" }}>
                              {system.tech.minDisk ?? "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="t-small mt-3">
                  Systems not listed have not been sized yet. A figure will
                  appear here when it has been measured, not estimated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verification */}
        <section id="verification" className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Verification"
              color="violet"
              title="Check what you downloaded."
              lead="A pinned release is only worth something if you can confirm the artifact you have is the artifact that was tested."
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-2 [&>*]:min-w-0">
              <CodeBlock label="verify the bundle">{`# Checksum published alongside every release
sha256sum -c botlane-<system>-<version>.tar.gz.sha256

# Image pinned by digest, not by tag
docker image inspect \\
  --format '{{index .RepoDigests 0}}' \\
  <image>:<version>`}</CodeBlock>

              <div>
                <p className="t-body">
                  Every release publishes a checksum, and images are addressable
                  by digest so a deployment can pin what it runs by content
                  rather than by a tag someone could move. Adopting a newer
                  upstream version produces a new BotLane release with its own
                  notes — never a silent rebuild behind the same number.
                </p>
                <a
                  href="/trust#provenance"
                  className="btn btn-secondary mt-6"
                >
                  How provenance is pinned
                  <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration & secrets */}
        <section id="configuration" className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Configuration"
              color="rose"
              title="Secrets stay yours."
              lead="Credentials are supplied at runtime. They are never baked into an image, committed to a repository, or written to logs — one of the twelve release gates, so it is checkable per system."
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-2 [&>*]:min-w-0">
              <CodeBlock label=".env">{`# Supplied at runtime, never committed
DATABASE_URL=postgres://user:pass@db:5432/app
MODEL_API_KEY=
WEBHOOK_SIGNING_SECRET=

# Validated at boot — a missing value fails closed
APP_BASE_URL=https://systems.example.com`}</CodeBlock>

              <ul className="flex flex-col gap-3">
                {[
                  "Keep .env out of version control; the release ships a template, not a filled file.",
                  "Rotate the signing secret and API keys independently of a release upgrade.",
                  "Run config validation in CI as well as on the host, so a bad value is caught before deploy.",
                  "Terminate TLS in front of the application rather than inside the container.",
                ].map((line) => (
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
            </div>
          </div>
        </section>

        {/* Operations */}
        <section id="operations" className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Operations"
              color="emerald"
              title="Running it after day one."
              lead="The parts that matter three months in, when the person who installed it is on holiday."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
              {operationsTopics.map((topic) => (
                <article key={topic.title} className="panel p-6">
                  <h3 className="t-h3 text-fg">{topic.title}</h3>
                  <p className="t-body mt-2.5">{topic.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Release availability */}
        <section id="availability" className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Availability"
              color="amber"
              title="What you can actually download today."
              lead="This page describes the self-hosting model. Here is where each system genuinely stands, generated from the same data as the release badges."
            />

            <div className="mt-10 overflow-hidden rounded-[12px] border border-line">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <caption className="sr-only">
                    Release availability by system
                  </caption>
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-bg-raised)" }}>
                      <th scope="col" className="t-label px-5 py-3.5 font-normal">
                        System
                      </th>
                      <th scope="col" className="t-label px-5 py-3.5 font-normal">
                        BotLane version
                      </th>
                      <th scope="col" className="t-label px-5 py-3.5 font-normal">
                        Gates
                      </th>
                      <th scope="col" className="t-label px-5 py-3.5 font-normal">
                        Downloadable
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {systems.map((system) => {
                      const status = deriveStatus(system);
                      const passed = gatesPassed(system.gates);
                      return (
                        <tr key={system.slug} className="border-t border-line">
                          <td className="px-5 py-3.5">
                            <a
                              href={`/systems/${system.slug}`}
                              className="text-[0.8125rem] text-fg transition-colors hover:text-fg-secondary"
                            >
                              {system.shortName}
                            </a>
                          </td>
                          <td
                            className="t-mono px-5 py-3.5"
                            style={{ color: "var(--color-fg-muted)" }}
                          >
                            {system.tech.distributionVersion ?? "—"}
                          </td>
                          <td
                            className="t-mono px-5 py-3.5"
                            style={{ color: "var(--color-fg-muted)" }}
                          >
                            {passed}/{GATE_TOTAL}
                          </td>
                          <td
                            className="t-mono px-5 py-3.5"
                            style={{
                              color:
                                status === "production-ready"
                                  ? "var(--color-status-ready)"
                                  : "var(--color-fg-faint)",
                            }}
                          >
                            {status === "production-ready"
                              ? "Yes"
                              : `Not yet — ${STATUS_LABELS[status].toLowerCase()}`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="t-body mt-6 max-w-[620px]">
              {withReleases.length > 0 ? (
                <>
                  Pre-release versions exist for {withReleases.length} of{" "}
                  {systems.length} systems, but no system has closed all{" "}
                  {GATE_TOTAL} gates yet, so there is nothing on general
                  release to download. Ask about early access if you want to run
                  one before then.
                </>
              ) : (
                <>No system has reached a tagged release yet.</>
              )}
            </p>
          </div>
        </section>

        {/* Support boundary */}
        <section id="boundary" className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Boundaries"
              color="cyan"
              title="Where self-host ends and BotLane begins."
              lead="Stated plainly so nobody discovers the line during an incident."
            />

            <div className="mt-10">
              <ResponsibilitySplit rows={supportBoundary} />
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="/systems" className="btn btn-primary">
                Browse the catalogue
                <ArrowRight />
              </a>
              <a href="/deploy" className="btn btn-secondary">
                Have BotLane deploy it
              </a>
              <a href="/trust" className="btn btn-ghost">
                How releases are gated
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
