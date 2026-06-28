import Brick from "@/components/lego/Brick";
import SectionTitle from "@/components/lego/SectionTitle";
import type { EducationItem } from "@/data/types";

export default function Education({ items }: { items: EducationItem[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <SectionTitle icon="🎓" color="blue">
        학력
      </SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((e, i) => (
          <Brick key={i} color="white" studs={4}>
            <h3 className="text-lg font-bold">{e.school}</h3>
            <p className="text-sm font-semibold opacity-80">
              {[e.field, e.degree].filter(Boolean).join(" · ")}
            </p>
            <p className="text-sm opacity-70">
              {[e.startDate, e.endDate].filter(Boolean).join(" ~ ")}
            </p>
            {e.description && <p className="mt-1.5 text-sm">{e.description}</p>}
          </Brick>
        ))}
      </div>
    </section>
  );
}
