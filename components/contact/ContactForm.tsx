import { enquiryRoutes } from "@/content/contact";
import { systems } from "@/content/systems";
import { ArrowRight } from "../ui/Arrow";

const fieldClass =
  "h-11 w-full rounded-[8px] border border-line px-3.5 text-[0.875rem] text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-line-accent";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="t-label mb-2 flex items-center gap-2">
      {children}
      {optional ? (
        <span style={{ color: "var(--color-fg-faint)", textTransform: "none", letterSpacing: 0 }}>
          optional
        </span>
      ) : null}
    </label>
  );
}

/**
 * Server-rendered, no client JavaScript. Validation is the browser's own, which
 * means it works before hydration and in any browser — and there is no state to
 * lose. Rendered only when a form endpoint is configured.
 */
export function ContactForm({ endpoint }: { endpoint: string }) {
  return (
    <form
      action={endpoint}
      method="post"
      className="panel flex flex-col gap-5 p-6"
      aria-labelledby="contact-form-heading"
    >
      <h2 id="contact-form-heading" className="t-h3 text-fg">
        Send an enquiry
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 [&>*]:min-w-0">
        <div>
          <Label htmlFor="name">Your name</Label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Priya Nair"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@company.com"
          />
        </div>

        <div>
          <Label htmlFor="company" optional>
            Company
          </Label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldClass}
            placeholder="Company name"
          />
        </div>

        <div>
          <Label htmlFor="topic">What is this about</Label>
          <select id="topic" name="topic" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose one
            </option>
            {enquiryRoutes.map((route) => (
              <option key={route.value} value={route.value}>
                {route.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="system" optional>
          Which system
        </Label>
        <select id="system" name="system" defaultValue="" className={fieldClass}>
          <option value="">Not specific to one</option>
          {systems.map((system) => (
            <option key={system.slug} value={system.slug}>
              {system.shortName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="message">What are you trying to fix</Label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-[8px] border border-line px-3.5 py-3 text-[0.875rem] leading-relaxed text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-line-accent"
          placeholder="What happens today, what it costs you, and which tools the process runs through."
          aria-describedby="message-hint"
        />
        <p id="message-hint" className="t-small mt-2">
          The more specific this is, the more useful the reply. Describing the
          problem beats naming a product.
        </p>
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-small max-w-[380px]">
          We use what you send to answer your enquiry. Nothing here is added to a
          marketing list.
        </p>
        <button type="submit" className="btn btn-primary flex-none">
          Send enquiry
          <ArrowRight />
        </button>
      </div>
    </form>
  );
}
