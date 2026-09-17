import {
  type ReactNode,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md";
  loading?: boolean;
}

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black hover:bg-white/85 active:bg-white/70",
  secondary:
    "border border-white/40 text-white hover:bg-white/10 hover:border-white/60",
  ghost: "text-white/60 hover:bg-white/5 hover:text-white",
  danger:
    "border border-red-400/25 text-red-400 hover:bg-red-400/10",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150",
        "tracking-[-0.01em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "disabled:pointer-events-none disabled:opacity-40",
        size === "sm" ? "h-8 px-3 text-[13px]" : "h-10 px-4 text-sm",
        BUTTON_VARIANTS[variant],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export function Input({ label, error, icon, className, id, ...props }: InputProps) {
  const inputId = id || props.name;
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            "h-11 w-full rounded-md border bg-surface px-3.5 text-sm text-white transition-all",
            "placeholder:text-white/30 focus:outline-none",
            "border-line hover:border-white/25 focus:border-accent/70 focus:ring-1 focus:ring-accent/40",
            icon ? "pl-10" : undefined,
            error ? "border-red-400/50" : undefined,
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, className, id, children, ...props }: SelectProps) {
  const selectId = id || props.name;
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "h-10 w-full cursor-pointer rounded-md border border-line bg-surface px-3 text-sm text-white transition-all",
          "hover:border-white/25 focus:border-accent/70 focus:outline-none focus:ring-1 focus:ring-accent/40",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-line bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2 className={cn("size-5 animate-spin text-accent", className)} />
  );
}

export function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-md border border-line bg-surface-subtle text-white/40">
        {icon}
      </div>
      <h3 className="font-display text-sm font-semibold tracking-tight text-white">
        {title}
      </h3>
      <p className="max-w-xs text-sm leading-relaxed text-white/40">{description}</p>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-9 flex-1 animate-pulse rounded-md bg-white/5" />
          <div className="h-9 w-24 animate-pulse rounded-md bg-white/5" />
          <div className="h-9 w-20 animate-pulse rounded-md bg-white/5" />
        </div>
      ))}
    </div>
  );
}