"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { WordmarkText } from "@/components/landing/landing-brand";

const NAV_LINKS = [
  { href: "/solutions", label: "Solutions" },
  { href: "/agents", label: "AI Agents" },
  { href: "/about", label: "About" },
  { href: "/legal/privacy", label: "Legal" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.90)" : "rgba(0,0,0,0.80)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[70px]">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="shrink-0">
            <WordmarkText className="text-[1.75rem]" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/admin/login"
            className="hidden rounded-md bg-white px-5 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-white/85 md:block"
          >
            Get Started
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="p-2 text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-[22px]" /> : <Menu className="size-[22px]" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[15px] text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}