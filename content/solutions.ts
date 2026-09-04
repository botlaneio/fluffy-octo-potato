import type { Solution } from "@/lib/types";
import { systems, systemBySlug } from "./systems";
import { gatesPassed, deriveStatus } from "@/lib/status";

/**
 * Solutions are outcomes; systems are software. A solution references systems
 * by slug and never restates what they do, so the two can never disagree.
 *
 * Nothing here claims a result, a time saving or a percentage. Those would be
 * customer outcomes BotLane has not measured, and the trust page says we do not
 * publish figures we cannot evidence.
 */

export const solutions: Solution[] = [
  {
    slug: "automate-sales-operations",
    name: "Automate sales operations",
    headline: "Stop losing deals in an inbox nobody owns.",
    lead: "Capture every inbound enquiry, qualify it before a rep sees it, and keep the follow-up running against a record rather than someone's memory.",
    situation: [
      "Enquiries arrive on WhatsApp and live on one person's phone.",
      "Nobody can say how many leads came in last week, or what happened to them.",
      "Follow-up happens when someone remembers, which is to say sometimes.",
      "The CRM is filled in retrospectively, if at all.",
    ],
    changes: [
      {
        title: "Every enquiry is captured",
        body: "Inbound messages land in a system rather than a device, with the full thread attached to a record from the first reply.",
      },
      {
        title: "Qualification happens before a human",
        body: "Your criteria are asked and scored automatically, so the pipeline a rep opens contains leads worth their time.",
      },
      {
        title: "Follow-up runs on schedule",
        body: "Sequences fire against the record and stop the moment a human replies.",
      },
      {
        title: "The pipeline is real",
        body: "Stage, source and history are recorded as a side effect of the conversation, not as an afternoon of data entry.",
      },
    ],
    systemSlugs: ["ai-whatsapp-sales-desk", "ai-back-office"],
    services: [
      {
        slug: "deploy",
        reason: "WhatsApp Business Platform access, number provisioning and CRM configuration are the fiddly parts of the install.",
      },
      {
        slug: "custom",
        reason: "Qualification logic and pipeline stages usually need to match how you already sell.",
      },
    ],
    steps: [
      {
        title: "Start with the channel",
        body: "Deploy the sales desk against your existing WhatsApp number, so history and identity stay put.",
      },
      {
        title: "Encode your qualification",
        body: "The questions a good rep asks become the questions the system asks, in your order.",
      },
      {
        title: "Connect the pipeline",
        body: "Stages, owners and handoff rules matched to how your team actually works.",
      },
      {
        title: "Add the back office when you need it",
        body: "Support, finance and internal workflows join later, on the same infrastructure.",
      },
    ],
    faq: [
      {
        question: "Do we have to change our WhatsApp number?",
        answer:
          "No. The deployment targets the number you already publish, which is the whole point — your customers should not notice an infrastructure change.",
      },
      {
        question: "What happens to conversations a human should handle?",
        answer:
          "They escalate with the whole thread, the qualification result and the record attached. Handoff is a designed step, not a failure mode.",
      },
    ],
    featured: true,
  },

  {
    slug: "automate-customer-support",
    name: "Automate customer support",
    headline: "Answer everyone, escalate the ones that matter.",
    lead: "Front-line conversations, bookings and FAQs handled continuously, with a human brought in when the situation actually needs one.",
    situation: [
      "Enquiries arrive faster than the team can answer them, and the backlog is the first thing everyone sees each morning.",
      "The same twenty questions consume most of the day.",
      "Out-of-hours enquiries are answered the next working day, or not at all.",
      "Nobody has time to write the knowledge base that would fix it.",
    ],
    changes: [
      {
        title: "Coverage stops depending on staffing",
        body: "Conversations are answered when they arrive rather than when someone is at a desk.",
      },
      {
        title: "Routine questions stop reaching people",
        body: "Answers come from your documents, so they are your answers rather than a model's improvisation.",
      },
      {
        title: "Bookings happen inside the conversation",
        body: "Appointments are made where the customer already is, not on a form they have to be sent to.",
      },
      {
        title: "Escalation carries context",
        body: "When a person takes over, they inherit the thread rather than asking the customer to start again.",
      },
    ],
    systemSlugs: ["ai-receptionist", "ai-back-office"],
    services: [
      {
        slug: "deploy",
        reason: "Channel setup, knowledge ingestion and escalation routing are configuration-heavy.",
      },
      {
        slug: "managed",
        reason: "A support system that goes down at 2am is a support problem, which is exactly what you were trying to solve.",
      },
    ],
    steps: [
      {
        title: "Feed it what you know",
        body: "Existing documents, policies and pricing become the knowledge the system answers from.",
      },
      {
        title: "Define the escalation line",
        body: "Which situations must reach a person, and how quickly. This is a business decision, not a technical one.",
      },
      {
        title: "Run it alongside the team",
        body: "Start with the system drafting and a person sending, then loosen that as it earns trust.",
      },
    ],
    featured: true,
  },

  {
    slug: "modernize-internal-it",
    name: "Modernize internal IT support",
    headline: "A service desk that resolves, not just records.",
    lead: "Ticket triage, drafted responses and knowledge retrieval for internal IT — with approval gates on anything that touches production.",
    situation: [
      "Tickets are triaged by whoever opens the queue first.",
      "The same fixes are rediscovered every few weeks because nobody wrote them down.",
      "Half the queue is access requests that could be automated if anyone had time.",
      "Nobody trusts automation near production, and they are right to be careful.",
    ],
    changes: [
      {
        title: "Triage stops being manual",
        body: "Tickets are classified, prioritised and routed on arrival rather than on inspection.",
      },
      {
        title: "Answers are drafted, not invented",
        body: "Responses draw on your runbooks and past resolutions, and a person approves before they go out.",
      },
      {
        title: "Actions are gated",
        body: "Anything that changes a system requires explicit approval. The gate is a feature, not a limitation.",
      },
      {
        title: "The queue becomes legible",
        body: "What comes in, what recurs and what takes longest are measurable rather than anecdotal.",
      },
    ],
    systemSlugs: ["ai-it-helpdesk"],
    services: [
      {
        slug: "deploy",
        reason: "Identity, ticket source and tool permissions need wiring carefully — this system can act, so its access matters.",
      },
      {
        slug: "custom",
        reason: "The tools it may execute against, and the approvals required for each, are specific to your estate.",
      },
    ],
    steps: [
      {
        title: "Start read-only",
        body: "Triage and drafting first, with no ability to change anything. Trust is earned in this order for a reason.",
      },
      {
        title: "Add tools behind approvals",
        body: "Each action the system may take is added deliberately, with an approver named.",
      },
      {
        title: "Loosen where it has earned it",
        body: "Low-risk, high-volume actions move to automatic once the QA record supports it.",
      },
    ],
    featured: true,
  },

  {
    slug: "ai-back-office",
    name: "Build an AI back office",
    headline: "One operational system instead of five tools and a spreadsheet.",
    lead: "CRM, support, finance and internal workflows on a single system you host, so the joins between them stop being manual.",
    situation: [
      "Each function runs a different tool, and the joins between them are a person copying things.",
      "Reporting means exporting from three places and reconciling by hand.",
      "Adding a step to a process means adding it in several systems, or forgetting to.",
      "Per-seat costs across the stack have grown faster than the team.",
    ],
    changes: [
      {
        title: "One record, several functions",
        body: "A customer is the same record in sales, support and finance rather than three records that resemble each other.",
      },
      {
        title: "Workflows cross functions",
        body: "A process can span sales and finance without an export step in the middle.",
      },
      {
        title: "Reporting stops being archaeology",
        body: "Cross-function numbers come from one place, so they agree.",
      },
      {
        title: "The data is yours",
        body: "It runs on your infrastructure, which changes what you can do with it and what it costs to keep.",
      },
    ],
    systemSlugs: ["ai-back-office", "client-status-report-agent"],
    services: [
      {
        slug: "deploy",
        reason: "Migrating from existing tools is the hard part, and it is rarely just an import.",
      },
      {
        slug: "managed",
        reason: "A system this central to operations is the wrong thing to have nobody watching.",
      },
      {
        slug: "custom",
        reason: "The workflows that make it yours are, definitionally, not in the box.",
      },
    ],
    steps: [
      {
        title: "Pick the function that hurts most",
        body: "Replace one tool properly rather than all of them badly. The others follow once the pattern is proven.",
      },
      {
        title: "Migrate with the old system still running",
        body: "Parallel running until the new records are trusted, not a weekend cutover.",
      },
      {
        title: "Join the next function",
        body: "Each addition costs less than the last, because the data and the deployment are already there.",
      },
    ],
    featured: true,
  },

  {
    slug: "automate-client-reporting",
    name: "Automate client reporting",
    headline: "Reports that write themselves and still get approved by a human.",
    lead: "Weekly client reports assembled from your own systems, edited and approved in Slack, delivered as PDF — without anyone losing a Friday.",
    situation: [
      "Reporting is assembled by hand every week, usually late.",
      "Each account manager formats it slightly differently.",
      "The data comes from three tools and the numbers occasionally disagree.",
      "Clients notice when a report slips, and it is the cheapest possible way to look disorganised.",
    ],
    changes: [
      {
        title: "Assembly stops being manual",
        body: "The week's activity is pulled from the systems that already hold it, on schedule.",
      },
      {
        title: "Approval stays human",
        body: "Nothing reaches a client without a person reading and approving it, in the channel they already sit in.",
      },
      {
        title: "Format stops drifting",
        body: "One template across accounts, so reports look like they came from one company.",
      },
      {
        title: "Fridays come back",
        body: "The work becomes reviewing a draft rather than producing one.",
      },
    ],
    systemSlugs: ["client-status-report-agent", "ai-back-office"],
    services: [
      {
        slug: "custom",
        reason: "The data sources and the report template are specific to your delivery model — collectors are usually custom work.",
      },
      {
        slug: "deploy",
        reason: "Slack app installation, scheduling and source credentials are a short, well-defined install.",
      },
    ],
    steps: [
      {
        title: "Agree the template first",
        body: "What a good report contains is a business decision. Automating a bad template just produces bad reports faster.",
      },
      {
        title: "Connect the sources",
        body: "The tools that already hold the week's activity become the inputs.",
      },
      {
        title: "Keep the approval gate",
        body: "Drafts go to a channel, a person edits and approves, and only then does anything reach a client.",
      },
    ],
    featured: true,
  },

  {
    slug: "private-company-ai",
    name: "Deploy private company AI",
    headline: "AI on your infrastructure, with your data staying there.",
    lead: "For businesses whose data cannot sit in someone else's product — regulated work, client confidentiality, or simply a policy you intend to keep.",
    situation: [
      "Staff are already pasting company information into consumer AI tools.",
      "A vendor's data-processing terms are the only thing standing between you and a disclosure you would have to report.",
      "Procurement asks where the data goes, and the honest answer is complicated.",
      "You want the capability without the dependency.",
    ],
    changes: [
      {
        title: "Data stays on infrastructure you own",
        body: "Systems run in your accounts, so business data does not pass through BotLane.",
      },
      {
        title: "Access is yours to define",
        body: "Who can use what, and what the system may act on, is configured by you rather than negotiated with a vendor.",
      },
      {
        title: "The supply chain is inspectable",
        body: "Pinned upstream versions, published checksums and a documented release process — you can see what you are running.",
      },
      {
        title: "Leaving is possible",
        body: "Self-hostable releases and documentation written for someone who is not BotLane. The exit is designed in.",
      },
    ],
    systemSlugs: ["ai-back-office", "ai-it-helpdesk", "ai-whatsapp-sales-desk"],
    services: [
      {
        slug: "deploy",
        reason: "Network boundaries, TLS, secrets handling and access scoping are where private deployments are won or lost.",
      },
      {
        slug: "managed",
        reason: "Operating it without handing over ownership — access scoped to what running the system requires, written into the agreement.",
      },
    ],
    steps: [
      {
        title: "Decide what must never leave",
        body: "The boundary is a policy question first. The architecture follows it.",
      },
      {
        title: "Deploy inside that boundary",
        body: "Systems run on your infrastructure, in your accounts, under your billing.",
      },
      {
        title: "Give people something better than the shadow tool",
        body: "Adoption only holds if the sanctioned system is genuinely more useful than the one people are already using unofficially.",
      },
    ],
    faq: [
      {
        question: "Does the model itself run on our infrastructure?",
        answer:
          "That depends on the system and the model you choose. Systems run on your infrastructure; whether inference is local or via a provider is a configuration decision, and each system's page states what it supports. We would rather say that plainly than imply everything is local.",
      },
      {
        question: "Can you help us evidence this for procurement?",
        answer:
          "The trust page sets out how releases are gated, how provenance is pinned and how licensing works across classifications, and each system publishes its own gate status. What we will not do is claim a certification we do not hold.",
      },
    ],
    featured: true,
  },
];

