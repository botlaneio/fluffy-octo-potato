import type { AiSystem, ReleaseGates, SystemStatus } from "./types";

/** Human labels for each release gate, used wherever gates are displayed. */
export const RELEASE_GATE_LABELS: Record<keyof ReleaseGates, string> = {
  pinnedProvenance: "Pinned provenance",
  installer: "Installation tooling",
  dockerImages: "Docker images",
  ociRelease: "OCI release artifacts",
  configValidation: "Configuration validation",
  secretsHandling: "Secrets handling",
  healthChecks: "Health checks",
  backupRestore: "Backup & restore",
  upgradeRollback: "Upgrade & rollback",
  securityHardening: "Security hardening",
  acceptanceTests: "Acceptance tests",
  documentation: "Documentation & runbooks",
};

/**
 * What closing each gate actually means. Written as verifiable statements
 * rather than adjectives — a gate that cannot be checked is not a gate.
 */
export const RELEASE_GATE_DESCRIPTIONS: Record<keyof ReleaseGates, string> = {
  pinnedProvenance:
    "The exact upstream commit or tag the release is built from is recorded and published. No moving targets, no “latest”.",
  installer:
    "A repeatable installation path exists and has been run end to end on a clean machine, not just on the maintainer's laptop.",
  dockerImages:
    "Container images are built for the release and published, so the deployed artifact is the tested artifact.",
  ociRelease:
    "Release artifacts are published to an OCI registry with digests, so a deployment can pin an image by content rather than by tag.",
  configValidation:
    "Configuration is validated at startup. A misconfigured deployment fails immediately and loudly instead of serving traffic in a broken state.",
  secretsHandling:
    "Credentials are supplied at runtime and never baked into an image, committed to a repository, or written to logs.",
  healthChecks:
    "The system exposes health endpoints an orchestrator or monitor can read to tell running from merely started.",
  backupRestore:
    "A documented backup procedure exists and a restore has been performed from those backups into a working system.",
  upgradeRollback:
    "Upgrading to the next release and rolling back to the previous one have both been executed against real data.",
  securityHardening:
    "The deployment defaults have been reviewed: unprivileged runtime user, no unnecessary exposed ports, no default credentials.",
  acceptanceTests:
    "An automated smoke suite covering the system's primary workflows passes against a freshly deployed instance.",
  documentation:
    "Installation, configuration, operations, troubleshooting and architecture are written down well enough for someone who is not BotLane to run it.",
};

export const GATE_KEYS = Object.keys(RELEASE_GATE_LABELS) as (keyof ReleaseGates)[];

export function gatesPassed(gates: ReleaseGates): number {
  return GATE_KEYS.filter((key) => gates[key]).length;
}

export const GATE_TOTAL = GATE_KEYS.length;

/**
 * A system's public status is a pure function of its release gates.
 *
 * This is the mechanism that makes the trust requirement structural: there is
 * no field an author can set to call something production-ready. Close the
 * gates and the badge changes itself.
 */
export function deriveStatus(system: AiSystem): SystemStatus {
  const passed = gatesPassed(system.gates);
  if (passed === GATE_TOTAL) return "production-ready";
  if (passed > 0) return "in-productization";
  return "planned";
}

export const STATUS_LABELS: Record<SystemStatus, string> = {
  "production-ready": "Production ready",
  "in-productization": "In productization",
  planned: "Planned",
};

export const CLASSIFICATION_LABELS = {
  original: "BotLane Original",
  distribution: "BotLane Distribution",
  integration: "BotLane Integration",
} as const;

export const CLASSIFICATION_DESCRIPTIONS = {
  original: "Software designed and written by BotLane.",
  distribution:
    "Open-source software packaged, tested, hardened and supported by BotLane.",
  integration:
    "A supported deployment of third-party software, configured and operated by BotLane.",
} as const;

export const DEPLOYMENT_LABELS = {
  "self-host": "Self-host",
  "botlane-deploy": "BotLane Deploy",
  "botlane-managed": "BotLane Managed",
} as const;
