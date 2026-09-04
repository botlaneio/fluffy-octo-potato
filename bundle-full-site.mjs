/**
 * Stitches the whole exported site into one self-contained HTML file with a
 * small hash router, so every page can be browsed and navigated offline —
 * useful when a real deployment is not available.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const OUT = "/home/claude/botlane/out";

function walk(dir, base = "") {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() && e.name !== "_next"
      ? walk(join(dir, e.name), `${base}${e.name}/`)
      : e.name.endsWith(".html") && e.name !== "404.html"
        ? [`${base}${e.name}`]
        : [],
  );
}

const css = readdirSync(join(OUT, "_next/static/css"))
  .map((f) => readFileSync(join(OUT, "_next/static/css", f), "utf8"))
  .join("\n");

const b64 = (f) => readFileSync(join("/tmp", f)).toString("base64");
const fontCss = `
@font-face{font-family:"Inter Variable";font-style:normal;font-weight:400 600;font-display:swap;src:url(data:font/woff2;base64,${b64("dep-inter.woff2")}) format("woff2");}
@font-face{font-family:"JetBrains Mono Variable";font-style:normal;font-weight:400 500;font-display:swap;src:url(data:font/woff2;base64,${b64("dep-mono.woff2")}) format("woff2");}`;

const files = walk(OUT);
const routes = [];

for (const f of files) {
  const html = readFileSync(join(OUT, f), "utf8");
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
  if (!m) continue;
  let body = m[1]
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<script[^>]*\/>/g, "")
    .trim();

  // /systems.html -> /systems ; /index.html -> /
  const path = "/" + f.replace(/\.html$/, "").replace(/^index$/, "");
  const route = path === "/" ? "/" : path;

  // internal links become router hashes; in-page anchors are preserved as ::id
  body = body.replace(/href="(\/[^"]*)"/g, (_, href) => {
    const [p, anchor] = href.split("#");
    const clean = p.replace(/\/$/, "") || "/";
    return `href="#${clean}${anchor ? "::" + anchor : ""}"`;
  });

  const title = (html.match(/<title>([^<]*)<\/title>/) || [, "BotLane"])[1];
  routes.push({ route, title, body });
}

routes.sort((a, b) => (a.route === "/" ? -1 : a.route.localeCompare(b.route)));

const page = `<title>BotLane — Full Site</title>
<style>
:root { color-scheme: dark; }
html, body { background-color: #070708; margin: 0; }
${fontCss}
</style>
<style>
${css}
</style>
<div id="app">
${routes
  .map(
    (r) =>
      `<div class="route" data-route="${r.route}" data-title="${r.title.replace(/"/g, "&quot;")}" hidden>${r.body}</div>`,
  )
  .join("\n")}
</div>
<script>
(function () {
  var views = Array.prototype.slice.call(document.querySelectorAll(".route"));
  var byRoute = {};
  views.forEach(function (v) { byRoute[v.getAttribute("data-route")] = v; });

  function show(route, anchor) {
    var view = byRoute[route] || byRoute["/"];
    views.forEach(function (v) { v.hidden = v !== view; });
    document.title = view.getAttribute("data-title") || "BotLane";
    if (anchor) {
      var el = view.querySelector("#" + CSS.escape(anchor));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }

  function render() {
    var h = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!h) return show("/");
    // in-page anchor on the current view (e.g. "#gates")
    if (h.indexOf("/") !== 0) {
      var current = views.filter(function (v) { return !v.hidden; })[0];
      var el = current && current.querySelector("#" + CSS.escape(h));
      if (el) el.scrollIntoView();
      return;
    }
    var parts = h.split("::");
    show(parts[0].replace(/\\/$/, "") || "/", parts[1]);
  }

  // Marketplace filtering, scoped to whichever view is showing.
  function wireFilters(view) {
    if (!view || view.__wired) return;
    var cards = Array.prototype.slice.call(view.querySelectorAll("article[data-system]"));
    if (!cards.length) return;
    view.__wired = true;
    var search = view.querySelector('input[type="search"]');
    var counter = view.querySelector('[aria-live="polite"]');
    var grid = cards[0].parentNode;
    var total = cards.length;
    var empty = document.createElement("p");
    empty.className = "panel t-body";
    empty.style.cssText = "margin-top:1.5rem;padding:4rem 1.5rem;text-align:center";
    empty.textContent = "No systems match those filters.";
    empty.hidden = true;
    grid.parentNode.insertBefore(empty, grid.nextSibling);

    function checked(name) {
      var out = [];
      view.querySelectorAll('input[name="' + name + '"]:checked').forEach(function (i) {
        if (out.indexOf(i.value) === -1) out.push(i.value);
      });
      return out;
    }
    function apply() {
      var cat = checked("category"), dep = checked("deployment"),
          cls = checked("classification"), st = checked("status");
      var q = search ? search.value.trim().toLowerCase() : "";
      var shown = 0;
      cards.forEach(function (card) {
        var deps = (card.getAttribute("data-deployment") || "").split(" ");
        var ok =
          (!cat.length || cat.indexOf(card.getAttribute("data-category")) > -1) &&
          (!dep.length || dep.some(function (d) { return deps.indexOf(d) > -1; })) &&
          (!cls.length || cls.indexOf(card.getAttribute("data-classification")) > -1) &&
          (!st.length || st.indexOf(card.getAttribute("data-status")) > -1) &&
          (!q || card.textContent.toLowerCase().indexOf(q) > -1);
        card.hidden = !ok;
        if (ok) shown++;
      });
      empty.hidden = shown !== 0;
      grid.hidden = shown === 0;
      if (counter) counter.textContent = shown + " of " + total + " systems";
    }
    view.addEventListener("change", function (e) {
      var i = e.target;
      if (!i || i.type !== "checkbox" || !i.name) return;
      view.querySelectorAll('input[name="' + i.name + '"][value="' + i.value + '"]')
        .forEach(function (t) { t.checked = i.checked; });
      apply();
    });
    if (search) search.addEventListener("input", apply);
    view.addEventListener("click", function (e) {
      var el = e.target.closest ? e.target.closest("button") : null;
      if (!el || el.textContent.trim() !== "Clear all") return;
      view.querySelectorAll('input[type="checkbox"]').forEach(function (i) { i.checked = false; });
      if (search) search.value = "";
      apply();
    });
    apply();
  }

  var _show = show;
  show = function (route, anchor) {
    _show(route, anchor);
    wireFilters(byRoute[route]);
  };

  window.addEventListener("hashchange", render);
  render();
})();
</script>
`;

writeFileSync("/home/claude/botlane-full-site.html", page);
console.log(`routes bundled: ${routes.length}`);
console.log(`size: ${(page.length / 1024 / 1024).toFixed(2)} MB`);
