# botlane.io

The BotLane marketplace site. Built from scratch — Next.js 15 (App Router), React 19,
Tailwind v4, TypeScript. No template, no theme, no Framer export.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run typecheck
```

## Why the homepage ships zero client JavaScript

Every section is server-rendered. The mobile menu is a native `<details>`
disclosure, which is keyboard operable and screen-reader announced without
hydration, so there is no `"use client"` anywhere in the homepage tree.

## Architecture

```
app/
  globals.css        Design tokens + component primitives. The single source of
                     truth — no component hard-codes a colour, radius or size.
  fonts.css          Self-hosted @font-face declarations
  layout.tsx         Metadata, font preloads, Organization JSON-LD, skip link
  page.tsx           Homepage composition — 9 sections, nothing else
  systems/page.tsx   Marketplace index — full catalogue server-rendered
  systems/[slug]/    Product detail template — statically generated per system
  systems/c/[slug]/  12 category landing pages — indexable only when populated
  changelog/         Cross-product release feed
  about/             Thesis, operating principles, people, company
  resources/         Index of everything BotLane publishes
  legal/privacy/     Privacy policy — DRAFT, gated, see below
  trust/page.tsx     Release gates, classifications, provenance, licensing
  developers/        Self-hosting hub — quickstart, requirements, operations
  deploy/ managed/ custom/   Three routes, one ServicePage template
  solutions/         Outcome index + statically generated detail template
  contact/           Enquiry routes, form or email fallback
  signin/            Account gate — centred layout, no site chrome
lib/
  types.ts           Domain model: AiSystem, ReleaseGates, Category, ...
  status.ts          deriveStatus() and the gate vocabulary
  releases.ts        Cross-product feed derived from systems' release arrays
content/
  systems.ts         The catalogue  ← seed data, see warning below
  categories.ts      The 12-category taxonomy
  site.ts            Nav, deployment options, ladder, footer
components/
  ui/                Logo, SectionHeader, Badge, Arrow, CodeBlock
  Nav, Footer, SystemCard, SystemsConsole
  sections/          One file per homepage section
  marketplace/       MarketplaceBrowser (the one client island), Facet,
                     SearchInput, ClassificationLegend
  product/           ProductSection, SpecTable, GateChecklist, UpstreamPanel,
                     AvailabilityNotice, ProductCta, FaqList
  trust/             CatalogueStatus
  service/           ServicePage (shared by /deploy, /managed, /custom),
                     ResponsibilitySplit (also used by /developers)
  solution/          SolutionCard
  contact/           ContactForm (zero-JS, native validation)
  auth/              SignInForm (email link, no password)
