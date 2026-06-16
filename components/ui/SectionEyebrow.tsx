interface Props {
  label: string;
}

export default function SectionEyebrow({ label }: Props) {
  return (
    <div className="flex items-center gap-3 mb-3">
      {/* Deux lignes parallèles style marquage terrain */}
      <div className="flex flex-col gap-[3px]">
        <span className="h-px w-8 bg-[#e8d5a3]" />
        <span className="h-px w-4 bg-[rgba(232,213,163,0.4)]" />
      </div>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8d5a3]">
        {label}
      </span>
    </div>
  );
}
