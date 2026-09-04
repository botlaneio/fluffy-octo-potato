import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { CatalogueStatus } from "@/components/trust/CatalogueStatus";
import { ArrowRight } from "@/components/ui/Arrow";

import { releaseFeed, releaseEntryAnatomy } from "@/lib/releases";
import { CLASSIFICATION_LABELS, GATE_TOTAL } from "@/lib/status";
import { contactEmail } from "@/content/site";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "Every BotLane release, with its version, upstream pin, checksum, upgrade notes and rollback safety. Plus the current release-gate status of every system in the catalogue.",
  alternates: { canonical: "/changelog" },
};

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function ChangelogPage() {
  const feed = releaseFeed();

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
                <li aria-current="page">changelog</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Eyebrow color="amber">Releases</Eyebrow>
                <h1 className="t-h2 mt-5 text-balance text-fg">
                  Every release, and what moved.
                </h1>
                <p className="t-lead mt-4">
                  One feed across every system — version, upstream pin, checksum,
                  what changed in the packaging as well as the software, and
                  whether rolling back is safe. A pinned release is only worth
                  something if you can see it move.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div
                  className="panel p-5"
                  style={{ backgroundColor: "var(--color-bg-raised)" }}
                >
                  <p className="t-label">Feed status</p>
                  {feed.length > 0 ? (
                    <p className="t-body mt-3">
                      {feed.length} {feed.length === 1 ? "release" : "releases"}{" "}
                      published. Newest first.
                    </p>
                  ) : (
                    <p className="t-body mt-3">
                      <span className="text-fg">No releases yet.</span> No system
                      has closed all {GATE_TOTAL} release gates, so nothing has
                      been tagged and published. This feed fills up as that
                      changes — it is not waiting on someone to write it.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feed, or the honest empty state */}
        <section className="section">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Feed"
              color="blue"
              title={feed.length > 0 ? "Published releases." : "Nothing published yet."}
              lead={
                feed.length > 0
                  ? "Every entry appears on its own system's page too — this is a view of that data, not a second copy of it."
                  : "Rather than list versions that do not exist, here is exactly what will appear here, and where the real progress is visible today."
              }
            />

            {feed.length > 0 ? (
              <ol className="mt-10 flex flex-col gap-4">
                {feed.map((entry) => (
                  <li
                    key={`${entry.systemSlug}-${entry.version}`}
                    className="panel p-6"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`/systems/${entry.systemSlug}`}
                        className="text-[0.875rem] text-fg underline underline-offset-4"
                      >
                        {entry.systemName}
                      </a>
                      <span className="chip chip-mono">{entry.version}</span>
                      <span
                        className="t-mono"
                        style={{ color: "var(--color-fg-faint)" }}
                      >
                        {dateFormat.format(new Date(entry.date))}
                      </span>
                      <span className="chip chip-mono uppercase">
                        {CLASSIFICATION_LABELS[entry.classification]}
                      </span>
                    </div>

                    <p className="t-body mt-4">{entry.notes}</p>

                    {entry.breaking ? (
                      <p
                        className="t-small mt-4 rounded-[8px] border p-3"
                        style={{
                          borderColor:
                            "color-mix(in srgb, var(--color-status-progress) 30%, var(--color-line))",
                          color: "var(--color-fg-secondary)",
                        }}
                      >
                        <span className="text-fg">Before upgrading:</span>{" "}
                        {entry.breaking}
                      </p>
                    ) : null}

                    <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-4">
                      {entry.upstreamVersion ? (
                        <div>
                          <dt className="t-label">Upstream</dt>
                          <dd className="t-mono mt-1" style={{ color: "var(--color-fg-secondary)" }}>
                            {entry.upstreamVersion}
                          </dd>
                        </div>
                      ) : null}
                      {entry.checksum ? (
                        <div className="min-w-0">
                          <dt className="t-label">sha256</dt>
                          <dd className="t-mono mt-1 truncate" style={{ color: "var(--color-fg-secondary)" }}>
                            {entry.checksum}
                          </dd>
                        </div>
                      ) : null}
                      {entry.rollbackSafe !== undefined ? (
                        <div>
                          <dt className="t-label">Rollback</dt>
                          <dd
                            className="t-mono mt-1"
                            style={{
                              color: entry.rollbackSafe
                                ? "var(--color-status-ready)"
                                : "var(--color-status-progress)",
                            }}
                          >
                            {entry.rollbackSafe ? "data-safe" : "not data-safe"}
                          </dd>
                        </div>
                      ) : null}
                    </dl>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="panel mt-10 max-w-[720px] p-8">
                <h3 className="t-h3 text-fg">
                  Where the progress actually is
                </h3>
                <p className="t-body mt-3">
                  Release gates close before a release exists. The board below is
                  the honest version of &ldquo;what is happening&rdquo; — it is
                  generated from the same data as every status badge on the site,
                  and it moves before this feed does.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href="/trust#gates" className="btn btn-secondary">
                    How releases are gated
                    <ArrowRight />
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Anatomy of an entry */}
        <section className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Anatomy"
              color="violet"
              title="What every release entry carries."
              lead="A published commitment about the shape of this feed, so you know what you will be able to verify before you depend on it."
            />

            <dl className="mt-10 overflow-hidden rounded-[12px] border border-line">
              {releaseEntryAnatomy.map((item, index) => (
                <div
                  key={item.field}
                  className="flex flex-col gap-1 border-line px-5 py-4 sm:flex-row sm:gap-8"
                  style={
                    index < releaseEntryAnatomy.length - 1
                      ? { borderBottomWidth: 1 }
                      : undefined
                  }
                >
                  <dt className="w-40 flex-none text-[0.8125rem] text-fg">
                    {item.field}
                  </dt>
                  <dd className="t-body max-w-[620px]">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Live gate board */}
        <section className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Live status"
              color="emerald"
              title="Gate progress across the catalogue."
              lead="The same board as the trust page, because there should only be one answer to this question."
            />
            <div className="mt-10">
              <CatalogueStatus />
            </div>
          </div>
        </section>

        {/* Being told */}
        <section className="section hairline">
          <div className="page-container">
            <div className="panel flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="t-h3 text-fg">Want to know when this moves?</h2>
                <p className="t-body mt-2 max-w-[560px]">
                  There is no mailing list yet, and pretending otherwise would
                  mean collecting addresses for something that does not exist.
                  Email us and we will tell you when the system you care about
                  reaches a release.
                </p>
              </div>
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent("Tell me about releases")}`}
                className="btn btn-primary flex-none"
              >
                Email {contactEmail}
                <ArrowRight />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
