import { ArrowRight } from "../ui/Arrow";

/**
 * Email sign-in link rather than a password.
 *
 * There is no password to leak, reset, or store badly — which is the right
 * default for a company whose whole argument is that it handles the boring
 * security work properly. Server-rendered, native validation, no client JS.
 */
export function SignInForm({ endpoint }: { endpoint: string }) {
  return (
    <form
      action={endpoint}
      method="post"
      className="panel flex flex-col gap-5 p-6"
      aria-labelledby="signin-heading"
    >
      <div>
        <h1 id="signin-heading" className="t-h3 text-fg">
          Sign in to BotLane
        </h1>
        <p className="t-small mt-2">
          We email you a sign-in link. There is no password to remember, and none
          for us to lose.
        </p>
      </div>

      <div>
        <label htmlFor="email" className="t-label mb-2 block">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          className="h-11 w-full rounded-[8px] border border-line px-3.5 text-[0.875rem] text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-line-accent"
          placeholder="you@company.com"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Email me a sign-in link
        <ArrowRight />
      </button>

      <p className="t-small border-t border-line pt-5">
        Accounts cover licensing, releases and managed reporting. Running a
        self-hosted system never requires one.
      </p>
    </form>
  );
}
