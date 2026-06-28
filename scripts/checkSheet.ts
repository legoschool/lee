/**
 * 시트 연결 점검 CLI
 * ---------------------------------------------------------------------------
 * .env 의 시트가 올바르게 공개/구성됐는지 터미널에서 확인합니다.
 *   npm run data:check
 *
 * Node 환경이라 import.meta.env 대신 process.env 를 사용합니다.
 */
const SHEET_ID = process.env.VITE_GOOGLE_SHEET_ID?.trim();

const TABS = [
  "Basics",
  "About",
  "Socials",
  "Skills",
  "Experience",
  "Education",
  "Projects",
  "Awards",
];

function gvizUrl(id: string, tab: string): string {
  const params = new URLSearchParams({ tqx: "out:json", sheet: tab, headers: "1" });
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?${params}`;
}

async function rowCount(id: string, tab: string): Promise<number> {
  const res = await fetch(gvizUrl(id, tab));
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
  return json.table.rows.length as number;
}

async function main() {
  if (!SHEET_ID) {
    console.error("✗ VITE_GOOGLE_SHEET_ID 가 설정되지 않았습니다. (.env 확인)");
    process.exit(1);
  }
  console.log(`시트 ID: ${SHEET_ID}\n`);
  let ok = true;
  for (const tab of TABS) {
    try {
      const n = await rowCount(SHEET_ID, tab);
      console.log(`  ✓ ${tab.padEnd(12)} ${n} 행`);
    } catch (err) {
      ok = false;
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`  ✗ ${tab.padEnd(12)} 실패: ${msg}`);
    }
  }
  console.log(ok ? "\n모든 탭 확인 완료 ✅" : "\n일부 탭을 읽지 못했습니다. 탭 이름과 공개 설정을 확인하세요.");
  process.exit(ok ? 0 : 1);
}

main();
