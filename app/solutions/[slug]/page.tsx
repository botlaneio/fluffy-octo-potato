import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { SystemCard } from "@/components/SystemCard";
import { SolutionCard } from "@/components/solution/SolutionCard";
import { FaqList } from "@/components/product/FaqList";
import { ArrowRight, Check } from "@/components/ui/Arrow";

import {
  solutions,
  solutionBySlug,
  solutionSystems,
  solutionReadiness,
  relatedSolutions,
} from "@/content/solutions";
import { services } from "@/content/services";
import { GATE_TOTAL, gatesPassed } from "@/lib/status";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutionBySlug(slug);
  if (!solution) return {};

  return {
    title: solution.name,
    description: solution.lead,
    alternates: { canonical: `/solutions/${solution.slug}` },
    openGraph: {
      title: `${solution.name} — BotLane`,
      description: solution.lead,
      type: "website",
    },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const solution = solutionBySlug(slug);
  if (!solution) notFound();

  const used = solutionSystems(solution);
  const readiness = solutionReadiness(solution);
  const related = relatedSolutions(solution);
  const involved = solution.services
    .map((entry) => ({
      ...entry,
      definition: services.find((s) => s.slug === entry.slug),
    }))
    .filter((entry) => entry.definition);

  return (
    <>
      <Nav />
      <main id="main">
        {/* Header */}
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
                  <a
                    href="/solutions"
                    className="transition-colors hover:text-fg-secondary"
                  >
                    solutions
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{solution.slug}</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Eyebrow color="violet">Solution</Eyebrow>
                <h1 className="t-h2 mt-5 text-balance text-fg">
                  {solution.headline}
                </h1>
                <p className="t-lead mt-4">{solution.lead}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="/contact" className="btn btn-primary">
                    Talk to BotLane
                    <ArrowRight />
                  </a>
                  <a href="#systems" className="btn btn-secondary">
                    See the systems
                  </a>
                </div>
              </div>

              {/* Assembled from — with the honest readiness of the parts */}
              <div className="lg:col-span-5">
                <div
                  className="panel p-5"
                  style={{ backgroundColor: "var(--color-bg-raised)" }}
                >
                  <p className="t-label">Assembled from</p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {used.map((system) => (
                      <li key={system.slug}>
                        <a
                          href={`/systems/${system.slug}`}
                          className="flex items-baseline justify-between gap-3 text-[0.8125rem] text-fg-secondary transition-colors hover:text-fg"
                        >
                          <span>{system.shortName}</span>
                          <span
                            className="t-mono flex-none"
                            style={{ color: "var(--color-fg-faint)" }}
                          >
                            {gatesPassed(system.gates)}/{GATE_TOTAL}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  {!readiness.anyReady ? (
                    <p
                      className="t-small mt-5 border-t border-line pt-4"
                      style={{ color: "var(--color-fg-muted)" }}
                    >
                      None of these systems has closed all {GATE_TOTAL} release
                      gates yet — the furthest is at {readiness.best}/
                      {GATE_TOTAL}. This solution is available through early
                      access rather than off the shelf.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The situation */}
        <section className="section">
          <div className="page-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 [&>*]:min-w-0">
              <div className="lg:col-span-5">
                <SectionHeader
                  size="md"
                  eyebrow="The situation"
                  color="rose"
                  title="You will recognise this if:"
                />
              </div>
              <div className="lg:col-span-7">
                <ul className="flex flex-col gap-px overflow-hidden rounded-[12px] border border-line"
                    style={{ backgroundColor: "var(--color-line)" }}>
                  {solution.situation.map((line) => (
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
                      <p className="t-body">{line}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What changes */}
        <section className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="After"
              color="emerald"
              title="What is different once it runs."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
              {solution.changes.map((change) => (
                <article key={change.title} className="panel p-6">
                  <h3 className="t-h3 text-fg">{change.title}</h3>
                  <p className="t-body mt-2.5">{change.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Systems */}
        <section id="systems" className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Systems"
              color="blue"
              align="between"
              title="The software behind it."
              lead="Each card shows the system's real release status — a solution page does not get to describe a system more generously than the system's own page does."
              action={
                <a href="/systems" className="btn btn-secondary">
                  Browse all systems
                  <ArrowRight />
                </a>
              }
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
              {used.map((system) => (
                <SystemCard key={system.slug} system={system} />
              ))}
            </div>
          </div>
        </section>

        {/* How it comes together */}
        <section className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Sequence"
              color="amber"
              title="How it comes together."
              lead="Order matters more than scope. Each step is chosen so the next one is cheaper."
            />
            <ol className="mt-10 grid gap-4 md:grid-cols-3 [&>*]:min-w-0">
              {solution.steps.map((step, index) => (
                <li key={step.title} className="panel p-5">
                  <span className="t-mono" style={{ color: "var(--color-accent)" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h3 mt-3 text-fg">{step.title}</h3>
                  <p className="t-body mt-2">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Services involved */}
        {involved.length ? (
          <section className="section hairline">
            <div className="page-container">
              <SectionHeader
                size="md"
                eyebrow="Services"
                color="cyan"
                title="Where BotLane usually helps."
                lead="Self-hosting all of it is a real option. These are the parts customers most often hand over, and why."
              />
              <div className="mt-10 grid gap-4 md:grid-cols-3 [&>*]:min-w-0">
                {involved.map((entry) => (
                  <a
                    key={entry.slug}
                    href={`/${entry.slug}`}
                    className="panel-interactive group flex flex-col p-6"
                  >
                    <h3 className="t-h3 text-fg">{entry.definition!.name}</h3>
                    <p className="t-body mt-2.5 flex-1">{entry.reason}</p>
                    <span className="mt-5 flex items-center gap-1.5 text-[0.8125rem] text-fg-secondary transition-colors group-hover:text-fg">
                      About {entry.definition!.name}
                      <ArrowRight size={13} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        {solution.faq?.length ? (
          <section className="section hairline">
            <div className="page-container">
              <SectionHeader
                size="md"
                eyebrow="Questions"
                color="blue"
                title={`Questions about ${solution.name.toLowerCase()}.`}
              />
              <div className="mt-10">
                <FaqList entries={solution.faq} />
              </div>
            </div>
          </section>
        ) : null}

        {/* Related */}
        {related.length ? (
          <section className="section hairline">
            <div className="page-container">
              <h2 className="t-label">Other solutions</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
                {related.map((other) => (
                  <SolutionCard key={other.slug} solution={other} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* CTA */}
        <section className="section hairline">
          <div className="page-container">
            <div className="panel flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="t-h3 text-fg">
                  Want to know whether this fits?
                </h2>
                <p className="t-body mt-2 max-w-[560px]">
                  Describe the situation and we will say which systems apply,
                  what is configuration and what would be custom work — including
                  when the answer is that you do not need us.
                </p>
              </div>
              <div className="flex flex-none flex-col gap-3 sm:flex-row">
                <a href="/contact" className="btn btn-primary">
                  Talk to BotLane
                  <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
