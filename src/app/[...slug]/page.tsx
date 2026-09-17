import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

const PAGE_TITLES: Record<string, string> = {
  solutions: "Solutions",
  "solutions/restaurant": "Restaurant Platform",
  agents: "AI Agents",
  about: "About",
  "legal/privacy": "Privacy Policy",
  "legal/terms": "Terms of Service",
  "legal/cookies": "Cookie Policy",
  "legal/education-addendum": "Education Addendum",
  "get-started": "Get Started",
  admin: "Admin",
};

function humanize(segment: string): string {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function PlaceholderPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");
  const title = PAGE_TITLES[path] ?? humanize(slug[slug.length - 1] ?? "");

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <LandingHeader />
      <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="pointer-events-none absolute -left-40 top-1/4 size-[480px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="relative">
          <span className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
            <span className="size-1.5 rounded-full bg-accent" />
            Coming soon
          </span>
          <h1 className="font-display text-4xl font-bold tracking-[-0.03em] text-white md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/50">
            This page is part of the ChiwiQ site and is under construction. In the meantime, you
            can explore the platform or get started with your admin console.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/admin/login"
              className="rounded-md bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
            >
              Get Started
            </Link>
            <Link
              href="/"
              className="rounded-md px-7 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.50)" }}
            >
              Back home
            </Link>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}