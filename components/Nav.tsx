import { Logo } from "./ui/Logo";
import { primaryNav, accountsEnabled } from "@/content/site";

/**
 * Zero client JavaScript. The mobile menu is a native <details> disclosure,
 * which is keyboard operable and screen-reader announced without hydration.
 */
export function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-line"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-bg) 82%, transparent)",
        backdropFilter: "blur(12px)",
      }}
    >
      <nav aria-label="Primary" className="page-container">
        <div className="flex h-16 items-center justify-between gap-8">
          <a href="/" className="flex-none" aria-label="BotLane home">
            <Logo />
          </a>

          {/* Desktop navigation */}
          <ul className="hidden flex-1 items-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex h-9 items-center rounded-[6px] px-3 text-[0.875rem] text-fg-secondary transition-colors hover:bg-surface hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden flex-none items-center gap-2 lg:flex">
            {/* No accounts yet, so no link to them. One flag, no dead links. */}
            {accountsEnabled ? (
              <a href="/signin" className="btn btn-sm btn-ghost">
                Sign in
              </a>
            ) : null}
            <a href="/systems" className="btn btn-sm btn-primary">
              Explore marketplace
            </a>
          </div>

          {/* Mobile disclosure */}
          <details className="group relative lg:hidden">
            <summary
              className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-line-strong text-fg-secondary"
              aria-label="Open menu"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 4.5h12M2 11.5h12"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  className="group-open:hidden"
                />
                <path
                  d="m3.5 3.5 9 9m0-9-9 9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  className="hidden group-open:block"
                />
              </svg>
            </summary>

            <div className="fixed inset-x-0 top-16 z-50 border-b border-line bg-bg px-6 pb-6 pt-2">
              <ul className="flex flex-col">
                {primaryNav.map((item) => (
                  <li key={item.href} className="border-b border-line last:border-0">
                    <a
                      href={item.href}
                      className="flex h-12 items-center text-[0.9375rem] text-fg-secondary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col gap-2">
                <a href="/systems" className="btn btn-primary w-full">
                  Explore marketplace
                </a>
                {accountsEnabled ? (
                  <a href="/signin" className="btn btn-secondary w-full">
                    Sign in
                  </a>
                ) : null}
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
