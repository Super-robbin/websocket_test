import type { PropsWithChildren } from "react";

interface BadgeProps extends PropsWithChildren {
  tone?: "ok" | "bad" | "neutral";
  className?: string
}

const Badge = ({ children, tone = "neutral", className }: BadgeProps) => {
  const tones: Record<string, string> = {
    ok: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    bad: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    neutral: "bg-slate-50 text-slate-700 ring-1 ring-slate-200",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-md text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
