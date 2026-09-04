import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight } from "@/components/ui/Arrow";

import { categories } from "@/content/categories";
import { systems } from "@/content/systems";
import { solutions } from "@/content/solutions";
import { GATE_TOTAL } from "@/lib/status";
import { contactEmail } from "@/content/site";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Everything BotLane publishes — how releases are gated, how to self-host, the release feed, and evaluation guides for choosing an AI system in each category.",
  alternates: { canonical: "/resources" },
};

const reference = [
  {
    title: "How releases are gated",
    body: `The twelve release gates, what closing each one means, and the live status of every system in the catalogue. Also lists what BotLane does not claim.`,
    href: "/trust",
    label: "Trust",
  },
  {
    title: "Self-hosting guide",
    body: "What arrives with a release, the shape of a deployment, host requirements, verifying a download, secrets handling, and running it after day one.",
    href: "/developers",
    label: "Developers",
  },
  {
    title: "Release feed",
    body: "Every published release with its upstream pin, checksum, upgrade notes and rollback safety — plus what each entry will always carry.",
    href: "/changelog",
    label: "Changelog",
  },
];

export default function ResourcesPage() {
  /* Evaluation guides are the "what to look for" sections that already exist on
     populated category pages — indexed here rather than rewritten. */
  const guides = categories.filter((c) => (c.lookFor?.length ?? 0) > 0);
  const systemsIn = (slug: string) =>
    systems.filter((s) => s.categorySlug === slug).length;

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
                <li aria-current="page">resources</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Eyebrow color="cyan">Resources</Eyebrow>
                <h1 className="t-h2 mt-5 text-balance text-fg">
                  Everything BotLane publishes.
                </h1>
                <p className="t-lead mt-4">
                  Reference material, self-hosting documentation, the release
                  feed, and evaluation guides written to be useful whether or not
                  you buy anything here.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div
                  className="panel p-5"
                  style={{ backgroundColor: "var(--color-bg-raised)" }}
                >
                  <p className="t-label">No blog yet</p>
                  <p className="t-body mt-3">
                    There is no publishing schedule and no back catalogue of
                    posts. When BotLane has something worth writing down —
                    usually a packaging problem solved the hard way — it will
                    appear here. An empty blog with three posts from launch week
                    helps nobody.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reference */}
        <section className="section">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Reference"
              color="emerald"
              title="The three pages worth reading first."
              lead="Between them they answer most of what anyone asks before a first call."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3 [&>*]:min-w-0">
              {reference.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="panel-interactive group flex flex-col p-6"
                >
                  <span className="t-mono" style={{ color: "var(--color-fg-faint)" }}>
                    {item.label}
                  </span>
                  <h3 className="t-h3 mt-3 text-fg">{item.title}</h3>
                  <p className="t-body mt-2.5 flex-1">{item.body}</p>
                  <span className="mt-5 flex items-center gap-1.5 text-[0.8125rem] text-fg-secondary transition-colors group-hover:text-fg">
                    Read
                    <ArrowRight size={13} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Evaluation guides */}
        <section className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Evaluation"
              color="violet"
              title="What to look for, by category."
              lead="The questions worth asking of any system in a category — ours included, and often the ones that rule ours out."
            />
            <ul className="mt-10 grid gap-px overflow-hidden rounded-[12px] border border-line md:grid-cols-2"
                style={{ backgroundColor: "var(--color-line)" }}>
              {guides.map((category) => (
                <li key={category.slug} style={{ backgroundColor: "var(--color-bg)" }}>
                  <a
                    href={`/systems/c/${category.slug}`}
                    className="flex h-full flex-col gap-1.5 p-5 transition-colors hover:bg-surface"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-[0.9375rem] font-medium tracking-[-0.014em] text-fg">
                        Choosing {category.name.toLowerCase()} software
                      </span>
                      <span
                        className="t-mono flex-none"
                        style={{ color: "var(--color-fg-faint)" }}
                      >
                        {category.lookFor?.length} points
                      </span>
                    </span>
                    <span className="t-small">
                      {category.description} {systemsIn(category.slug)}{" "}
                      {systemsIn(category.slug) === 1 ? "system" : "systems"} in
                      the catalogue.
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="t-small mt-4">
              Categories without a guide have no system in the catalogue yet.
              Writing evaluation advice for a category we have not built for
              would be guessing.
            </p>
          </div>
        </section>

        {/* Start from a problem */}
        <section className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Orientation"
              color="rose"
              title="Not sure where to start?"
              lead="Two different entry points, depending on whether you already know what you want."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
              <a href="/solutions" className="panel-interactive group flex flex-col p-6">
                <h3 className="t-h3 text-fg">Start from the problem</h3>
                <p className="t-body mt-2.5 flex-1">
                  {solutions.length} outcomes, each naming the systems behind it
                  and how far through productization they are. Useful if you know
                  what is broken but not what fixes it.
                </p>
                <span className="mt-5 flex items-center gap-1.5 text-[0.8125rem] text-fg-secondary transition-colors group-hover:text-fg">
                  Solutions
                  <ArrowRight size={13} />
                </span>
              </a>

              <a href="/systems" className="panel-interactive group flex flex-col p-6">
                <h3 className="t-h3 text-fg">Start from the software</h3>
                <p className="t-body mt-2.5 flex-1">
                  The full catalogue with search and filters by category,
                  deployment, classification and release status. Every system
                  shows its real gate count out of {GATE_TOTAL}.
                </p>
                <span className="mt-5 flex items-center gap-1.5 text-[0.8125rem] text-fg-secondary transition-colors group-hover:text-fg">
                  Marketplace
                  <ArrowRight size={13} />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Ask */}
        <section className="section hairline">
          <div className="page-container">
            <div className="panel flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="t-h3 text-fg">Looking for something not here?</h2>
                <p className="t-body mt-2 max-w-[560px]">
                  If there is a document you needed and could not find, that is
                  useful to know — missing documentation is a packaging defect
                  like any other.
                </p>
              </div>
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent("Missing documentation")}`}
                className="btn btn-primary flex-none"
              >
                Tell us what is missing
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
