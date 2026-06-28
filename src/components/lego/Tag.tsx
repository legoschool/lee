interface TagProps {
  children: string;
}

/** 작은 스터드 알갱이 같은 태그 칩 */
export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border-2 border-black/70 bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-lego-black">
      {children}
    </span>
  );
}
