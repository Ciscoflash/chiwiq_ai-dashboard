"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Hourglass,
  CalendarCheck2,
  XCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/ToastProvider";
import type { Booking, BookingStats } from "@/lib/types";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge, SourceBadge } from "@/components/badges";
import { Button, Card, EmptyState, TableSkeleton } from "@/components/ui";
import { Eyebrow } from "@/components/brand";
import { formatDateTime } from "@/lib/utils";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function todayLabel(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function OverviewPage() {
  const { admin } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api<BookingStats>("/bookings/stats");
      setStats(res.data ?? null);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to load stats", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const pending = stats?.statsMap?.pending ?? 0;
  const confirmed = stats?.statsMap?.confirmed ?? 0;
  const completed = stats?.statsMap?.completed ?? 0;
  const cancelled = stats?.statsMap?.cancelled ?? 0;
  const total = stats?.total ?? 0;
  const latest = stats?.latest ?? [];

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow className="mb-3">
            <span className="size-1.5 rounded-full bg-accent" />
            {todayLabel()}
          </Eyebrow>
          <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white">
            {greeting()}, {admin?.name?.split(" ")[0] ?? "Admin"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link
            href="/dashboard/bookings"
            className="inline-flex h-8 items-center justify-center gap-2 rounded-md bg-white px-3 text-[13px] font-medium tracking-[-0.01em] text-black transition-colors hover:bg-white/85"
          >
            Manage bookings
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatCard
          index={1}
          label="Total bookings"
          value={total}
          icon={<CalendarDays className="size-4" />}
          hint="All time"
        />
        <StatCard
          index={2}
          label="Pending"
          value={pending}
          icon={<Hourglass className="size-4" />}
          hint="Awaiting review"
        />
        <StatCard
          index={3}
          label="Confirmed"
          value={confirmed}
          icon={<CalendarCheck2 className="size-4" />}
          accent="text-lime-accent"
          hint="Ready to serve"
        />
        <StatCard
          index={4}
          label="Cancelled"
          value={cancelled}
          icon={<XCircle className="size-4" />}
          accent="text-white/40"
          hint="No go"
        />
      </div>

      {total > 0 && (
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <Eyebrow>
              <span className="size-1.5 rounded-full bg-lime-accent" />
              Status distribution
            </Eyebrow>
          </div>
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            {[
              { count: pending, color: "bg-white/50", label: "pending" },
              { count: confirmed, color: "bg-accent", label: "confirmed" },
              { count: completed, color: "bg-lime-accent", label: "completed" },
              { count: cancelled, color: "bg-white/15", label: "cancelled" },
            ]
              .filter((s) => s.count > 0)
              .map((s) => (
                <div
                  key={s.label}
                  className={`${s.color} h-full transition-all duration-500`}
                  style={{ width: `${(s.count / total) * 100}%` }}
                  title={`${s.label}: ${s.count}`}
                />
              ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-white/50" /> {pending} pending
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-accent" /> {confirmed} confirmed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-lime-accent" /> {completed} completed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-white/15" /> {cancelled} cancelled
            </span>
          </div>
        </Card>
      )}

      <Card>
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Eyebrow>
            <span className="size-1.5 rounded-full bg-accent" />
            Recent bookings
          </Eyebrow>
          <Link
            href="/dashboard/bookings"
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50 transition-colors hover:text-white"
          >
            View all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {loading ? (
          <TableSkeleton rows={4} />
        ) : latest.length === 0 ? (
          <EmptyState
            title="No bookings yet"
            description="Bookings created by your AI agent will appear here automatically."
            icon={<CalendarDays className="size-5" />}
          />
        ) : (
          <ul className="divide-y divide-white/5">
            {latest.map((booking: Booking) => (
              <li
                key={booking._id}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-white/[0.03]"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {booking.fullName}
                  </p>
                  <p className="truncate text-[13px] text-white/40">{booking.serviceType}</p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/70">
                    {booking.preferredDate} · {booking.preferredTime}
                  </p>
                  <p className="text-xs text-white/30">{formatDateTime(booking.createdAt)}</p>
                </div>
                <div className="hidden md:block">
                  <SourceBadge source={booking.source} />
                </div>
                <StatusBadge status={booking.status} />
              </li>
            ))}
          </ul>
        )}
      </Card>

      <p className="pb-16 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/25 md:pb-0">
        ChiwiQ · Intelligent operations platform
      </p>
    </div>
  );
}