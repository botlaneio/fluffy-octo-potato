import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { ArrowRight } from "@/components/ui/Arrow";

import {
  clauses,
  privacyReviewed,
  privacyEffectiveDate,
  outstandingGaps,
} from "@/content/legal/privacy";
import { contactEmail } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What botlane.io collects (nothing), the single third party it contacts, and what happens to an email you send us.",
  alternates: { canonical: "/legal/privacy" },
  // An unfinished policy should not be the version search engines cache.
  robots: privacyReviewed
    ? { index: true, follow: true }
    : { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main">
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
                <li>legal</li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">privacy</li>
              </ol>
            </nav>

            <div className="mt-8 max-w-[720px]">
              <Eyebrow color="violet">Legal</Eyebrow>
              <h1 className="t-h2 mt-5 text-balance text-fg">Privacy</h1>
              <p className="t-lead mt-4">
                What this website collects, which is nothing, and what happens to
                an email you send us.
              </p>
              <p className="t-mono mt-5" style={{ color: "var(--color-fg-faint)" }}>
                {privacyReviewed && privacyEffectiveDate
                  ? `Effective ${privacyEffectiveDate}`
                  : "Not yet effective — draft"}
              </p>
            </div>
          </div>
        </section>

        {/* Draft notice — the page cannot pretend to be a finished policy. */}
        {!privacyReviewed ? (
          <section className="page-container pt-10">
            <div
              className="panel flex items-start gap-3 p-5"
              style={{
                backgroundColor: "var(--color-bg-raised)",
                borderColor:
                  "color-mix(in srgb, var(--color-status-progress) 30%, var(--color-line))",
              }}
              role="note"
            >
              <span
                className="dot mt-2 flex-none"
                style={{ backgroundColor: "var(--color-status-progress)" }}
                aria-hidden="true"
              />
              <div>
                <p className="t-body">
                  <span className="text-fg">
                    This is a draft, not a policy in force.
                  </span>{" "}
                  The clauses describing what this website does were derived by
                  auditing the code and are accurate. {outstandingGaps.length}{" "}
                  points still need facts only BotLane can supply, and it has not
                  been reviewed by a lawyer. It is listed below rather than
                  hidden.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {/* Clauses */}
        <section className="section">
          <div className="page-container">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 [&>*]:min-w-0">
              {/* Contents */}
              <nav aria-label="On this page" className="lg:col-span-4">
                <div className="sticky top-24">
                  <p className="t-label mb-4">Contents</p>
                  <ol className="flex flex-col gap-2.5">
                    {clauses.map((clause, index) => (
                      <li key={clause.id} className="flex items-baseline gap-3">
                        <span
                          className="t-mono flex-none"
                          style={{ color: "var(--color-fg-faint)" }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <a
                          href={`#${clause.id}`}
                          className="text-[0.8125rem] text-fg-secondary transition-colors hover:text-fg"
                        >
                          {clause.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>

              <div className="flex flex-col gap-10 lg:col-span-8">
                {clauses.map((clause) => (
                  <section
                    key={clause.id}
                    id={clause.id}
                    aria-labelledby={`${clause.id}-heading`}
                    className="border-t border-line pt-8 first:border-t-0 first:pt-0"
                  >
                    <h2 id={`${clause.id}-heading`} className="t-h3 text-fg">
                      {clause.heading}
                    </h2>
                    <div className="mt-4 flex flex-col gap-4">
                      {clause.body.map((paragraph) => (
                        <p key={paragraph} className="t-body max-w-[640px]">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Gaps stay visible while the policy is a draft. */}
                    {!privacyReviewed && clause.gaps?.length ? (
                      <div
                        className="mt-5 rounded-[10px] border p-4"
                        style={{
                          borderColor:
                            "color-mix(in srgb, var(--color-status-progress) 25%, var(--color-line))",
                          backgroundColor: "var(--color-bg-raised)",
                        }}
                      >
                        <p className="t-label" style={{ color: "var(--color-status-progress)" }}>
                          Needs a decision
                        </p>
                        <ul className="mt-3 flex flex-col gap-2">
                          {clause.gaps.map((gap) => (
                            <li key={gap} className="flex items-start gap-2.5">
                              <span
                                className="mt-2 h-px w-3 flex-none"
                                style={{ backgroundColor: "var(--color-line-strong)" }}
                                aria-hidden="true"
                              />
                              <span className="t-small">{gap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section hairline">
          <div className="page-container">
            <div className="panel flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="t-h3 text-fg">
                  Want to know what we hold about you?
                </h2>
                <p className="t-body mt-2 max-w-[560px]">
                  Ask, and you will get a precise answer rather than a form
                  letter. For most people the answer is nothing at all.
                </p>
              </div>
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent("Privacy request")}`}
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
