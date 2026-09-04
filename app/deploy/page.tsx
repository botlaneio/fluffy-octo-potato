import type { Metadata } from "next";
import { ServicePage } from "@/components/service/ServicePage";
import { deployService } from "@/content/services";

export const metadata: Metadata = {
  title: "BotLane Deploy",
  description:
    "BotLane installs and configures your chosen AI system on infrastructure you own, validates it against its release gates, and hands it over documented.",
  alternates: { canonical: "/deploy" },
};

export default function DeployPage() {
  return <ServicePage service={deployService} />;
}
