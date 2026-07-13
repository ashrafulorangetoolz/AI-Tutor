import Link from "next/link";
import {
  Bot,
  ScanText,
  ClipboardCheck,
  LineChart,
  ArrowRight,
  Check,
} from "lucide-react";

const MODULES = [
  { icon: Bot, label: "AI Tutor", color: "#7034ea" },
  { icon: ScanText, label: "Doubt Solver", color: "#ff5714" },
  { icon: ClipboardCheck, label: "Mock Exams", color: "#2e90fa" },
  { icon: LineChart, label: "Progress", color: "#00d97f" },
];

const OVERVIEW = [
  "Bilingual AI Tutor (EN / বাংলা)",
  "Photo Doubt Solver with OCR",
  "SSC board-style mock exams",
  "IELTS 4-skill mocks & band scoring",
  "Adaptive weekly study plans",
  "Progress analytics & streaks",
  "Parent monitoring dashboard",
  "School B2B license & seats",
];

export function ProductDemo() {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Module legend — what the walkthrough covers */}
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.label}
              className="flex items-center justify-center gap-2.5 rounded-2xl border border-line bg-surface/60 p-3 text-center sm:gap-3 sm:p-4"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${mod.color}1A`, color: mod.color }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-ink">
                {mod.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Full-width browser-window with the walkthrough video */}
      <div className="relative w-full">
        {/* soft brand glow behind the window */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand-200/25 opacity-70 blur-3xl"
        />
        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
          {/* window chrome */}
          <div className="flex items-center gap-2 border-b border-line bg-canvas/60 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-coral-400" />
            <span className="h-3 w-3 rounded-full bg-accent-400" />
            <span className="h-3 w-3 rounded-full bg-secondary-400" />
            <div className="ml-3 flex-1">
              <div className="mx-auto flex w-full max-w-xs items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                aitutor.app/overview
              </div>
            </div>
          </div>

          {/* the walkthrough video (autoplays, loops, muted) */}
          <video
            className="block h-auto w-full bg-canvas"
            src="/demo-overview.mp4"
            poster="/demo-overview-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Full AI Tutor product walkthrough"
          />
        </div>

        {/* floating auto-play badge */}
        <div className="absolute -bottom-4 left-6 flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-brand">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary-500" />
          </span>
          Full walkthrough
        </div>
      </div>

      {/* CTA */}
      <Link href="/signup" className="btn-primary mt-2 inline-flex">
        Start free <ArrowRight className="h-4 w-4" />
      </Link>

      {/* Full project overview */}
      <div className="mt-2 w-full border-t border-line pt-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted">
          Everything included
        </p>
        <ul className="mx-auto mt-4 grid max-w-4xl gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {OVERVIEW.map((o) => (
            <li key={o} className="flex items-start gap-2 text-sm text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              {o}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
