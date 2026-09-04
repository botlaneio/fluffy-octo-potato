import { featuredSystems } from "@/content/systems";
import { categoryBySlug, categories } from "@/content/categories";
import {
  deriveStatus,
  STATUS_LABELS,
  CLASSIFICATION_LABELS,
  gatesPassed,
  GATE_TOTAL,
} from "@/lib/status";
import { deploymentOptions } from "@/content/site";

const STATUS_COLOR = {
  "production-ready": "var(--color-status-ready)",
  "in-productization": "var(--color-status-progress)",
  planned: "var(--color-status-planned)",
} as const;

/**
 * Hero visual. Not decoration — it renders live from the same content layer as
 * the marketplace, so it can never drift from what the catalogue actually says.
 *
 * Laid out as a real table across the full container: one grid template shared
 * by the header and every row, so the columns line up instead of each row
 * negotiating its own spacing. Category and classification are the columns that
 * earn the extra width; below `lg` they drop and the row falls back to name,
 * gates and version.
 */
const COLUMNS =
  "grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-4 lg:grid-cols-[minmax(0,1fr)_180px_180px_110px_120px] lg:gap-x-6";

export function SystemsConsole() {
  const rows = featuredSystems.slice(0, 6);

  return (
    <div className="panel overflow-hidden">
      {/* Console header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 lg:px-5">
        <span className="t-mono" style={{ color: "var(--color-fg-muted)" }}>
          botlane / systems
        </span>
        <span className="t-mono" style={{ color: "var(--color-fg-faint)" }}>
          {categories.length} categories
        </span>
      </div>

      {/* Column headings. Hidden below lg, where the columns they name are also
          hidden and the labels would only add noise. */}
      <div
        className={`${COLUMNS} hidden border-b border-line px-5 py-2.5 lg:grid`}
        style={{ backgroundColor: "var(--color-bg-raised)" }}
        aria-hidden="true"
      >
        <span className="t-label" style={{ fontSize: "0.625rem" }}>
          System
        </span>
        <span className="t-label" style={{ fontSize: "0.625rem" }}>
          Category
        </span>
        <span className="t-label" style={{ fontSize: "0.625rem" }}>
          Classification
        </span>
        <span
          className="t-label text-right"
          style={{ fontSize: "0.625rem" }}
        >
          Gates
        </span>
        <span
          className="t-label text-right"
          style={{ fontSize: "0.625rem" }}
        >
          Version
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
              className={`${COLUMNS} border-b border-line px-4 py-3 last:border-b-0 lg:px-5 lg:py-3.5`}
            >
              {/* Name, with the status dot carrying the badge colour */}
              <span className="flex min-w-0 items-center gap-3">
                <span
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-[6px] border border-line"
                  style={{ backgroundColor: "var(--color-surface-2)" }}
                  title={STATUS_LABELS[status]}
                >
                  <span
                    className="dot"
                    style={{ backgroundColor: STATUS_COLOR[status] }}
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.8125rem] text-fg">
                    {system.shortName}
                  </span>
                  <span
                    className="block truncate text-[0.6875rem] lg:hidden"
                    style={{ color: "var(--color-fg-faint)" }}
                  >
                    {category?.name}
                  </span>
                </span>
              </span>

              <span
                className="hidden truncate text-[0.8125rem] lg:block"
                style={{ color: "var(--color-fg-secondary)" }}
              >
                {category?.name}
              </span>

              <span className="hidden lg:block">
                <span className="chip chip-mono">
                  {CLASSIFICATION_LABELS[system.classification]}
                </span>
              </span>

              <span
                className="t-mono hidden text-right sm:block"
                style={{ color: "var(--color-fg-faint)" }}
              >
                {passed}/{GATE_TOTAL}
              </span>

              <span
                className="t-mono text-right"
                style={{ color: "var(--color-fg-muted)" }}
              >
                {system.tech.distributionVersion ?? "—"}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Deployment rail */}
      <div
        className="border-t border-line px-4 py-4 lg:px-5"
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
