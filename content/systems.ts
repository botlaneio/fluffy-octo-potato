import type { AiSystem, ReleaseGates } from "@/lib/types";

/**
 * ---------------------------------------------------------------------------
 * SEED DATA — verify before launch.
 *
 * Two kinds of placeholder live in this file:
 *
 * 1. `gates` — every block is a placeholder. Status is derived from these
 *    booleans (lib/status.ts), so an inaccurate gate here is the one thing
 *    that could put a wrong badge on the site. Nothing else in the codebase
 *    can. Set them from the real release checklist.
 *
 * 2. Detail-page copy — description, audience, use cases, integrations,
 *    architecture, resource requirements and FAQ answers are drafted from the
 *    product brief, not read off a running system. Check them against the
 *    actual repository before publishing.
 *
 * Nothing in this file states a customer count, a performance figure, an
 * uptime number or a security certification, and nothing should be added that
 * does without evidence behind it.
 * ---------------------------------------------------------------------------
 */

const noGates: ReleaseGates = {
  pinnedProvenance: false,
  installer: false,
  dockerImages: false,
  ociRelease: false,
  configValidation: false,
  secretsHandling: false,
  healthChecks: false,
  backupRestore: false,
  upgradeRollback: false,
  securityHardening: false,
  acceptanceTests: false,
  documentation: false,
};

const standardDocs = [
  { label: "Self-hosting guide", href: "/developers" },
  { label: "Requirements", href: "/developers#requirements" },
  { label: "Provenance & checksums", href: "/trust#provenance" },
  { label: "Licensing", href: "/trust#licensing" },
];

