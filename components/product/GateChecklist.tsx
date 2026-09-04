import type { ReleaseGates } from "@/lib/types";
import { GATE_KEYS, GATE_TOTAL, RELEASE_GATE_LABELS } from "@/lib/status";
import { Check } from "../ui/Arrow";

/**
 * Renders the twelve release gates and their real state. Used on the homepage
 * and on every product page, so the two can never tell different stories.
 */
export function GateChecklist({
  gates,
  columns = 2,
}: {
  gates: ReleaseGates;
  columns?: 1 | 2;
}) {
  return (
    <ul className={columns === 2 ? "grid sm:grid-cols-2" : "grid"}>
      {GATE_KEYS.map((key, index) => {
        const done = gates[key];
        const inLastRow =
          columns === 2 ? index >= GATE_TOTAL - 2 : index === GATE_TOTAL - 1;

        return (
          <li
            key={key}
            className="flex items-center gap-3 border-b border-line px-5 py-3"
            style={inLastRow ? { borderBottomWidth: 0 } : undefined}
          >
            <span
              className="flex h-4 w-4 flex-none items-center justify-center rounded-full border"
              style={
                done
                  ? {
                      borderColor: "transparent",
                      backgroundColor:
                        "color-mix(in srgb, var(--color-status-ready) 18%, transparent)",
                      color: "var(--color-status-ready)",
                    }
                  : { borderColor: "var(--color-line-strong)", color: "transparent" }
              }
              aria-hidden="true"
            >
              <Check size={10} />
            </span>

            <span
              className="text-[0.8125rem]"
              style={{
                color: done ? "var(--color-fg-secondary)" : "var(--color-fg-faint)",
              }}
            >
              {RELEASE_GATE_LABELS[key]}
            </span>

            <span className="sr-only">{done ? "complete" : "not yet complete"}</span>
          </li>
        );
      })}
    </ul>
  );
}
