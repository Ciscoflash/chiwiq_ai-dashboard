"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, UserRound } from "lucide-react";
import { Wordmark } from "@/components/brand";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/admin/dashboard/profile", label: "Profile", icon: UserRound },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around gap-1 border-t border-white/10 bg-black/90 px-2 py-2 backdrop-blur md:hidden">
      <Link href="/admin/dashboard" className="mr-1 rounded-md px-2 py-1">
        <Wordmark size="sm" />
      </Link>
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex min-h-11 min-w-[64px] flex-col items-center justify-center gap-1 rounded-md px-3 text-[9px] font-medium transition-colors",
              active
                ? "font-mono uppercase tracking-[0.1em] text-white"
                : "font-mono uppercase tracking-[0.1em] text-white/40 hover:text-white/80",
            )}
          >
            <Icon className="size-5" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}