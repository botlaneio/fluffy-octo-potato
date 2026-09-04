import type { Classification, DeploymentPath, SystemStatus } from "@/lib/types";
import {
  CLASSIFICATION_LABELS,
  DEPLOYMENT_LABELS,
  STATUS_LABELS,
} from "@/lib/status";

const STATUS_COLOR: Record<SystemStatus, string> = {
  "production-ready": "var(--color-status-ready)",
  "in-productization": "var(--color-status-progress)",
  planned: "var(--color-status-planned)",
};

/**
 * Status is passed in already derived (see lib/status.ts). There is
 * deliberately no way to hand this component an arbitrary label.
 */
export function StatusBadge({ status }: { status: SystemStatus }) {
  return (
    <span className="chip">
      <span
        className="dot"
        style={{ backgroundColor: STATUS_COLOR[status] }}
        aria-hidden="true"
      />
      <span style={{ color: "var(--color-fg-secondary)" }}>
        {STATUS_LABELS[status]}
      </span>
    </span>
  );
}

export function ClassificationBadge({
  classification,
}: {
  classification: Classification;
}) {
  return (
    <span className="chip chip-mono uppercase">
      {CLASSIFICATION_LABELS[classification]}
    </span>
  );
}

export function DeploymentBadges({ paths }: { paths: DeploymentPath[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {paths.map((path) => (
        <li key={path} className="chip chip-mono">
          {DEPLOYMENT_LABELS[path]}
        </li>
      ))}
    </ul>
  );
}
