import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FeaturedSystems } from "@/components/sections/FeaturedSystems";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DeploymentOptions } from "@/components/sections/DeploymentOptions";
import { ReleaseGates } from "@/components/sections/ReleaseGates";
import { ServiceLadder } from "@/components/sections/ServiceLadder";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <FeaturedSystems />
        <CategoryGrid />
        <HowItWorks />
        <DeploymentOptions />
        <ReleaseGates />
        <ServiceLadder />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
