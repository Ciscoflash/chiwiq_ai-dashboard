"use client";

import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import {
  Search,
  CalendarDays,
  Users,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/providers/ToastProvider";
import type { Booking, BookingSource, BookingStatus, PaginationMeta } from "@/lib/types";
import { SourceBadge, StatusBadge } from "@/components/badges";
import { BookingDetailModal } from "@/components/dashboard/BookingDetailModal";
import { Card, EmptyState, TableSkeleton } from "@/components/ui";
import { Eyebrow } from "@/components/brand";
import { cn, getInitials } from "@/lib/utils";

const STATUS_TABS: Array<{ key: BookingStatus | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const SOURCE_OPTIONS: Array<{ key: BookingSource | "all"; label: string }> = [
  { key: "all", label: "All sources" },
  { key: "ai-agent", label: "AI agent" },
  { key: "admin", label: "Admin" },
  { key: "manual", label: "Manual" },
];

export default function BookingsPage() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BookingStatus | "all">("all");
  const [source, setSource] = useState<BookingSource | "all">("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [open, setOpen] = useState(false);
  const [busyStatus, setBusyStatus] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (status !== "all") params.set("status", status);
      if (source !== "all") params.set("source", source);
      params.set("page", String(page));
      params.set("limit", "12");

      const res = await api<Booking[]>(`/bookings?${params.toString()}`);
      setBookings(res.data ?? []);
      setMeta(res.meta ?? null);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  }, [search, status, source, page, toast]);

  useEffect(() => {
    const t = setTimeout(load, search ? 300 : 0);
    return () => clearTimeout(t);
  }, [load, search]);

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    setBusyStatus(true);
    try {
      const res = await api<Booking>(`/bookings/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = res.data!;
      setBookings((prev) => prev.map((b) => (b._id === id ? updated : b)));
      setSelected((prev) => (prev && prev._id === id ? updated : prev));
      toast(`Booking marked as ${newStatus}`);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to update status", "error");
    } finally {
      setBusyStatus(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api(`/bookings/${id}`, { method: "DELETE" });
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setOpen(false);
      toast("Booking deleted");
      load();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to delete booking", "error");
    }
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const onStatusTab = (key: BookingStatus | "all") => {
    setStatus(key);
    setPage(1);
  };

  const onSource = (key: BookingSource | "all") => {
    setSource(key);
    setPage(1);
  };

  const openBooking = (b: Booking) => {
    setSelected(b);
    setOpen(true);
  };

  return (
    <div className="space-y-8">
      <header>
        <Eyebrow className="mb-3">
          <span className="size-1.5 rounded-full bg-lime-accent" />
          Reservation queue
        </Eyebrow>
        <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white">
          Bookings
        </h1>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-white/40">
          Review and manage every booking captured by your AI agent.
        </p>
      </header>

      <Card>
        <div className="flex flex-col gap-4 border-b border-white/10 p-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={onSearch}
              placeholder="Search by name, email, phone or service..."
              aria-label="Search bookings"
              className="h-10 w-full rounded-md border border-line bg-black/40 pl-10 pr-3.5 text-sm text-white placeholder:text-white/25 transition-all hover:border-white/25 focus:border-accent/70 focus:outline-none focus:ring-1 focus:ring-accent/40"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {SOURCE_OPTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => onSource(s.key)}
                className={cn(
                  "cursor-pointer rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-150",
                  source === s.key
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-white/15 text-white/40 hover:border-white/25 hover:text-white/70",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 px-4 py-3">
          {STATUS_TABS.map((tab) => {
            const active = status === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onStatusTab(tab.key)}
                className={cn(
                  "cursor-pointer rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-150",
                  active
                    ? "border-white bg-white text-black"
                    : "border-white/15 text-white/40 hover:border-white/30 hover:text-white/70",
                )}
              >
                {tab.label}
              </button>
            );
          })}
          {meta && (
            <span className="ml-auto flex items-center gap-1.5 self-center font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
              <Users className="size-3.5" />
              {meta.total} total
            </span>
          )}
        </div>

        {loading ? (
          <TableSkeleton rows={8} />
        ) : bookings.length === 0 ? (
          <EmptyState
            title="No bookings match"
            description={
              search || status !== "all" || source !== "all"
                ? "Try adjusting your search or filters."
                : "Bookings created by your AI agent will appear here."
            }
            icon={<CalendarDays className="size-5" />}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
                  <th className="px-4 py-3 font-normal">Customer</th>
                  <th className="px-4 py-3 font-normal">Reservation</th>
                  <th className="px-4 py-3 font-normal">Service</th>
                  <th className="px-4 py-3 font-normal">Date &amp; time</th>
                  <th className="px-4 py-3 font-normal">People</th>
                  <th className="px-4 py-3 font-normal">Source</th>
                  <th className="px-4 py-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    onClick={() => openBooking(b)}
                    className="cursor-pointer transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 font-mono text-[12px] text-white/80">
                          {getInitials(b.fullName)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-white">{b.fullName}</p>
                          <p className="flex items-center gap-1 text-xs text-white/40">
                            <Phone className="size-3" />
                            {b.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-lime-accent">
                        {b.reservationNumber}
                      </p>
                    </td>
                    <td className="max-w-[180px] px-4 py-3.5">
                      <p className="truncate text-white/60">{b.serviceType}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/70">
                        {b.preferredDate}
                      </p>
                      <p className="text-xs text-white/35">{b.preferredTime}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-white/60">{b.numberOfPeople}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <SourceBadge source={b.source} />
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {meta && meta.totalPages > 1 && !loading && (
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
              Page {meta.page} of {meta.totalPages}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="flex size-8 items-center justify-center rounded-md border border-white/15 text-white/40 transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page >= meta.totalPages}
                className="flex size-8 items-center justify-center rounded-md border border-white/15 text-white/40 transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </Card>

      {selected && open && (
        <BookingDetailModal
          booking={selected}
          onClose={() => setOpen(false)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          busyStatus={busyStatus}
        />
      )}

      <p className="pb-16 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/25 md:pb-0">
        {loading && bookings.length > 0
          ? "Refreshing..."
          : "Click any booking to view details, change status or delete."}
      </p>
    </div>
  );
}