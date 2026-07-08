"use client";

import Link from "next/link";
import {
  Languages,
  Camera,
  Search,
  Play,
  GraduationCap,
  CircleUserRound,
  Type,
  Shapes,
  Clapperboard,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

/* Tool row reused from the previous interface mock. */
const TOOLS: { icon: LucideIcon; label: string; active?: boolean }[] = [
  { icon: CircleUserRound, label: "Tutor" },
  { icon: Type, label: "Ask", active: true },
  { icon: Shapes, label: "Practice" },
  { icon: Clapperboard, label: "Videos" },
];

/* Overlapping avatar stack — gradient placeholders (no photo assets in repo). */
const AVATARS = [
  { initials: "RA", from: "from-brand-400", to: "to-brand-600" },
  { initials: "SN", from: "from-coral-400", to: "to-coral-600" },
  { initials: "TH", from: "from-sky-400", to: "to-sky-600" },
  { initials: "MI", from: "from-secondary-400", to: "to-secondary-600" },
];

/* Feature pills for the "learn step by step" card. */
const PILLS = ["Bilingual Tutor", "Board Mocks", "IELTS Band", "24/7 Ask"];

export function HeroShowcase() {
  return (
    <div className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-2 gap-4 text-left sm:gap-5 lg:mt-20 lg:grid-cols-4 lg:grid-rows-[repeat(2,minmax(210px,1fr))]">
      {/* Bilingual tile (blue) */}
      <div className="flex flex-col justify-between rounded-3xl bg-sky-100 p-5 shadow-card">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 text-sky-600 shadow-sm">
          <Languages className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div>
          <p className="font-display text-xl font-semibold text-ink">EN · বাংলা</p>
          <p className="mt-0.5 text-sm text-ink/60">Learn in both languages</p>
        </div>
      </div>

      {/* Photo doubt tile (pink) */}
      <div className="flex flex-col justify-between rounded-3xl bg-rose-100 p-5 shadow-card">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 text-rose-500 shadow-sm">
          <Camera className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div>
          <p className="font-display text-xl font-semibold text-ink">Snap a doubt</p>
          <p className="mt-0.5 text-sm text-ink/60">Photo doubt-solving</p>
        </div>
      </div>

      {/* Students stat (peach) */}
      <div className="col-span-2 flex flex-col justify-between rounded-3xl bg-coral-100 p-6 shadow-card lg:col-span-2 lg:row-start-2">
        <div className="flex -space-x-3">
          {AVATARS.map((a) => (
            <span
              key={a.initials}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white ring-2 ring-coral-100",
                a.from,
                a.to,
              )}
            >
              {a.initials}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-4xl font-semibold leading-none text-ink">12,000+</p>
            <p className="mt-1.5 text-sm text-ink/60">Students learning already</p>
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            <Search className="h-4 w-4" />
            Explore
          </Link>
        </div>
      </div>

      {/* Interface mock (center, tall) */}
      <div className="col-span-2 flex flex-col rounded-3xl border border-line bg-surface p-5 shadow-pop lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1">
        <div className="grid grid-cols-4 gap-1.5 rounded-2xl bg-canvas p-2">
          {TOOLS.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl py-2.5",
                active && "bg-surface shadow-card",
              )}
            >
              <Icon
                className={cn("h-5 w-5", active ? "text-brand-500" : "text-ink/60")}
                strokeWidth={1.75}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  active ? "text-brand-600" : "text-ink/70",
                )}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-1 flex-col justify-center">
          <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
            Ask. Understand. Ace it.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Step-by-step answers in English or Bangla — no manual, just ask.
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === 1 ? "w-5 bg-brand-500" : "w-1.5 bg-ink/15",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Play walkthrough"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white shadow-brand transition-transform hover:-translate-y-0.5"
          >
            <Play className="h-4 w-4 fill-current" />
          </button>
        </div>
      </div>

      {/* Subjects stat (green) */}
      <div className="relative col-span-2 flex flex-col justify-between overflow-hidden rounded-3xl bg-secondary-200 p-6 shadow-card lg:col-span-1 lg:col-start-4 lg:row-start-1">
        {/* Decorative flower */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="pointer-events-none absolute -bottom-4 -right-4 h-32 w-32 text-secondary-400/60"
        >
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="50"
              cy="28"
              rx="15"
              ry="24"
              fill="currentColor"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="12" className="fill-secondary-100" />
        </svg>
        <p className="relative font-display text-4xl font-semibold leading-none text-ink">50+</p>
        <div className="relative">
          <p className="text-sm text-ink/60">Subjects &amp; topics</p>
          <p className="mt-1 font-display text-lg font-semibold text-ink">SSC &amp; IELTS ready</p>
        </div>
      </div>

      {/* Learn step-by-step (yellow) */}
      <div className="col-span-2 flex flex-col justify-between rounded-3xl bg-accent-300 p-6 shadow-card lg:col-span-1 lg:col-start-4 lg:row-start-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-ink/10 text-ink">
            <GraduationCap className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <p className="font-display text-lg font-semibold text-ink">Learn step by step</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {PILLS.map((pill) => (
            <span
              key={pill}
              className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-ink shadow-sm"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
