/**
 * Content for /contact.
 *
 * No response-time promise appears here. BotLane has no support rota to back
 * one, and /trust says we do not publish commitments we cannot keep.
 */

export interface EnquiryRoute {
  value: string;
  label: string;
  /** Shown on the page as guidance, and used as the mailto subject. */
  subject: string;
  body: string;
  include: string[];
}

export const enquiryRoutes: EnquiryRoute[] = [
  {
    value: "system",
    label: "A specific system",
    subject: "Enquiry about a BotLane system",
    body: "You have found something in the catalogue and want to know whether it fits, when it will be released, or how to get early access.",
    include: [
      "Which system",
      "What you would use it for",
      "Whether you intend to self-host or want BotLane to deploy it",
    ],
  },
  {
    value: "deployment",
    label: "Deployment or managed operation",
    subject: "BotLane Deploy / Managed enquiry",
    body: "You know roughly what you want and would rather not install and run it yourself.",
    include: [
      "Which system, and which environments",
      "Where it would run — your cloud account, your hardware",
      "Whether you want it operated afterwards or handed over",
    ],
  },
  {
    value: "custom",
    label: "Custom or bespoke work",
    subject: "BotLane Custom enquiry",
    body: "Nothing in the catalogue fits, or something in it fits but not quite.",
    include: [
      "What the software needs to do that it currently does not",
      "Whether this extends a BotLane system or starts from nothing",
      "Any deadline that is real rather than aspirational",
    ],
  },
  {
    value: "problem",
    label: "A problem, not a product",
    subject: "BotLane enquiry",
    body: "You know what is broken and would rather describe that than pick from a list. This is usually the most useful place to start.",
    include: [
      "What happens today, and what it costs you",
      "Which tools the process currently runs through",
      "Roughly how many people are involved",
    ],
  },
  {
    value: "security",
    label: "Security disclosure",
    subject: "Security disclosure",
    body: "You have found a vulnerability in a BotLane release or on this site.",
    include: [
      "Which system and version",
      "Steps to reproduce",
      "Any disclosure timeline you intend to follow",
    ],
  },
];

export const whatHappensNext = [
  {
    title: "A person reads it",
    body: "Enquiries are not routed into a nurture sequence. Someone who can answer the technical question reads what you sent.",
  },
  {
    title: "We say what applies",
    body: "Which systems are relevant, what is configuration and what would be custom work — including when the honest answer is that you do not need us.",
  },
  {
    title: "Scope before quote",
    body: "If there is work to do, it gets specified in writing before it gets priced. A quote against a conversation is a guess.",
  },
];
