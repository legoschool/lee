import Brick from "@/components/lego/Brick";
import SectionTitle from "@/components/lego/SectionTitle";
import { brickPalette } from "@/components/lego/colors";
import type { Skill } from "@/data/types";

const TOTAL_STUDS = 10;

/** 숙련도(0~100)를 채워진/빈 스터드 줄로 표현 */
function StudMeter({ level }: { level?: number }) {
  const filled = level === undefined ? 0 : Math.round((level / 100) * TOTAL_STUDS);
  return (
    <div className="flex gap-1">
      {Array.from({ length: TOTAL_STUDS }).map((_, i) => (
        <span
          key={i}
          className={`stud h-3 w-3 ${i < filled ? "bg-lego-yellow" : "bg-black/15"}`}
        />
      ))}
    </div>
  );
}

export default function Skills({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  // 카테고리별 묶기 (순서 보존)
  const groups = new Map<string, Skill[]>();
  for (const s of skills) {
    const key = s.category || "기타";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(s);
  }

  return (
    <section>
      <SectionTitle icon="🧱" color="lime">
        스킬
      </SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {[...groups.entries()].map(([category, items], gi) => (
          <Brick key={category} color={brickPalette[gi % brickPalette.length]} studs={4}>
            <h3 className="mb-3 text-lg font-bold">{category}</h3>
            <ul className="space-y-2.5">
              {items.map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-3">
                  <span className="font-semibold">{s.name}</span>
                  {s.level !== undefined && <StudMeter level={s.level} />}
                </li>
              ))}
            </ul>
          </Brick>
        ))}
      </div>
    </section>
  );
}
