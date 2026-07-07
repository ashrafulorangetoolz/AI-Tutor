import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// ---- Card ----
export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("card", className)}>{children}</div>;
}

export function CardBody({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("card-pad", className)}>{children}</div>;
}

// ---- Badge ----
type Tone = "green" | "amber" | "blue" | "gray";
export function Badge({
  tone = "gray",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  const map: Record<Tone, string> = {
    green: "badge-green",
    amber: "badge-amber",
    blue: "badge-blue",
    gray: "badge-gray",
  };
  return <span className={cn(map[tone], className)}>{children}</span>;
}

// ---- Progress bar ----
export function ProgressBar({
  value,
  className,
  tone = "brand",
}: {
  value: number;
  className?: string;
  tone?: "brand" | "amber" | "blue";
}) {
  const bar =
    tone === "amber" ? "bg-warning" : tone === "blue" ? "bg-info" : "bg-brand-500";
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-black/5", className)}>
      <div
        className={cn("h-full rounded-full transition-all", bar)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

// ---- Section heading (public pages) ----
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-muted">{subtitle}</p>}
    </div>
  );
}

// ---- Empty state ----
export function EmptyState({
  icon = "📭",
  title,
  description,
  action,
}: {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface/60 px-6 py-14 text-center">
      <div className="mb-3 text-4xl">{icon}</div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

// ---- Skeleton ----
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton h-4 w-full", className)} />;
}

// ---- Avatar ----
export function Avatar({
  name,
  color = "#7034EA",
  size = 40,
}: {
  name: string;
  color?: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{ width: size, height: size, background: color, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}

// ---- Button-as-link (server-safe) ----
export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const cls =
    variant === "secondary"
      ? "btn-secondary"
      : variant === "ghost"
        ? "btn-ghost"
        : "btn-primary";
  return (
    <Link href={href} className={cn(cls, className)}>
      {children}
    </Link>
  );
}

// ---- Stat pill row ----
export function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-3">
      <div className="text-xl font-bold text-ink">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}
