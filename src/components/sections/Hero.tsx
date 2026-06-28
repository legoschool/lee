import Brick from "@/components/lego/Brick";
import type { ProfileBasics, SocialLink } from "@/data/types";

const ICONS: Record<string, string> = {
  github: "🐙",
  instagram: "📸",
  youtube: "▶️",
  mail: "✉️",
  link: "🔗",
  blog: "📝",
  twitter: "🐦",
  linkedin: "💼",
};

function socialIcon(s: SocialLink): string {
  return ICONS[(s.icon ?? "").toLowerCase()] ?? "🔗";
}

export default function Hero({
  basics,
  socials,
}: {
  basics: ProfileBasics;
  socials: SocialLink[];
}) {
  return (
    <Brick color="yellow" studs={6} className="animate-pop">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        {/* 아바타 — 브릭 액자 */}
        <div className="shrink-0">
          <div className="h-28 w-28 overflow-hidden rounded-brick border-[3px] border-black/80 bg-white shadow-brick-sm">
            {basics.avatarUrl ? (
              <img
                src={basics.avatarUrl}
                alt={basics.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl">
                🧑‍🚀
              </div>
            )}
          </div>
        </div>

        {/* 이름 / 소개 */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              {basics.name}
            </h1>
            {basics.available && (
              <span className="inline-flex items-center gap-1 rounded-full border-2 border-black/70 bg-lego-green px-2.5 py-0.5 text-xs font-bold text-white">
                ● 협업 가능
              </span>
            )}
          </div>
          <p className="mt-1 text-lg font-semibold">{basics.headline}</p>
          {basics.affiliation && (
            <p className="text-sm font-semibold text-lego-black/80">
              🏫 {basics.affiliation}
            </p>
          )}
          {basics.tagline && (
            <p className="mt-1 text-sm text-lego-black/70">{basics.tagline}</p>
          )}

          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-lego-black/80 sm:justify-start">
            {basics.location && <span>📍 {basics.location}</span>}
            {basics.email && (
              <a href={`mailto:${basics.email}`} className="underline">
                ✉️ {basics.email}
              </a>
            )}
            {basics.website && (
              <a href={basics.website} target="_blank" rel="noreferrer" className="underline">
                🌐 홈페이지
              </a>
            )}
          </div>

          {/* 소셜 버튼 — 작은 브릭들 */}
          {socials.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              {socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border-[3px] border-black/80 bg-white px-3 py-1 text-sm font-bold text-lego-black shadow-brick-sm transition-transform hover:-translate-y-0.5"
                >
                  <span aria-hidden="true">{socialIcon(s)}</span>
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Brick>
  );
}
