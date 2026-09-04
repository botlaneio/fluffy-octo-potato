import type { AiSystem } from "@/lib/types";
import { deriveStatus } from "@/lib/status";
import { ArrowRight } from "../ui/Arrow";

/**
 * CTA hierarchy follows availability. A system that cannot be deployed today
 * does not get a "Deploy yourself" button — the page would be writing a cheque
 * the release gates have not cleared.
 */
export function ProductCta({ system }: { system: AiSystem }) {
  const status = deriveStatus(system);

  if (status === "production-ready") {
    return (
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href="/developers" className="btn btn-primary">
          Deploy it yourself
          <ArrowRight />
        </a>
        <a href="/deploy" className="btn btn-secondary">
          Have BotLane deploy it
        </a>
        <a href="/contact" className="btn btn-ghost">
          Talk to BotLane
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href="/contact" className="btn btn-primary">
        {status === "in-productization"
          ? "Ask about early access"
          : "Register interest"}
        <ArrowRight />
      </a>
      <a href="/custom" className="btn btn-secondary">
        Discuss a custom build
      </a>
    </div>
  );
}
