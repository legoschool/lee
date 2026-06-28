/**
 * Google Sheets 데이터 로더 (인증 불필요)
 * ---------------------------------------------------------------------------
 * 공개된(링크가 있는 모든 사용자 뷰어) 구글 시트를 gviz 엔드포인트로 읽어옵니다.
 * API 키나 OAuth 가 필요 없어 정적 호스팅 환경에서도 그대로 동작합니다.
 *
 * gviz 응답은 아래 형태의 JSONP 로 감싸여 옵니다:
 *   /*O_o*\/\ngoogle.visualization.Query.setResponse({ ...JSON... });
 * 따라서 첫 '{' 와 마지막 '}' 사이만 잘라 JSON 으로 파싱합니다.
 */
import { DEFAULT_SHEET_ID } from "@/data/config";

/** 한 행(row)을 헤더명 -> 셀 문자열 로 매핑한 객체 */
export type SheetRow = Record<string, string>;

/** gviz JSON 응답의 최소 타입 (필요한 필드만) */
interface GvizResponse {
  table: {
    cols: { id: string; label?: string }[];
    rows: { c: ({ v: unknown } | null)[] }[];
  };
}

function buildUrl(sheetId: string, tabName: string): string {
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;
  const params = new URLSearchParams({
    tqx: "out:json",
    sheet: tabName,
    // 헤더가 항상 첫 행이 되도록 명시
    headers: "1",
  });
  return `${base}?${params.toString()}`;
}

/** gviz JSONP 래퍼를 벗겨 순수 JSON 으로 파싱 */
function parseGviz(text: string): GvizResponse {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("Google Sheets 응답을 해석할 수 없습니다 (gviz 형식 아님)");
  }
  return JSON.parse(text.slice(start, end + 1)) as GvizResponse;
}

function cellToString(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  return String(value);
}

/**
 * 시트 한 탭을 읽어 헤더 기반 행 객체 배열로 반환합니다.
 * 첫 행은 헤더(열 이름)로 사용됩니다.
 */
export async function fetchSheetTab(
  sheetId: string,
  tabName: string,
): Promise<SheetRow[]> {
  const res = await fetch(buildUrl(sheetId, tabName));
  if (!res.ok) {
    throw new Error(`시트 "${tabName}" 요청 실패: HTTP ${res.status}`);
  }
  const data = parseGviz(await res.text());

  const headers = data.table.cols.map(
    (col, i) => (col.label || col.id || `col${i}`).trim(),
  );

  return data.table.rows
    .map((row) => {
      const obj: SheetRow = {};
      headers.forEach((header, i) => {
        if (!header) return;
        const cell = row.c[i];
        obj[header] = cellToString(cell ? cell.v : "");
      });
      return obj;
    })
    // 모든 셀이 빈 행은 제거
    .filter((obj) => Object.values(obj).some((v) => v !== ""));
}

/**
 * key/value 형태의 탭(Basics, About)을 { key: value } 맵으로 반환합니다.
 * 헤더는 정확히 "key", "value" 두 열이어야 합니다.
 */
export async function fetchSheetKeyValue(
  sheetId: string,
  tabName: string,
): Promise<Record<string, string>> {
  const rows = await fetchSheetTab(sheetId, tabName);
  const map: Record<string, string> = {};
  for (const row of rows) {
    const key = (row.key ?? row.Key ?? "").trim();
    const value = row.value ?? row.Value ?? "";
    if (key) map[key] = value;
  }
  return map;
}

/** 시트 ID 읽기: .env(VITE_GOOGLE_SHEET_ID) 가 있으면 우선, 없으면 기본 시트 */
export function getSheetId(): string {
  const fromEnv = (import.meta.env.VITE_GOOGLE_SHEET_ID as string | undefined)?.trim();
  return fromEnv || DEFAULT_SHEET_ID;
}

export function hasSheetConfigured(): boolean {
  return getSheetId().length > 0;
}
