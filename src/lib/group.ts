/** 항목들을 연도별로 묶어 최신 연도부터 정렬해 반환 */
export function groupByYearDesc<T>(
  items: T[],
  getYear: (item: T) => string,
): { year: string; items: T[] }[] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const y = getYear(item) || "기타";
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(item);
  }
  return [...map.entries()]
    .sort((a, b) => {
      // 숫자 연도는 내림차순, '기타'는 맨 뒤
      if (a[0] === "기타") return 1;
      if (b[0] === "기타") return -1;
      return b[0].localeCompare(a[0]);
    })
    .map(([year, list]) => ({ year, items: list }));
}
