import {
  CircleUserRound,
  Type,
  Shapes,
  Clapperboard,
  MousePointer2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Tool = { icon: LucideIcon; label: string; active?: boolean };

const TOOLS: Tool[] = [
  { icon: CircleUserRound, label: "Tutor" },
  { icon: Type, label: "Ask", active: true },
  { icon: Shapes, label: "Practice" },
  { icon: Clapperboard, label: "Videos" },
];

/**
 * Clean, layered product-showcase card for the hero.
 * A soft outer panel holds an elevated tool bar, a collaborator cursor,
 * a headline block and carousel dots — echoing a modern SaaS mockup.
 */
export function InterfaceShowcase() {
  return (
    <div className="relative">
      {/* Soft ambient glow behind the card */}
      <div className="pointer-events-none absolute -inset-6 -z-10">
        <div className="absolute right-6 top-0 h-40 w-40 rounded-full bg-violet-200/60 blur-3xl" />
        <div className="absolute bottom-2 left-8 h-40 w-40 rounded-full bg-brand-200/50 blur-3xl" />
      </div>

      {/* Outer showcase panel */}
      <div className="animate-fadeUp rounded-[2rem] border border-line/70 bg-surface/80 p-4 shadow-pop ring-1 ring-white/60 backdrop-blur sm:p-6">
        {/* Faint top strip (scroll area above the toolbar) */}
        <div className="h-16 rounded-2xl bg-ink/[0.03]" />

        {/* Elevated tool bar */}
        <div className="relative z-10 -mt-2 rounded-2xl border border-line bg-surface p-4 shadow-card">
          <div className="grid grid-cols-4 gap-2">
            {TOOLS.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl py-1"
              >
                <Icon
                  className={cn(
                    "h-6 w-6",
                    active ? "text-brand-500" : "text-ink/70",
                  )}
                  strokeWidth={1.75}
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    active ? "text-brand-600" : "text-ink",
                  )}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborator cursor + name tag */}
        <div className="relative h-9">
          <div className="absolute left-[38%] top-0 flex items-start gap-1">
            <MousePointer2 className="h-5 w-5 -scale-x-100 fill-violet-500 text-violet-500" />
            <span className="mt-2 rounded-lg bg-violet-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              Rafi
            </span>
          </div>
        </div>

        {/* Headline block */}
        <div className="rounded-2xl bg-ink/[0.02] px-5 py-6 sm:px-7 sm:py-8">
          <h3 className="text-2xl font-bold leading-tight text-ink sm:text-[1.7rem]">
            Intuitive interface,
            <br />
            built for beginners
          </h3>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
            Learn any topic step by step in English or Bangla — no manual, no
            setup, just ask and understand.
          </p>
        </div>

        {/* Carousel dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === 1 ? "w-5 bg-brand-500" : "w-1.5 bg-ink/15",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
