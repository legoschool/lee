import Brick from "@/components/lego/Brick";
import SectionTitle from "@/components/lego/SectionTitle";
import Tag from "@/components/lego/Tag";
import { brickPalette } from "@/components/lego/colors";
import type { TrainingItem } from "@/data/types";

export default function Training({ items }: { items: TrainingItem[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <SectionTitle icon="🎤" color="red">
        연수 · 강의 (진행)
      </SectionTitle>
      <div className="space-y-4">
        {items.map((t, i) => (
          <Brick
            key={i}
            color={brickPalette[i % brickPalette.length]}
            studs={5}
            interactive
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="text-lg font-bold">{t.title}</h3>
              {t.date && (
                <span className="text-sm font-semibold opacity-80">{t.date}</span>
              )}
            </div>
            {(t.host || t.location) && (
              <p className="text-sm font-semibold opacity-90">
                {[t.host, t.location].filter(Boolean).join(" · ")}
              </p>
            )}
            {t.description && <p className="mt-1.5 leading-relaxed">{t.description}</p>}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {t.role && <Tag>{t.role}</Tag>}
              {t.audience && <Tag>{`대상 ${t.audience}`}</Tag>}
              {t.hours && <Tag>{t.hours}</Tag>}
              {t.participants && <Tag>{t.participants}</Tag>}
            </div>
          </Brick>
        ))}
      </div>
    </section>
  );
}
