import type { ServiceDefinition } from "@/content/services";
import { Nav } from "../Nav";
import { Footer } from "../Footer";
import { Eyebrow, SectionHeader } from "../ui/SectionHeader";
import { ArrowRight, Check } from "../ui/Arrow";
import { FaqList } from "../product/FaqList";
import { ResponsibilitySplit } from "./ResponsibilitySplit";
import { systems } from "@/content/systems";
import { deriveStatus, gatesPassed, GATE_TOTAL } from "@/lib/status";

/**
 * One template, three routes. Deploy, Managed and Custom are the same page
 * shape with different content, which is what keeps them describing one
 * business rather than three competing pitches. The template holds no per-slug
 * logic: accent, cross-link and optional sections all come from the data.
 */
export function ServicePage({ service }: { service: ServiceDefinition }) {
  const ready = systems.filter((s) => deriveStatus(s) === "production-ready");
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
                <li aria-current="page">{service.slug}</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Eyebrow color={service.accent}>{service.eyebrow}</Eyebrow>
                <h1 className="t-h2 mt-5 text-balance text-fg">
                  {service.headline}
                </h1>
                <p className="t-lead mt-4">{service.lead}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="/contact" className="btn btn-primary">
                    Talk to BotLane
                    <ArrowRight />
                  </a>
                  <a href="/systems" className="btn btn-secondary">
                    Browse systems
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div
                  className="panel p-5"
                  style={{ backgroundColor: "var(--color-bg-raised)" }}
                >
                  <p className="t-label">What kind of engagement this is</p>
                  <p className="t-body mt-3">{service.shape}</p>
                </div>

                {/* Availability is read from the catalogue, so this page cannot
                    promise a service over systems that do not exist yet. */}
                {ready.length === 0 ? (
                  <div
                    className="panel mt-4 flex items-start gap-3 p-5"
                    style={{
                      backgroundColor: "var(--color-bg-raised)",
                      borderColor:
                        "color-mix(in srgb, var(--color-status-progress) 22%, var(--color-line))",
                    }}
                    role="note"
                  >
                    <span
                      className="dot mt-2 flex-none"
                      style={{ backgroundColor: "var(--color-status-progress)" }}
                      aria-hidden="true"
                    />
                    <p className="t-body">
                      <span className="text-fg">
                        No system has closed all {GATE_TOTAL} release gates yet.
                      </span>{" "}
                      {service.name} is currently available through early access,
                      on systems still in productization — the furthest along is{" "}
                      <a
                        href={`/systems/${furthest.slug}`}
                        className="text-fg underline underline-offset-4"
                      >
                        {furthest.shortName}
                      </a>{" "}
                      at {gatesPassed(furthest.gates)}/{GATE_TOTAL}.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Kinds of work — only services that have several render this */}
        {service.variants?.length ? (
          <section className="section">
            <div className="page-container">
              <SectionHeader
                size="md"
                eyebrow="Scope"
                color="emerald"
                title={service.variantsTitle ?? "What this covers"}
                lead={service.variantsLead}
              />
              <ul className="mt-10 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
                {service.variants.map((variant) => (
                  <li key={variant.title} className="panel p-6">
                    <h3 className="t-h3 text-fg">{variant.title}</h3>
                    <p className="t-body mt-2.5">{variant.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Phases */}
        <section className={service.variants?.length ? "section hairline" : "section"}>
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Process"
              color="blue"
              title={service.phasesTitle}
              lead={service.phasesLead}
            />

            <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
              {service.phases.map((phase, index) => (
                <li key={phase.title} className="panel p-5">
                  <span className="t-mono" style={{ color: "var(--color-accent)" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h3 mt-3 text-fg">{phase.title}</h3>
                  <p className="t-body mt-2">{phase.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Deliverables + prerequisites */}
        <section className="section hairline">
          <div className="page-container">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 [&>*]:min-w-0">
              <div>
                <SectionHeader
                  size="md"
                  eyebrow="Included"
                  color="emerald"
                  title={service.deliverablesTitle}
                />
                <ul className="mt-8 flex flex-col gap-3">
                  {service.deliverables.map((line) => (
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

              <div>
                <SectionHeader
                  size="md"
                  eyebrow="From you"
                  color="violet"
                  title={service.prerequisitesTitle}
                />
                <ul className="mt-8 flex flex-col gap-3">
                  {service.prerequisites.map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 h-px w-3 flex-none"
                        style={{ backgroundColor: "var(--color-line-strong)" }}
                        aria-hidden="true"
                      />
                      <span className="t-body">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Responsibility split */}
        <section className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Boundaries"
              color="amber"
              title="Who does what."
              lead="Stated plainly so nobody discovers the line during an incident."
            />
            <div className="mt-10">
              <ResponsibilitySplit
                rows={service.responsibility}
                firstColumn="Stage"
              />
            </div>
          </div>
        </section>

        {/* Not included */}
        <section className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Not included"
              color="rose"
              title="What this is not."
              lead={service.boundaryLead}
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
              {service.notIncluded.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="panel-interactive group flex flex-col p-6"
                >
                  <h3 className="t-h3 text-fg">{item.label}</h3>
                  <p className="t-body mt-2.5 flex-1">{item.body}</p>
                  <span className="mt-5 flex items-center gap-1.5 text-[0.8125rem] text-fg-secondary transition-colors group-hover:text-fg">
                    {item.linkLabel}
                    <ArrowRight size={13} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* When not to — stated before the price, on purpose */}
        {service.whenNot?.length ? (
          <section className="section hairline">
            <div className="page-container">
              <SectionHeader
                size="md"
                eyebrow="Honestly"
                color="violet"
                title={service.whenNotTitle ?? "Before you ask for this"}
                lead={service.whenNotLead}
              />
              <ul className="mt-10 flex flex-col gap-px overflow-hidden rounded-[12px] border border-line"
                  style={{ backgroundColor: "var(--color-line)" }}>
                {service.whenNot.map((line) => (
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
            </div>
          </section>
        ) : null}

        {/* Pricing posture */}
        <section className="section hairline">
          <div className="page-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 [&>*]:min-w-0">
              <div className="lg:col-span-5">
                <SectionHeader
                  size="md"
                  eyebrow="Cost"
                  color="cyan"
                  title="How this is priced."
                />
              </div>
              <div className="lg:col-span-7">
                <p className="t-lead">{service.pricingNote}</p>
                <a href="/contact" className="btn btn-secondary mt-6">
                  Ask for a scoped quote
                  <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Questions"
              color="blue"
              title={`Common questions about ${service.name}.`}
            />
            <div className="mt-10">
              <FaqList entries={service.faq} />
            </div>
          </div>
        </section>

        {/* Cross-link */}
        <section className="section hairline">
          <div className="page-container">
            <div className="panel flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="t-h3 text-fg">{service.crossLink.heading}</h2>
                <p className="t-body mt-2 max-w-[520px]">{service.crossLink.body}</p>
              </div>
              <a href={service.crossLink.href} className="btn btn-primary flex-none">
                {service.crossLink.label}
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
