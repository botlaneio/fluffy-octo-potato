import { systems } from "@/content/systems";
import { categoryBySlug } from "@/content/categories";
import {
  CLASSIFICATION_LABELS,
  GATE_TOTAL,
  deriveStatus,
  gatesPassed,
} from "@/lib/status";
import { StatusBadge } from "../ui/Badge";

/**
 * The whole catalogue and its real gate state, rendered from the same data the
 * badges use. Publishing what is not finished is the point of the page — a
 * status board that could only ever show good news would not be worth reading.
 */
export function CatalogueStatus() {
  const rows = systems
    .map((system) => ({ system, passed: gatesPassed(system.gates) }))
    .sort((a, b) => b.passed - a.passed);

  return (
    <div className="overflow-hidden rounded-[12px] border border-line">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">
            Release gate status for every system in the BotLane catalogue
          </caption>
          <thead>
            <tr style={{ backgroundColor: "var(--color-bg-raised)" }}>
              <th scope="col" className="t-label px-5 py-3.5 font-normal">
                System
              </th>
              <th scope="col" className="t-label px-5 py-3.5 font-normal">
                Classification
              </th>
              <th scope="col" className="t-label px-5 py-3.5 font-normal">
                Gates
              </th>
              <th scope="col" className="t-label px-5 py-3.5 font-normal">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ system, passed }) => {
              const status = deriveStatus(system);
              const category = categoryBySlug(system.categorySlug);

              return (
                <tr key={system.slug} className="border-t border-line">
                  <td className="px-5 py-4">
                    <a
                      href={`/systems/${system.slug}`}
                      className="block text-[0.875rem] text-fg transition-colors hover:text-fg-secondary"
                    >
                      {system.shortName}
                    </a>
                    <span
                      className="block text-[0.75rem]"
                      style={{ color: "var(--color-fg-faint)" }}
                    >
                      {category?.name}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className="t-mono"
                      style={{ color: "var(--color-fg-muted)" }}
                    >
                      {CLASSIFICATION_LABELS[system.classification]}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="flex items-center gap-2.5">
                      <span
                        className="h-1 w-16 flex-none overflow-hidden rounded-full"
                        style={{ backgroundColor: "var(--color-surface-3)" }}
                        aria-hidden="true"
                      >
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: `${(passed / GATE_TOTAL) * 100}%`,
                            backgroundColor:
                              passed === GATE_TOTAL
                                ? "var(--color-status-ready)"
                                : "var(--color-status-progress)",
                          }}
                        />
                      </span>
                      <span
                        className="t-mono"
                        style={{ color: "var(--color-fg-muted)" }}
                      >
                        {passed}/{GATE_TOTAL}
                      </span>
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
