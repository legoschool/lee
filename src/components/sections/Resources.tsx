import Brick from "@/components/lego/Brick";
import SectionTitle from "@/components/lego/SectionTitle";
import Tag from "@/components/lego/Tag";
import { brickPalette } from "@/components/lego/colors";
import { groupByYearDesc } from "@/lib/group";
import type { ResourceItem } from "@/data/types";

export default function Resources({ items }: { items: ResourceItem[] }) {
  if (items.length === 0) return null;
  const groups = groupByYearDesc(items, (r) => r.year ?? "");

  return (
    <section>
      <SectionTitle icon="📦" color="orange">
        개발 자료
      </SectionTitle>
      <div className="space-y-5">
        {groups.map(({ year, items: list }, gi) => (
          <div key={year}>
            <div className="mb-2 inline-block rounded-lg border-2 border-black/70 bg-white px-2.5 py-0.5 text-sm font-bold">
              {year}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {list.map((r, i) => (
                <Brick
                  key={i}
                  color={brickPalette[(gi + i) % brickPalette.length]}
                  studs={4}
                  interactive
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold leading-tight">{r.title}</h3>
                    {r.isPublic && <span title="공개 자료">🔓</span>}
                  </div>
                  {r.description && (
                    <p className="mt-1 text-sm leading-relaxed">{r.description}</p>
                  )}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {r.type && <Tag>{r.type}</Tag>}
                    {r.topic && <Tag>{r.topic}</Tag>}
                    {r.audience && <Tag>{r.audience}</Tag>}
                  </div>
                  {r.url && (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block rounded-lg border-2 border-black/70 bg-white px-3 py-1 text-sm font-bold text-lego-black"
                    >
                      자료 보기 ↗
                    </a>
                  )}
                </Brick>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
