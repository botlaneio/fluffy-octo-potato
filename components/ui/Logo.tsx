export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="6.5"
        stroke="var(--color-line-strong)"
      />
      <path
        d="M6 15.5 L11 6.5"
        stroke="var(--color-accent)"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M10 17.5 L15 8.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M14 15.5 L18 8.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-fg">
      <LogoMark size={size} />
      <span
        className="font-medium tracking-[-0.02em]"
        style={{ fontSize: "0.9375rem" }}
      >
        BotLane
      </span>
    </span>
  );
}
