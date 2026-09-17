import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui";

interface StatCardProps {
  index: number;
  label: string;
  value: number | string;
  icon?: ReactNode;
  hint?: string;
  accent?: string;
}

export function StatCard({
  index,
  label,
  value,
  icon,
  hint,
  accent = "text-accent",
}: StatCardProps) {
  return (
    <Card className="group relative flex flex-col gap-5 p-5 transition-colors duration-150 hover:border-white/30">
      <div className="flex items-start justify-between">
        <span className="font-mono text-lg text-white/25 transition-colors group-hover:text-white/50">
          {String(index).padStart(2, "0")}
        </span>
        {icon && <span className={cn("size-4 opacity-70 transition-opacity group-hover:opacity-100", accent)}>{icon}</span>}
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-display text-3xl font-semibold tracking-[-0.02em] text-white tabular-nums">
          {value}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
          {label}
        </p>
        {hint && <p className="text-xs text-white/30">{hint}</p>}
      </div>
    </Card>
  );
}