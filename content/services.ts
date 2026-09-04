import type { FaqEntry, TitledEntry } from "@/lib/types";

/**
 * Deploy and Managed are the same shape of page filled with different content,
 * so they cannot drift into two unrelated pitches. Custom gets the same
 * treatment when it is built.
 *
 * Nothing here states a price, a response time, or an uptime figure. Those are
 * commitments BotLane has no mechanism to keep yet, and inventing one on a
 * services page is exactly the kind of claim /trust says we do not make.
 */

export interface ResponsibilityRow {
  path: string;
  yours: string;
  ours: string;
}

export type ServiceSlug = "deploy" | "managed" | "custom";

export interface ServiceDefinition {
  slug: ServiceSlug;
  /** Eyebrow dot colour. Explicit, so the template holds no per-slug logic. */
  accent: "blue" | "emerald" | "amber" | "violet" | "rose" | "cyan";
  eyebrow: string;
  name: string;
  headline: string;
  lead: string;
  /** What kind of commercial engagement this is — stated before anything else. */
  shape: string;
  phasesTitle: string;
  phasesLead: string;
  phases: TitledEntry[];
  deliverablesTitle: string;
  deliverables: string[];
  prerequisitesTitle: string;
  prerequisites: string[];
  boundaryLead: string;
  notIncluded: { label: string; body: string; href: string; linkLabel: string }[];
  responsibility: ResponsibilityRow[];
  pricingNote: string;
  faq: FaqEntry[];
  /** Where this service hands off next. */
  crossLink: { heading: string; body: string; href: string; label: string };

  /* Optional sections. A service that has nothing to put here renders no
     empty shell — the same rule the product template follows. */
  variantsTitle?: string;
  variantsLead?: string;
  variants?: TitledEntry[];
  whenNotTitle?: string;
  whenNotLead?: string;
  whenNot?: string[];
}

export const deployService: ServiceDefinition = {
  slug: "deploy",
  accent: "amber",
  eyebrow: "BotLane Deploy",
  name: "BotLane Deploy",
  headline: "We install it, configure it, and hand you the keys.",
  lead: "A fixed-scope engagement that ends with a running system on your infrastructure, validated against its release gates and documented well enough for your team to take over.",
  shape: "A one-off engagement with a defined end, not a retainer. When the handover is signed off, the system is yours to run — unless you decide you would rather we did.",

  phasesTitle: "What the engagement looks like",
  phasesLead:
    "Six stages. You always know which one you are in, and each ends with something you can inspect.",
  phases: [
    {
      title: "Scope and prerequisites",
      body: "We agree which system, which environment, and which integrations. You get the prerequisite list up front rather than discovering it mid-install.",
    },
    {
      title: "Infrastructure setup",
      body: "Host provisioning, container runtime, storage, TLS termination and network rules on infrastructure you own.",
    },
    {
      title: "Installation and configuration",
      body: "The pinned release is installed and configured, with secrets supplied at runtime and configuration validated before the system accepts traffic.",
    },
    {
      title: "Integrations",
      body: "The system is wired into the tools and data it needs — the channels, the calendar, the notification path, whatever the system's page lists.",
    },
    {
      title: "Acceptance validation",
      body: "We run the system's acceptance suite and walk its primary workflows with you. You see the results, not a summary of them.",
    },
    {
      title: "Documented handover",
      body: "Credentials transferred, configuration written down, runbook walked through with a named owner on your side. The engagement ends here on purpose.",
    },
  ],

  deliverablesTitle: "What you have at handover",
  deliverables: [
    "A running system on infrastructure you own and control",
    "Configuration documented, including every value that was set and why",
    "An operational runbook covering health, backup, restore, upgrade and rollback",
    "Acceptance results from the system's own test suite",
    "All credentials and access transferred to your named owner",
    "A written record of the exact release version deployed",
  ],

  prerequisitesTitle: "What we need from you",
  prerequisites: [
    "Infrastructure to deploy onto — your cloud account or your hardware",
    "DNS control for the hostname the system will run on",
    "Credentials for the integrations the system connects to",
    "A named owner who will hold the system after handover",
    "Someone available to walk the acceptance workflows with us",
  ],

  boundaryLead:
    "Deploy ends at handover. Two things sit outside it, and both have their own page rather than being quietly bundled into a quote.",
  notIncluded: [
    {
      label: "Running it afterwards",
      body: "Monitoring, updates, backups and maintenance are BotLane Managed. Deploy hands you a system; Managed keeps it running.",
      href: "/managed",
      linkLabel: "BotLane Managed",
    },
    {
      label: "Changing what it does",
      body: "New features, additional integrations or workflow changes beyond the packaged system are BotLane Custom.",
      href: "/custom",
      linkLabel: "BotLane Custom",
    },
  ],

  responsibility: [
    {
      path: "Before handover",
      yours: "Infrastructure access, integration credentials, availability for acceptance.",
      ours: "Provisioning, installation, configuration, integration, validation, documentation.",
    },
    {
      path: "After handover",
      yours: "Running the system — monitoring, backups, upgrades, support for your users.",
      ours: "The release, the documentation and the release feed. Nothing further unless you add Managed.",
    },
  ],

  crossLink: {
    heading: "Want us to keep running it afterwards?",
    body: "Managed picks up where Deploy hands over — monitoring, updates, backups and maintenance.",
    href: "/managed",
    label: "BotLane Managed",
  },

  pricingNote:
    "Scoped per system and per environment, because a single-host install and a multi-environment rollout are not the same job. We quote against the prerequisite list, not a page rate — ask and we will scope it.",

  faq: [
    {
      question: "Do I have to use Deploy to run a BotLane system?",
      answer:
        "No. Self-hosting is the default path and the documentation is written for someone who is not BotLane. Deploy exists because some teams would rather buy the install than schedule it.",
    },
    {
      question: "Can you deploy onto our existing Kubernetes cluster?",
      answer:
        "Systems ship as Docker/OCI images with Compose deployment as the supported default. Deploying onto an existing orchestrator is in scope but is scoped separately, since it depends on your cluster rather than on the system.",
    },
    {
      question: "What happens if the system needs changes during the deployment?",
      answer:
        "Configuration and integration work is part of Deploy. Anything that changes what the software does is Custom work, and we will say so at the time rather than absorbing it silently and calling it scope.",
    },
    {
      question: "Who owns the infrastructure?",
      answer:
        "You do. Deploy puts the system on infrastructure in your accounts, under your billing, with credentials transferred to you at handover.",
    },
  ],
};

