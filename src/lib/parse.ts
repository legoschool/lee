/**
 * 시트 셀(문자열)을 타입 값으로 변환하는 작은 헬퍼 모음
 */

/** "TRUE"/"1"/"y"/"예" 등을 boolean 으로 */
export function toBool(value?: string): boolean {
  if (!value) return false;
  return ["true", "1", "y", "yes", "예", "o", "✓"].includes(
    value.trim().toLowerCase(),
  );
}

/** 숫자 문자열을 number 로 (실패 시 undefined) */
export function toNumber(value?: string): number | undefined {
  if (value === undefined || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

/** 구분자(기본: 쉼표/세미콜론/줄바꿈)로 나눠 빈 항목 제거한 배열 */
export function toList(value?: string, separators = /[,;\n]/): string[] {
  if (!value) return [];
  return value
    .split(separators)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** 빈 문자열을 undefined 로 (선택 필드 정리용) */
export function orUndefined(value?: string): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}
