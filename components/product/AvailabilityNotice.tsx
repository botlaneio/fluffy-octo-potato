import type { AiSystem } from "@/lib/types";
import { GATE_TOTAL, deriveStatus, gatesPassed } from "@/lib/status";

/**
 * Says plainly what a visitor can and cannot do with this system today.
 * Rendered from the gates, so it cannot contradict the status badge beside it.
 */
export function AvailabilityNotice({ system }: { system: AiSystem }) {
  const status = deriveStatus(system);
  if (status === "production-ready") return null;

  const passed = gatesPassed(system.gates);
  const inProgress = status === "in-productization";

  return (
    <div
      className="panel flex items-start gap-3 p-5"
      style={{
        backgroundColor: "var(--color-bg-raised)",
        borderColor: "color-mix(in srgb, var(--color-status-progress) 22%, var(--color-line))",
      }}
      role="note"
    >
      <span
        className="dot mt-2 flex-none"
        style={{
          backgroundColor: inProgress
            ? "var(--color-status-progress)"
            : "var(--color-status-planned)",
        }}
        aria-hidden="true"
      />
      <p className="t-body">
        {inProgress ? (
          <>
            <span className="text-fg">This system is in productization.</span>{" "}
            {passed} of {GATE_TOTAL} release gates are closed. It is not
            available for general deployment until all twelve are.
          </>
        ) : (
          <>
            <span className="text-fg">This system is planned.</span>{" "}
            Productization has not started, so there is no release, no images
            and no documentation to download yet.
          </>
        )}
      </p>
    </div>
  );
}
