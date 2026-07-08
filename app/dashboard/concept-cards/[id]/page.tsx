import Link from "next/link";
import { Card, CardBody, Badge, EmptyState, LinkButton } from "@/components/ui/primitives";
import { CONCEPT_CARDS } from "@/lib/mock/data";
import { cn } from "@/lib/utils/cn";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Concept Card" };

export default async function ConceptCardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = CONCEPT_CARDS.find((c) => c.id === id);

  if (!card) {
    return (
      <div>
        <EmptyState
          icon="🔍"
          title="Card not found"
          description="We couldn't find that concept card. It may have been moved or removed."
          action={
            <LinkButton href="/dashboard/concept-cards" variant="secondary">
              Back to concept cards
            </LinkButton>
          }
        />
      </div>
    );
  }

  const bn = card.language === "BN";
  const diffTone =
    card.difficulty === "HARD" ? "amber" : card.difficulty === "EASY" ? "green" : "blue";

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/dashboard/concept-cards"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to concept cards
      </Link>

      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge tone={card.track === "IELTS" ? "blue" : "green"}>{card.track}</Badge>
          <Badge tone={diffTone as "amber" | "green" | "blue"}>{card.difficulty}</Badge>
          {card.premium && <Badge tone="amber">★ Premium</Badge>}
        </div>
        <h1 className={cn("text-2xl font-bold text-ink", bn && "font-bangla")}>
          {card.title}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {card.subject} · {card.chapter}
        </p>
      </div>

      <div className="space-y-5">
        <Card>
          <CardBody>
            <h2 className="mb-2 text-xl font-semibold text-ink">Explanation</h2>
            <p className={cn("text-sm leading-relaxed text-ink/90", bn && "font-bangla")}>
              {card.explanation}
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-2 text-xl font-semibold text-ink">Example</h2>
            <p className={cn("text-sm leading-relaxed text-ink/90", bn && "font-bangla")}>
              {card.example}
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-2 text-xl font-semibold text-ink">Common mistakes</h2>
            <ul className={cn("list-disc space-y-1.5 pl-5 text-sm text-ink/90", bn && "font-bangla")}>
              {card.commonMistakes.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-2 text-xl font-semibold text-ink">Practice questions</h2>
            <ol className={cn("list-decimal space-y-1.5 pl-5 text-sm text-ink/90", bn && "font-bangla")}>
              {card.practice.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
          </CardBody>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <LinkButton href="/dashboard/ai-tutor" variant="primary">
          Ask AI about this
        </LinkButton>
        <button className="btn-secondary">Practice more</button>
      </div>
    </div>
  );
}
