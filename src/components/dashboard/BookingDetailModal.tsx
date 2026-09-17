"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  CalendarDays,
  Clock,
  Users,
  StickyNote,
  X,
  Trash2,
  Bot,
} from "lucide-react";
import type { Booking, BookingStatus } from "@/lib/types";
import { BOOKING_STATUSES, StatusBadge } from "@/components/badges";
import { Button, Select, Spinner } from "@/components/ui";
import { Eyebrow } from "@/components/brand";
import { formatDateTime, getInitials } from "@/lib/utils";

interface BookingDetailModalProps {
  booking: Booking;
  onClose: () => void;
  onStatusChange: (id: string, status: BookingStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  busyStatus?: boolean;
}

export function BookingDetailModal({
  booking,
  onClose,
  onStatusChange,
  onDelete,
  busyStatus,
}: BookingDetailModalProps) {
  const [deleting, setDeleting] = useState(false);
  const statusConfig: Record<BookingStatus, string> = {
    pending: "text-white/60",
    confirmed: "text-accent",
    completed: "text-lime-accent",
    cancelled: "text-white/30",
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(booking._id);
      onClose();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Booking details for ${booking.fullName}`}
    >
      <div
        className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-md border border-white/15 bg-[#0d0d0d] shadow-2xl shadow-black/60 sm:max-w-lg sm:rounded-md animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 font-mono text-sm text-white">
              {getInitials(booking.fullName)}
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold tracking-[-0.02em] text-white">
                {booking.fullName}
              </h2>
              <div className="mt-1.5 flex items-center gap-2">
                <StatusBadge status={booking.status} />
                {booking.reservationNumber && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-lime-accent">
                    {booking.reservationNumber}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="size-4 shrink-0 text-white/40" />
              <a
                href={`tel:${booking.phone}`}
                className="text-white/70 transition-colors hover:text-accent"
              >
                {booking.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="size-4 shrink-0 text-white/40" />
              <a
                href={`mailto:${booking.email}`}
                className="text-white/70 transition-colors hover:text-accent"
              >
                {booking.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-white/10 bg-black/30 p-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                <CalendarDays className="size-3.5" />
                Date
              </div>
              <p className="mt-1.5 font-mono text-sm text-white/80">{booking.preferredDate}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-black/30 p-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                <Clock className="size-3.5" />
                Time
              </div>
              <p className="mt-1.5 font-mono text-sm text-white/80">{booking.preferredTime}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-black/30 p-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                <Users className="size-3.5" />
                People
              </div>
              <p className="mt-1.5 font-mono text-sm text-white/80">
                {booking.numberOfPeople} {booking.numberOfPeople === 1 ? "guest" : "guests"}
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-black/30 p-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                <Bot className="size-3.5" />
                Source
              </div>
              <p className="mt-1.5 font-mono text-sm capitalize text-white/80">
                {booking.source.replace("-", " ")}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border border-lime-accent/20 bg-lime-accent/[0.06] px-4 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
              Reservation number
            </span>
            <span className="font-mono text-sm font-medium tracking-[0.08em] text-lime-accent">
              {booking.reservationNumber}
            </span>
          </div>

          <div className="rounded-md border border-white/10 bg-black/30 p-4">
            <Eyebrow className="mb-2">Service / booking type</Eyebrow>
            <p className="font-display text-base font-medium tracking-[-0.01em] text-white">
              {booking.serviceType}
            </p>
          </div>

          {booking.notes ? (
            <div className="rounded-md border border-white/10 bg-black/30 p-4">
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                <StickyNote className="size-3.5" />
                Notes &amp; special requests
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">
                {booking.notes}
              </p>
            </div>
          ) : null}

          <div className="rounded-md border border-white/10 bg-black/30 p-4">
            <Eyebrow className="mb-2">Received</Eyebrow>
            <p className="text-sm text-white/70">{formatDateTime(booking.createdAt)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Select
              value={booking.status}
              onChange={(e) => onStatusChange(booking._id, e.target.value as BookingStatus)}
              disabled={busyStatus}
              className={statusConfig[booking.status]}
            >
              {BOOKING_STATUSES.map((s) => (
                <option key={s} value={s} className="text-white">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex gap-2">
            {busyStatus && (
              <span className="flex flex-1 items-center justify-center gap-2 text-xs text-white/40">
                <Spinner className="size-3.5" /> Updating
              </span>
            )}
            <Button
              variant="danger"
              onClick={handleDelete}
              loading={deleting}
              className="flex-1 sm:flex-none"
            >
              <Trash2 className="size-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}