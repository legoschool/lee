/**
 * 데이터 구성 확인용 미리보기 화면
 * ---------------------------------------------------------------------------
 * 이 단계의 목표는 "데이터 파이프라인이 동작하는지" 확인하는 것입니다.
 * (실제 디자인/레이아웃은 다음 단계에서 작업)
 * 시트 또는 샘플에서 불러온 ProfileData 를 섹션별로 단순 출력합니다.
 */
import { useProfile } from "@/hooks/useProfile";

export default function App() {
  const { data, source, loading, error } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        프로필 데이터를 불러오는 중…
      </div>
    );
  }

  if (!data) return null;

  const { basics, about, socials, skills, experience, education, projects, awards } =
    data;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto px-5 py-10 space-y-8">
        <div className="text-xs">
          데이터 출처:{" "}
          <span className={source === "sheet" ? "text-green-600" : "text-amber-600"}>
            {source === "sheet" ? "Google Sheets" : "샘플(시트 미연결)"}
          </span>
          {error && <span className="text-red-500"> · {error}</span>}
        </div>

        <header className="space-y-1">
          <h1 className="text-3xl font-bold">{basics.name}</h1>
          <p className="text-lg text-gray-600">{basics.headline}</p>
          {basics.tagline && <p className="text-gray-500">{basics.tagline}</p>}
          <p className="text-sm text-gray-500">
            {[basics.location, basics.email, basics.website].filter(Boolean).join(" · ")}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {socials.map((s) => (
              <a
                key={s.url}
                href={s.url}
                className="text-sm text-blue-600 underline"
                target="_blank"
                rel="noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </header>

        {about && (
          <Section title={about.heading}>
            <p className="whitespace-pre-line text-gray-700">{about.body}</p>
          </Section>
        )}

        <Section title="스킬">
          <ul className="grid grid-cols-2 gap-1 text-sm">
            {skills.map((s) => (
              <li key={s.name}>
                {s.name}
                {s.category && <span className="text-gray-400"> · {s.category}</span>}
                {s.level !== undefined && (
                  <span className="text-gray-400"> ({s.level})</span>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="경력 · 활동">
          {experience.map((e, i) => (
            <div key={i} className="mb-3">
              <div className="font-medium">
                {e.role} · {e.organization}
              </div>
              <div className="text-sm text-gray-500">
                {e.startDate} ~ {e.endDate || "현재"}
                {e.location && ` · ${e.location}`}
              </div>
              {e.description && <p className="text-sm text-gray-700">{e.description}</p>}
              {e.highlights && e.highlights.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {e.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>

        <Section title="학력">
          {education.map((e, i) => (
            <div key={i} className="text-sm">
              <span className="font-medium">{e.school}</span>
              {e.field && ` · ${e.field}`}
              {e.degree && ` (${e.degree})`}
              <span className="text-gray-500">
                {" "}
                {[e.startDate, e.endDate].filter(Boolean).join(" ~ ")}
              </span>
            </div>
          ))}
        </Section>

        <Section title="프로젝트 · 작품">
          {projects.map((p, i) => (
            <div key={i} className="mb-3">
              <div className="font-medium">
                {p.title}
                {p.featured && <span className="text-amber-500"> ★</span>}
                {p.date && <span className="text-gray-400 text-sm"> · {p.date}</span>}
              </div>
              {p.description && (
                <p className="text-sm text-gray-700">{p.description}</p>
              )}
              {p.tags && p.tags.length > 0 && (
                <div className="text-xs text-gray-400">#{p.tags.join(" #")}</div>
              )}
            </div>
          ))}
        </Section>

        <Section title="수상 · 자격증">
          {awards.map((a, i) => (
            <div key={i} className="text-sm">
              <span className="font-medium">{a.title}</span>
              {a.issuer && <span className="text-gray-500"> · {a.issuer}</span>}
              {a.date && <span className="text-gray-400"> · {a.date}</span>}
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold border-b pb-1 mb-3">{title}</h2>
      {children}
    </section>
  );
}
