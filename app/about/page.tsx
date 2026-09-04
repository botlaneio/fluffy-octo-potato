import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight } from "@/components/ui/Arrow";

import { thesis, why, principles, people, company } from "@/content/about";
import { systems } from "@/content/systems";
import { categories } from "@/content/categories";
import { deriveStatus, gatesPassed, GATE_TOTAL } from "@/lib/status";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "BotLane packages open-source and original AI software into business systems you can self-host — what that means, why it exists, and how far along it actually is.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  /* Stage is read from the catalogue so this page cannot go stale on its own. */
  const ready = systems.filter((s) => deriveStatus(s) === "production-ready");
  const inProgress = systems.filter(
    (s) => deriveStatus(s) === "in-productization",
  );
  const furthest = [...systems].sort(
    (a, b) => gatesPassed(b.gates) - gatesPassed(a.gates),
  )[0];

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
                <li aria-current="page">about</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Eyebrow color="blue">About</Eyebrow>
                <h1 className="t-h2 mt-5 text-balance text-fg">
                  {thesis.headline}
                </h1>
                <p className="t-lead mt-4">{thesis.lead}</p>
              </div>

              <div className="lg:col-span-5">
                <div
                  className="panel p-5"
                  style={{ backgroundColor: "var(--color-bg-raised)" }}
                >
                  <p className="t-label">Where this actually is</p>
                  <p className="t-body mt-3">
                    {systems.length} systems announced across{" "}
                    {categories.length} categories.{" "}
                    {inProgress.length > 0 ? (
                      <>
                        {inProgress.length} in productization, the furthest at{" "}
                        <a
                          href={`/systems/${furthest.slug}`}
                          className="text-fg underline underline-offset-4"
                        >
                          {gatesPassed(furthest.gates)}/{GATE_TOTAL} gates
                        </a>
                        .{" "}
                      </>
                    ) : null}
                    {ready.length === 0 ? (
                      <span className="text-fg">
                        Nothing has closed all {GATE_TOTAL} gates yet, so nothing
                        is on general release.
                      </span>
                    ) : (
                      <span className="text-fg">
                        {ready.length} production ready.
                      </span>
                    )}
                  </p>
                  <a href="/changelog" className="btn btn-secondary btn-sm mt-5">
                    See the live board
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="section">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Why"
              color="emerald"
              title="Why this company exists."
              lead="Three observations that make a packaging business worth running."
            />
            <ol className="mt-10 grid gap-4 md:grid-cols-3 [&>*]:min-w-0">
              {why.map((item, index) => (
                <li key={item.title} className="panel p-6">
                  <span className="t-mono" style={{ color: "var(--color-accent)" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h3 mt-3 text-fg">{item.title}</h3>
                  <p className="t-body mt-2.5">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Principles */}
        <section className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="How we operate"
              color="violet"
              title="Six rules the rest of this site is built on."
              lead="Not values — constraints. Each one is visible somewhere in the product rather than only stated here."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
              {principles.map((item) => (
                <article key={item.title} className="panel p-6">
                  <h3 className="t-h3 text-fg">{item.title}</h3>
                  <p className="t-body mt-2.5">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* People + company */}
        <section className="section hairline">
          <div className="page-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 [&>*]:min-w-0">
              <div className="lg:col-span-7">
                <SectionHeader
                  size="md"
                  eyebrow="Who"
                  color="amber"
                  title="Who is behind it."
                  lead="A small operation, stated as one. There is no advantage in implying otherwise to someone who will find out during the first call."
                />
                <ul className="mt-8 flex flex-col gap-4">
                  {people.map((person) => (
                    <li key={person.name} className="panel p-6">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="t-h3 text-fg">{person.name}</h3>
                        <span className="t-mono" style={{ color: "var(--color-fg-muted)" }}>
                          {person.role}
                        </span>
                        <span className="t-mono" style={{ color: "var(--color-fg-faint)" }}>
                          {person.location}
                        </span>
                      </div>
                      <p className="t-body mt-3">{person.body}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5">
                <div className="panel p-6">
                  <h2 className="t-label">Company</h2>
                  <dl className="mt-5">
                    {company.map((row, index) => (
                      <div
                        key={row.label}
                        className="flex items-baseline justify-between gap-4 border-line py-2.5"
                        style={
                          index < company.length - 1
                            ? { borderBottomWidth: 1 }
                            : undefined
                        }
                      >
                        <dt className="t-small flex-none">{row.label}</dt>
                        <dd
                          className="text-right text-[0.8125rem]"
                          style={{ color: "var(--color-fg-secondary)" }}
                        >
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="t-small mt-5 border-t border-line pt-5">
                    {site.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section hairline">
          <div className="page-container">
            <div className="panel flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="t-h3 text-fg">
                  The most useful thing you can do is disagree with us.
                </h2>
                <p className="t-body mt-2 max-w-[560px]">
                  If the release gates are missing something, or a system in the
                  catalogue is solving the wrong problem, we would rather hear it
                  now than after building it.
                </p>
              </div>
              <a href="/contact" className="btn btn-primary flex-none">
                Tell us
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
