import type { Category } from "@/lib/types";

/**
 * The category taxonomy the marketplace is built to scale into.
 *
 * Categories that currently hold systems carry full landing-page content
 * (headline, lead, covers, lookFor) and render an indexable page. Categories
 * with nothing in them yet deliberately carry only the one-line description:
 * their page renders a short honest state and is noindex, because a landing
 * page with no products on it is a doorway page, and twelve of those would
 * cost the domain more than the six real ones earn it.
 *
 * When a category gains its first system, write its landing-page content at
 * the same time — the page becomes indexable automatically.
 */
export const categories: Category[] = [
  {
    slug: "sales-crm",
    name: "Sales & CRM",
    description: "Lead capture, qualification, pipeline and follow-up.",
    headline: "AI systems for sales and CRM.",
    lead: "Software that captures every enquiry, qualifies it against your criteria, and keeps the pipeline current as a side effect of the conversation rather than as an afternoon of data entry.",
    covers: [
      "Inbound lead capture across channels",
      "Automated qualification and scoring",
      "Pipeline and deal stage management",
      "Follow-up sequences that stop when a human replies",
      "Conversation history attached to the record",
      "Handoff from an AI agent to a person",
    ],
    lookFor: [
      {
        title: "Where the conversation history lives",
        body: "If it lives on a rep's phone, it leaves when they do. A sales system's first job is putting the thread somewhere the business owns.",
      },
      {
        title: "Whether qualification is yours",
        body: "Generic scoring is worse than none. The questions a good rep asks should be the questions the system asks, in your order.",
      },
      {
        title: "How handoff works",
        body: "Escalation is the normal case, not the failure case. A person should inherit the thread, the qualification result and the record — not a summary.",
      },
      {
        title: "Where the data sits",
        body: "Self-hosted means customer conversations stay on infrastructure you control, which matters more in sales than most teams expect.",
      },
    ],
  },
  {
    slug: "customer-support",
    name: "Customer Support",
    description: "Front-line conversations, triage and escalation.",
    headline: "AI systems for customer support.",
    lead: "Software that answers the routine questions continuously, books what needs booking, and brings a person in when the situation actually needs one.",
    covers: [
      "Front-line conversation handling",
      "Answers retrieved from your own documents",
      "Appointment and callback booking",
      "Caller and enquiry qualification",
      "Escalation to a human with full context",
      "Out-of-hours coverage",
    ],
    lookFor: [
      {
        title: "Where answers come from",
        body: "An answer generated from the model's guess is a liability. Retrieval from your documents means the answer is one you would have given.",
      },
      {
        title: "What triggers a human",
        body: "The escalation rules are a business decision, not a technical one. They should be yours to write and easy to change.",
      },
      {
        title: "What happens at 2am",
        body: "Coverage is the point. A support system that needs watching has moved the problem rather than solved it.",
      },
    ],
  },
  {
    slug: "it-service-management",
    name: "IT & Service Management",
    description: "Service desks, ticket triage and internal support.",
    headline: "AI systems for IT and service management.",
    lead: "Internal service desks that triage on arrival, draft from your runbooks, and put an explicit approval gate in front of anything that touches production.",
    covers: [
      "Ticket triage, classification and routing",
      "Drafted responses from past resolutions",
      "Knowledge retrieval across internal documentation",
      "Tool execution behind approval gates",
      "Automated QA on resolutions",
      "Queue and recurrence analytics",
    ],
    lookFor: [
      {
        title: "What the system may actually do",
        body: "A helpdesk that can act is more useful and more dangerous. Every action it may take should be added deliberately, with a named approver.",
      },
      {
        title: "Whether it starts read-only",
        body: "Triage and drafting first, execution later. Any system that wants production access on day one is asking you to trust it before it has earned anything.",
      },
      {
        title: "Whether the queue becomes legible",
        body: "The value is not only faster tickets — it is finally knowing what recurs, what takes longest, and what should be fixed upstream.",
      },
    ],
  },
  {
    slug: "operations",
    name: "Operations",
    description: "Internal workflows, back office and coordination.",
    headline: "AI systems for business operations.",
    lead: "Software that replaces the manual joins between functions — the exports, the re-keying, the person who copies things from one tool into another.",
    covers: [
      "Cross-function workflows",
      "CRM, support and finance on one record",
      "Internal automation and approvals",
      "Reporting that draws from one source",
      "Back-office coordination",
    ],
    lookFor: [
      {
        title: "Whether it removes a join or adds one",
        body: "An operations system that becomes a sixth tool alongside five others has made things worse. The test is whether an export step disappears.",
      },
      {
        title: "How migration works",
        body: "Parallel running beats a weekend cutover. Ask what happens to the old system while the new records earn trust.",
      },
      {
        title: "What the second function costs",
        body: "The first migration is expensive. If the second is not markedly cheaper, the system is not actually unifying anything.",
      },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    description: "Client delivery, reporting and practice management.",
    headline: "AI systems for professional services firms.",
    lead: "Software for firms that bill for delivery — client reporting, status communication and the recurring obligations that always land late.",
    covers: [
      "Recurring client reporting",
      "Data aggregation across delivery tools",
      "Approval workflows before anything reaches a client",
      "Document generation and PDF export",
      "Scheduling and reminders",
    ],
    lookFor: [
      {
        title: "Whether a human approves",
        body: "Client-facing output generated and sent without review is a reputational risk, not a time saving. The approval gate is the feature.",
      },
      {
        title: "Where the template lives",
        body: "Automating a bad report just produces bad reports faster. What a good report contains is a decision to make before automating it.",
      },
      {
        title: "Which sources it can reach",
        body: "The system is only as good as the tools it can read. Additional collectors are usually custom work — worth knowing before you buy.",
      },
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    description: "Matters, intake, drafting and deadlines.",
    headline: "AI systems for legal practices.",
    lead: "Practice software built around the matter file — intake, conflict checks, document workflows, deadlines and billing on one system you can host yourself.",
    covers: [
      "Matter management",
      "Client intake and conflict checks",
      "Document workflows and drafting assistance",
      "Deadline and limitation tracking",
      "Time recording and billing",
    ],
    lookFor: [
      {
        title: "Where client data is stored",
        body: "Confidentiality obligations are the reason self-hosting matters more here than almost anywhere else. Know where the matter file physically sits.",
      },
      {
        title: "Whether deadlines are load-bearing",
        body: "A missed limitation date is a different class of failure from a missed reminder. Ask what the system guarantees and what it merely displays.",
      },
      {
        title: "How drafting assistance is bounded",
        body: "Assistance that produces confident text without provenance is a hazard in legal work. Retrieval and citation matter more than fluency.",
      },
    ],
  },

  /* ------------------------------------------------------------------
   * No systems yet. One-line description only — their pages render a
   * short honest state and are noindex until a system lands.
   * ---------------------------------------------------------------- */
  {
    slug: "finance",
    name: "Finance",
    description: "Invoicing, reconciliation and financial workflows.",
  },
  {
    slug: "analytics-bi",
    name: "Analytics & BI",
    description: "Reporting, dashboards and decision support.",
  },
  {
    slug: "knowledge-management",
    name: "Knowledge Management",
    description: "Company knowledge, retrieval and private search.",
  },
  {
    slug: "meetings-productivity",
    name: "Meetings & Productivity",
    description: "Capture, summarisation and follow-through.",
  },
  {
    slug: "marketing",
    name: "Marketing",
    description: "Content operations, campaigns and lifecycle.",
  },
  {
    slug: "infrastructure-automation",
    name: "Infrastructure & Automation",
    description: "Orchestration, integration and system plumbing.",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
