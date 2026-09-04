export interface SpecRow {
  label: string;
  value: string;
  mono?: boolean;
}

export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <dl>
      {rows.map((row, index) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-4 border-line py-2.5"
          style={index < rows.length - 1 ? { borderBottomWidth: 1 } : undefined}
        >
          <dt className="t-small flex-none">{row.label}</dt>
          <dd
            className={`text-right text-[0.8125rem] ${row.mono ? "t-mono" : ""}`}
            style={{
              color: "var(--color-fg-secondary)",
              fontSize: row.mono ? "0.6875rem" : undefined,
            }}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
