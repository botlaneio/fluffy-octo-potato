/**
 * Builds single-file previews of the exported pages for sharing.
 *
 * The exported HTML already contains every system, so the preview keeps the
 * markup verbatim and inlines the stylesheet. For /systems it swaps the React
 * island for a small stand-in that drives the same DOM, since a shared preview
 * cannot load Next's chunks.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "/home/claude/botlane/out";

const css = readdirSync(join(OUT, "_next/static/css"))
  .map((f) => readFileSync(join(OUT, "_next/static/css", f), "utf8"))
  .join("\n");

/*
 * Typefaces are embedded as data URIs rather than linked from Google, so a
 * shared preview makes the same number of third-party requests as the site
 * itself: none. Latin subsets only — enough for every page's copy, and it
 * keeps each preview around 150KB heavier rather than 300KB.
 */
const fontFace = (family, weights, file) => `@font-face{font-family:"${family}";font-style:normal;font-weight:${weights};font-display:swap;src:url(data:font/woff2;base64,${readFileSync(
  join("/home/claude/botlane/public/fonts", file),
).toString("base64")}) format("woff2");}`;

const FONTS = `<style>
${fontFace("Inter Variable", "100 900", "inter-latin.woff2")}
${fontFace("JetBrains Mono Variable", "100 800", "jetbrains-mono-latin.woff2")}
</style>`;

const GROUND = `<style>
/* Committed single-theme design: the ground is painted explicitly so the page
   holds on either host theme. */
:root { color-scheme: dark; }
html, body { background-color: #070708; margin: 0; }
</style>`;

function bodyOf(file) {
  const html = readFileSync(join(OUT, file), "utf8");
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
  if (!match) throw new Error(`no body in ${file}`);
  return match[1]
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<script[^>]*\/>/g, "")
    .trim();
}

/* Stand-in for the React island: same behaviour, no framework. */
const FILTER_SCRIPT = `<script>
(function () {
  var cards = Array.prototype.slice.call(
    document.querySelectorAll("article[data-system]")
  );
  if (!cards.length) return;

  var search = document.querySelector('input[type="search"]');
  var counter = document.querySelector('[aria-live="polite"]');
  var total = cards.length;

  var empty = document.createElement("p");
  empty.className = "panel t-body";
  empty.style.cssText = "margin-top:1.5rem;padding:4rem 1.5rem;text-align:center";
  empty.textContent = "No systems match those filters.";
  empty.hidden = true;
  var grid = cards[0].parentNode;
  grid.parentNode.insertBefore(empty, grid.nextSibling);

  function checkedValues(name) {
    var out = [];
    document
      .querySelectorAll('input[name="' + name + '"]:checked')
      .forEach(function (input) {
        if (out.indexOf(input.value) === -1) out.push(input.value);
      });
    return out;
  }

  function apply() {
    var category = checkedValues("category");
    var deployment = checkedValues("deployment");
    var classification = checkedValues("classification");
    var status = checkedValues("status");
    var needle = search ? search.value.trim().toLowerCase() : "";
    var shown = 0;

    cards.forEach(function (card) {
      var deployments = (card.getAttribute("data-deployment") || "").split(" ");
      var ok =
        (!category.length ||
          category.indexOf(card.getAttribute("data-category")) > -1) &&
        (!deployment.length ||
          deployment.some(function (d) {
            return deployments.indexOf(d) > -1;
          })) &&
        (!classification.length ||
          classification.indexOf(card.getAttribute("data-classification")) > -1) &&
        (!status.length || status.indexOf(card.getAttribute("data-status")) > -1) &&
        (!needle || card.textContent.toLowerCase().indexOf(needle) > -1);

      card.hidden = !ok;
      if (ok) shown++;
    });

    empty.hidden = shown !== 0;
    grid.hidden = shown === 0;
    if (counter) counter.textContent = shown + " of " + total + " systems";
  }

  document.addEventListener("change", function (event) {
    var input = event.target;
    if (!input || input.type !== "checkbox" || !input.name) return;
    // Desktop rail and mobile drawer render the same facets: keep them in step.
    document
      .querySelectorAll(
        'input[name="' + input.name + '"][value="' + input.value + '"]'
      )
      .forEach(function (twin) {
        twin.checked = input.checked;
      });
    apply();
  });

  if (search) search.addEventListener("input", apply);

  document.addEventListener("click", function (event) {
    var el = event.target.closest ? event.target.closest("button") : null;
    if (!el || el.textContent.trim() !== "Clear all") return;
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach(function (i) { i.checked = false; });
    if (search) search.value = "";
    apply();
  });

  apply();
})();
</script>`;

