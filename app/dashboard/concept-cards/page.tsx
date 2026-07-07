import { PageHeader, SubjectCard, ConceptCardPreview } from "@/components/dashboard/cards";
import { SectionHeading } from "@/components/ui/primitives";
import { CONCEPT_CARDS } from "@/lib/mock/data";
import { SSC_SUBJECTS } from "@/lib/constants";

export const metadata = { title: "Concept Cards" };

export default function ConceptCardsPage() {
  return (
    <div>
      <PageHeader
        title="Concept Cards"
        subtitle="Bite-sized explanations, examples and practice for every topic"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SSC_SUBJECTS.slice(0, 8).map((s) => (
          <SubjectCard
            key={s.slug}
            slug={s.slug}
            name={s.name}
            nameBn={s.nameBn}
            icon={s.icon}
            color={s.color}
            chapters={s.chapters}
          />
        ))}
      </div>

      <div className="mt-10">
        <SectionHeading title="All concept cards" />
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONCEPT_CARDS.map((card) => (
            <ConceptCardPreview
              key={card.id}
              id={card.id}
              title={card.title}
              subject={card.subject}
              chapter={card.chapter}
              difficulty={card.difficulty}
              premium={card.premium}
              locked={card.premium}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
