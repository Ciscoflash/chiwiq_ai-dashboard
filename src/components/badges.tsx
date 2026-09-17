import { Hourglass, CalendarClock, CheckCircle2, XCircle, Bot, UserRound, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BookingSource, BookingStatus } from "@/lib/types";

const STATUS_STYLES: Record<
  BookingStatus,
  { label: string; className: string; icon: typeof Hourglass }
> = {
  pending: {
    label: "Pending",
    className: "border-white/20 bg-white/5 text-white/55",
    icon: Hourglass,
  },
  confirmed: {
    label: "Confirmed",
    className: "border-accent/40 bg-accent/10 text-accent",
    icon: CalendarClock,
  },
  completed: {
    label: "Completed",
    className: "border-lime-accent/40 bg-lime-accent/10 text-lime-accent",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className: "border-white/10 bg-white/5 text-white/30",
    icon: XCircle,
  },
};

export const BOOKING_STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

export function StatusBadge({ status }: { status: BookingStatus }) {
  const config = STATUS_STYLES[status];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] whitespace-nowrap",
        config.className,
      )}
    >
      <Icon className="size-3" />
      {config.label}
    </span>
  );
}

const SOURCE_CONFIG: Record<
  BookingSource,
  { label: string; icon: typeof Bot; className: string }
> = {
  "ai-agent": {
    label: "AI Agent",
    icon: Bot,
    className: "text-[#00a425]",
  },
  admin: {
    label: "Admin",
    icon: UserRound,
    className: "text-white/60",
  },
  manual: {
    label: "Manual",
    icon: Pencil,
    className: "text-white/30",
  },
};

export function SourceBadge({ source }: { source: BookingSource }) {
  const config = SOURCE_CONFIG[source];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em]",
        config.className,
      )}
      title={`Source: ${config.label}`}
    >
      <Icon className="size-3.5" />
      {config.label}
    </span>
  );
}