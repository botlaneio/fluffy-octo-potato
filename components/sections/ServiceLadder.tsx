import { SectionHeader } from "../ui/SectionHeader";
import { ArrowRight } from "../ui/Arrow";
import { serviceLadder } from "@/content/site";

export function ServiceLadder() {
  return (
    <section className="section hairline">
      <div className="page-container">
        <SectionHeader
          eyebrow="Beyond the standard system"
          color="blue"
          align="between"
          title="Need more than what ships in the box?"
          lead="Off-the-shelf covers most of it. When it doesn't, BotLane modifies the system, builds the integration, or writes something new."
          action={
            <a href="/custom" className="btn btn-secondary">
              Talk about custom work
              <ArrowRight />
            </a>
          }
        />

        <ol className="mt-12 flex flex-col lg:flex-row lg:items-stretch">
          {serviceLadder.map((rung, index) => (
            <li
              key={rung.label}
              className="relative flex-1 border-l border-line py-5 pl-6 lg:border-l-0 lg:border-t lg:py-0 lg:pl-0 lg:pr-8 lg:pt-6"
            >
              <span
                className="absolute h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor:
                    index === 0 ? "var(--color-accent)" : "var(--color-line-strong)",
                  left: "-3.5px",
                  top: "26px",
                }}
                aria-hidden="true"
              />
              <span
                className="t-mono block lg:mt-0"
                style={{ color: "var(--color-fg-faint)" }}
              >
                0{index + 1}
              </span>
              <h3 className="t-h3 mt-2 text-fg">{rung.label}</h3>
              <p className="t-small mt-2 max-w-[260px]">{rung.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
