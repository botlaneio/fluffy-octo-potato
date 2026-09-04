/**
 * Wide commands scroll inside their own container so the page body never
 * scrolls sideways. No copy button: it would cost a client island, and this
 * site ships none outside the marketplace filter.
 */
export function CodeBlock({
  label,
  children,
}: {
  label?: string;
  children: string;
}) {
  return (
    <figure className="panel m-0 min-w-0 overflow-hidden">
      {label ? (
        <figcaption
          className="t-mono border-b border-line px-4 py-2.5"
          style={{
            color: "var(--color-fg-muted)",
            backgroundColor: "var(--color-bg-raised)",
          }}
        >
          {label}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto">
        <pre className="px-4 py-3.5">
          <code
            className="t-mono block whitespace-pre"
            style={{
              color: "var(--color-fg-secondary)",
              fontSize: "0.75rem",
              lineHeight: 1.75,
            }}
          >
            {children}
          </code>
        </pre>
      </div>
    </figure>
  );
}
