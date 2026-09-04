import { featuredSystems } from "@/content/systems";
import { categoryBySlug } from "@/content/categories";
import { categories } from "@/content/categories";
import { deriveStatus, STATUS_LABELS, gatesPassed, GATE_TOTAL } from "@/lib/status";
import { deploymentOptions } from "@/content/site";

const STATUS_COLOR = {
  "production-ready": "var(--color-status-ready)",
  "in-productization": "var(--color-status-progress)",
  planned: "var(--color-status-planned)",
} as const;

/**
 * Hero visual. Not decoration — it renders live from the same content layer as
 * the marketplace, so it can never drift from what the catalogue actually says.
 */
export function SystemsConsole() {
  const rows = featuredSystems.slice(0, 5);

  return (
    <div className="panel overflow-hidden">
      {/* Console header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="t-mono" style={{ color: "var(--color-fg-muted)" }}>
          botlane / systems
        </span>
        <span className="t-mono" style={{ color: "var(--color-fg-faint)" }}>
          {categories.length} categories
        </span>
      </div>

      {/* System rows */}
      <ul>
        {rows.map((system) => {
          const status = deriveStatus(system);
          const category = categoryBySlug(system.categorySlug);
          const passed = gatesPassed(system.gates);
          return (
            <li
              key={system.slug}
              className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-b-0"
            >
              <span
                className="flex h-7 w-7 flex-none items-center justify-center rounded-[6px] border border-line"
                style={{ backgroundColor: "var(--color-surface-2)" }}
                aria-hidden="true"
              >
                <span
                  className="dot"
                  style={{ backgroundColor: STATUS_COLOR[status] }}
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.8125rem] text-fg">
                  {system.shortName}
                </span>
                <span
                  className="block truncate text-[0.6875rem]"
                  style={{ color: "var(--color-fg-faint)" }}
                >
                  {category?.name}
                </span>
              </span>

              <span
                className="t-mono hidden flex-none sm:block"
                style={{ color: "var(--color-fg-faint)" }}
              >
                {passed}/{GATE_TOTAL} gates
              </span>

              <span
                className="t-mono flex-none"
                style={{ color: "var(--color-fg-muted)" }}
                title={STATUS_LABELS[status]}
              >
                {system.tech.distributionVersion ?? "—"}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Deployment rail */}
      <div
        className="border-t border-line px-4 py-4"
        style={{ backgroundColor: "var(--color-bg-raised)" }}
      >
        <p className="t-label mb-3" style={{ fontSize: "0.625rem" }}>
          Deployment path
        </p>
        <ol className="flex items-center gap-2">
          {deploymentOptions.map((option, index) => (
            <li key={option.id} className="flex flex-1 items-center gap-2">
              <span
                className="flex-1 rounded-[6px] border border-line px-2.5 py-2 text-center text-[0.6875rem] text-fg-secondary"
                style={{ backgroundColor: "var(--color-surface-2)" }}
              >
                {option.label}
              </span>
              {index < deploymentOptions.length - 1 ? (
                <span
                  className="h-px w-3 flex-none"
                  style={{ backgroundColor: "var(--color-line-strong)" }}
                  aria-hidden="true"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
