import type { ResponsibilityRow } from "@/content/services";

/**
 * Who does what, per path. Used by /deploy, /managed and /developers so the
 * three pages cannot describe the same boundary in three different ways.
 */
export function ResponsibilitySplit({
  rows,
  firstColumn = "Path",
}: {
  rows: ResponsibilityRow[];
  firstColumn?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-line">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <caption className="sr-only">
            Responsibility split between the customer and BotLane
          </caption>
          <thead>
            <tr style={{ backgroundColor: "var(--color-bg-raised)" }}>
              <th scope="col" className="t-label px-5 py-3.5 font-normal">
                {firstColumn}
              </th>
              <th scope="col" className="t-label px-5 py-3.5 font-normal">
                Yours
              </th>
              <th scope="col" className="t-label px-5 py-3.5 font-normal">
                BotLane&rsquo;s
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.path} className="border-t border-line align-top">
                <td className="px-5 py-4 text-[0.8125rem] text-fg">{row.path}</td>
                <td className="t-small px-5 py-4">{row.yours}</td>
                <td className="t-small px-5 py-4">{row.ours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
