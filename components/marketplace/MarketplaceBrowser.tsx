"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { AiSystem, Category } from "@/lib/types";
import {
  CLASSIFICATION_LABELS,
  DEPLOYMENT_LABELS,
  deriveStatus,
  STATUS_LABELS,
} from "@/lib/status";
import { SystemCard } from "../SystemCard";
import { FacetGroup, type FacetValue } from "./Facet";
import { SearchInput } from "./SearchInput";

type FacetKey = "category" | "deployment" | "classification" | "status";

const FACET_PARAM: Record<FacetKey, string> = {
  category: "category",
  deployment: "deployment",
  classification: "class",
  status: "status",
};

const EMPTY: Record<FacetKey, string[]> = {
  category: [],
  deployment: [],
  classification: [],
  status: [],
};

function countBy(systems: AiSystem[], pick: (s: AiSystem) => string[]) {
  const counts = new Map<string, number>();
  for (const system of systems) {
    for (const value of pick(system)) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return counts;
}

export function MarketplaceBrowser({
  systems,
  categories,
}: {
  systems: AiSystem[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [facets, setFacets] = useState<Record<FacetKey, string[]>>(EMPTY);

  /* Read filters out of the URL once, so a filtered view is shareable. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = { ...EMPTY };
    (Object.keys(FACET_PARAM) as FacetKey[]).forEach((key) => {
      const raw = params.get(FACET_PARAM[key]);
      next[key] = raw ? raw.split(",").filter(Boolean) : [];
    });
    setQuery(params.get("q") ?? "");
    setFacets(next);
  }, []);

  /* Write them back without adding history entries. */
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    (Object.keys(FACET_PARAM) as FacetKey[]).forEach((key) => {
      if (facets[key].length) params.set(FACET_PARAM[key], facets[key].join(","));
    });
    const search = params.toString();
    window.history.replaceState(
      null,
      "",
      search ? `?${search}` : window.location.pathname,
    );
  }, [query, facets]);

  const toggle = useCallback((key: FacetKey, value: string) => {
    setFacets((current) => {
      const list = current[key];
      return {
        ...current,
        [key]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      };
    });
  }, []);

  const clearAll = useCallback(() => {
    setQuery("");
    setFacets(EMPTY);
  }, []);

  const categoryName = useCallback(
    (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug,
    [categories],
  );

  /* --- Facet values, counted across the whole catalogue ----------------- */

  const facetValues = useMemo(() => {
    const categoryCounts = countBy(systems, (s) => [s.categorySlug]);
    const deploymentCounts = countBy(systems, (s) => s.deployment);
    const classificationCounts = countBy(systems, (s) => [s.classification]);
    const statusCounts = countBy(systems, (s) => [deriveStatus(s)]);

    const category: FacetValue[] = categories
      .filter((c) => (categoryCounts.get(c.slug) ?? 0) > 0)
      .map((c) => ({
        value: c.slug,
        label: c.name,
        count: categoryCounts.get(c.slug) ?? 0,
      }));

    const deployment: FacetValue[] = (
      Object.keys(DEPLOYMENT_LABELS) as (keyof typeof DEPLOYMENT_LABELS)[]
    ).map((key) => ({
      value: key,
      label: DEPLOYMENT_LABELS[key],
      count: deploymentCounts.get(key) ?? 0,
    }));

    const classification: FacetValue[] = (
      Object.keys(CLASSIFICATION_LABELS) as (keyof typeof CLASSIFICATION_LABELS)[]
    ).map((key) => ({
      value: key,
      label: CLASSIFICATION_LABELS[key],
      count: classificationCounts.get(key) ?? 0,
    }));

    const status: FacetValue[] = (
      Object.keys(STATUS_LABELS) as (keyof typeof STATUS_LABELS)[]
    )
      .map((key) => ({
        value: key,
        label: STATUS_LABELS[key],
        count: statusCounts.get(key) ?? 0,
      }))
      .filter((v) => v.count > 0);

    return { category, deployment, classification, status };
  }, [systems, categories]);

  /* --- Filtering -------------------------------------------------------- */

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return systems.filter((system) => {
      if (
        facets.category.length &&
        !facets.category.includes(system.categorySlug)
      ) {
        return false;
      }
      if (
        facets.deployment.length &&
        !facets.deployment.some((d) =>
          (system.deployment as string[]).includes(d),
        )
      ) {
        return false;
      }
      if (
        facets.classification.length &&
        !facets.classification.includes(system.classification)
      ) {
        return false;
      }
      if (facets.status.length && !facets.status.includes(deriveStatus(system))) {
        return false;
      }
      if (!needle) return true;

      const haystack = [
        system.name,
        system.outcome,
        categoryName(system.categorySlug),
        system.upstream?.project ?? "",
        ...system.capabilities,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [systems, facets, query, categoryName]);

  const activeChips = useMemo(() => {
    const chips: { key: FacetKey; value: string; label: string }[] = [];
    facets.category.forEach((v) =>
      chips.push({ key: "category", value: v, label: categoryName(v) }),
    );
    facets.deployment.forEach((v) =>
      chips.push({
        key: "deployment",
        value: v,
        label: DEPLOYMENT_LABELS[v as keyof typeof DEPLOYMENT_LABELS],
      }),
    );
    facets.classification.forEach((v) =>
      chips.push({
        key: "classification",
        value: v,
        label: CLASSIFICATION_LABELS[v as keyof typeof CLASSIFICATION_LABELS],
      }),
    );
    facets.status.forEach((v) =>
      chips.push({
        key: "status",
        value: v,
        label: STATUS_LABELS[v as keyof typeof STATUS_LABELS],
      }),
    );
    return chips;
  }, [facets, categoryName]);

  const activeCount = activeChips.length + (query ? 1 : 0);

  const filterPanel = (
    <div className="flex flex-col gap-8">
      <FacetGroup
        legend="Category"
        name="category"
        values={facetValues.category}
        selected={facets.category}
        onToggle={(v) => toggle("category", v)}
      />
      <FacetGroup
        legend="Deployment"
        name="deployment"
        values={facetValues.deployment}
        selected={facets.deployment}
        onToggle={(v) => toggle("deployment", v)}
      />
      <FacetGroup
        legend="Classification"
        name="classification"
        values={facetValues.classification}
        selected={facets.classification}
        onToggle={(v) => toggle("classification", v)}
      />
      <FacetGroup
        legend="Release status"
        name="status"
        values={facetValues.status}
        selected={facets.status}
        onToggle={(v) => toggle("status", v)}
      />
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[232px_1fr] lg:gap-12">
      {/* Desktop rail */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">{filterPanel}</div>
      </aside>

      <div className="min-w-0">
        <SearchInput value={query} onChange={setQuery} />

        {/* Mobile filter drawer */}
        <details className="group mt-3 lg:hidden">
          <summary className="btn btn-secondary w-full justify-between">
            <span>Filters</span>
            <span className="t-mono" style={{ color: "var(--color-fg-muted)" }}>
              {activeCount > 0 ? `${activeCount} active` : "None"}
            </span>
          </summary>
          <div className="panel mt-3 p-5">{filterPanel}</div>
        </details>

        {/* Result bar */}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line pb-4">
          <p className="t-mono" style={{ color: "var(--color-fg-muted)" }} aria-live="polite">
            {results.length} of {systems.length} systems
          </p>

          {activeChips.map((chip) => (
            <button
              key={`${chip.key}:${chip.value}`}
              type="button"
              onClick={() => toggle(chip.key, chip.value)}
              className="chip transition-colors hover:border-line-strong"
            >
              {chip.label}
              <span aria-hidden="true" style={{ color: "var(--color-fg-faint)" }}>
                ✕
              </span>
              <span className="sr-only">Remove filter</span>
            </button>
          ))}

          {activeCount > 0 ? (
            <button
              type="button"
              onClick={clearAll}
              className="t-mono ml-auto transition-colors hover:text-fg"
              style={{ color: "var(--color-fg-muted)" }}
            >
              Clear all
            </button>
          ) : null}
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((system) => (
              <SystemCard key={system.slug} system={system} />
            ))}
          </div>
        ) : (
          <div className="panel mt-6 px-6 py-16 text-center">
            <p className="t-h3 text-fg">No systems match those filters.</p>
            <p className="t-body mx-auto mt-2 max-w-[380px]">
              The catalogue is still growing. If you need a system for a function
              that isn&rsquo;t here yet, BotLane Custom builds it.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
              <button type="button" onClick={clearAll} className="btn btn-secondary">
                Clear filters
              </button>
              <a href="/custom" className="btn btn-primary">
                Talk about a custom system
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
