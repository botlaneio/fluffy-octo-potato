/**
 * Content for /trust.
 *
 * Rule for this file: every line must be something BotLane can be held to.
 * No certifications it does not hold, no figures it cannot evidence, no
 * guarantees it has no mechanism to keep.
 */

export const provenancePoints = [
  {
    title: "Every distribution names its upstream",
    body: "The upstream project and the exact tag or commit a release is built from are recorded and published on the product page — not kept internally and summarised as “latest stable”.",
  },
  {
    title: "Pins are explicit and visible",
    body: "The AI WhatsApp Sales Desk is pinned to DeskcommCRM v1.12.0. That version appears on the product page, in the catalogue card and in the page metadata, so it cannot quietly drift.",
  },
  {
    title: "Moving a pin is a release event",
    body: "Adopting a newer upstream version produces a new BotLane release with its own notes and its own gate run. It is never a silent rebuild behind the same version number.",
  },
  {
    title: "Artifacts are addressable by content",
    body: "Release images are published with digests so a deployment can pin what it runs by content rather than by a tag someone could move.",
  },
];

export const licensingModel = [
  {
    classification: "BotLane Original",
    body: "BotLane wrote the software and licenses it directly. One licence, one author, no upstream terms to reconcile.",
  },
  {
    classification: "BotLane Distribution",
    body: "Two licences apply. The upstream project's licence governs the upstream code and is unchanged by BotLane — we do not relicense work we did not write. BotLane's package licence covers the packaging, tooling, tested release and support around it.",
  },
  {
    classification: "BotLane Integration",
    body: "The third-party vendor's terms apply directly between you and them. BotLane's agreement covers deployment and operation only, which is why these systems are not redistributed or rebranded.",
  },
];

export const securityPosture = [
  {
    title: "Where your data sits",
    body: "Self-hosted systems run on infrastructure you control, and business data does not pass through BotLane. Under BotLane Managed, operational access is scoped to what running the system requires and the hosting arrangement is set out in the agreement.",
  },
  {
    title: "How secrets are handled",
    body: "Credentials are supplied at runtime through environment configuration. They are not baked into images, committed to repositories, or written to logs. This is one of the twelve gates, so it is verifiable per system rather than a general assurance.",
  },
  {
    title: "How a bad deployment fails",
    body: "Configuration is validated at startup so a misconfigured system fails immediately rather than serving traffic in a broken state — again, a gate rather than a promise.",
  },
  {
    title: "Reporting a vulnerability",
    body: "Security reports reach BotLane through the contact route on this site and are acknowledged before any public disclosure timeline is agreed.",
  },
];

/**
 * The section that does the most work on this page. Stating the limits
 * plainly is what makes the rest of it credible.
 */
export const notClaimed = [
  "We do not hold SOC 2, ISO 27001, or any other security certification, and nothing on this site implies that we do.",
  "We do not publish uptime figures or performance benchmarks. We do not yet have a body of production data honest enough to draw them from.",
  "We do not display customer logos, customer counts or testimonials. When we have customers willing to be named, they will appear here and not before.",
  "We do not call a system production ready before its twelve release gates are closed. The badge is computed from the gates, so we could not do this even if we wanted to.",
  "We do not claim authorship of upstream open-source projects. Where a system is built on one, the project is named and its version pinned.",
  "We do not describe a system as tested against a workload we have not actually run.",
];
