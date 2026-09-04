import { SectionHeader } from "../ui/SectionHeader";
import { GateChecklist } from "../product/GateChecklist";
import { systemBySlug } from "@/content/systems";
import {
  GATE_TOTAL,
  gatesPassed,
  deriveStatus,
  STATUS_LABELS,
} from "@/lib/status";

/**
 * The section that answers "why not just clone the repo myself?" — framed
 * positively, and demonstrated on a real system rather than asserted.
 */
export function ReleaseGates() {
  const exemplar = systemBySlug("ai-whatsapp-sales-desk");
  if (!exemplar) return null;

  const passed = gatesPassed(exemplar.gates);
  const status = deriveStatus(exemplar);

  return (
    <section id="production-grade" className="section hairline">
      <div className="page-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Production grade"
              color="rose"
              title="From repository to business system."
              lead="A repository is where the software starts, not where it becomes something a business can depend on. Twelve release gates sit between the two."
            />

            <p className="t-body mt-6 max-w-[440px]">
              Every system publishes its gate status. A system is only badged
              production ready when all twelve are closed — that badge is
              computed from the gates, so it cannot be written by hand or
              claimed early.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/trust" className="btn btn-secondary">
                How releases are gated
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="panel overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
                <a
                  href={`/systems/${exemplar.slug}`}
                  className="text-[0.8125rem] text-fg transition-colors hover:text-fg-secondary"
                >
                  {exemplar.shortName}
                </a>
                <span className="flex items-center gap-3">
                  <span className="t-mono" style={{ color: "var(--color-fg-muted)" }}>
                    {passed}/{GATE_TOTAL} gates
                  </span>
                  <span
                    className="t-mono"
                    style={{ color: "var(--color-status-progress)" }}
                  >
                    {STATUS_LABELS[status]}
                  </span>
                </span>
              </div>

              <GateChecklist gates={exemplar.gates} />

              {exemplar.upstream ? (
                <p
                  className="t-mono border-t border-line px-5 py-4 leading-relaxed"
                  style={{
                    color: "var(--color-fg-faint)",
                    backgroundColor: "var(--color-bg-raised)",
                  }}
                >
                  Built on {exemplar.upstream.project}{" "}
                  {exemplar.upstream.pinnedVersion} — packaged, tested and
                  supported by BotLane. BotLane did not author the upstream
                  project.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
