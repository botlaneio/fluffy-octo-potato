import type { Metadata } from "next";
import { ServicePage } from "@/components/service/ServicePage";
import { customService } from "@/content/services";

export const metadata: Metadata = {
  title: "BotLane Custom",
  description:
    "Modifications, integrations, custom workflows and bespoke AI systems — specified in writing, quoted fixed against that specification, delivered as code you own.",
  alternates: { canonical: "/custom" },
};

export default function CustomPage() {
  return <ServicePage service={customService} />;
}
