import { ArrowRight } from "../ui/Arrow";

export function FinalCTA() {
  return (
    <section className="section hairline">
      <div className="page-container">
        <div
          className="panel relative overflow-hidden px-6 py-16 text-center sm:px-12 lg:py-24"
          style={{ backgroundColor: "var(--color-bg-raised)" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[300px]"
            style={{
              background:
                "radial-gradient(ellipse 60% 100% at 50% 120%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-[640px]">
            <h2 className="t-h2 text-balance text-fg">
              Your next hire might be software.
            </h2>
            <p className="t-lead mx-auto mt-5 max-w-[480px]">
              Production-ready AI systems built for real business operations —
              deployed on your infrastructure, or run by us.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/systems" className="btn btn-primary">
                Explore AI systems
                <ArrowRight />
              </a>
              <a href="/contact" className="btn btn-secondary">
                Talk to BotLane
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
