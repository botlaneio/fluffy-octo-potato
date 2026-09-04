import { SectionHeader } from "../ui/SectionHeader";
import { categories } from "@/content/categories";
import { systemCountByCategory } from "@/content/systems";

export function CategoryGrid() {
  return (
    <section id="categories" className="section hairline">
      <div className="page-container">
        <SectionHeader
          eyebrow="Categories"
          color="violet"
          title="A system for every part of your business."
          lead="The catalogue is organised by business function, so a category page is a real destination rather than a filtered view of everything."
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-line sm:grid-cols-2 lg:grid-cols-3"
            style={{ backgroundColor: "var(--color-line)" }}>
          {categories.map((category) => {
            const count = systemCountByCategory(category.slug);
            return (
              <li key={category.slug} style={{ backgroundColor: "var(--color-bg)" }}>
                <a
                  href={`/systems/c/${category.slug}`}
                  className="flex h-full flex-col gap-1.5 p-5 transition-colors hover:bg-surface"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-[0.9375rem] font-medium tracking-[-0.014em] text-fg">
                      {category.name}
                    </span>
                    {count > 0 ? (
                      <span
                        className="t-mono flex-none"
                        style={{ color: "var(--color-fg-faint)" }}
                      >
                        {count}
                      </span>
                    ) : null}
                  </span>
                  <span className="t-small">{category.description}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
