import { trustPoints } from "@/content/site";

/**
 * Positioning strip. Deliberately states capabilities of the delivery model,
 * never proof claims — no customer counts, no logos, no uptime figures.
 *
 * Four items with a line of substance each, rather than six bare labels: at six
 * the row read as a divider rather than as content, and the labels were too
 * terse to say anything a reader could not already guess from the headline.
 */
const DOT_COLORS = [
  "var(--color-dot-blue)",
  "var(--color-dot-violet)",
  "var(--color-dot-emerald)",
  "var(--color-dot-amber)",
];

export function TrustStrip() {
  return (
    <section className="hairline">
      <div className="page-container">
        <ul className="grid divide-y divide-line sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
          {trustPoints.map((point, index) => (
            <li
              key={point.title}
              className="flex flex-col gap-2 py-7 lg:px-6 lg:py-9 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="flex items-center gap-2.5">
                <span
                  className="dot"
                  style={{ backgroundColor: DOT_COLORS[index] }}
                  aria-hidden="true"
                />
                <span className="t-h3 text-fg">{point.title}</span>
              </span>
              <p className="t-small max-w-[34ch]">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
