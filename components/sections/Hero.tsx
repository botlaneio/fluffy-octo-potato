import { Eyebrow } from "../ui/SectionHeader";
import { ArrowRight } from "../ui/Arrow";
import { SystemsConsole } from "../SystemsConsole";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Restrained atmospheric wash — one soft ellipse, no blobs, no gradient spheres. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% -20%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="page-container relative">
        <div className="grid items-center gap-14 pb-20 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-16 lg:pb-28 lg:pt-28">
          <div className="lg:col-span-6">
            <Eyebrow color="blue">Production-ready AI business systems</Eyebrow>

            <h1 className="t-display mt-6 text-balance text-fg">
              AI systems that actually run your business.
            </h1>

            <p className="t-lead mt-6 max-w-[520px]">
              Production-ready AI software for sales, support, operations and
              professional services. Self-host it on your own infrastructure, or
              have BotLane deploy and operate it for you.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/systems" className="btn btn-primary">
                Explore AI systems
                <ArrowRight />
              </a>
              <a href="/deploy" className="btn btn-secondary">
                Have BotLane deploy it
              </a>
            </div>

          </div>

          <div className="lg:col-span-6">
            <SystemsConsole />
          </div>
        </div>
      </div>
    </section>
  );
}
