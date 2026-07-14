import Link from "next/link";
import type { ReactNode } from "react";
import { Check, ArrowRight, Star, Clock, BookOpen, BarChart3, FolderClosed } from "lucide-react";
import Image from "next/image";
import { Card, CardBody, Badge } from "@/components/ui/primitives";
import { TestimonialShowcase } from "./TestimonialShowcase";
import { ScrollReveal, Parallax } from "./Reveal";
import { CountUp } from "./CountUp";
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
  badge = "Free to start",
  trust = ["No credit card", "Cancel anytime", "4.9★ average rating"],
}: {
  title: string;
  subtitle: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  badge?: string;
  trust?: string[];
}) {
  return (
    <ScrollReveal>
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 px-6 py-14 text-center shadow-brand sm:px-12 sm:py-16">
        {/* soft glow orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-400/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl"
        />
        {/* dotted grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        {/* top sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
            {badge}
          </span>

          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.1]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-brand-100/90 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={primaryHref}
              className="group btn bg-white text-brand-600 shadow-lg shadow-brand-900/25 transition-all hover:-translate-y-0.5 hover:bg-brand-50 hover:shadow-xl"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {secondaryHref && (
              <Link
                href={secondaryHref}
                className="btn border border-white/30 bg-white/5 text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>

          {trust.length > 0 && (
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-brand-100/80">
              {trust.map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-white" strokeWidth={2.5} />
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

// ---- SectionBand: full-bleed modern background band ----
// Layered: base gradient wash + masked dotted grid + soft corner glow orbs.
// Use to give a section a rich, contemporary backdrop while content stays
// inside the standard `.section` container.
export function SectionBand({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden border-y border-line py-16 sm:py-20",
        className,
      )}
    >
      {/* base gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-brand-50/60 via-surface to-secondary-50/40"
      />
      {/* masked dotted grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:radial-gradient(circle,var(--color-line)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />
      {/* soft glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-16 -z-10 h-72 w-72 rounded-full bg-brand-200/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-24 -z-10 h-80 w-80 rounded-full bg-secondary-200/25 blur-3xl"
      />

      <div className="section">{children}</div>
    </section>
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
const STAT_TINTS = ["#7034ea", "#2e90fa", "#09c07a", "#ff5714"];

export function StatStrip({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <ScrollReveal>
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-brand-50/60 via-surface to-secondary-50/40 p-6 shadow-card sm:p-9">
        {/* soft glow orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-brand-200/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-secondary-200/30 blur-3xl"
        />

        <div className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:divide-x sm:divide-line">
          {stats.map((s, i) => {
            const tint = STAT_TINTS[i % STAT_TINTS.length];
            return (
              <div
                key={s.label}
                className="group flex flex-col items-center px-2 text-center"
              >
                <div
                  className="font-display text-4xl font-extrabold tracking-tight transition-transform duration-300 group-hover:scale-110 sm:text-5xl"
                  style={{ color: tint }}
                >
                  <CountUp value={s.value} />
                </div>
                <div className="mt-2.5 text-sm font-medium text-muted">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
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

const AVATAR_POOL = [
  "/images/avatar/Avatar.jpg",
  "/images/avatar/Avatar-1.jpg",
  "/images/avatar/Avatar-2.jpg",
  "/images/avatar/Avatar-3.jpg",
  "/images/avatar/Avatar-4.jpg",
  "/images/avatar/Avatar-5.jpg",
  "/images/avatar/Avatar-6.jpg",
  "/images/avatar/Avatar-7.jpg",
  "/images/avatar/Avatar-8.jpg",
  "/images/avatar/Avatar-9.jpg",
  "/images/avatar/Avatar-10.jpg",
  "/images/avatar/Avatar-11.jpg",
  "/images/avatar/Avatar-12.jpg",
  "/images/avatar/Avatar-13.jpg",
  "/images/avatar/Avatar-14.jpg",
];

/** Deterministically pick `count` avatars starting from `seed`, spread across the pool. */
function pickAvatars(seed: number, count = 4) {
  const step = Math.floor(AVATAR_POOL.length / count);
  return Array.from(
    { length: count },
    (_, i) => AVATAR_POOL[(seed + i * step) % AVATAR_POOL.length],
  );
}

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
  avatarSeed = 0,
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
  /** Offset into the avatar pool so each block shows different faces. */
  avatarSeed?: number;
}) {
  const t = HIGHLIGHT_TONES[tone];
  const avatars = pickAvatars(avatarSeed);
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
              {avatars.map((src, i) => (
                <span key={i} className="relative inline-block h-9 w-9">
                  <Image
                    src={src}
                    alt={`Student ${i + 1}`}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-surface"
                  />
                  {i === avatars.length - 1 && (
                    <span className="absolute inset-0 flex items-center justify-center rounded-full bg-ink/55 text-xs font-bold text-white ring-2 ring-surface">
                      +
                    </span>
                  )}
                </span>
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

// ---- ProgramCard: course-style card with top image (learnedge course grid) ----
export function ProgramCard({
  image,
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
  ctaLabel = "View Courses",
}: {
  image?: string;
  emoji?: string;
  color?: string;
  title: string;
  description: string;
  level: string;
  lessons: string;
  duration: string;
  rating: string;
  priceLabel: string;
  href: string;
  ctaLabel?: string;
}) {
  const accent = color ?? "#7034ea";
  return (
    <Card className="group flex h-full flex-col p-4 transition-all hover:-translate-y-1 hover:shadow-brand sm:p-5">
      {/* top image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-brand-50">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 90vw, 560px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-6xl"
            style={{ background: `${accent}1A` }}
          >
            <span>{emoji}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pt-5 sm:px-3">
        {/* meta row */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line pb-4 text-sm text-muted">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span
              className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ background: `${accent}1A`, color: accent }}
            >
              {level}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FolderClosed className="h-4 w-4" /> {lessons}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
            {rating} <Star className="h-3.5 w-3.5 fill-current text-warning" strokeWidth={0} />
          </span>
        </div>

        {/* title + description */}
        <h3 className="mt-4 text-xl font-bold text-ink sm:text-2xl">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted sm:text-base">{description}</p>

        <div className="mt-4 flex-1" />

        {/* footer: price + CTA */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
          <div className="leading-tight">
            <span className="text-xl font-extrabold text-ink">{priceLabel}</span>
          </div>
          <Link
            href={href}
            className="group/cta inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </Card>
  );
}
