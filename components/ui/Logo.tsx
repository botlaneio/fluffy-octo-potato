/**
 * ---------------------------------------------------------------------------
 * THE GATE — BotLane's mark.
 *
 * Two bars make the lane. The block sits above the threshold it has crossed.
 * It is the twelve-gate release mechanism from lib/status.ts drawn as a shape:
 * a system is production-ready when it has passed, and there is no field
 * anyone can set by hand to claim otherwise.
 *
 * Drawn on a 32-unit grid at 3.6u so the silhouette survives at 16px. The
 * threshold rule is the first thing to disappear at small sizes, so it is
 * dropped below 20px — the two bars and the block still read.
 *
 * Two-tone by default: `currentColor` carries the lane, the accent carries the
 * payload. In one-colour contexts pass `mono`, and both take currentColor.
 * ---------------------------------------------------------------------------
 */

interface MarkProps {
  size?: number;
  /** Reproduce in a single colour — print, embroidery, a stamped favicon. */
  mono?: boolean;
  /**
   * Show the threshold rule. Defaults to on at 20px and above, where it is
   * still legible. Pass explicitly to override.
   */
  threshold?: boolean;
}

export function LogoMark({ size = 22, mono = false, threshold }: MarkProps) {
  const showThreshold = threshold ?? size >= 20;
  const payload = mono ? "currentColor" : "var(--color-accent)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* The lane */}
      <rect x="4" y="3" width="3.6" height="26" rx="1.8" fill="currentColor" />
      <rect
        x="24.4"
        y="3"
        width="3.6"
        height="26"
        rx="1.8"
        fill="currentColor"
      />

      {/* The threshold it crossed */}
      {showThreshold && (
        <rect
          x="7.6"
          y="19.4"
          width="16.8"
          height="2.4"
          rx="1.2"
          fill="currentColor"
          opacity="0.45"
        />
      )}

      {/* The system, through */}
      <rect
        x="11.6"
        y="6.4"
        width="8.8"
        height="8.8"
        rx="2.4"
        fill={payload}
      />
    </svg>
  );
}

export function Logo({ size = 22, mono = false }: MarkProps) {
  return (
    <span className="inline-flex items-center gap-2.5 text-fg">
      <LogoMark size={size} mono={mono} />
      <span
        className="font-medium tracking-[-0.02em]"
        style={{ fontSize: "0.9375rem" }}
      >
        BotLane
      </span>
    </span>
  );
}
