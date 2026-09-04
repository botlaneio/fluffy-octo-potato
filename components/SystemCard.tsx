import type { AiSystem } from "@/lib/types";
import { categoryBySlug } from "@/content/categories";
import { deriveStatus, CLASSIFICATION_LABELS } from "@/lib/status";
import { StatusBadge, DeploymentBadges } from "./ui/Badge";
import { ArrowRight } from "./ui/Arrow";

export function SystemCard({ system }: { system: AiSystem }) {
  const status = deriveStatus(system);
  const category = categoryBySlug(system.categorySlug);
  const shownCapabilities = system.capabilities.slice(0, 4);
  const remaining = system.capabilities.length - shownCapabilities.length;

  return (
    <article
      className="panel-interactive group relative flex flex-col p-5"
      data-system={system.slug}
      data-category={system.categorySlug}
      data-classification={system.classification}
      data-status={status}
      data-deployment={system.deployment.join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="chip chip-mono">{category?.name}</span>
        <StatusBadge status={status} />
      </div>

      <h3 className="t-h3 mt-5 text-fg">
        {/* Stretched link: the whole card is the target, but only the title
            is in the tab order and announced as the link. */}
        <a
          href={`/systems/${system.slug}`}
          className="before:absolute before:inset-0 before:content-['']"
        >
          {system.shortName}
        </a>
      </h3>

      <p className="t-body mt-2.5 flex-1">{system.outcome}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {shownCapabilities.map((capability) => (
          <li key={capability} className="chip">
            {capability}
          </li>
        ))}
        {remaining > 0 ? (
          <li className="chip chip-mono">+{remaining}</li>
        ) : null}
      </ul>

      {/* Transparent supply chain: never implies BotLane wrote the upstream. */}
      {system.upstream ? (
        <p
          className="t-mono mt-5 leading-relaxed"
          style={{ color: "var(--color-fg-faint)" }}
        >
          Built on {system.upstream.project} {system.upstream.pinnedVersion} —
          packaged, tested and supported by BotLane.
        </p>
      ) : (
        <p
          className="t-mono mt-5"
          style={{ color: "var(--color-fg-faint)" }}
        >
          {CLASSIFICATION_LABELS[system.classification]}
        </p>
      )}

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
        <DeploymentBadges paths={system.deployment} />
        <span
          className="flex flex-none items-center gap-1.5 text-[0.8125rem] text-fg-secondary transition-colors group-hover:text-fg"
          aria-hidden="true"
        >
          View
          <ArrowRight size={13} />
        </span>
      </div>
    </article>
  );
}
