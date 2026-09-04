import type { Solution } from "@/lib/types";
import { solutionSystems, solutionReadiness } from "@/content/solutions";
import { GATE_TOTAL } from "@/lib/status";
import { ArrowRight } from "../ui/Arrow";

export function SolutionCard({ solution }: { solution: Solution }) {
  const used = solutionSystems(solution);
  const readiness = solutionReadiness(solution);

  return (
    <article className="panel-interactive group relative flex flex-col p-6">
      <h3 className="t-h3 text-fg">
        <a
          href={`/solutions/${solution.slug}`}
          className="before:absolute before:inset-0 before:content-['']"
        >
          {solution.name}
        </a>
      </h3>

      <p className="t-body mt-2.5 flex-1">{solution.headline}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {used.map((system) => (
          <li key={system.slug} className="chip chip-mono">
            {system.shortName}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
        {/* Readiness comes from the systems behind it, so a solution can never
            look further along than its parts. */}
        <span className="t-mono" style={{ color: "var(--color-fg-faint)" }}>
          {readiness.count} {readiness.count === 1 ? "system" : "systems"} ·{" "}
          {readiness.anyReady
            ? "available"
            : `furthest ${readiness.best}/${GATE_TOTAL}`}
        </span>
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
