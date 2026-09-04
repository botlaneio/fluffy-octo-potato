import { SectionHeader } from "../ui/SectionHeader";
import { Check } from "../ui/Arrow";
import { deploymentOptions } from "@/content/site";

/**
 * Three operational choices, not three pricing tiers. Each card states who it
 * is for, because the difference is how much of the running you want to own.
 */
export function DeploymentOptions() {
  return (
    <section id="deployment" className="section hairline">
      <div className="page-container">
        <SectionHeader
          eyebrow="Deployment"
          color="cyan"
          title="Run it yourself, or don't."
          lead="The same system, three levels of involvement. You can move between them later without changing what you deployed."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {deploymentOptions.map((option, index) => (
            <article key={option.id} className="panel flex flex-col p-6">
              <div className="flex items-center gap-2.5">
                <span
                  className="t-mono"
                  style={{ color: "var(--color-fg-faint)" }}
                >
                  0{index + 1}
                </span>
                <h3 className="t-h3 text-fg">{option.label}</h3>
              </div>

              <p className="t-body mt-4">{option.summary}</p>

              <p
                className="t-mono mt-4"
                style={{ color: "var(--color-fg-faint)" }}
              >
                {option.audience}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                {option.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 flex-none"
                      style={{ color: "var(--color-accent)" }}
                    >
                      <Check size={13} />
                    </span>
                    <span className="t-small" style={{ color: "var(--color-fg-secondary)" }}>
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