export const systems: AiSystem[] = [
  {
    slug: "ai-whatsapp-sales-desk",
    name: "BotLane AI WhatsApp Sales Desk",
    shortName: "AI WhatsApp Sales Desk",
    categorySlug: "sales-crm",
    classification: "distribution",
    outcome:
      "Turn WhatsApp into a qualified sales pipeline — inbound leads handled, qualified and followed up without a rep watching the inbox.",
    description:
      "Most businesses that sell on WhatsApp are running the channel out of a phone. Conversations live on one person's device, nothing reaches the CRM, and follow-up happens when somebody remembers. This system puts a real sales desk behind the number: every inbound message is captured, qualified against your criteria, and either progressed by an AI agent or handed to a human with the full thread attached.",
    capabilities: [
      "WhatsApp lead handling",
      "AI qualification",
      "CRM pipeline",
      "AI sales agents",
      "Automated follow-ups",
      "Business knowledge / RAG",
      "Human handoff",
      "Scheduling",
    ],
    audience: [
      "Businesses where WhatsApp is the primary inbound sales channel",
      "Teams losing conversation history to personal devices",
      "Dealerships, clinics, agencies and traders with high inbound volume",
      "Operators who want the conversation data on their own infrastructure",
    ],
    useCases: [
      {
        title: "Qualify inbound before a rep touches it",
        body: "Incoming enquiries are answered immediately, asked your qualifying questions, and scored against your criteria — so the pipeline a rep opens contains leads worth their time.",
      },
      {
        title: "Stop losing follow-ups",
        body: "Follow-up sequences run on schedule against the CRM record rather than someone's memory, and stop the moment a human replies.",
      },
      {
        title: "Answer product questions accurately",
        body: "Business knowledge is indexed and retrieved at answer time, so pricing, availability and policy answers come from your documents rather than the model's guess.",
      },
      {
        title: "Hand over cleanly",
        body: "When a conversation needs a person, it moves to them with the whole thread, the qualification result and the CRM record already attached.",
      },
    ],
    howItWorks: [
      {
        title: "Message arrives",
        body: "Inbound WhatsApp messages hit the system's webhook endpoint and are written to the conversation store before anything else happens.",
      },
      {
        title: "Agent qualifies",
        body: "An AI sales agent responds using your business knowledge, asks your qualifying questions, and updates the CRM record as the conversation develops.",
      },
      {
        title: "Pipeline updates",
        body: "The lead moves through your pipeline stages automatically, with follow-ups scheduled against the record.",
      },
      {
        title: "Human takes over when it matters",
        body: "Escalation rules or an explicit request route the conversation to a person, who picks it up with full context.",
      },
    ],
    integrations: [
      { name: "WhatsApp Business Platform", note: "Inbound and outbound messaging" },
      { name: "Calendar", note: "Appointment and meeting scheduling" },
      { name: "Email / SMTP", note: "Notifications and escalation alerts" },
      { name: "Webhooks", note: "Push events into your own systems" },
      { name: "Document sources", note: "Business knowledge for retrieval" },
    ],
    architecture: [
      {
        layer: "Channel",
        detail: "WhatsApp webhook ingress, message queue and delivery workers.",
      },
      {
        layer: "Application",
        detail: "CRM, pipeline, conversation store and the agent runtime.",
      },
      {
        layer: "Knowledge",
        detail: "Indexed business documents retrieved at answer time.",
      },
      {
        layer: "Data",
        detail: "Relational store on a persistent volume, separate from the image.",
      },
      {
        layer: "Operations",
        detail: "Health endpoints, configuration validation and backup hooks.",
      },
    ],
    security: [
      "Runs entirely on infrastructure you control — conversation data does not pass through BotLane.",
      "Secrets are supplied at runtime through environment configuration, never baked into an image.",
      "Configuration is validated at startup, so a misconfigured deployment fails closed rather than serving traffic.",
    ],
    supportPolicy:
      "Support scope depends on how the system is deployed. Self-hosted licences include documentation and release notes. BotLane Deploy adds installation and handover support. BotLane Managed covers ongoing operation, monitoring and updates.",
    license: {
      product: "BotLane package licence (commercial)",
      upstream: "See the DeskcommCRM repository for upstream terms",
    },
    releases: [],
    docs: standardDocs,
    faq: [
      {
        question: "Can I run this without BotLane involved at all?",
        answer:
          "Yes. Self-hosting is a first-class path — you get the release package, images, configuration templates and documentation, and you run it on your own infrastructure. BotLane Deploy and BotLane Managed are options, not requirements.",
      },
      {
        question: "Did BotLane write this software?",
        answer:
          "No. It is a BotLane Distribution built on DeskcommCRM, pinned at v1.12.0. BotLane packages, tests, hardens, documents and supports it. The upstream project belongs to its own authors and keeps its own licence.",
      },
      {
        question: "Why not just clone the upstream repository?",
        answer:
          "You can. What BotLane adds is everything between a repository and a system a business can depend on: a pinned tested release, installation tooling, configuration validation, secrets handling, health checks, backup and restore, an upgrade and rollback path, and documentation. Those are the twelve release gates listed on this page.",
      },
      {
        question: "Where does my conversation data live?",
        answer:
          "On your infrastructure. The system stores conversations and CRM records in its own database on a persistent volume you control.",
      },
      {
        question: "What if we need it to work differently?",
        answer:
          "BotLane Custom covers modifications, additional integrations and custom workflows on top of the packaged system.",
      },
    ],
    deployment: ["self-host", "botlane-deploy", "botlane-managed"],
    gates: {
      ...noGates,
      pinnedProvenance: true,
      installer: true,
      dockerImages: true,
      configValidation: true,
      secretsHandling: true,
      healthChecks: true,
      documentation: true,
    },
    upstream: {
      project: "DeskcommCRM",
      license: "See upstream repository",
      pinnedVersion: "v1.12.0",
    },
    tech: {
      docker: true,
      minCpu: "2 vCPU",
      minRam: "4 GB",
      minDisk: "40 GB",
      supportedOs: ["Ubuntu 22.04+", "Debian 12+"],
      distributionVersion: "0.1.0-rc",
    },
    featured: true,
  },

  {
    slug: "client-status-report-agent",
    name: "BotLane Client Status Report Agent",
    shortName: "Client Status Report Agent",
    categorySlug: "professional-services",
    classification: "original",
    outcome:
      "Weekly client reports assembled from your own systems, approved in Slack, and delivered as PDF without anyone writing them.",
    description:
      "Client reporting is the work nobody schedules and everybody does late. This system aggregates the week's activity from the tools you already run, drafts the report, and posts it into Slack for a human to edit and approve before it goes anywhere near a client.",
    capabilities: [
      "Data aggregation",
      "Report generation",
      "Slack approval",
      "Slack editing",
      "Weekly scheduling",
      "PDF export",
    ],
    audience: [
      "Agencies and consultancies reporting to retained clients",
      "Professional services teams with recurring status obligations",
      "Anyone whose weekly report is assembled by hand every Friday",
    ],
    useCases: [
      {
        title: "Weekly retained-client reporting",
        body: "A scheduled run assembles each client's week and posts the draft for approval before the deadline rather than after it.",
      },
      {
        title: "Approval without leaving Slack",
        body: "Reviewers edit and approve in the channel they already sit in, so approval is not another tool to log into.",
      },
    ],
    howItWorks: [
      {
        title: "Aggregate",
        body: "On schedule, the system pulls the period's activity from the configured sources.",
      },
      {
        title: "Draft",
        body: "It generates the report against your template and posts it to the review channel.",
      },
      {
        title: "Approve",
        body: "A human edits inline and approves in Slack. Nothing leaves without that step.",
      },
      {
        title: "Deliver",
        body: "The approved report is exported to PDF and delivered.",
      },
    ],
    integrations: [
      { name: "Slack", note: "Review, editing and approval" },
      { name: "Scheduler", note: "Recurring report runs" },
      { name: "PDF export", note: "Client-ready output" },
    ],
    architecture: [
      { layer: "Ingest", detail: "Scheduled collectors against your configured sources." },
      { layer: "Generation", detail: "Template-driven report assembly." },
      { layer: "Approval", detail: "Slack interaction handler with an explicit human gate." },
      { layer: "Output", detail: "PDF rendering and delivery." },
    ],
    security: [
      "Self-hosted — client data stays on your infrastructure.",
      "No report is delivered without an explicit human approval step.",
    ],
    supportPolicy:
      "Self-hosted licences include documentation and release notes. Deployment and ongoing operation are available as BotLane services.",
    license: { product: "BotLane package licence (commercial)" },
    releases: [],
    docs: standardDocs,
    faq: [
      {
        question: "Can it send reports without human approval?",
        answer:
          "The approval step is deliberate and central to the design. A report is drafted automatically; a person approves it.",
      },
      {
        question: "Which data sources does it support?",
        answer:
          "Sources are configured per deployment. Additional collectors are BotLane Custom work.",
      },
    ],
    deployment: ["self-host", "botlane-deploy", "botlane-managed"],
    gates: {
      ...noGates,
      pinnedProvenance: true,
      installer: true,
      dockerImages: true,
      configValidation: true,
      documentation: true,
    },
    tech: {
      docker: true,
      minCpu: "1 vCPU",
      minRam: "2 GB",
      supportedOs: ["Ubuntu 22.04+"],
      distributionVersion: "0.1.0-alpha",
    },
    featured: true,
  },

  /* ---------------------------------------------------------------------
   * Systems below are announced but not yet in productization. They carry
   * only what is actually known — the product template omits every section
   * there is no content for rather than inventing it.
   * ------------------------------------------------------------------- */

  {
    slug: "ai-receptionist",
    name: "BotLane AI Receptionist",
    shortName: "AI Receptionist",
    categorySlug: "customer-support",
    classification: "original",
    outcome:
      "Answer every inbound customer conversation, book the appointment, and escalate to a human only when it actually matters.",
    capabilities: [
      "Conversation handling",
      "Appointment booking",
      "FAQ resolution",
      "Caller qualification",
      "Human escalation",
    ],
    deployment: ["self-host", "botlane-deploy", "botlane-managed"],
    gates: noGates,
    tech: { docker: true },
    docs: standardDocs,
    featured: true,
  },

  {
    slug: "ai-it-helpdesk",
    name: "BotLane AI IT Helpdesk",
    shortName: "AI IT Helpdesk",
    categorySlug: "it-service-management",
    classification: "original",
    outcome:
      "Give internal IT a service desk that triages, drafts and resolves — with approval gates on anything that touches production.",
    capabilities: [
      "Ticket triage",
      "Suggested responses",
      "Knowledge retrieval",
      "Tool execution",
      "Approval-gated actions",
      "Automated QA",
      "Helpdesk analytics",
    ],
    deployment: ["self-host", "botlane-deploy", "botlane-managed"],
    gates: noGates,
    tech: { docker: true },
    docs: standardDocs,
    featured: true,
  },

  {
    slug: "ai-back-office",
    name: "BotLane AI Back Office",
    shortName: "AI Back Office",
    categorySlug: "operations",
    classification: "original",
    outcome:
      "One operational system across CRM, support, finance and internal workflows — instead of five tools and a spreadsheet holding them together.",
    capabilities: [
      "CRM",
      "Support desk",
      "Finance workflows",
      "Internal automation",
      "Cross-function reporting",
    ],
    deployment: ["self-host", "botlane-deploy", "botlane-managed"],
    gates: noGates,
    tech: { docker: true },
    docs: standardDocs,
    featured: true,
  },

  {
    slug: "ai-legal-practice-os",
    name: "BotLane AI Legal Practice OS",
    shortName: "AI Legal Practice OS",
    categorySlug: "legal",
    classification: "original",
    outcome:
      "Run a legal practice on one system — intake through conflict checks, drafting, deadlines and billing, with the matter file as the spine.",
    capabilities: [
      "Matter management",
      "Client intake",
      "Conflict checks",
      "Document workflows",
      "Drafting assistance",
      "Deadline tracking",
      "Billing",
    ],
    deployment: ["self-host", "botlane-deploy", "botlane-managed"],
    gates: noGates,
    tech: { docker: true },
    docs: standardDocs,
    featured: true,
  },
];

export const featuredSystems = systems.filter((s) => s.featured);
export const systemBySlug = (slug: string) => systems.find((s) => s.slug === slug);
export const systemCountByCategory = (categorySlug: string) =>
  systems.filter((s) => s.categorySlug === categorySlug).length;
export const relatedSystems = (system: AiSystem, limit = 3) =>
  systems
    .filter((s) => s.slug !== system.slug)
    .sort((a, b) => {
      const aMatch = a.categorySlug === system.categorySlug ? 0 : 1;
      const bMatch = b.categorySlug === system.categorySlug ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, limit);