export const managedService: ServiceDefinition = {
  slug: "managed",
  accent: "cyan",
  eyebrow: "BotLane Managed",
  name: "BotLane Managed",
  headline: "We run it. You use it.",
  lead: "Monitoring, updates, backups and maintenance handled by the people who packaged the system — so the thing you bought stays running without becoming somebody's second job.",
  shape: "An ongoing arrangement with a monthly cost and a notice period. It sits on top of a deployed system; it does not replace one.",

  phasesTitle: "How it works",
  phasesLead:
    "Onboarding, then steady state. The interesting part is what happens when something changes.",
  phases: [
    {
      title: "Onboarding",
      body: "We take over an existing deployment or deploy it first. Access is scoped to what operating the system actually requires, and that scope is written into the agreement.",
    },
    {
      title: "Monitoring",
      body: "Health endpoints and system metrics are watched continuously. You are told about a problem by us, not by your customers.",
    },
    {
      title: "Updates",
      body: "New releases are applied on an agreed cadence, with the release notes shared before the upgrade rather than after it.",
    },
    {
      title: "Backups",
      body: "Backups run on schedule and restores are tested periodically. A backup nobody has restored is a hypothesis, not a backup.",
    },
    {
      title: "Change requests",
      body: "Configuration changes, new integrations and workflow adjustments are requested through a single channel and tracked to completion.",
    },
    {
      title: "Reporting",
      body: "A regular written account of what ran, what was updated, what broke and what was done about it.",
    },
  ],

  deliverablesTitle: "What Managed covers",
  deliverables: [
    "Continuous health and availability monitoring",
    "Version updates and security patches on an agreed cadence",
    "Scheduled backups with periodically tested restores",
    "Upgrade and rollback execution, including the decision not to upgrade",
    "Configuration changes on request",
    "A named operational contact and a single support channel",
    "Regular written reporting on what happened and why",
  ],

  prerequisitesTitle: "What we need from you",
  prerequisites: [
    "A deployed system — either yours or one BotLane deployed",
    "Scoped operational access to the infrastructure it runs on",
    "A named business owner who can approve changes",
    "Somewhere to send reports and escalations",
  ],

  boundaryLead:
    "Managed keeps a system running well. It does not change what the system does, and it does not make BotLane the owner of your infrastructure.",
  notIncluded: [
    {
      label: "New functionality",
      body: "Features, integrations and workflows beyond the packaged system are BotLane Custom, quoted separately.",
      href: "/custom",
      linkLabel: "BotLane Custom",
    },
    {
      label: "Your infrastructure bill",
      body: "The system runs in your accounts under your billing. Managed is the operation of it, not the hosting of it.",
      href: "/developers#requirements",
      linkLabel: "Requirements",
    },
  ],

  responsibility: [
    {
      path: "Day to day",
      yours: "Using the system and deciding what it should do.",
      ours: "Monitoring, updates, backups, maintenance and operational support.",
    },
    {
      path: "When something breaks",
      yours: "Telling us anything you saw that we could not, and approving changes that affect the business.",
      ours: "Diagnosis, fix or rollback, and a written account of what happened.",
    },
    {
      path: "When something changes",
      yours: "Requesting it through the agreed channel.",
      ours: "Assessing it, saying whether it is Managed scope or Custom work, and doing it or quoting it.",
    },
  ],

  crossLink: {
    heading: "Not deployed yet?",
    body: "Deploy installs and configures the system first, then Managed keeps it running.",
    href: "/deploy",
    label: "BotLane Deploy",
  },

  pricingNote:
    "Priced monthly against the systems under management and the environments they run in. We do not publish an uptime figure or a response-time target yet, because we have no production history to back one — see the trust page for what that means. When we can evidence a number, it will appear in the agreement.",

  faq: [
    {
      question: "Do you publish an SLA?",
      answer:
        "Not yet. No BotLane system has closed all twelve release gates or accumulated production history, so any uptime or response-time figure would be invented. Commitments are agreed in writing per engagement, and a published SLA will follow real operating data rather than precede it.",
    },
    {
      question: "Where does the system run under Managed?",
      answer:
        "On infrastructure you own, in your accounts, under your billing. Our access is scoped to what operating the system requires and is set out in the agreement.",
    },
    {
      question: "Can we take it back in-house later?",
      answer:
        "Yes, and the documentation is written for exactly that. The system is a self-hostable release either way — Managed is an operational arrangement, not a lock-in mechanism.",
    },
    {
      question: "What if we only want updates, not full management?",
      answer:
        "Say so when we scope it. The line between what you keep and what we take is written into the agreement rather than assumed.",
    },
  ],
};

