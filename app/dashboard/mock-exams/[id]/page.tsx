import Link from "next/link";
import { Card, CardBody, Badge, EmptyState, LinkButton } from "@/components/ui/primitives";
import { MOCK_EXAMS } from "@/lib/mock/data";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Mock Exam" };

const INSTRUCTIONS = [
  "The timer starts as soon as you click Start and cannot be paused.",
  "Answer all questions — there is no negative marking.",
  "You can flag questions and return to them before submitting.",
  "Ensure a stable internet connection; your progress is saved automatically.",
  "Your score and detailed feedback appear immediately after submission.",
];

export default async function MockExamStartPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exam = MOCK_EXAMS.find((e) => e.id === id);

  if (!exam) {
    return (
      <div>
        <EmptyState
          icon="🔍"
          title="Exam not found"
          description="We couldn't find that mock exam. It may have been moved or removed."
          action={
            <LinkButton href="/dashboard/mock-exams" variant="secondary">
              Back to mock exams
            </LinkButton>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/dashboard/mock-exams"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to mock exams
      </Link>

      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge tone={exam.track === "IELTS" ? "blue" : "green"}>{exam.track}</Badge>
          {exam.subject && <Badge tone="gray">{exam.subject}</Badge>}
          {exam.premium && <Badge tone="amber">★ Premium</Badge>}
        </div>
        <h1 className="text-2xl font-bold text-ink">{exam.title}</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-ink">{exam.durationMin}</div>
            <div className="text-xs text-muted">minutes</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-ink">{exam.questions}</div>
            <div className="text-xs text-muted">questions</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-ink">{exam.totalMarks}</div>
            <div className="text-xs text-muted">total marks</div>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-5">
        <CardBody>
          <h2 className="mb-3 text-xl font-semibold text-ink">Instructions</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-ink/90">
            {INSTRUCTIONS.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <div className="mt-6">
        <LinkButton
          href={`/dashboard/mock-exams/${exam.id}/take`}
          variant="primary"
          className="w-full !py-3 text-base"
        >
          Start now
        </LinkButton>
      </div>
    </div>
  );
}
