import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ArrowRight } from "@/components/ui/Arrow";

import { contactEmail, contactEndpoint } from "@/content/site";
import { enquiryRoutes, whatHappensNext } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to BotLane about a system, a deployment, managed operation or custom work — or describe the problem and we will say which applies.",
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
};

const mailto = (subject: string) =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;

export default function ContactPage() {
  const formEnabled = contactEndpoint.length > 0;

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
                <li aria-current="page">contact</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Eyebrow color="blue">Contact</Eyebrow>
                <h1 className="t-h2 mt-5 text-balance text-fg">
                  Tell us what you&rsquo;re trying to fix.
                </h1>
                <p className="t-lead mt-4">
                  You do not need to know which system you want. Describing the
                  problem gets a better answer than naming a product, and
                  sometimes that answer is that you can do this yourself.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={mailto("BotLane enquiry")} className="btn btn-primary">
                    Email {contactEmail}
                    <ArrowRight />
                  </a>
                  <a href="/solutions" className="btn btn-secondary">
                    Not sure? Start from a problem
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div
                  className="panel p-5"
                  style={{ backgroundColor: "var(--color-bg-raised)" }}
                >
                  <p className="t-label">Before you write</p>
                  <p className="t-body mt-3">
                    Two pages answer most first questions without needing us:{" "}
                    <a
                      href="/trust"
                      className="text-fg underline underline-offset-4"
                    >
                      how releases are gated
                    </a>{" "}
                    and{" "}
                    <a
                      href="/developers"
                      className="text-fg underline underline-offset-4"
                    >
                      what self-hosting involves
                    </a>
                    . If your question is answered there, you will get a faster
                    answer by reading than by waiting for us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enquiry routes */}
        <section className="section">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="Routes"
              color="emerald"
              title="What kind of enquiry is this?"
              lead="Each one lists what to include. Sending those three things first turns a two-week exchange into one reply."
            />

            <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
              {enquiryRoutes.map((route) => (
                <li key={route.value} className="panel flex flex-col p-6">
                  <h3 className="t-h3 text-fg">{route.label}</h3>
                  <p className="t-body mt-2.5">{route.body}</p>

                  <p className="t-label mt-5">Include</p>
                  <ul className="mt-2.5 flex flex-1 flex-col gap-1.5">
                    {route.include.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span
                          className="mt-2 h-px w-3 flex-none"
                          style={{ backgroundColor: "var(--color-line-strong)" }}
                          aria-hidden="true"
                        />
                        <span className="t-small">{line}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={mailto(route.subject)}
                    className="mt-5 flex items-center gap-1.5 border-t border-line pt-4 text-[0.8125rem] text-fg-secondary transition-colors hover:text-fg"
                  >
                    Email about this
                    <ArrowRight size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Form, or the honest fallback */}
        <section className="section hairline">
          <div className="page-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 [&>*]:min-w-0">
              <div className="lg:col-span-5">
                <SectionHeader
                  size="md"
                  eyebrow="Get in touch"
                  color="violet"
                  title={formEnabled ? "Send it here." : "Email is the way in."}
                  lead={
                    formEnabled
                      ? "One message, read by a person who can answer the technical part."
                      : "There is no contact form on this page yet, and a form that quietly loses enquiries would be worse than none. Email reaches us directly."
                  }
                />

                <div className="mt-8 panel p-5">
                  <p className="t-label">Direct</p>
                  <a
                    href={mailto("BotLane enquiry")}
                    className="mt-3 block text-[0.9375rem] text-fg underline underline-offset-4"
                  >
                    {contactEmail}
                  </a>
                  <p className="t-small mt-4">
                    Security disclosures reach the same address — use the subject
                    line &ldquo;Security disclosure&rdquo; and it will be treated
                    accordingly.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                {formEnabled ? (
                  <ContactForm endpoint={contactEndpoint} />
                ) : (
                  <div className="panel p-6">
                    <h2 className="t-h3 text-fg">What to put in the email</h2>
                    <p className="t-body mt-2.5">
                      Anything from the list above is enough to get a useful
                      reply. If you would rather write freely, these are the
                      things we will otherwise have to ask for:
                    </p>
                    <ul className="mt-5 flex flex-col gap-2.5">
                      {[
                        "What happens today, and what it costs you",
                        "Which tools the process currently runs through",
                        "Whether you want to self-host or have BotLane run it",
                        "Any deadline that is real rather than aspirational",
                      ].map((line) => (
                        <li key={line} className="flex items-start gap-2.5">
                          <span
                            className="mt-2 h-px w-3 flex-none"
                            style={{ backgroundColor: "var(--color-line-strong)" }}
                            aria-hidden="true"
                          />
                          <span className="t-body">{line}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={mailto("BotLane enquiry")}
                      className="btn btn-primary mt-7"
                    >
                      Start an email
                      <ArrowRight />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* What happens next */}
        <section className="section hairline">
          <div className="page-container">
            <SectionHeader
              size="md"
              eyebrow="After you send"
              color="amber"
              title="What happens next."
              lead="No response-time promise appears here, because BotLane has no support rota to back one yet. What we can describe is the shape of the reply."
            />
            <ol className="mt-10 grid gap-4 md:grid-cols-3 [&>*]:min-w-0">
              {whatHappensNext.map((step, index) => (
                <li key={step.title} className="panel p-6">
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
      </main>
      <Footer />
    </>
  );
}
