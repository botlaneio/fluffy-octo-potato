/**
 * BotLane marketplace domain model.
 *
 * Systems are authored as typed data, never inline in components. Swapping
 * this layer for a CMS or database later is one adapter, not a refactor.
 */

/** How a system relates to the software it is built from. */
export type Classification =
  /** Software written by BotLane. */
  | "original"
  /** Open-source software packaged, tested and productionised by BotLane. */
  | "distribution"
  /** A supported deployment of third-party software BotLane does not redistribute. */
  | "integration";

export type DeploymentPath = "self-host" | "botlane-deploy" | "botlane-managed";

/**
 * The twelve release gates that turn a repository into a business system.
 *
 * These are the ONLY input to a system's public status. A system cannot be
 * badged production-ready in the UI unless every gate here is actually true —
 * it is a type-level guarantee, not a copy discipline someone has to remember.
 */
export interface ReleaseGates {
  pinnedProvenance: boolean;
  installer: boolean;
  dockerImages: boolean;
  ociRelease: boolean;
  configValidation: boolean;
  secretsHandling: boolean;
  healthChecks: boolean;
  backupRestore: boolean;
  upgradeRollback: boolean;
  securityHardening: boolean;
  acceptanceTests: boolean;
  documentation: boolean;
}

/** Derived from gates. Never authored by hand. */
export type SystemStatus = "production-ready" | "in-productization" | "planned";

export interface UpstreamAttribution {
  /** Name of the upstream project, shown verbatim. */
  project: string;
  url?: string;
  /** Upstream licence, e.g. "AGPL-3.0". */
  license: string;
  /** The exact upstream version this distribution is pinned to. */
  pinnedVersion: string;
}

export interface TechnicalSpec {
  runtime?: string;
  docker: boolean;
  minCpu?: string;
  minRam?: string;
  minDisk?: string;
  supportedOs?: string[];
  /** BotLane's own version of the packaged system. */
  distributionVersion?: string;
  /** ISO date the release was last verified against its gates. */
  lastTested?: string;
}

export interface TitledEntry {
  title: string;
  body: string;
}

export interface Integration {
  name: string;
  note?: string;
}

export interface ArchitectureLayer {
  layer: string;
  detail: string;
}

export interface Release {
  /** BotLane package version, e.g. "1.2.0". */
  version: string;
  /** ISO date. */
  date: string;
  notes: string;
  /** Upstream version this release pins. Distributions only. */
  upstreamVersion?: string;
  /** sha256 of the release bundle, as published alongside it. */
  checksum?: string;
  /** Whether rolling back to the previous release is data-safe. */
  rollbackSafe?: boolean;
  /** Anything that must be done before upgrading. Absence means nothing. */
  breaking?: string;
}

export interface DocLink {
  label: string;
  href: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface LicenseInfo {
  /** Licence of the BotLane package itself. */
  product: string;
  /** Licence of the upstream project, where one applies. */
  upstream?: string;
}

export interface AiSystem {
  slug: string;
  name: string;
  /** Short name for dense UI (cards, nav, breadcrumbs). */
  shortName: string;
  categorySlug: string;
  classification: Classification;
  /** One sentence, outcome-first — what the business gets, not what it is. */
  outcome: string;
  capabilities: string[];
  deployment: DeploymentPath[];
  gates: ReleaseGates;
  upstream?: UpstreamAttribution;
  tech: TechnicalSpec;
  /** Surfaced on the homepage's featured rail. */
  featured?: boolean;

  /* ---------------------------------------------------------------------
   * Detail-page content. Every field below is optional on purpose: a system
   * early in productization genuinely does not have this yet, and the product
   * template omits the section rather than rendering an empty shell or
   * inventing filler.
   * ------------------------------------------------------------------- */
  description?: string;
  audience?: string[];
  useCases?: TitledEntry[];
  howItWorks?: TitledEntry[];
  integrations?: Integration[];
  architecture?: ArchitectureLayer[];
  /** Hardening the package provides. Never certifications, never audit claims. */
  security?: string[];
  included?: string[];
  supportPolicy?: string;
  license?: LicenseInfo;
  releases?: Release[];
  docs?: DocLink[];
  faq?: FaqEntry[];
}

export interface Category {
  slug: string;
  name: string;
  /** One line, used on cards and grids. */
  description: string;

  /* Category landing-page content. A category with no systems yet needs only
     the fields above — its page renders a short honest state and is noindex,
     because a landing page with nothing on it is a doorway page. */
  headline?: string;
  lead?: string;
  /** The business functions this category covers. */
  covers?: string[];
  /** What to actually evaluate when choosing a system here. */
  lookFor?: TitledEntry[];
}

/**
 * A Solution is a business outcome, not a product. It references systems by
 * slug rather than restating them, so a solution page can never describe a
 * system differently from the system's own page — and its readiness is derived
 * from the systems it references rather than asserted.
 */
export interface Solution {
  slug: string;
  name: string;
  /** Outcome-first headline. */
  headline: string;
  lead: string;
  /** Whose problem this is, in their words. */
  situation: string[];
  /** What is different once it is running. */
  changes: TitledEntry[];
  /** Systems this solution is assembled from, in the order they matter. */
  systemSlugs: string[];
  /** Which BotLane services typically apply, and why. */
  services: { slug: "deploy" | "managed" | "custom"; reason: string }[];
  /** How the pieces come together. */
  steps: TitledEntry[];
  faq?: FaqEntry[];
  featured?: boolean;
}

export interface DeploymentOption {
  id: DeploymentPath;
  label: string;
  summary: string;
  audience: string;
  includes: string[];
}
