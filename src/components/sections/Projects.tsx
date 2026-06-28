import Brick from "@/components/lego/Brick";
import SectionTitle from "@/components/lego/SectionTitle";
import Tag from "@/components/lego/Tag";
import { brickPalette } from "@/components/lego/colors";
import type { ProjectItem } from "@/data/types";

export default function Projects({ items }: { items: ProjectItem[] }) {
  if (items.length === 0) return null;

  // featured 먼저
  const sorted = [...items].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );

  return (
    <section>
      <SectionTitle icon="🚀" color="purple">
        프로젝트 · 작품
      </SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {sorted.map((p, i) => (
          <Brick
            key={i}
            color={brickPalette[i % brickPalette.length]}
            studs={5}
            interactive
          >
            {p.imageUrl && (
              <div className="mb-3 overflow-hidden rounded-lg border-2 border-black/70">
                <img src={p.imageUrl} alt={p.title} className="h-36 w-full object-cover" />
              </div>
            )}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-bold">{p.title}</h3>
              {p.featured && <span title="대표 작품">⭐</span>}
            </div>
            {p.date && <p className="text-sm opacity-80">{p.date}</p>}
            {p.description && <p className="mt-1.5 leading-relaxed">{p.description}</p>}

            {p.tags && p.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            )}

            {(p.url || p.repoUrl) && (
              <div className="mt-3 flex gap-2">
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border-2 border-black/70 bg-white px-3 py-1 text-sm font-bold text-lego-black"
                  >
                    바로가기 ↗
                  </a>
                )}
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border-2 border-black/70 bg-white px-3 py-1 text-sm font-bold text-lego-black"
                  >
                    코드 ↗
                  </a>
                )}
              </div>
            )}
          </Brick>
        ))}
      </div>
    </section>
  );
}
