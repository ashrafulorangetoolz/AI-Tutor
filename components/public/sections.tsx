import Link from "next/link";
import type { ReactNode } from "react";
import { Check, ArrowRight, Star, Clock, BookOpen, BarChart3 } from "lucide-react";
import { Card, CardBody, Badge } from "@/components/ui/primitives";
import { TestimonialShowcase } from "./TestimonialShowcase";
import { ScrollReveal, Parallax } from "./Reveal";
import type { PlanDef } from "@/types";
import { cn } from "@/lib/utils/cn";

// ---- FeatureGrid ----
export function FeatureGrid({
  features,
  columns = 3,
}: {
  features: { icon: string; title: string; description: string }[];
  columns?: 2 | 3 | 4;
}) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <div className={cn("grid gap-5", cols)}>
      {features.map((f) => (
        <Card key={f.title} className="transition-all hover:-translate-y-0.5 hover:shadow-card">
          <CardBody>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-2xl">
              {f.icon}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-ink">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{f.description}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

// ---- TrackCard ----
export function TrackCard({
  emoji,
  icon,
  visual,
  title,
  subtitle,
  bullets,
  href,
  cta,
  accent = "brand",
}: {
  emoji?: string;
  icon?: ReactNode;
  visual?: ReactNode;
  title: string;
  subtitle: string;
  bullets: string[];
  href: string;
  cta: string;
  accent?: "brand" | "blue";
}) {
  const ring = accent === "blue" ? "from-sky-100" : "from-brand-100";
  const iconColor = accent === "blue" ? "text-sky-600" : "text-brand-600";
  return (
    <Card className="overflow-hidden">
      <div className={cn("bg-linear-to-b to-surface p-6", ring)}>
        {visual ? (
          <div className="mb-4">{visual}</div>
        ) : icon ? (
          <span
            className={cn(
              "inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-surface shadow-card ring-1 ring-line",
              iconColor,
            )}
          >
            {icon}
          </span>
        ) : (
          <div className="text-4xl">{emoji}</div>
        )}
        <h3 className={cn("text-2xl font-bold text-ink", !visual && "mt-3")}>{title}</h3>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      <CardBody>
        <ul className="space-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              {b}
            </li>
          ))}
        </ul>
        <Link href={href} className="btn-primary mt-5 w-full">
          {cta}
        </Link>
      </CardBody>
    </Card>
  );
}

// ---- PricingCard ----
export function PricingCard({ plan }: { plan: PlanDef }) {
  return (
    <Card className={cn("relative flex h-full flex-col", plan.featured && "ring-2 ring-brand-500")}>
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      )}
      <CardBody className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">{plan.name}</h3>
          {plan.b2b && <Badge tone="blue">B2B</Badge>}
        </div>
        <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
        <div className="mt-4 flex items-baseline gap-1">
          {plan.b2b ? (
            <span className="text-3xl font-extrabold text-ink">Custom</span>
          ) : plan.price === 0 ? (
            <span className="text-3xl font-extrabold text-ink">Free</span>
          ) : (
            <>
              <span className="text-3xl font-extrabold text-ink">৳{plan.price}</span>
              <span className="text-sm text-muted">/{plan.period}</span>
            </>
          )}
        </div>
        <ul className="mt-5 space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex-1" />
        <Link
          href={plan.b2b ? "/contact" : "/signup"}
          className={cn("w-full", plan.featured ? "btn-primary" : "btn-secondary")}
        >
          {plan.b2b ? "Contact sales" : plan.price === 0 ? "Start free" : "Choose plan"}
        </Link>
      </CardBody>
    </Card>
  );
}

// ---- TestimonialSection ----
export function TestimonialSection() {
  return <TestimonialShowcase />;
}

