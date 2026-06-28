import Brick from "@/components/lego/Brick";
import SectionTitle from "@/components/lego/SectionTitle";
import { brickPalette } from "@/components/lego/colors";
import type { ExperienceItem } from "@/data/types";

export default function Experience({ items }: { items: ExperienceItem[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <SectionTitle icon="💼" color="red">
        경력 · 활동
      </SectionTitle>
      <div className="space-y-4">
        {items.map((e, i) => (
          <Brick
            key={i}
            color={brickPalette[i % brickPalette.length]}
            studs={5}
            interactive
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="text-lg font-bold">
                {e.role}
                <span className="font-semibold opacity-90"> · {e.organization}</span>
              </h3>
              <span className="text-sm font-semibold opacity-80">
                {e.startDate} ~ {e.endDate || "현재"}
              </span>
            </div>
            {e.location && <p className="text-sm opacity-80">📍 {e.location}</p>}
            {e.description && <p className="mt-1.5 leading-relaxed">{e.description}</p>}
            {e.highlights && e.highlights.length > 0 && (
              <ul className="mt-2 space-y-1">
                {e.highlights.map((h, j) => (
                  <li key={j} className="flex gap-2 text-sm">
                    <span aria-hidden="true">🔹</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </Brick>
        ))}
      </div>
    </section>
  );
}
