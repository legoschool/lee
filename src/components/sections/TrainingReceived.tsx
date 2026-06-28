import Brick from "@/components/lego/Brick";
import SectionTitle from "@/components/lego/SectionTitle";
import type { TrainingReceivedItem } from "@/data/types";

export default function TrainingReceived({ items }: { items: TrainingReceivedItem[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <SectionTitle icon="📒" color="green">
        이수 연수
      </SectionTitle>
      <Brick color="white" studs={5}>
        <ul className="divide-y divide-black/10">
          {items.map((t, i) => (
            <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-3 py-2 first:pt-0 last:pb-0">
              <span className="font-semibold">{t.title}</span>
              <span className="text-sm opacity-70">
                {[t.host, t.hours, t.date].filter(Boolean).join(" · ")}
              </span>
            </li>
          ))}
        </ul>
      </Brick>
    </section>
  );
}
