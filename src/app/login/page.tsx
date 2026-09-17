"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Bot,
  BellRing,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/ToastProvider";
import { ApiClientError } from "@/lib/api";
import { Button, Input } from "@/components/ui";
import { Wordmark, Eyebrow } from "@/components/brand";

const FEATURES = [
  {
    icon: Bot,
    accent: "text-accent",
    dot: "bg-accent",
    title: "AI agent webhook",
    body: "Bookings created automatically from your agent",
  },
  {
    icon: BellRing,
    accent: "text-lime-accent",
    dot: "bg-lime-accent",
    title: "Live statuses",
    body: "Pending, confirmed, completed & cancelled",
  },
  {
    icon: ShieldCheck,
    accent: "text-white/60",
    dot: "bg-white/40",
    title: "Secure access",
    body: "Role-based admin authentication",
  },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      toast("Welcome back");
      router.replace("/dashboard");
    } catch (err) {
      const message = err instanceof ApiClientError ? err.message : "Unable to sign in";
      setError(message);
      toast(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-dvh bg-black text-white">
      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden p-12 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="pointer-events-none absolute -left-40 top-1/4 size-[480px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 size-[420px] rounded-full bg-lime-accent/5 blur-[120px]" />

        <div className="relative">
          <Wordmark size="lg" />
        </div>

        <div className="relative max-w-lg">
          <Eyebrow className="mb-6">
            <span className="size-1.5 rounded-full bg-accent" />
            Operations, running on intelligence
          </Eyebrow>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            Manage every booking from{" "}
            <span className="bg-gradient-to-r from-white/90 to-white/40 bg-clip-text text-transparent">
              one place.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/50">
            Bookings flow in automatically from your AI agent. Review, confirm,
            and delight every customer from a single console.
          </p>

          <div className="mt-10 flex flex-col gap-7">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex items-start gap-4">
                  <span className={`mt-0.5 size-1.5 rounded-full ${f.dot}`} />
                  <div className="flex items-center gap-4">
                    <span className={`flex size-9 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/5 ${f.accent}`}>
                      <Icon className="size-[18px]" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
                        {f.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-white/40">{f.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative text-white/30">
          <Eyebrow>ChiwiQ · Intelligent operations platform</Eyebrow>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center border-l border-white/10 px-4 py-12 sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,164,37,0.06),transparent_50%)]" />
        <div className="relative w-full max-w-sm animate-fade-up">
          <div className="mb-10 flex items-center gap-2 lg:hidden">
            <Wordmark size="lg" />
          </div>

          <div className="mb-8">
            <Eyebrow className="mb-4">
              <span className="size-1.5 rounded-full bg-accent" />
              Admin access
            </Eyebrow>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/40">
              Sign in to your admin account to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Input
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="admin@chiwiq.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="size-4" />}
            />

            <div>
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="size-4" />}
              />
              <div className="mt-1 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/80"
                >
                  {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-md border border-red-400/25 bg-red-400/10 px-3.5 py-2.5 text-sm text-red-400"
              >
                {error}
              </p>
            )}

            <Button type="submit" loading={submitting} className="w-full">
              Sign in to dashboard
              {!submitting && <ArrowRight className="size-4" />}
            </Button>
          </form>

          <div className="mt-6 rounded-md border border-white/15 bg-white/5 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
              Demo credentials
            </p>
            <div className="mt-2 flex flex-col gap-1 font-mono text-[13px] text-white/70">
              <span>admin@chiwiq.com</span>
              <span>password123</span>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-white/30">
            Protected by ChiwiQ security.
          </p>
        </div>
      </div>
    </div>
  );
}