// ---- CTASection ----
export function CTASection({
  title,
  subtitle,
  primaryHref = "/signup",
  primaryLabel = "Get started free",
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  subtitle: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-brand-500 px-6 py-12 text-center sm:px-12">
      <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-brand-100">{subtitle}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href={primaryHref} className="btn bg-white text-brand-600 hover:bg-brand-50">
          {primaryLabel}
        </Link>
        {secondaryHref && (
          <Link href={secondaryHref} className="btn border border-white/40 text-white hover:bg-white/10">
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

// ---- SectionWrap: consistent vertical rhythm ----
export function SectionWrap({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("section py-16 sm:py-20", className)}>
      {children}
    </section>
  );
}

// ---- StatStrip: big-number highlights (learnedge "50+" band) ----
export function StatStrip({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-3xl border border-line bg-surface p-6 shadow-card sm:grid-cols-4 sm:p-8">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="font-display text-3xl font-extrabold text-brand-500 sm:text-4xl">
            {s.value}
          </div>
          <div className="mt-1 text-sm text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ---- FeatureHighlight: alternating two-column "why choose us" block ----
const HIGHLIGHT_TONES = {
  brand: {
    card: "border-brand-100 bg-brand-50/60",
    panel: "bg-gradient-to-br from-brand-100 via-brand-50 to-surface",
    pill: "text-brand-600",
    check: "bg-brand-100 text-brand-600",
  },
  mint: {
    card: "border-secondary-200 bg-secondary-50/70",
    panel: "bg-gradient-to-br from-secondary-100 via-secondary-50 to-surface",
    pill: "text-secondary-700",
    check: "bg-secondary-100 text-secondary-700",
  },
} as const;

const AVATAR_TINTS = ["#7034ea", "#ff5714", "#2e90fa", "#09c07a"];

export function FeatureHighlight({
  eyebrow,
  icon,
  title,
  accent,
  description,
  points,
  ctaHref,
  ctaLabel,
  visual,
  reverse,
  tone = "brand",
  rating = "4.9/5.0",
  ratedBy = "6,650 students",
}: {
  eyebrow: string;
  icon?: ReactNode;
  title: string;
  /** Optional trailing words rendered in the brand gradient. */
  accent?: string;
  description: string;
  points: string[];
  ctaHref: string;
  ctaLabel: string;
  visual: ReactNode;
  reverse?: boolean;
  tone?: keyof typeof HIGHLIGHT_TONES;
  rating?: string;
  ratedBy?: string;
}) {
  const t = HIGHLIGHT_TONES[tone];
  return (
    <ScrollReveal
      className={cn(
        "grid items-center gap-8 rounded-[2rem] border p-4 sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-8",
        t.card,
      )}
    >
      {/* Visual panel */}
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden rounded-3xl p-5 sm:p-8",
          t.panel,
          reverse && "lg:order-2",
        )}
      >
        <Parallax amount={70} className="w-full">
          {visual}
        </Parallax>
      </div>

      {/* Copy */}
      <div className={cn(reverse && "lg:order-1")}>
        <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-sm font-semibold text-ink shadow-card ring-1 ring-line">
          {icon && <span className={t.pill}>{icon}</span>}
          {eyebrow}
        </span>
        <h3 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {title}
          {accent && <span className="text-gradient-brand"> {accent}</span>}
        </h3>
        <p className="mt-3 text-base text-muted">{description}</p>

        <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-ink">
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  t.check,
                )}
              >
                <Check className="h-3 w-3" />
              </span>
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href={ctaHref} className="btn-primary">
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {AVATAR_TINTS.map((c, i) => (
                <span
                  key={i}
                  className="h-9 w-9 rounded-full ring-2 ring-surface"
                  style={{ background: `linear-gradient(135deg, ${c}, ${c}bb)` }}
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1.5">
                <span className="flex text-warning">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
                <span className="font-semibold text-ink">{rating}</span>
              </div>
              <p className="text-xs text-muted">Rated by {ratedBy}</p>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

// ---- ProgramCard: course-style card with meta chips (learnedge course grid) ----
export function ProgramCard({
  emoji,
  color,
  title,
  description,
  level,
  lessons,
  duration,
  rating,
  priceLabel,
  href,
}: {
  emoji: string;
  color: string;
  title: string;
  description: string;
  level: string;
  lessons: string;
  duration: string;
  rating: string;
  priceLabel: string;
  href: string;
}) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div
        className="flex h-28 items-center justify-center text-5xl"
        style={{ background: `${color}1A` }}
      >
        <span>{emoji}</span>
      </div>
      <CardBody className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between">
          <Badge tone="green">{level}</Badge>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink">
            <Star className="h-3.5 w-3.5 fill-current text-warning" /> {rating}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{description}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> {lessons}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <BarChart3 className="h-3.5 w-3.5" /> {level}
          </span>
        </div>
        <div className="mt-4 flex-1" />
        <div className="flex items-center justify-between border-t border-line pt-4">
          <span className="text-sm font-bold text-ink">{priceLabel}</span>
          <Link href={href} className="btn-secondary !px-4 !py-2 text-xs">
            Explore <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
