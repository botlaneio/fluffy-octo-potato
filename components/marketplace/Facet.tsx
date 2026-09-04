"use client";

import { Check } from "../ui/Arrow";

export interface FacetValue {
  value: string;
  label: string;
  count: number;
}

/**
 * The checked appearance is driven by `peer-checked:` CSS off the real input,
 * not by React state. The control therefore looks correct from the very first
 * paint and stays correct even if the island never hydrates.
 */
export function FacetGroup({
  legend,
  name,
  values,
  selected,
  onToggle,
}: {
  legend: string;
  name: string;
  values: FacetValue[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="t-label mb-3">{legend}</legend>
      <ul className="flex flex-col gap-0.5">
        {values.map((item) => {
          const isSelected = selected.includes(item.value);
          // A facet that can only ever return nothing is shown, so the taxonomy
          // stays legible, but is not offered as a choice.
          const isEmpty = item.count === 0 && !isSelected;

          return (
            <li key={item.value}>
              <label
                className={`-mx-2 flex items-center gap-2.5 rounded-[6px] px-2 py-1.5 transition-colors ${
                  isEmpty
                    ? "cursor-not-allowed opacity-45"
                    : "cursor-pointer hover:bg-surface"
                }`}
              >
                <input
                  type="checkbox"
                  name={name}
                  value={item.value}
                  checked={isSelected}
                  disabled={isEmpty}
                  onChange={() => onToggle(item.value)}
                  className="peer sr-only"
                />

                <span
                  aria-hidden="true"
                  className="flex h-[15px] w-[15px] flex-none items-center justify-center rounded-[4px] border border-line-strong text-transparent transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
                >
                  <Check size={10} />
                </span>

                <span className="flex-1 text-[0.8125rem] text-fg-secondary peer-checked:text-fg">
                  {item.label}
                </span>

                <span
                  className="t-mono flex-none"
                  style={{ color: "var(--color-fg-faint)" }}
                >
                  {item.count}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
