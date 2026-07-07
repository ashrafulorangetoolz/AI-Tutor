import { Lightbulb, ListChecks, PencilLine, BookMarked } from "lucide-react";
import Link from "next/link";
import type { TutorResponse } from "@/types";

/** Structured step-by-step rendering of a tutor answer. */
export function AiResponseSteps({ data }: { data: TutorResponse }) {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-ink">{data.explanation}</p>

      <Section icon={<ListChecks className="h-4 w-4" />} title="Step-by-step">
        <ol className="space-y-1.5">
          {data.steps.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-600">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section icon={<Lightbulb className="h-4 w-4" />} title="Example">
        <p className="text-sm text-ink">{data.example}</p>
      </Section>

      <Section icon={<PencilLine className="h-4 w-4" />} title="Practice questions">
        <ul className="space-y-1.5">
          {data.practiceQuestions.map((q, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink">
              <span className="text-brand-500">•</span>
              {q}
            </li>
          ))}
        </ul>
      </Section>

      {data.recommendedConceptCards.length > 0 && (
        <Section icon={<BookMarked className="h-4 w-4" />} title="Recommended concept cards">
          <div className="flex flex-wrap gap-2">
            {data.recommendedConceptCards.map((c) => (
              <Link
                key={c.id}
                href="/dashboard/concept-cards"
                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:bg-brand-50"
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

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-brand-50/40 p-3.5">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-600">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}
