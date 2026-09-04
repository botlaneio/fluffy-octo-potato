/**
 * ---------------------------------------------------------------------------
 * PRIVACY POLICY — DRAFT. NOT LEGAL ADVICE. NOT REVIEWED BY A LAWYER.
 *
 * Two kinds of content live here.
 *
 * 1. Clauses describing what THIS WEBSITE does. These were derived by auditing
 *    the codebase and the built output — no cookies, no storage APIs, no
 *    analytics, no forms, one third-party request — so they are accurate as of
 *    the build they ship with. If you add analytics, a form endpoint, or an
 *    embed, these clauses become wrong and must be updated.
 *
 * 2. `gaps` — facts only BotLane can supply. Each one is rendered visibly on
 *    the page while `privacyReviewed` is false, so the draft cannot be mistaken
 *    for a finished policy.
 *
 * `privacyReviewed` must stay false until a person has answered every gap AND
 * had the result reviewed. Setting it to true while any gap remains fails the
 * build — see the guard at the bottom of this file.
 * ---------------------------------------------------------------------------
 */

export const privacyReviewed = false;

/** Set when the policy is finalised. Shown as "last updated". */
export const privacyEffectiveDate = "";

export interface Clause {
  id: string;
  heading: string;
  body: string[];
  /** Facts BotLane must supply before this clause is complete. */
  gaps?: string[];
}

export const clauses: Clause[] = [
  {
    id: "summary",
    heading: "The short version",
    body: [
      "This website does not set cookies, does not run analytics, and does not track you. It is a set of static pages, and visiting it sends your data to no third party at all — there are no external requests of any kind.",
      "If you email BotLane, we hold that email in order to answer it. That is the entire relationship unless you become a customer, in which case a separate agreement governs your data.",
    ],
  },
  {
    id: "website",
    heading: "What this website collects",
    body: [
      "Nothing, directly. The site sets no cookies and uses no browser storage — no localStorage, no sessionStorage, no IndexedDB. There is no analytics package, no tag manager, no advertising pixel and no session recording. This was verified against the source and the built output rather than assumed.",
      "Like any website, the server that delivers these pages receives your IP address and browser user-agent as part of the request. Those are handled by our hosting provider.",
    ],
    gaps: [
      "Who hosts botlane.io, and in which region",
      "Whether the host retains access logs, and for how long",
      "Whether a CDN sits in front of the site, and where it terminates requests",
    ],
  },
  {
    id: "third-parties",
    heading: "Third parties this site contacts",
    body: [
      "None. Loading a page from botlane.io makes no request to any other host — no scripts, no stylesheets, no fonts, no images, no embeds, no beacons.",
      "Typefaces are served from botlane.io rather than from Google Fonts, which is the usual exception. Loading fonts from Google would disclose your IP address to Google on every page view, and there is no benefit to you in that, so the font files are hosted here instead.",
      "This was verified against the built output rather than asserted. If an embed, script or hosted font is ever added, this clause stops being true and must change with it.",
    ],
  },
  {
    id: "contact",
    heading: "When you contact us",
    body: [
      "Email reaches a mailbox BotLane controls. We use what you send to answer your enquiry. Nothing you send is added to a marketing list, and BotLane does not operate one.",
      "If a contact form is added later, this clause will name where submissions are processed. At the time of writing there is no form on this site: enquiries are email only.",
    ],
    gaps: [
      "Which mailbox provider receives enquiries (e.g. Google Workspace, Fastmail, self-hosted)",
      "How long enquiry email is retained before deletion",
      "Whether enquiries are copied into a CRM or ticketing system, and which",
    ],
  },
  {
    id: "customers",
    heading: "If you become a customer",
    body: [
      "Self-hosted systems run on your infrastructure. Business data inside them does not pass through BotLane, and BotLane has no access to it.",
      "Under BotLane Deploy or BotLane Managed, BotLane is granted scoped operational access to systems running on infrastructure you control. What that access covers, how long it lasts and what is logged is set out in the engagement agreement rather than in this policy.",
    ],
    gaps: [
      "Whether a Data Processing Agreement is offered, and its terms",
      "Sub-processors used in delivering Deploy and Managed (hosting, monitoring, backup, model providers)",
      "Where operational logs and backups are stored, and retention for each",
    ],
  },
  {
    id: "rights",
    heading: "Your rights",
    body: [
      "If you are in the UK, the EU or another jurisdiction with equivalent law, you have the right to ask what personal data BotLane holds about you, to have it corrected, to have it deleted, to restrict or object to its processing, and to receive a copy in a portable form.",
      "In practice, for a website visitor, BotLane holds nothing. For someone who has emailed us, it is the email thread. Ask and we will tell you precisely what exists and delete it on request.",
      "You also have the right to complain to your data protection authority.",
    ],
    gaps: [
      "Whether an EU or UK representative is appointed under Article 27, and their details if so",
      "The legal basis relied on for enquiry email (legitimate interests is the usual answer — confirm)",
    ],
  },
  {
    id: "transfers",
    heading: "International transfers",
    body: [
      "BotLane LLC is registered in Wyoming, United States, and operates from Bangalore, India. Email you send us is therefore likely to be processed outside the UK and EEA.",
    ],
    gaps: [
      "The transfer mechanism relied on (Standard Contractual Clauses, UK Addendum, or another basis)",
      "Confirm the countries where enquiry data is actually stored and accessed",
    ],
  },
  {
    id: "security",
    heading: "Security",
    body: [
      "BotLane holds no security certification and this policy does not claim one. The trust page sets out what is and is not claimed about security across the business.",
    ],
    gaps: [
      "Whether a breach-notification commitment and timeline should be stated here",
    ],
  },
  {
    id: "contact-us",
    heading: "Contacting us about this policy",
    body: [
      "Questions about this policy, or a request to exercise any of the rights above, can be sent to the address on the contact page.",
    ],
    gaps: [
      "A postal address for BotLane LLC — a policy naming rights but no physical address is incomplete",
      "Whether a dedicated privacy address (e.g. privacy@) should be used instead of the general one",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: [
      "When this policy changes, the effective date at the top of the page changes with it. Material changes will be described rather than folded in silently.",
    ],
  },
];

export const outstandingGaps = clauses.flatMap((clause) =>
  (clause.gaps ?? []).map((gap) => ({ clause: clause.heading, gap })),
);

/**
 * The policy cannot be marked reviewed while it still has holes in it. This is
 * the same guard pattern used for solution system references: make the unsafe
 * state impossible to ship rather than something someone has to remember.
 */
if (privacyReviewed && outstandingGaps.length > 0) {
  throw new Error(
    `privacyReviewed is true but ${outstandingGaps.length} gap(s) remain in the privacy policy: ` +
      outstandingGaps.map((g) => `${g.clause} — ${g.gap}`).join("; "),
  );
}

if (privacyReviewed && !privacyEffectiveDate) {
  throw new Error(
    "privacyReviewed is true but privacyEffectiveDate is empty — a policy with no effective date is not finished.",
  );
}
