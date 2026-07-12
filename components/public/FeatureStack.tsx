"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Feature = {
  icon: ReactNode;
  title: string;
  description: string;
  /** Optional full screenshot/preview shown in the panel instead of the icon tile. */
  visual?: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
};

const TONES = [
  {
    card: "border-brand-100 bg-brand-50",
    panel: "bg-gradient-to-br from-brand-100 via-brand-50 to-surface",
    chip: "bg-brand-500/10 text-brand-600",
    icon: "text-brand-600",
  },
  {
    card: "border-sky-100 bg-sky-50",
    panel: "bg-gradient-to-br from-sky-100 via-sky-50 to-surface",
    chip: "bg-sky-500/10 text-sky-600",
    icon: "text-sky-600",
  },
  {
    card: "border-secondary-200 bg-secondary-50",
    panel: "bg-gradient-to-br from-secondary-100 via-secondary-50 to-surface",
    chip: "bg-secondary-500/10 text-secondary-700",
    icon: "text-secondary-700",
  },
  {
    card: "border-coral-100 bg-coral-50",
    panel: "bg-gradient-to-br from-coral-100 via-coral-50 to-surface",
    chip: "bg-coral-500/10 text-coral-600",
    icon: "text-coral-600",
  },
] as const;

const BASE_TOP = 96; // px — matches --stack-top: 6rem
const STEP = 18; // px of peek between stacked cards

export function FeatureStack({ features }: { features: Feature[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      const cards = gsap.utils.toArray<HTMLElement>(".feature-stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const next = cards[i + 1];
        gsap.fromTo(
          card,
          { scale: 1, filter: "brightness(1)" },
          {
            scale: 0.92,
            filter: "brightness(0.94)",
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: `top ${BASE_TOP + (i + 1) * STEP}`,
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mx-auto max-w-4xl pb-[10vh]">
      {features.map((f, i) => {
        const t = TONES[i % TONES.length];
        return (
          <div
            key={f.title}
            className="feature-stack-card mb-6"
            style={{ ["--stack-top" as string]: `${BASE_TOP + i * STEP}px` }}
          >
            <article
              className={cn(
                "grid gap-6 rounded-[2rem] border p-6 shadow-card sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10",
                t.card,
              )}
            >
              {/* Icon / image panel */}
              <div
                className={cn(
                  "flex items-center justify-center rounded-3xl",
                  f.visual ? "p-4 sm:p-5" : "p-8",
                  t.panel,
                )}
              >
                {f.visual ?? (
                  <span
                    className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-2xl bg-surface shadow-card ring-1 ring-line sm:h-24 sm:w-24",
                      t.icon,
                    )}
                  >
                    {f.icon}
                  </span>
                )}
              </div>

              {/* Copy */}
              <div className="flex flex-col justify-center">
                <span
                  className={cn(
                    "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
                    t.chip,
                  )}
                >
                  Feature {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {f.description}
                </p>
                {f.ctaHref && f.ctaLabel && (
                  <Link href={f.ctaHref} className="btn-primary mt-6 w-fit">
                    {f.ctaLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
