import Brick from "@/components/lego/Brick";
import SectionTitle from "@/components/lego/SectionTitle";
import Tag from "@/components/lego/Tag";
import { groupByYearDesc } from "@/lib/group";
import type { JournalEntry } from "@/data/types";

export default function Journal({ entries }: { entries: JournalEntry[] }) {
  if (entries.length === 0) return null;
  const groups = groupByYearDesc(entries, (e) => e.year);

  return (
    <section>
      <SectionTitle icon="📔" color="purple">
        교단일기 · 성장일기
      </SectionTitle>

      <div className="relative space-y-6 pl-4">
        {/* 세로 타임라인 줄 */}
        <span className="absolute left-1 top-1 bottom-1 w-1 rounded bg-black/15" aria-hidden="true" />
        {groups.map(({ year, items }) => (
          <div key={year} className="space-y-3">
            <div className="relative">
              <span className="absolute -left-[1.05rem] top-1 h-4 w-4 rounded-full border-[3px] border-black/70 bg-lego-yellow" aria-hidden="true" />
              <h3 className="text-2xl font-bold text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]">
                {year}
              </h3>
            </div>
            {items.map((e, i) => (
              <Brick key={i} color="white" studs={4} interactive>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h4 className="text-lg font-bold">{e.title}</h4>
                  {e.date && (
                    <span className="text-sm opacity-60">{e.date}</span>
                  )}
                </div>
                {e.body && (
                  <p className="mt-1.5 whitespace-pre-line leading-relaxed text-lego-black/90">
                    {e.body}
                  </p>
                )}
                {e.tags && e.tags.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                )}
              </Brick>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
