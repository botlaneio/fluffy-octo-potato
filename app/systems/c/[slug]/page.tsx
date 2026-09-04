import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { SystemCard } from "@/components/SystemCard";
import { SolutionCard } from "@/components/solution/SolutionCard";
import { ArrowRight, Check } from "@/components/ui/Arrow";

import { categories, categoryBySlug } from "@/content/categories";
import { systems } from "@/content/systems";
import { solutions } from "@/content/solutions";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return categories.map((category) => ({ slug: category.slug }));
}

const systemsIn = (slug: string) =>
  systems.filter((system) => system.categorySlug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};

  const populated = systemsIn(slug).length > 0;

  return {
    title: category.name,
    description:
      category.lead ??
      `${category.name} systems in the BotLane catalogue. ${category.description}`,
    alternates: { canonical: `/systems/c/${category.slug}` },
    // A landing page with no systems on it is a doorway page. Keep it
    // reachable and honest, but out of the index until it has something.
    robots: populated
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const inCategory = systemsIn(slug);
  const populated = inCategory.length > 0;

  const relatedSolutions = solutions.filter((solution) =>
    solution.systemSlugs.some((s) =>
      inCategory.some((system) => system.slug === s),
    ),
  );

  const otherCategories = categories.filter((c) => c.slug !== slug);

  const jsonLd = populated
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${category.name} — BotLane AI systems`,
        description: category.lead ?? category.description,
        url: `https://botlane.io/systems/c/${category.slug}`,
        hasPart: inCategory.map((system) => ({
          "@type": "SoftwareApplication",
          name: system.name,
          applicationCategory: "BusinessApplication",
          description: system.outcome,
          url: `https://botlane.io/systems/${system.slug}`,
        })),
      }
    : null;

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
                    href="/systems"
                    className="transition-colors hover:text-fg-secondary"
                  >
                    systems
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{category.slug}</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Eyebrow color="emerald">Category</Eyebrow>
                <h1 className="t-h2 mt-5 text-balance text-fg">
                  {category.headline ?? `${category.name} systems`}
                </h1>
                <p className="t-lead mt-4">
                  {category.lead ?? category.description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="/systems" className="btn btn-primary">
                    Browse the full catalogue
                    <ArrowRight />
                  </a>
                  <a href="/contact" className="btn btn-secondary">
                    Talk to BotLane
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div
                  className="panel p-5"
                  style={{ backgroundColor: "var(--color-bg-raised)" }}
                >
                  <p className="t-label">In this category</p>
                  {populated ? (
                    <>
                      <p className="t-body mt-3">
                        {inCategory.length}{" "}
                        {inCategory.length === 1 ? "system" : "systems"}, each
                        with its real release status attached. Every one can be
                        self-hosted.
                      </p>
                      <ul className="mt-4 flex flex-col gap-2">
                        {inCategory.map((system) => (
                          <li key={system.slug}>
                            <a
                              href={`/systems/${system.slug}`}
                              className="text-[0.8125rem] text-fg-secondary underline underline-offset-4 transition-colors hover:text-fg"
                            >
                              {system.shortName}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="t-body mt-3">
                      <span className="text-fg">Nothing here yet.</span> This
                      category is part of the taxonomy the catalogue is being
                      built into, but no system has been packaged for it. Rather
                      than fill the page, it says so.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {populated ? (
          <>
            {/* Systems */}
            <section className="section">
              <div className="page-container">
                <SectionHeader
                  size="md"
                  eyebrow="Systems"
                  color="blue"
                  title={`${category.name} systems in the catalogue.`}
                  lead="Release status is derived from each system's twelve release gates, so these cards say the same thing the system's own page does."
                />
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
                  {inCategory.map((system) => (
                    <SystemCard key={system.slug} system={system} />
                  ))}
                </div>
              </div>
            </section>

            {/* What it covers */}
            {category.covers?.length ? (
              <section className="section hairline">
                <div className="page-container">
                  <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 [&>*]:min-w-0">
                    <div className="lg:col-span-5">
                      <SectionHeader
                        size="md"
                        eyebrow="Scope"
                        color="violet"
                        title="What this category covers."
                        lead="The business functions a system in this category is expected to handle."
                      />
                    </div>
                    <div className="lg:col-span-7">
                      <ul className="flex flex-col gap-3">
                        {category.covers.map((line) => (
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
                </div>
              </section>
            ) : null}

            {/* What to look for */}
            {category.lookFor?.length ? (
              <section className="section hairline">
                <div className="page-container">
                  <SectionHeader
                    size="md"
                    eyebrow="Evaluating"
                    color="amber"
                    title="What to look for."
                    lead="Useful whether or not you buy from BotLane — these are the questions worth asking of any system in this category."
                  />
                  <div className="mt-10 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
                    {category.lookFor.map((item) => (
                      <article key={item.title} className="panel p-6">
                        <h3 className="t-h3 text-fg">{item.title}</h3>
                        <p className="t-body mt-2.5">{item.body}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {/* Related solutions */}
            {relatedSolutions.length ? (
              <section className="section hairline">
                <div className="page-container">
                  <SectionHeader
                    size="md"
                    eyebrow="Outcomes"
                    color="rose"
                    title="Solutions built on these systems."
                    lead="If you would rather start from the problem than the product."
                  />
                  <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
                    {relatedSolutions.map((solution) => (
                      <SolutionCard key={solution.slug} solution={solution} />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
          </>
        ) : (
          /* Empty category — short, honest, and pointed somewhere useful. */
          <section className="section">
            <div className="page-container">
              <div className="panel max-w-[720px] p-8">
                <h2 className="t-h3 text-fg">
                  No {category.name.toLowerCase()} system yet.
                </h2>
                <p className="t-body mt-3">
                  {category.description} The catalogue is built to hold this
                  category, and a system for it may be packaged later. Until
                  then there is nothing to show, and inventing something to fill
                  the page would be worse than an empty one.
                </p>
                <p className="t-body mt-3">
                  If you need this now, BotLane Custom builds systems that do not
                  exist in the catalogue — and would tell you if an existing one
                  already covers it.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href="/custom" className="btn btn-primary">
                    BotLane Custom
                    <ArrowRight />
                  </a>
                  <a href="/systems" className="btn btn-secondary">
                    See what does exist
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other categories */}
        <section className="section hairline">
          <div className="page-container">
            <h2 className="t-label">Other categories</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {otherCategories.map((other) => {
                const count = systemsIn(other.slug).length;
                return (
                  <li key={other.slug}>
                    <a
                      href={`/systems/c/${other.slug}`}
                      className="chip transition-colors hover:border-line-strong hover:text-fg"
                    >
                      {other.name}
                      {count > 0 ? (
                        <span
                          className="t-mono"
                          style={{ color: "var(--color-fg-faint)" }}
                        >
                          {count}
                        </span>
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      <Footer />

      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </>
  );
}