const pages = [
  {
    file: "index.html",
    out: "/home/claude/botlane-homepage.html",
    title: "BotLane Homepage",
    script: "",
  },
  {
    file: "systems.html",
    out: "/home/claude/botlane-marketplace.html",
    title: "BotLane AI Systems Marketplace",
    script: FILTER_SCRIPT,
  },
  {
    file: "trust.html",
    out: "/home/claude/botlane-trust.html",
    title: "BotLane Trust",
    script: "",
  },
  {
    file: "developers.html",
    out: "/home/claude/botlane-developers.html",
    title: "BotLane Self-Hosting",
    script: "",
  },
  {
    file: "deploy.html",
    out: "/home/claude/botlane-deploy.html",
    title: "BotLane Deploy",
    script: "",
  },
  {
    file: "managed.html",
    out: "/home/claude/botlane-managed.html",
    title: "BotLane Managed",
    script: "",
  },
  {
    file: "custom.html",
    out: "/home/claude/botlane-custom.html",
    title: "BotLane Custom",
    script: "",
  },
  {
    file: "solutions.html",
    out: "/home/claude/botlane-solutions.html",
    title: "BotLane Solutions",
    script: "",
  },
  {
    file: "solutions/automate-sales-operations.html",
    out: "/home/claude/botlane-solution-detail.html",
    title: "Automate Sales Operations",
    script: "",
  },
  {
    // Contact with the form endpoint configured, to show the built form.
    // The committed default renders the email fallback instead.
    file: "contact-form-on.html",
    out: "/home/claude/botlane-contact.html",
    title: "BotLane Contact",
    script: "",
  },
  {
    file: "signin.html",
    out: "/home/claude/botlane-signin.html",
    title: "BotLane Accounts",
    script: "",
  },
  {
    file: "systems/c/sales-crm.html",
    out: "/home/claude/botlane-category.html",
    title: "AI Systems for Sales & CRM",
    script: "",
  },
  {
    file: "changelog.html",
    out: "/home/claude/botlane-changelog.html",
    title: "BotLane Releases",
    script: "",
  },
  {
    file: "about.html",
    out: "/home/claude/botlane-about.html",
    title: "About BotLane",
    script: "",
  },
  {
    file: "resources.html",
    out: "/home/claude/botlane-resources.html",
    title: "BotLane Resources",
    script: "",
  },
  {
    file: "legal/privacy.html",
    out: "/home/claude/botlane-privacy.html",
    title: "BotLane Privacy",
    script: "",
  },
  {
    // Richest product page — exercises every optional section of the template.
    file: "systems/ai-whatsapp-sales-desk.html",
    out: "/home/claude/botlane-product-page.html",
    title: "AI WhatsApp Sales Desk",
    script: "",
  },
];

for (const page of pages) {
  // Some entries point at a variant build (e.g. contact with the form endpoint
  // set) that is not present in every export. Skip loudly rather than throwing.
  if (!existsSync(join(OUT, page.file))) {
    console.log(`skip ${page.file} — not in this export`);
    continue;
  }
  const html = `<title>${page.title}</title>
${FONTS}
${GROUND}
<style>
${css}
</style>
${bodyOf(page.file)}
${page.script}
`;
  writeFileSync(page.out, html);
  console.log(page.out, (html.length / 1024).toFixed(0) + "kb");
}
