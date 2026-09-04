import type { AiSystem, Release } from "./types";
import { systems } from "@/content/systems";

/**
 * The cross-product release feed.
 *
 * Releases belong to a system, not to a global list — a release without a
 * system is meaningless. The feed is derived by flattening, so a release can
 * never appear on /changelog without also appearing on its own product page.
 */
export interface FeedEntry extends Release {
  systemSlug: string;
  systemName: string;
  classification: AiSystem["classification"];
}

export function releaseFeed(): FeedEntry[] {
  return systems
    .flatMap((system) =>
      (system.releases ?? []).map((release) => ({
        ...release,
        systemSlug: system.slug,
        systemName: system.shortName,
        classification: system.classification,
      })),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Systems that have published at least one release. */
export const releasedSystems = () =>
  systems.filter((system) => (system.releases ?? []).length > 0);

/**
 * What every BotLane release entry carries. This is a published commitment
 * about the shape of the feed, not a description of entries that exist —
 * which is why it renders whether or not the feed has anything in it.
 */
export const releaseEntryAnatomy = [
  {
    field: "Version",
    body: "The BotLane package version. Semantic, and never reused — a rebuilt artifact gets a new number rather than replacing an old one.",
  },
  {
    field: "Date",
    body: "When the release was published, not when work started on it.",
  },
  {
    field: "Upstream pin",
    body: "For a Distribution, the exact upstream version this release is built from. Moving that pin is itself a release.",
  },
  {
    field: "Checksum",
    body: "sha256 of the release bundle, published alongside it so you can verify the artifact you downloaded is the artifact that was tested.",
  },
  {
    field: "What changed",
    body: "In the packaging as well as the software. A change to the install tooling matters to whoever runs it.",
  },
  {
    field: "Upgrade notes",
    body: "Anything that must be done before upgrading. Absence of a note means there is nothing — not that nobody checked.",
  },
  {
    field: "Rollback safety",
    body: "Whether rolling back to the previous release is data-safe. If it is not, the entry says so before you start, not after.",
  },
  {
    field: "Gate status",
    body: "Which of the twelve release gates the version closed, so the badge on the product page has a dated cause.",
  },
];
