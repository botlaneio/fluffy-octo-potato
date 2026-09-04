import { trustPoints } from "@/content/site";

/**
 * Positioning strip. Deliberately states capabilities of the delivery model,
 * never proof claims — no customer counts, no logos, no uptime figures.
 */
export function TrustStrip() {
  return (
    <section className="hairline">
      <div className="page-container">
        <ul className="grid grid-cols-2 divide-line md:grid-cols-3 lg:grid-cols-6 lg:divide-x">
          {trustPoints.map((point) => (
            <li
              key={point}
              className="border-b border-line px-1 py-6 lg:border-b-0 lg:px-5 lg:first:pl-0 lg:last:pr-0"
            >
              <span
                className="t-mono block"
                style={{ color: "var(--color-fg-secondary)" }}
              >
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
