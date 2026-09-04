/**
 * Content for /signin.
 *
 * The "will hold" framing is deliberate and must stay: accounts do not exist
 * yet, and describing them in the present tense would be a claim about a
 * product BotLane has not built. Change the tense when the thing is real.
 */

export const accountWillHold = [
  {
    title: "Release access",
    body: "Download the pinned release for a system you have licensed, with its checksums, alongside the versions you are entitled to.",
  },
  {
    title: "Your deployments",
    body: "Which systems you run, at which versions, in which environments — and which of them have an upgrade waiting.",
  },
  {
    title: "Managed reporting",
    body: "For systems under BotLane Managed: what ran, what was updated, what broke and what was done about it.",
  },
  {
    title: "Licences and billing",
    body: "Package licences, renewal dates and invoices, in one place rather than in an email thread.",
  },
];

/** The point worth making loudest on this page. */
export const selfHostNeedsNoAccount = {
  claim: "You will never need an account to run a BotLane system.",
  detail:
    "Releases are self-hostable, the documentation is written for someone who is not BotLane, and nothing phones home. An account is a convenience for licensing and managed operation — not a gate in front of the software.",
};
