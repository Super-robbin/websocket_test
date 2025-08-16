interface StatItemProps {
  label: string;
  value: React.ReactNode;
  hint?: string;
}

const StatItem = ({ label, value, hint }: StatItemProps) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs text-black/80 uppercase tracking-wide">
      {label}
    </span>
    <span className="text-base font-semibold">{value}</span>
    {hint && (
      <span className="text-xs text-black/70">{hint}</span>
    )}
  </div>
);

export default StatItem;
