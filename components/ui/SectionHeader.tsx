import type { ReactNode } from "react";

type DotColor = "blue" | "emerald" | "amber" | "violet" | "rose" | "cyan";

const DOT_VARS: Record<DotColor, string> = {
  blue: "var(--color-dot-blue)",
  emerald: "var(--color-dot-emerald)",
  amber: "var(--color-dot-amber)",
  violet: "var(--color-dot-violet)",
  rose: "var(--color-dot-rose)",
  cyan: "var(--color-dot-cyan)",
};

export function Eyebrow({
  children,
  color = "blue",
}: {
  children: ReactNode;
  color?: DotColor;
}) {
  return (
    <p className="t-label flex items-center gap-2">
      <span
        className="dot"
        style={{ backgroundColor: DOT_VARS[color] }}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

/**
 * `size` picks the heading's place in the hierarchy: "lg" for a section that
 * opens a page, "md" for one section among many on a long document, where a
 * page-sized heading repeated seven times would flatten the structure.
 */
export function SectionHeader({
  id,
  eyebrow,
  color = "blue",
  title,
  lead,
  action,
  align = "left",
  size = "lg",
}: {
  id?: string;
  eyebrow: string;
  color?: DotColor;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  align?: "left" | "between";
  size?: "lg" | "md";
}) {
  const large = size === "lg";

  return (
    <div
      className={
        align === "between"
          ? "flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          : "flex flex-col gap-5"
      }
    >
      <div className="max-w-[640px]">
        <Eyebrow color={color}>{eyebrow}</Eyebrow>
        <h2
          id={id}
          className={`${large ? "t-h2 mt-5" : "t-h2-sm mt-4"} text-fg text-balance`}
        >
          {title}
        </h2>
        {lead ? (
          <p
            className={
              large ? "t-lead mt-4 max-w-[560px]" : "t-body mt-3.5 max-w-[560px]"
            }
          >
            {lead}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex-none">{action}</div> : null}
    </div>
  );
}
