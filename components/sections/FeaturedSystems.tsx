import { SectionHeader } from "../ui/SectionHeader";
import { SystemCard } from "../SystemCard";
import { ArrowRight } from "../ui/Arrow";
import { featuredSystems } from "@/content/systems";

export function FeaturedSystems() {
  return (
    <section id="systems" className="section hairline">
      <div className="page-container">
        <SectionHeader
          eyebrow="AI systems"
          color="emerald"
          align="between"
          title="Systems built for real work."
          lead="Each one is a complete business system for a specific function — versioned, documented, and deployable on infrastructure you control."
          action={
            <a href="/systems" className="btn btn-secondary">
              Browse all systems
              <ArrowRight />
            </a>
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSystems.map((system) => (
            <SystemCard key={system.slug} system={system} />
          ))}
        </div>
      </div>
    </section>
  );
}
