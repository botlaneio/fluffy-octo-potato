"use client";

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <span
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
        style={{ color: "var(--color-fg-muted)" }}
        aria-hidden="true"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <circle
            cx="7"
            cy="7"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="m10.5 10.5 3 3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search systems, capabilities or categories"
        aria-label="Search AI systems"
        className="h-11 w-full rounded-[8px] border border-line pl-10 pr-3 text-[0.875rem] text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-line-accent"
        style={{ backgroundColor: "var(--color-surface)" }}
      />
    </div>
  );
}