```

Components never import product data directly — they take props. Moving
`content/` to a CMS or database later is one adapter, not a refactor.

## The release-gate mechanism

A system's public status is a **pure function of its release gates**
(`lib/status.ts`). There is no `status` field an author can set.

```
all 12 gates closed  →  "Production ready"
1–11 closed          →  "In productization"
0 closed             →  "Planned"
```

This makes the trust requirement structural rather than a copy discipline:
nothing can be badged production ready until it actually is. Close the gates
and the badge changes itself.

> **Before launch:** every `gates` block in `content/systems.ts` is placeholder
> data. Set them from the real release checklist. An inaccurate gate there is
> the one thing that could put a wrong badge on the site — nothing else in the
> codebase can.

## Content honesty

No invented customers, logos, testimonials, certifications, uptime figures or
performance statistics appear anywhere. The trust strip states capabilities of
the delivery model, not proof claims. Upstream attribution renders from
`system.upstream` and explicitly says BotLane did not author the upstream
project.

## Marketplace filtering

`/systems` server-renders every system into the HTML, then layers one client
island (~4 kB) over it for search and faceting. With JavaScript disabled the
page still lists the full catalogue, so it is complete for crawlers and
readable without hydration — filtering is an enhancement, not a dependency.

Facet state syncs to the query string (`?class=distribution&category=legal`)
via `replaceState`, so a filtered view is shareable and does not fill the back
button. Checkbox appearance is driven by `peer-checked:` CSS off the real
input rather than React state, so controls look right from first paint.

`preview.mjs` builds shareable single-file versions of the exported pages.

## The product template

`/systems/[slug]` is one template rendering all six systems, statically
generated via `generateStaticParams`. Every detail field on `AiSystem` is
optional, and each section renders only when there is content for it — so a
system early in productization shows a short honest page rather than a long
page of empty shells or invented filler. Compare `ai-whatsapp-sales-desk`
(every section) with `ai-receptionist` (four sections) to see the range.

Three things are derived rather than authored, so the page cannot contradict
itself:

- **The availability notice** reads from the gates, so it always agrees with
  the status badge beside it.
- **"What's included"** *is* the gate checklist. There is no second hand-written
  list of features to drift out of sync with the badge.
- **The CTA hierarchy** follows availability. A system that cannot be deployed
  today does not get a "Deploy it yourself" button — the page would be writing
  a cheque the gates have not cleared.

Upstream attribution gets its own panel in the header rather than a footnote,
and states in as many words that BotLane did not author the upstream project.

The page ships no client JavaScript: the FAQ is a native `<details>`
disclosure.

## /trust

The page three others already link to. It carries the `#classifications`,
`#provenance` and `#licensing` anchors, and publishes a catalogue-wide gate
table generated from `content/systems.ts` — the same data as the product
badges, so there is no separate copy that could say something kinder.

Gate descriptions live in `lib/status.ts` beside the labels, so every surface
that explains a gate explains it identically.

The last section, **What BotLane does not claim**, is load-bearing rather than
decorative: no certifications held, no uptime or benchmark figures, no customer
logos or counts, no authorship of upstream projects. Keep it accurate as the
company grows — a limit that quietly disappears is worse than one never
stated. When a claim becomes true (a real SOC 2, a named customer), move the
line rather than deleting it.

## /developers

The self-hosting hub every "Deploy it yourself" link depends on. Carries the
`#requirements` anchor. Two of its tables are generated from
`content/systems.ts` rather than written by hand: per-system resource
requirements, and a release-availability table stating plainly that no system
has closed all twelve gates, so nothing is on general release yet.

Command samples are **illustrative** — they describe the shape of the workflow,
not a registry that exists today. Replace them at first release, and do not let
them imply a download that is not there.

## Services: one template, three routes

`/deploy`, `/managed` and `/custom` render the same `ServicePage` component from
three `ServiceDefinition` records in `content/services.ts`. Building them
separately would have produced three pitches that drift apart; this way a change
to the page shape lands on all three, and the difference between the services
stays in the content where it belongs.

The template holds **no per-slug logic**. Accent colour, cross-link and link
labels are fields on the data. Two sections (`variants`, `whenNot`) are optional
and render only when a service has them — Custom uses both, Deploy and Managed
use neither, and neither emits an empty shell.

`ResponsibilitySplit` is shared with `/developers`, so all three pages describe
the customer/BotLane boundary identically.

The availability notice on both pages is computed from the catalogue: while no
system has closed all twelve gates, both say so and name the furthest-along
system with its real gate count. Neither page states a price, a response time
or an uptime figure — `/managed` says outright that no SLA is published yet and
why, which is consistent with the trust page rather than in tension with it.

## Solutions reference systems, they do not restate them

A `Solution` holds `systemSlugs`, never a copy of what those systems do, so a
solution page cannot describe a system more generously than the system's own
page. The detail template renders the real `SystemCard`, badges included.

`solutionReadiness()` derives from the referenced systems' gates: a solution
shows "furthest 7/12" rather than claiming availability, and says outright when
none of its systems has closed all twelve gates.

A typo in `systemSlugs` **fails the build** rather than silently rendering a
thinner page — `content/solutions.ts` throws on an unknown slug. Verified by
introducing one deliberately.

