import { legoColorClass, type LegoColor } from "./colors";

interface StudsProps {
  /** 스터드 개수 */
  count?: number;
  /** 스터드 색 (보통 브릭과 동일 색) */
  color?: LegoColor;
  className?: string;
}

/**
 * 브릭 상단에 얹히는 스터드(돌기) 한 줄.
 * 브릭의 위쪽 가장자리에 걸쳐 올라온 것처럼 보이도록 음수 마진으로 배치합니다.
 */
export default function Studs({ count = 4, color = "blue", className = "" }: StudsProps) {
  const { stud } = legoColorClass[color];
  return (
    <div
      className={`pointer-events-none flex gap-2 pl-5 ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={`stud h-3.5 w-3.5 ${stud}`} />
      ))}
    </div>
  );
}
