"use client";

import Link from "next/link";
import { Sparkles, Camera, FileCheck2, TrendingUp, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";
import { InterfaceShowcase } from "./InterfaceShowcase";

const CHIPS = [
  { icon: <Sparkles className="h-3.5 w-3.5" />, label: "Bilingual AI Tutor" },
  { icon: <Camera className="h-3.5 w-3.5" />, label: "Photo Doubt Solver" },
  { icon: <FileCheck2 className="h-3.5 w-3.5" />, label: "Board-style Mocks" },
  { icon: <TrendingUp className="h-3.5 w-3.5" />, label: "IELTS Band Tracker" },
];

export function Hero() {
  const { t, lang } = useI18n();
  return (
    <section className="relative -mt-[88px] overflow-hidden pt-[88px]">
      {/* Hero background — blurred gradient arc (Figma: Shape / Gradients) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[140%] w-[130%] -translate-x-1/2 -translate-y-1/2 animate-float bg-cover bg-center bg-no-repeat opacity-70"
          style={{ backgroundImage: "url('/hero-glow.svg')" }}
        />
        {/* Soft fade so the glow melts into the canvas */}
        <div className="absolute inset-0 bg-linear-to-b from-canvas/50 via-transparent to-canvas" />
      </div>
      <div className="section grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="badge-green">🇧🇩 Made for Bangladeshi students</span>
          <h1
            className={cn(
              "mt-4 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl",
              lang === "bn" && "font-bangla",
            )}
          >
            {t("home.heroTitle")}
          </h1>
          <p className={cn("mt-4 max-w-lg text-lg text-muted", lang === "bn" && "font-bangla")}>
            {t("home.heroSubtitle")}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/signup" className="btn-primary !px-5 !py-3 text-base">
              {t("common.getStarted")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="btn-secondary !px-5 !py-3 text-base">
              {t("common.seePlans")}
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink"
              >
                <span className="text-brand-500">{c.icon}</span>
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Clean interface showcase */}
        <InterfaceShowcase />
      </div>
    </section>
  );
}
