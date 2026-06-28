import type { ReactNode } from "react";
import Studs from "./Studs";
import { legoColorClass, type LegoColor } from "./colors";

interface BrickProps {
  color?: LegoColor;
  /** 상단 스터드 개수 (0 이면 스터드 없음) */
  studs?: number;
  /** 마우스 호버 시 살짝 떠오르는 효과 */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * 레고 브릭 카드.
 * - 상단에 스터드 한 줄
 * - 두툼한 아래 그림자(shadow-brick)로 입체감
 * - 검은 외곽선으로 또렷한 레고 룩
 */
export default function Brick({
  color = "blue",
  studs = 4,
  interactive = false,
  className = "",
  children,
}: BrickProps) {
  const c = legoColorClass[color];
  return (
    <div className="relative">
      {studs > 0 && (
        <Studs count={studs} color={color} className="absolute -top-2.5 left-2 z-10" />
      )}
      <div
        className={[
          c.bg,
          c.text,
          "rounded-brick border-[3px] border-black/80 shadow-brick",
          "px-5 py-5 sm:px-6 sm:py-6",
          interactive
            ? "transition-transform duration-150 hover:-translate-y-1 hover:rotate-[-0.5deg]"
            : "",
          className,
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
