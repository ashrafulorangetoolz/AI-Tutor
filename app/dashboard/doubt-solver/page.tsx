import { PageHeader } from "@/components/dashboard/cards";
import { DoubtSolver, SavedDoubtCard } from "@/components/ai/DoubtSolver";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata = { title: "Doubt Solver" };

const SAVED_DOUBTS = [
  {
    question: "How do I resolve a vector into its horizontal and vertical components?",
    subject: "Physics",
    date: "2 days ago",
  },
  {
    question: "Why does x² − 5x + 6 = 0 factor into (x−2)(x−3)?",
    subject: "Mathematics",
    date: "4 days ago",
  },
  {
    question: "What is the difference between skimming and scanning in IELTS reading?",
    subject: "Reading",
    date: "1 week ago",
  },
];

export default function DoubtSolverPage() {
  return (
    <div>
      <PageHeader
        title="Doubt Solver"
        subtitle="Type a question or snap a photo — get a full solution"
      />

      <DoubtSolver />

      <div className="mt-8">
        <SectionHeading title="Saved doubts" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {SAVED_DOUBTS.map((d, i) => (
            <SavedDoubtCard
              key={i}
              question={d.question}
              subject={d.subject}
              date={d.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
