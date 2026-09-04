import type { ReactNode } from "react";

/**
 * One section of the product template. Callers render it only when they have
 * content for it — the template never emits an empty section.
 */
export function ProductSection({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line pt-10">
      <h2 className="t-label">{title}</h2>
      {note ? <p className="t-small mt-2 max-w-[540px]">{note}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}