## /contact and the form that refuses to lie

Two constants in `content/site.ts` control this page:

- `contactEmail` — a **placeholder**. Verify the mailbox exists and is
  monitored, or change it. It is the only address printed on the site.
- `contactEndpoint` — **empty by design**. This is a static export, so there is
  no server to receive a POST.

When `contactEndpoint` is empty the page renders no `<form>` element at all and
falls back to direct email with per-route prefilled subjects. Set it to a form
handler URL and the form renders automatically; nothing else changes. Both
states were built and verified.

A form that silently drops enquiries is the worst possible bug on the page every
CTA on the site points at, so it is not possible to ship one by accident here.

The form itself is server-rendered with native browser validation — no client
JavaScript, no state to lose before hydration.

## /signin and the account gate

`accountsEnabled` in `content/site.ts` is false. While it is:

- the nav renders **no "Sign in" link on any page**, so no dead link ships
- `/signin` still exists as a real route, explains that accounts are not open,
  and is `noindex`
- no `<form>` element is emitted

Flip it to true and set `authEndpoint`, and all 21 pages gain the nav link and
the form renders. Both states were built and verified by counting rendered
links and form tags.

`/signin` is the one page that deliberately drops the site chrome — no nav, no
footer, centred layout. Auth is a single task, and somewhere else to click is a
distraction.

Sign-in is an emailed link rather than a password: no password to leak, reset,
or store badly. The `accountWillHold` copy is written in the future tense on
purpose — accounts do not exist, and present tense would be a claim about a
product that has not been built. Change the tense when the thing is real.

## Category pages and the doorway-page problem

All 12 categories render, because the homepage grid links to all 12. Only the
6 that actually hold systems are **indexable**:

- populated → full page (systems, what it covers, what to look for, related
  solutions) plus `CollectionPage` JSON-LD, `index, follow`
- empty → short honest state pointing at Custom and the real catalogue,
  no JSON-LD, `noindex, follow`

Indexability is derived from the catalogue, not authored. Twelve thin landing
pages would cost the domain more than the six real ones earn it, and a category
page with nothing on it is a doorway page by Google's definition.

When a category gains its first system, write its `headline`, `lead`, `covers`
and `lookFor` in `content/categories.ts` at the same time — the page becomes
indexable automatically, so the content needs to be there when it does.

The "What to look for" section on each populated category is written to be
useful whether or not the reader buys from BotLane. That is the point: it is
the only part of a category page anyone would link to.

## /changelog

Releases belong to a system, not to a global list — `lib/releases.ts` derives
the feed by flattening `system.releases`. A release therefore cannot appear on
/changelog without also appearing on its own product page. Verified by adding a
temporary release and confirming it rendered in both places, then reverting.

The feed is currently empty because no system has been tagged. Rather than fake
entries, the page carries two things that are true today:

- **Anatomy of a release entry** — a published commitment about what every
  entry will carry (version, upstream pin, sha256, what changed, upgrade notes,
  rollback safety, gate status). It renders whether or not the feed has content,
  because it is a promise about the feed's shape rather than a description of
  entries.
- **The live gate board**, shared with `/trust`. Gates close before releases
  exist, so it moves before this feed does — and there is only one component
  answering that question on the whole site.

No mailing list is offered. Collecting addresses for a notification system that
does not exist would be the same class of error as a contact form that drops
enquiries.

## /about and /resources

**`/about`** states the thesis (a repository is not a product), why the company
exists, six operating constraints, and who is behind it. Its "where this
actually is" panel is computed from the catalogue — systems, categories, gate
counts — so the page cannot go stale while the catalogue moves.

> **Verify before launch:** the `people` block in `content/about.ts` is the one
> place on the site that asserts facts about a person, written from what was
> already known rather than confirmed for publication. Check the name, role and
> location, and decide whether you want a named founder on the site at all.
> Nothing states a founding date, headcount, funding, revenue or a customer.

