import type { FaqEntry } from "@/lib/types";

/** Native <details> disclosure — accessible, and no JavaScript to ship. */
export function FaqList({ entries }: { entries: FaqEntry[] }) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-line">
      {entries.map((entry, index) => (
        <details
          key={entry.question}
          className="group border-line"
          style={index < entries.length - 1 ? { borderBottomWidth: 1 } : undefined}
        >
          <summary className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface">
            <span className="text-[0.875rem] text-fg">{entry.question}</span>
            <span
              className="flex-none transition-transform group-open:rotate-45"
              style={{ color: "var(--color-fg-muted)" }}
              aria-hidden="true"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3v10M3 8h10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <p className="t-body px-5 pb-5 pr-12">{entry.answer}</p>
        </details>
      ))}
    </div>
  );
}
