import { SectionHeader } from "../ui/SectionHeader";
import { howItWorks } from "@/content/site";

export function HowItWorks() {
  return (
    <section className="section hairline">
      <div className="page-container">
        <SectionHeader
          eyebrow="How BotLane works"
          color="amber"
          title="From catalogue to running system."
          lead="Four decisions, in order. Each one is yours to make — including the one where you decide BotLane shouldn't be involved at all."
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-line md:grid-cols-2 lg:grid-cols-4"
            style={{ backgroundColor: "var(--color-line)" }}>
          {howItWorks.map((item) => (
            <li
              key={item.step}
              className="flex flex-col p-6"
              style={{ backgroundColor: "var(--color-bg)" }}
            >
              <span
                className="t-mono"
                style={{ color: "var(--color-accent)" }}
              >
                {item.step}
              </span>
              <h3 className="t-h3 mt-4 text-fg">{item.title}</h3>
              <p className="t-body mt-2">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