export const customService: ServiceDefinition = {
  slug: "custom",
  accent: "violet",
  eyebrow: "BotLane Custom",
  name: "BotLane Custom",
  headline: "When the packaged system isn't enough.",
  lead: "Modifications, integrations, custom workflows, or a system built from scratch — specified in writing, quoted against that specification, and delivered as code you own.",
  shape: "Scoped project work with a written specification and a fixed quote. It can extend a BotLane system or stand alone.",

  variantsTitle: "Four kinds of work",
  variantsLead:
    "Most requests are one of these. The first three build on a packaged system; the fourth starts from nothing.",
  variants: [
    {
      title: "Modify a system",
      body: "Change how a packaged system behaves for your business — different qualification logic, a different pipeline shape, a different approval path.",
    },
    {
      title: "Build an integration",
      body: "Connect a system to something the catalogue does not cover: your ERP, your telephony, an internal API nobody outside your company has heard of.",
    },
    {
      title: "Custom workflows",
      body: "Encode the process your business actually runs, instead of reshaping the business around a generic one.",
    },
    {
      title: "A bespoke system",
      body: "When nothing off the shelf fits, BotLane builds one — and it passes the same twelve release gates as anything in the catalogue before it is called production ready.",
    },
  ],

  phasesTitle: "How a custom engagement runs",
  phasesLead:
    "Specification first. A quote written against a conversation is a guess with an invoice attached.",
  phases: [
    {
      title: "Discovery",
      body: "What the business actually needs, which is not always the feature that was asked for. This is where most of the money is saved.",
    },
    {
      title: "Written specification",
      body: "Behaviour, acceptance criteria, and what is explicitly out of scope — agreed before any code is written.",
    },
    {
      title: "Fixed quote",
      body: "Priced against the specification. A change to the spec produces a revised quote in writing before work continues, rather than a surprise at the end.",
    },
    {
      title: "Build",
      body: "With review checkpoints where you see working software, not a status update describing software.",
    },
    {
      title: "Acceptance",
      body: "Tested against the criteria in the specification, by you. The criteria were agreed at the start precisely so this step is not a negotiation.",
    },
    {
      title: "Handover",
      body: "Source, tests, documentation, a deployment path into your existing system, and a note on what this does to future upgrades.",
    },
  ],

  deliverablesTitle: "What you get",
  deliverables: [
    "Source code in your repository, under your ownership",
    "The written specification the work was accepted against",
    "Automated tests covering the behaviour that was built",
    "Documentation for operating and changing it",
    "A deployment path into your existing system, not a second thing to run",
    "An upgrade compatibility note: what this costs you at the next upstream release",
  ],

  prerequisitesTitle: "What we need from you",
  prerequisites: [
    "A decision-maker who can settle scope questions without convening a committee",
    "Access to the system or environment the work targets",
    "Acceptance criteria you are willing to be held to as firmly as we are",
    "Real examples of the data and the edge cases, not the tidy version",
  ],

  boundaryLead:
    "Custom work extends a system. Two things sit outside it, and both cost money elsewhere rather than being folded silently into a quote.",
  notIncluded: [
    {
      label: "Running it afterwards",
      body: "Operating the result — monitoring, updates, backups — is BotLane Managed. Custom builds it; Managed keeps it alive.",
      href: "/managed",
      linkLabel: "BotLane Managed",
    },
    {
      label: "The system itself",
      body: "Custom work modifies or extends a BotLane system. It does not include the licence for the system it is built on.",
      href: "/systems",
      linkLabel: "Browse systems",
    },
  ],

  whenNotTitle: "Before you ask for custom work",
  whenNotLead:
    "Customization keeps costing after the invoice is paid. These are the things we would say in the first call, so here they are before it.",
  whenNot: [
    "Every modification to a Distribution adds upgrade burden. When the upstream project moves, your changes have to move with it — and that cost recurs at every upgrade, not once.",
    "Configuration is cheaper than code. If a packaged system can be configured into the shape you need, we will tell you that rather than quote a build.",
    "A workflow that exists because of one person's habit is usually worth changing rather than encoding. We will say so once, and then build what you decide.",
    "If what you are asking for would help every customer, it may belong in the packaged system instead — where BotLane maintains it and you do not pay to carry it alone.",
    "A bespoke system is the most expensive option on this site. It is the right answer sometimes, and the wrong one more often than people expect.",
  ],

  responsibility: [
    {
      path: "Specification",
      yours: "Deciding what the business needs, and signing off the spec.",
      ours: "Turning that into acceptance criteria and explicit exclusions.",
    },
    {
      path: "Build",
      yours: "Availability at review checkpoints, and answers to scope questions.",
      ours: "Implementation, tests, documentation.",
    },
    {
      path: "After acceptance",
      yours: "Owning the code, and carrying it through upgrades unless Managed covers it.",
      ours: "The handover and the upgrade compatibility note.",
    },
  ],

  crossLink: {
    heading: "Want us to carry it through upgrades?",
    body: "Under Managed, custom work is maintained across releases rather than becoming your team's problem at the next upstream version.",
    href: "/managed",
    label: "BotLane Managed",
  },

  pricingNote:
    "Quoted fixed against the written specification rather than billed by the hour — you should not be paying for our estimating error. A change to the spec produces a revised quote in writing before work continues. No day rate is published, because the specification determines the price, not the calendar.",

  faq: [
    {
      question: "Do we own the code?",
      answer:
        "Yes. Custom work is delivered into your repository under your ownership. Where it modifies a BotLane Distribution, the upstream project's licence still governs the upstream code — we do not relicense work we did not write.",
    },
    {
      question: "What happens to our modifications when the system upgrades?",
      answer:
        "They have to be carried forward. At handover you get a written note on which parts are likely to conflict with future upstream changes and how expensive that is likely to be. Under BotLane Managed we carry them across upgrades; otherwise your team does. Either way, nobody should be surprised by it at the next release.",
    },
    {
      question: "Can you work on a system we did not get from BotLane?",
      answer:
        "Sometimes, depending on what it is and how it is built. We will say no if taking it on would mean guessing, rather than quoting for a discovery phase that ends in a shrug.",
    },
    {
      question: "How small can a piece of work be?",
      answer:
        "Small enough that writing a specification is still worth it. Below that line it is usually configuration, and we will point you at the setting instead of quoting for a build.",
    },
  ],
};

export const services = [deployService, managedService, customService];
