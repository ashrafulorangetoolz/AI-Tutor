import { Lightbulb, ListChecks, PencilLine, BookMarked } from "lucide-react";
import Link from "next/link";
import type { TutorResponse } from "@/types";
import { cn } from "@/lib/utils/cn";

/** Structured step-by-step rendering of a tutor answer. */
export function AiResponseSteps({ data }: { data: TutorResponse }) {
  return (
    <div className="space-y-3.5">
      <p className="text-sm leading-relaxed text-ink">{data.explanation}</p>

      <Section
        icon={<ListChecks className="h-4 w-4" />}
        title="Step-by-step"
        tint="brand"
      >
        <ol className="space-y-2">
          {data.steps.map((s, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-ink">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-400 text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <span className="leading-relaxed">{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        icon={<Lightbulb className="h-4 w-4" />}
        title="Example"
        tint="amber"
      >
        <p className="text-sm leading-relaxed text-ink">{data.example}</p>
      </Section>

      <Section
        icon={<PencilLine className="h-4 w-4" />}
        title="Practice questions"
        tint="sky"
      >
        <ul className="space-y-1.5">
          {data.practiceQuestions.map((q, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
              <span className="leading-relaxed">{q}</span>
            </li>
          ))}
        </ul>
      </Section>

      {data.recommendedConceptCards.length > 0 && (
        <Section
          icon={<BookMarked className="h-4 w-4" />}
          title="Recommended concept cards"
          tint="mint"
        >
          <div className="flex flex-wrap gap-2">
            {data.recommendedConceptCards.map((c) => (
              <Link
                key={c.id}
                href="/dashboard/concept-cards"
                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

const TINTS = {
  brand: { box: "border-brand-100 bg-brand-50/50", head: "text-brand-600" },
  amber: { box: "border-sun-100 bg-sun-100/40", head: "text-amber-700" },
  sky: { box: "border-sky-100 bg-sky-50/60", head: "text-sky-600" },
  mint: {
    box: "border-secondary-200 bg-secondary-50/60",
    head: "text-secondary-700",
  },
} as const;

function Section({
  icon,
  title,
  tint,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  tint: keyof typeof TINTS;
  children: React.ReactNode;
}) {
  const t = TINTS[tint];
  return (
    <div className={cn("rounded-xl border p-3.5", t.box)}>
      <div
        className={cn(
          "mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide",
          t.head,
        )}
      >
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}
