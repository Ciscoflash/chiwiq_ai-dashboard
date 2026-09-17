import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  size = "lg",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  return (
    <span
      className={cn(
        "font-clash text-white",
        size === "lg"
          ? "text-[1.7rem] font-medium tracking-[-0.04em]"
          : "text-[1.4rem] font-medium tracking-[-0.04em]",
        className,
      )}
    >
      Chiwi<span className="text-[0.7em] align-top">Q</span>
    </span>
  );
}

export function Eyebrow({
  children,
  className,
  dot,
  dotClass = "bg-accent",
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
  dotClass?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60",
        className,
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", dotClass)} />}
      {children}
    </span>
  );
}