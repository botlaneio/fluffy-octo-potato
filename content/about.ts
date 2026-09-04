/**
 * Content for /about.
 *
 * ---------------------------------------------------------------------------
 * VERIFY BEFORE LAUNCH — the `people` block below.
 *
 * Everything else on this page is either a statement of intent BotLane can be
 * held to, or derived from the catalogue. The people block is the one place
 * that asserts facts about a person, and it was written from what was already
 * known rather than confirmed for publication. Check the name, role and
 * location, add or remove entries, and decide whether you want a named founder
 * on the site at all before this ships.
 *
 * Nothing here states a founding date, a headcount, funding, revenue or a
 * customer. Those would be claims with nothing behind them.
 * ---------------------------------------------------------------------------
 */

export const thesis = {
  headline: "A repository is not a product.",
  lead: "There is an enormous amount of capable open-source AI software, and almost none of it arrives in a state a business can depend on. BotLane exists in the gap between those two facts.",
};

export const why = [
  {
    title: "The software mostly already exists",
    body: "For a great many business functions, someone has already written something good and given it away. What is missing is not code — it is a tested release, an install that works on a clean machine, secrets handled properly, a restore somebody has actually performed, and documentation written for a person who is not the author.",
  },
  {
    title: "That work is unglamorous and nobody does it",
    body: "Packaging is the least interesting part of shipping software, which is exactly why it is the part that gets skipped. Twelve release gates is our answer to the question of what separates a repository from something you can put in front of a business.",
  },
  {
    title: "Buying AI should not mean renting your own data",
    body: "Most AI products require the business to hand its operating data to a vendor. Self-hosting removes that trade, and it is the default path here rather than an enterprise upsell.",
  },
];

export const principles = [
  {
    title: "Say what is not done",
    body: "Every system publishes its release gate status, including the open ones. A status board that could only show good news would not be worth reading.",
  },
  {
    title: "Derive claims, do not write them",
    body: "Status badges, availability notices and readiness figures are computed from the catalogue rather than typed by hand — so the site cannot describe a system as finished while its checklist says otherwise.",
  },
  {
    title: "Self-hosting is the real path",
    body: "Documentation is written for someone who is not BotLane, and no BotLane account is required to run a system. Deploy and Managed are options, not gates.",
  },
  {
    title: "Do not relicense work we did not write",
    body: "Where a system is built on an open-source project, that project is named, its version pinned, and its licence unchanged. BotLane licenses the packaging around it.",
  },
  {
    title: "Configuration before code",
    body: "If a packaged system can be configured into the shape a customer needs, we say so rather than quoting for a build. Custom work that should have been a setting is a bad sale twice.",
  },
  {
    title: "Publish the limits",
    body: "No certifications we do not hold, no uptime figures we cannot evidence, no customer logos we have not earned. The trust page lists what BotLane does not claim, and it is meant to stay accurate as the company grows.",
  },
];

export const people = [
  {
    name: "Shivendra Mohan Singh",
    role: "Founder",
    location: "Bangalore, India",
    body: "Background across web and systems engineering, and operating businesses that run on exactly the kind of software BotLane packages — which is where the idea came from.",
  },
];

export const company = [
  { label: "Entity", value: "BotLane LLC" },
  { label: "Registered", value: "Wyoming, United States" },
  { label: "Operating from", value: "Bangalore, India" },
];
