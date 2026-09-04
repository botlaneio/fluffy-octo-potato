/**
 * Content for /developers.
 *
 * Command samples are illustrative. They describe the shape of the workflow,
 * not a registry or URL that exists today — the first system has not reached a
 * tagged release. Replace them with the real commands at first release, and do
 * not let them imply a download that is not there.
 */

export const selfHostIncludes = [
  {
    title: "A pinned, tested release",
    body: "A specific version built from a recorded upstream commit, not a checkout of whatever main happened to be that day.",
  },
  {
    title: "Container images",
    body: "Docker / OCI images for the release, so the artifact you deploy is the artifact that was tested.",
  },
  {
    title: "Deployment configuration",
    body: "Compose files and environment templates with every required variable documented and validated at boot.",
  },
  {
    title: "Operational documentation",
    body: "Installation, configuration, upgrade, rollback, backup, restore and troubleshooting — written for someone who is not BotLane.",
  },
  {
    title: "A release feed",
    body: "Notes for each version, including which upstream version it pins and what changed in the packaging.",
  },
];

export const baselineRequirements = [
  { label: "Host OS", value: "Ubuntu 22.04 LTS or newer, Debian 12 or newer" },
  { label: "Container runtime", value: "Docker Engine 24+ with Compose v2" },
  { label: "Architecture", value: "x86-64 (arm64 where a system's page says so)" },
  { label: "Persistent storage", value: "A volume separate from the container image" },
  { label: "Outbound network", value: "HTTPS to the model provider and any integrations the system uses" },
  { label: "Inbound network", value: "TLS termination in front of the application — a reverse proxy or load balancer" },
  { label: "Backups", value: "Somewhere off the host to write them, and a restore you have actually tested" },
];

export const operationsTopics = [
  {
    title: "Health checks",
    body: "Each system exposes a health endpoint that distinguishes running from merely started. Point your orchestrator or uptime monitor at it rather than at the port.",
  },
  {
    title: "Backups",
    body: "Persistent data lives on a volume, separate from the image, so it survives an upgrade. The documented procedure covers what to snapshot and in what order.",
  },
  {
    title: "Upgrades",
    body: "Upgrading means pulling the new pinned image and running the release's migration step. Release notes state whether an upgrade is reversible.",
  },
  {
    title: "Rollback",
    body: "Every release documents the previous version it can roll back to, and whether that rollback is data-safe. If it is not, the notes say so before you start.",
  },
];

export const supportBoundary = [
  {
    path: "Self-host",
    yours: "Infrastructure, installation, configuration, monitoring, backups, upgrades.",
    ours: "The release, the images, the documentation and the release feed.",
  },
  {
    path: "BotLane Deploy",
    yours: "The infrastructure and running it after handover.",
    ours: "Installation, configuration, integration, validation against the release gates, documented handover.",
  },
  {
    path: "BotLane Managed",
    yours: "Deciding what the system should do.",
    ours: "Monitoring, updates, backups, maintenance and operational support.",
  },
];
