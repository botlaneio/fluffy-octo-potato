import type { Metadata } from "next";

import { Logo } from "@/components/ui/Logo";
import { SignInForm } from "@/components/auth/SignInForm";
import { ArrowRight } from "@/components/ui/Arrow";

import { accountsEnabled, authEndpoint, contactEmail } from "@/content/site";
import { accountWillHold, selfHostNeedsNoAccount } from "@/content/account";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "BotLane accounts cover licensing, release access and managed reporting. Running a self-hosted BotLane system never requires one.",
  alternates: { canonical: "/signin" },
  // Nothing to index while there is nothing to sign in to.
  robots: accountsEnabled ? { index: true, follow: true } : { index: false, follow: true },
};

/**
 * Deliberately not the site chrome. Auth pages are a single task, so this one
 * drops the nav and footer for a centred layout — the one page on the site
 * where having somewhere else to click is a distraction.
 */
export default function SignInPage() {
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center px-6 py-16 sm:py-24"
    >
      <a href="/" aria-label="BotLane home" className="flex-none">
        <Logo size={24} />
      </a>

      <div className="mt-14 w-full max-w-[520px]">
        {accountsEnabled ? (
          <>
            <SignInForm endpoint={authEndpoint} />
            <p className="t-small mt-6 text-center">
              Trouble signing in?{" "}
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent("Sign-in help")}`}
                className="text-fg-secondary underline underline-offset-4 transition-colors hover:text-fg"
              >
                Email us
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <div className="panel p-7">
              <p className="t-label">Accounts</p>
              <h1 className="t-h2-sm mt-4 text-balance text-fg">
                Accounts aren&rsquo;t open yet.
              </h1>
              <p className="t-body mt-4">
                No BotLane system has closed all twelve release gates, so there
                are no licences to hold and nothing to sign in to. Rather than
                put a login box in front of an empty room, this page says so.
              </p>

              <div
                className="mt-6 rounded-[10px] border border-line p-4"
                style={{ backgroundColor: "var(--color-bg-raised)" }}
              >
                <p className="t-body">
                  <span className="text-fg">{selfHostNeedsNoAccount.claim}</span>{" "}
                  {selfHostNeedsNoAccount.detail}
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="/contact" className="btn btn-primary">
                  Ask about early access
                  <ArrowRight />
                </a>
                <a href="/systems" className="btn btn-secondary">
                  Browse systems
                </a>
              </div>
            </div>

            <section className="panel mt-4 p-7" aria-labelledby="account-scope">
              <h2 id="account-scope" className="t-label">
                What an account will hold
              </h2>
              <dl className="mt-5 flex flex-col gap-5">
                {accountWillHold.map((item) => (
                  <div key={item.title}>
                    <dt className="text-[0.875rem] text-fg">{item.title}</dt>
                    <dd className="t-small mt-1.5">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <p className="t-small mt-6 text-center">
              <a
                href="/"
                className="text-fg-secondary underline underline-offset-4 transition-colors hover:text-fg"
              >
                Back to botlane.io
              </a>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
