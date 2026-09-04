import { Logo } from "./ui/Logo";
import { footerNav, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="hairline">
      <div className="page-container">
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            <p className="t-small mt-5 max-w-[280px]">
              A marketplace and deployment platform for production-ready AI
              business systems. Self-host them, or have BotLane deploy and
              operate them.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8"
          >
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h2 className="t-label">{group.heading}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-[0.8125rem] text-fg-secondary transition-colors hover:text-fg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-mono" style={{ color: "var(--color-fg-faint)" }}>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="t-mono" style={{ color: "var(--color-fg-faint)" }}>
            Open-source systems remain the property of their upstream authors.
          </p>
        </div>
      </div>
    </footer>
  );
}
