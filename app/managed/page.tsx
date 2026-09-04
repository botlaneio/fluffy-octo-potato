import type { Metadata } from "next";
import { ServicePage } from "@/components/service/ServicePage";
import { managedService } from "@/content/services";

export const metadata: Metadata = {
  title: "BotLane Managed",
  description:
    "BotLane operates your AI system — monitoring, updates, backups with tested restores, maintenance and operational support on infrastructure you own.",
  alternates: { canonical: "/managed" },
};

export default function ManagedPage() {
  return <ServicePage service={managedService} />;
}
