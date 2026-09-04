import type { UpstreamAttribution } from "@/lib/types";
import { CLASSIFICATION_DESCRIPTIONS } from "@/lib/status";

/**
 * Upstream attribution is given its own panel rather than a footnote. Being
 * unambiguous about what BotLane did and did not write is the point.
 */
export function UpstreamPanel({
  upstream,
  productName,
}: {
  upstream: UpstreamAttribution;
  productName: string;
}) {
  return (
    <aside
      className="panel p-5"
      style={{ backgroundColor: "var(--color-bg-raised)" }}
      aria-label="Upstream attribution"
    >
      <p className="t-label">Built on open source</p>

      <p className="t-body mt-3">
        {productName} is a BotLane Distribution built on{" "}
        <span className="text-fg">{upstream.project}</span>, pinned at{" "}
        <span className="t-mono" style={{ color: "var(--color-fg)" }}>
          {upstream.pinnedVersion}
        </span>
        . BotLane packages, tests, hardens, documents and supports it —{" "}
        <span className="text-fg">BotLane did not author the upstream project</span>
        , which remains the work of its own authors under its own licence.
      </p>

      <p className="t-small mt-3">{CLASSIFICATION_DESCRIPTIONS.distribution}</p>

      {upstream.url ? (
        <a
          href={upstream.url}
          rel="noopener noreferrer"
          target="_blank"
          className="mt-4 inline-flex text-[0.8125rem] text-fg-secondary underline underline-offset-4 transition-colors hover:text-fg"
        >
          Upstream project
        </a>
      ) : null}
    </aside>
  );
}
