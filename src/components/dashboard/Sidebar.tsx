"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, UserRound, LogOut } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Wordmark } from "@/components/brand";
import { cn, getInitials } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/admin/dashboard/profile", label: "Profile", icon: UserRound },
];

export function Sidebar() {
  const pathname = usePathname();
  const { admin, logout } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-black md:flex">
      <Link href="/admin/dashboard" className="flex items-center justify-between px-6 py-7">
        <Wordmark size="lg" />
        <span className="size-1.5 rounded-full bg-accent" />
      </Link>

      <div className="px-6 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
          Console
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-150",
                "border",
                active
                  ? "border-white/15 bg-white/5 text-white"
                  : "border-transparent text-white/50 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon
                className={cn(
                  "size-[18px] transition-colors",
                  active ? "text-white" : "text-white/40 group-hover:text-white/80",
                )}
              />
              {item.label}
              {active && <span className="ml-auto size-1.5 rounded-full bg-accent" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-md px-2 py-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 font-mono text-[13px] text-white">
            {admin ? getInitials(admin.name) : "A"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{admin?.name ?? "Admin"}</p>
            <p className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
              {admin?.role}
            </p>
          </div>
          <button
            onClick={logout}
            className="rounded-md p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}