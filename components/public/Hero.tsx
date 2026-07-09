"use client";

import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";
import { HeroShowcase } from "./HeroShowcase";
import { GradientBackdrop } from "@/components/ui/GradientBackdrop";

/* Keyword → accent-colour rules for the multi-colour display heading.
   Matched phrases are wrapped in coloured spans; everything else stays ink.
   Kept per-language so both EN and BN headlines get the same treatment. */
const HIGHLIGHTS: Record<"en" | "bn", { phrase: string; className: string }[]> =
  {
    en: [
      {
        phrase: "AI Learning",
        className: "text-gradient-flow",
      },
      { phrase: "SSC", className: "text-cta" },
      { phrase: "IELTS", className: "text-secondary-600" },
    ],
    bn: [
      {
        phrase: "এআই লার্নিং",
        className: "text-gradient-flow",
      },
      { phrase: "এসএসসি", className: "text-cta" },
      { phrase: "আইইএলটিএস", className: "text-secondary-600" },
    ],
  };

function highlight(
  text: string,
  rules: { phrase: string; className: string }[],
): ReactNode {
  if (!rules.length) return text;
  const escaped = rules.map((r) =>
    r.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(re);
  return parts.map((part, i) => {
    const rule = rules.find(
      (r) => r.phrase.toLowerCase() === part.toLowerCase(),
    );
    return rule ? (
      <span key={i} className={rule.className}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    );
  });
}

export function Hero() {
  const { t, lang } = useI18n();

  return (
    <section className="relative -mt-[88px] overflow-hidden pt-[88px]">
      {/* Figma gradient shape backdrop */}
      <GradientBackdrop />

      <div className="section flex flex-col items-center py-20 text-center lg:py-28">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/30 px-5 py-1.5 shadow-card backdrop-blur-md">
          <span className="font-display text-lg font-semibold text-ink">
            4.9
          </span>
          <span className="h-4 w-px bg-ink/15" />
          <span className="flex items-center gap-0.5 text-cta">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </span>
          <span className="text-xs text-muted">from 12,000+ students</span>
        </div>

        {/* Multi-colour display heading */}
        <h1
          className={cn(
            "mt-6 max-w-5xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[5.5rem]",
            lang === "bn" && "font-bangla",
          )}
        >
          {highlight(t("home.heroTitle"), HIGHLIGHTS[lang])}
        </h1>

        {/* Subtitle */}
        <p
          className={cn(
            "mt-6 max-w-2xl text-lg text-muted sm:text-xl",
            lang === "bn" && "font-bangla",
          )}
        >
          {t("home.heroSubtitle")}
        </p>

        {/* CTA — glowing yellow-outlined pills (Figma node 16817:37320) */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-[30px]">
          <Link href="/signup" className="group relative inline-flex">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(87deg,#7034ea_5%,#ff7837_58%,#5da0b3_96%)] opacity-60 blur-[60px] transition-opacity duration-300 group-hover:opacity-90"
            />
            <span className="relative inline-flex items-center gap-4 overflow-clip rounded-full border border-accent-500 bg-coral-500 px-8 py-[15px] font-display text-xl font-medium capitalize leading-[30px] tracking-[1.25px] text-white transition-transform duration-300 group-hover:-translate-y-0.5">
              {t("common.getStarted")}
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
          <Link href="/pricing" className="group relative inline-flex">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(87deg,#7034ea_5%,#ff7837_58%,#5da0b3_96%)] opacity-60 blur-[60px] transition-opacity duration-300 group-hover:opacity-90"
            />
            <span className="relative inline-flex items-center gap-4 overflow-clip rounded-full border border-accent-500 bg-surface px-8 py-[15px] font-display text-xl font-medium capitalize leading-[30px] tracking-[1.25px] text-ink transition-transform duration-300 group-hover:-translate-y-0.5">
              {t("common.seePlans")}
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
        </div>

        {/* Bento showcase */}
        <HeroShowcase />
      </div>
    </section>
  );
}
