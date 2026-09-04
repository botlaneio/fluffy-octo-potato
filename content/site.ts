import type { DeploymentOption } from "@/lib/types";

/**
 * ---------------------------------------------------------------------------
 * CONTACT CONFIGURATION
 *
 * `contactEmail` is the only address printed anywhere on the site — it appears
 * on /contact, in the privacy policy's rights clause, and in the footer. If it
 * ever stops being monitored, change it here and every reference follows.
 *
 * `contactEndpoint` is empty by design. The site is a static export, so there
 * is no server to receive a form POST. Until this points at a real form
 * handler, /contact renders direct email routes instead of a form — a form
 * that silently drops enquiries is worse than no form at all.
 *
 * To turn the form on, set this to your handler URL (a form service, a
 * serverless function, your own endpoint) and the page renders it
 * automatically. Nothing else needs changing.
 * ---------------------------------------------------------------------------
 */
export const contactEmail = "admin@botlane.io";
export const contactEndpoint = "";

/**
 * ---------------------------------------------------------------------------
 * ACCOUNTS — off until there is something to sign in to.
 *
 * There is no auth backend and no customer accounts yet. While
 * `accountsEnabled` is false, the nav renders no "Sign in" link at all, so the
 * site ships no dead link; /signin still exists as a real route and explains
 * the position for anyone who arrives by bookmark or direct link.
 *
 * Set `accountsEnabled` to true and point `authEndpoint` at a real handler to
 * turn both the nav link and the sign-in form on.
 * ---------------------------------------------------------------------------
 */
export const accountsEnabled = false;
export const authEndpoint = "";

export const site = {
  name: "BotLane",
  domain: "botlane.io",
  legalName: "BotLane LLC",
  tagline: "Production-ready AI systems for real businesses.",
  description:
    "Production-ready AI software for sales, support, operations and professional services. Self-host it on your own infrastructure, or have BotLane deploy and operate it for you.",
} as const;

export const primaryNav = [
  { label: "AI Systems", href: "/systems" },
  { label: "Solutions", href: "/solutions" },
  { label: "Deploy", href: "/deploy" },
  { label: "Managed", href: "/managed" },
  { label: "Developers", href: "/developers" },
  { label: "Resources", href: "/resources" },
] as const;

export const deploymentOptions: DeploymentOption[] = [
  {
    id: "self-host",
    label: "Self-host",
    summary:
      "You run it. Complete control of the infrastructure, the data and the upgrade schedule.",
    audience: "For technical teams with their own infrastructure.",
    includes: [
      "Installable release package",
      "Docker / OCI images",
      "Deployment configuration templates",
      "Architecture and operations documentation",
      "Release feed and upgrade notes",
    ],
  },
  {
    id: "botlane-deploy",
    label: "BotLane Deploy",
    summary:
      "We install and configure it on your infrastructure, then hand you the keys.",
    audience: "For teams who want it running correctly from day one.",
    includes: [
      "Infrastructure setup",
      "Installation and configuration",
      "Integration with your existing stack",
      "Acceptance validation against the release gates",
      "Documented handover",
    ],
  },
  {
    id: "botlane-managed",
    label: "BotLane Managed",
    summary:
      "We operate it. Monitoring, updates, backups and maintenance stay with us.",
    audience: "For teams who want the outcome, not the operations.",
    includes: [
      "Monitoring and health checks",
      "Version updates and security patches",
      "Backup and restore management",
      "Ongoing maintenance",
      "Operational support",
    ],
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Choose a system",
    body: "Find production-ready software built for a specific business function, not a general-purpose assistant you have to teach.",
  },
  {
    step: "02",
    title: "Choose deployment",
    body: "Take the release package and run it yourself, or have BotLane install and configure it on your infrastructure.",
  },
  {
    step: "03",
    title: "Connect your stack",
    body: "Wire it into the tools, data and workflows the business already runs on. Integrations are part of the system, not an afterthought.",
  },
  {
    step: "04",
    title: "Run it",
    body: "Operate it with your own team, or hand monitoring, updates and backups to BotLane Managed.",
  },
] as const;

export const serviceLadder = [
  {
    label: "Product",
    body: "A packaged AI system with a versioned release, documentation and a defined support policy.",
  },
  {
    label: "Deployment",
    body: "BotLane installs and configures it on your infrastructure and validates it against the release gates.",
  },
  {
    label: "Management",
    body: "BotLane monitors, updates, backs up and maintains the running system.",
  },
  {
    label: "Customization",
    body: "Modifications, new integrations, custom workflows, or a bespoke system when nothing off-the-shelf fits.",
  },
] as const;

export const trustPoints = [
  "Self-hostable",
  "Pinned upstream versions",
  "Docker / OCI images",
  "Backup & restore procedures",
  "Transparent licensing",
  "Optional managed operation",
] as const;

export const footerNav = [
  {
    heading: "AI Systems",
    links: [
      { label: "Browse marketplace", href: "/systems" },
      { label: "Categories", href: "/systems#categories" },
      { label: "Release feed", href: "/changelog" },
      { label: "Classifications", href: "/trust#classifications" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "BotLane Deploy", href: "/deploy" },
      { label: "BotLane Managed", href: "/managed" },
      { label: "BotLane Custom", href: "/custom" },
      { label: "Solutions", href: "/solutions" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Self-hosting guide", href: "/developers" },
      { label: "Requirements", href: "/developers#requirements" },
      { label: "Provenance & checksums", href: "/trust#provenance" },
      { label: "Licensing", href: "/trust#licensing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Trust", href: "/trust" },
      { label: "Privacy", href: "/legal/privacy" },
    ],
  },
] as const;
