/** 레고 색상 키 — Brick 등 컴포넌트에서 공유 */
export type LegoColor =
  | "red"
  | "yellow"
  | "blue"
  | "green"
  | "orange"
  | "lime"
  | "purple"
  | "white";

/** 각 색상의 배경/스터드/텍스트 클래스 묶음 */
export const legoColorClass: Record<
  LegoColor,
  { bg: string; stud: string; text: string }
> = {
  red: { bg: "bg-lego-red", stud: "bg-lego-red", text: "text-white" },
  yellow: { bg: "bg-lego-yellow", stud: "bg-lego-yellow", text: "text-lego-black" },
  blue: { bg: "bg-lego-blue", stud: "bg-lego-blue", text: "text-white" },
  green: { bg: "bg-lego-green", stud: "bg-lego-green", text: "text-white" },
  orange: { bg: "bg-lego-orange", stud: "bg-lego-orange", text: "text-lego-black" },
  lime: { bg: "bg-lego-lime", stud: "bg-lego-lime", text: "text-lego-black" },
  purple: { bg: "bg-lego-purple", stud: "bg-lego-purple", text: "text-white" },
  white: { bg: "bg-lego-white", stud: "bg-lego-white", text: "text-lego-black" },
};

/** 섹션마다 색을 순환시키기 위한 기본 팔레트 */
export const brickPalette: LegoColor[] = [
  "blue",
  "red",
  "green",
  "orange",
  "purple",
  "lime",
];
