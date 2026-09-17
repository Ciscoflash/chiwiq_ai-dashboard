"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Spinner } from "@/components/ui";

export function DashboardShell({ children }: { children: ReactNode }) {
  const { admin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !admin) {
      router.replace("/login");
    }
  }, [loading, admin, router]);

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-black">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-dvh bg-black">
      <Sidebar />
      <MobileNav />
      <main className="md:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}