import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { SolutionCard } from "@/components/solution/SolutionCard";
import { ArrowRight } from "@/components/ui/Arrow";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Business outcomes assembled from BotLane AI systems, integrations and services — automate sales operations, customer support, internal IT, the back office, client reporting, or deploy private company AI.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <Nav />
      <main id="main">
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
                <li aria-current="page">solutions</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Eyebrow color="violet">Solutions</Eyebrow>
                <h1 className="t-h2 mt-5 text-balance text-fg">
                  Start from the problem, not the product.
                </h1>
                <p className="t-lead mt-4">
                  Nobody wakes up wanting an AI IT helpdesk. They want the ticket
                  queue to stop being triaged by whoever opens it first. Each
                  solution below starts from a situation and names the systems
                  and services that address it.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div
                  className="panel p-5"
                  style={{ backgroundColor: "var(--color-bg-raised)" }}
                >
                  <p className="t-label">Solutions and systems are not the same</p>
                  <p className="t-body mt-3">
                    A <span className="text-fg">system</span> is installable
                    software with a version and a release status. A{" "}
                    <span className="text-fg">solution</span> is an outcome that
                    usually needs more than one of them, plus integration work.
                    Every solution here links to the systems behind it, with
                    their real gate status attached.
                  </p>
                  <a href="/systems" className="btn btn-secondary btn-sm mt-5">
                    Browse systems instead
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Outcomes"
              color="emerald"
              title="Six places businesses usually start."
              lead="Each one names the systems it is assembled from and how far through productization those systems actually are."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
              {solutions.map((solution) => (
                <SolutionCard key={solution.slug} solution={solution} />
              ))}
            </div>
          </div>
        </section>

        <section className="section hairline">
          <div className="page-container">
            <div className="panel flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="t-h3 text-fg">
                  Your situation isn&rsquo;t on this list?
                </h2>
                <p className="t-body mt-2 max-w-[560px]">
                  These are the six that come up most often, not the limit of
                  what the catalogue and BotLane Custom can address between them.
                </p>
              </div>
              <a href="/contact" className="btn btn-primary flex-none">
                Describe the problem
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
