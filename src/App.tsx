/**
 * 레고 스타일 개인 프로필 페이지
 * ---------------------------------------------------------------------------
 * 데이터는 useProfile() 가 Google Sheet(또는 샘플)에서 불러옵니다.
 * 레이아웃은 레고 브릭/스터드/베이스플레이트 모티프로 구성했습니다.
 */
import { useProfile } from "@/hooks/useProfile";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Awards from "@/components/sections/Awards";

export default function App() {
  const { data, source, loading, error } = useProfile();

  if (loading) {
    return (
      <div className="baseplate flex min-h-screen items-center justify-center">
        <div className="animate-wiggle rounded-brick border-[3px] border-black/80 bg-lego-yellow px-6 py-4 text-lg font-bold shadow-brick">
          🧱 블록 끼우는 중…
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="baseplate min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <div className="space-y-8">
          <Hero basics={data.basics} socials={data.socials} />
          {data.about && <About about={data.about} />}
          <Skills skills={data.skills} />
          <Experience items={data.experience} />
          <Projects items={data.projects} />
          <Education items={data.education} />
          <Awards items={data.awards} />
        </div>

        <footer className="mt-10 flex flex-col items-center gap-1 text-center text-xs text-white/90">
          <span className="rounded-full border-2 border-black/40 bg-black/20 px-3 py-1 backdrop-blur">
            데이터 출처: {source === "sheet" ? "Google Sheets ✅" : "샘플 데이터 (시트 미연결)"}
          </span>
          {error && <span className="text-white/80">⚠️ {error}</span>}
          <span className="mt-1 opacity-80">Built with 🧱 LEGO style</span>
        </footer>
      </div>
    </div>
  );
}
