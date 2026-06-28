import Brick from "@/components/lego/Brick";
import SectionTitle from "@/components/lego/SectionTitle";
import type { AwardItem } from "@/data/types";

export default function Awards({ items }: { items: AwardItem[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <SectionTitle icon="🏆" color="orange">
        수상 · 자격증
      </SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((a, i) => (
          <Brick key={i} color="yellow" studs={4} interactive>
            <div className="flex items-start gap-2">
              <span className="text-xl" aria-hidden="true">
                🏅
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold leading-tight">{a.title}</h3>
                  {a.kind && (
                    <span className="rounded-full border-2 border-black/70 bg-white/90 px-2 py-0.5 text-xs font-bold">
                      {a.kind}
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold opacity-80">
                  {[a.issuer, a.date].filter(Boolean).join(" · ")}
                </p>
                {a.description && <p className="mt-1 text-sm">{a.description}</p>}
              </div>
            </div>
          </Brick>
        ))}
      </div>
    </section>
  );
}
