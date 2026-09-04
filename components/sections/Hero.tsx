import { Eyebrow } from "../ui/SectionHeader";
import { ArrowRight } from "../ui/Arrow";
import { SystemsConsole } from "../SystemsConsole";

/**
 * The hero stacks rather than splitting the container in two.
 *
 * A 6/6 split forces the headline into a half-width track, where it breaks to
 * three lines of very large type and crowds the visual beside it. Stacked, each
 * element gets the width it actually wants: the headline a measure that breaks
 * it cleanly in two, the lead a narrower one so the two are visibly different
 * shapes, and the console the full container — which is also the only width at
 * which it can show the catalogue as a real table rather than a squeezed list.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Backdrop, in two layers over the near-black ground.

          A soft gold wash, then a gold dot grid masked to an ellipse so it
          fades out well before the console rather than tiling to the edges
          like wallpaper. The mask is what keeps it a backdrop: an unmasked
          grid reads as a texture applied to the page, a masked one reads as
          light falling on part of it.

          No blobs, no spheres, no mesh gradient. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[820px]"
        style={{
          background:
            "radial-gradient(ellipse 58% 74% at 50% 2%, color-mix(in srgb, var(--color-hero-glow) 16%, transparent), transparent 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[820px]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--color-hero-grid) 23%, transparent) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 56% 64% at 50% 26%, #000 28%, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 56% 64% at 50% 26%, #000 28%, transparent 76%)",
        }}
      />

      <div className="page-container relative">
        <div className="pt-16 md:pt-24 lg:pt-28">
          <Eyebrow color="blue">Production-ready AI business systems</Eyebrow>

          {/* Measured to break in two lines at desktop. Without the cap the
              line runs the full 1200px container and stops being a headline. */}
          <h1 className="t-display mt-6 max-w-[21ch] text-balance text-fg">
            AI systems that actually run your business.
          </h1>

          <p className="t-lead mt-7 max-w-[560px]">
            Production-ready AI software for sales, support, operations and
            professional services. Self-host it on your own infrastructure, or
            have BotLane deploy and operate it for you.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="/systems" className="btn btn-primary">
              Explore AI systems
              <ArrowRight />
            </a>
            <a href="/deploy" className="btn btn-secondary">
              Have BotLane deploy it
            </a>
          </div>
        </div>

        <div className="pb-16 pt-14 md:pt-16 lg:pb-24 lg:pt-20">
          <SystemsConsole />
        </div>
      </div>
    </section>
  );
}