export const solutionBySlug = (slug: string) =>
  solutions.find((s) => s.slug === slug);

export const solutionSystems = (solution: Solution) =>
  solution.systemSlugs
    .map((slug) => systemBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

/**
 * A solution is only as ready as the systems behind it. Derived, never
 * authored — the index cannot advertise a solution as available while every
 * system it needs sits at zero gates.
 */
export function solutionReadiness(solution: Solution) {
  const referenced = solutionSystems(solution);
  const best = referenced.reduce(
    (max, system) => Math.max(max, gatesPassed(system.gates)),
    0,
  );
  const anyReady = referenced.some(
    (system) => deriveStatus(system) === "production-ready",
  );
  return { count: referenced.length, best, anyReady };
}

export const solutionsUsingSystem = (systemSlug: string) =>
  solutions.filter((s) => s.systemSlugs.includes(systemSlug));

export const relatedSolutions = (solution: Solution, limit = 3) =>
  solutions.filter((s) => s.slug !== solution.slug).slice(0, limit);

/**
 * A typo in `systemSlugs` would silently render a thinner page rather than an
 * error, so it fails the build instead. Cheap to run, and it only fires while
 * someone is editing content.
 */
const orphanedSystemRefs = solutions.flatMap((solution) =>
  solution.systemSlugs
    .filter((slug) => !systems.some((system) => system.slug === slug))
    .map((slug) => `${solution.slug} → ${slug}`),
);

if (orphanedSystemRefs.length > 0) {
  throw new Error(
    `Solution references unknown system slug(s): ${orphanedSystemRefs.join(", ")}`,
  );
}
