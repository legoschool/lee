import { legoColorClass, type LegoColor } from "./colors";

interface SectionTitleProps {
  children: string;
  /** 앞에 붙는 이모지/아이콘 */
  icon?: string;
  color?: LegoColor;
}

/** 브릭 탭처럼 생긴 섹션 제목 라벨 */
export default function SectionTitle({ children, icon, color = "yellow" }: SectionTitleProps) {
  const c = legoColorClass[color];
  return (
    <div className="mb-4 flex items-center">
      <h2
        className={`${c.bg} ${c.text} inline-flex items-center gap-2 rounded-brick border-[3px] border-black/80 px-4 py-1.5 text-xl font-bold shadow-brick-sm`}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </h2>
    </div>
  );
}
