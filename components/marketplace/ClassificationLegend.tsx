import {
  CLASSIFICATION_LABELS,
  CLASSIFICATION_DESCRIPTIONS,
} from "@/lib/status";
import type { Classification } from "@/lib/types";

const ORDER: Classification[] = ["original", "distribution", "integration"];

/**
 * Stating the three classifications up front is the point of the page as much
 * as the catalogue is — a buyer should know what they are looking at before
 * they open anything.
 */
export function ClassificationLegend() {
  return (
    <section
      aria-labelledby="classification-heading"
      className="panel mt-10 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-raised)" }}
    >
      <h2 id="classification-heading" className="t-label px-5 pt-5">
        How systems are classified
      </h2>
      <dl className="grid gap-px sm:grid-cols-3" style={{ marginTop: "1rem" }}>
        {ORDER.map((key) => (
          <div key={key} className="px-5 pb-5 sm:pb-6">
            <dt className="text-[0.8125rem] font-medium text-fg">
              {CLASSIFICATION_LABELS[key]}
            </dt>
            <dd className="t-small mt-1.5">{CLASSIFICATION_DESCRIPTIONS[key]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