**`/resources`** indexes what already exists rather than inventing a content
library: the three reference pages, and the per-category "what to look for"
guides derived from `categories.lookFor`. Categories without a guide are
explained rather than padded. There is no blog and the page says why — an empty
blog with three launch-week posts helps nobody.

## /legal/privacy — a draft that cannot pretend otherwise

**This is a draft. It has not been reviewed by a lawyer, and it is not legal
advice.** `privacyReviewed` in `content/legal/privacy.ts` is false. While it is:

- a visible notice states the page is not a policy in force
- the outstanding gaps render inline, under the clause each belongs to
- the page is `noindex`, so an unfinished policy is not what search engines cache

Setting `privacyReviewed = true` while any gap remains **fails the build**, and
so does setting it true with no effective date. Verified by flipping the flag —
the build stopped and named every one. Same guard pattern as solution system refs.

### What is already accurate

The clauses describing the website were derived by auditing the code and the
built output, not guessed:

- **no cookies, no localStorage, no sessionStorage, no IndexedDB** — zero
  matches across `app/`, `components/`, `lib/`, `content/`
- **no analytics, tag manager, pixel or session recording** — zero matches
- **no forms** in the built output (the contact endpoint is unset)
- **zero third-party hosts** — fonts are self-hosted (see below)

Re-run that audit whenever the site gains a script, an embed, a hosted font or
a form endpoint — those clauses become wrong the moment one is added.

### Fonts are self-hosted — the site makes zero third-party requests

Google Fonts was the site's only third-party data flow: it disclosed every
visitor's IP to Google on each page view, a transfer German courts have found
actionable under GDPR. The font files are now served from this origin.

- `public/fonts/` — Inter and JetBrains Mono, variable, woff2, latin +
  latin-ext subsets. 192KB total; one file per subset covers every weight.
- `app/fonts.css` — the `@font-face` declarations with unicode ranges.
- `app/layout.tsx` — preloads the two latin subsets; latin-ext loads on demand.

Both are SIL Open Font License 1.1. Regenerate by downloading from the upstream
projects, **not** by re-adding the Google Fonts link.

Verified with a headless browser against the built site: zero external requests
of any kind, both families reported loaded by `document.fonts`, and `h1` /
`.t-mono` resolving to the self-hosted families rather than a fallback.

`preview.mjs` embeds the latin subsets as data URIs, so a shared preview also
makes no external request.

## Running and sharing it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to ./out
npx vercel           # deploy — first run links/creates the project
npx vercel --prod    # promote to production
```

`bundle-full-site.mjs` stitches the whole export into one self-contained HTML
file with a hash router — every page browsable offline, filters and deep links
working, no server. Useful for review on a device that cannot run the project.
Run `npm run build` first, then `node bundle-full-site.mjs`.

## Layout invariant: no horizontal page scroll

Wide content (tables, code blocks) scrolls inside its own `overflow-x-auto`
container. Grid and flex children default to `min-width: auto`, which defeats
that and pushes the page body sideways instead — so any grid holding a
scrollable child carries `[&>*]:min-w-0`. Verified across every page at 390,
768 and 1440px.

A related trap: a `gap-px` grid with a line-coloured background renders any
absent cell as a grey box. Only use that pattern where the item count fills the
rows exactly; otherwise use separated `panel` cards with a normal gap.

## Not yet built

Built so far: homepage, marketplace, product template, trust, developers,
deploy, managed, custom, solutions, contact, signin, categories, changelog,
about, resources, privacy. 39 pages exported.

Still linked but not built:

Nothing. Every internal link on the site resolves.

Final audit: 39 pages, 37 distinct internal links, **37 resolving**, no
horizontal scroll at 390/768/1440px, a `<title>` on every page and exactly one
`<h1>` per page.


The commercial ladder from the brief — product → deployment → management →
customization — is now complete and cross-linked in both directions.
