import { PageHeader, MockExamCard, ResultSummaryCard } from "@/components/dashboard/cards";
import { Card, CardBody, SectionHeading, LinkButton } from "@/components/ui/primitives";
import { MOCK_EXAMS, MOCK_SCORES } from "@/lib/mock/data";

export const metadata = { title: "Mock Exams" };

const RESULTS = [
  { title: MOCK_SCORES[0].label, score: MOCK_SCORES[0].score, total: 100, date: "5 Jul 2026" },
  { title: MOCK_SCORES[1].label, score: MOCK_SCORES[1].score, total: 100, date: "1 Jul 2026" },
  { title: MOCK_SCORES[2].label, score: MOCK_SCORES[2].score, total: 100, date: "28 Jun 2026" },
  { title: "IELTS Reading Section Test", score: 32, total: 40, date: "24 Jun 2026", band: 7.0 },
];

const SSC_EXAMS = MOCK_EXAMS.filter((e) => e.track === "SSC");
const IELTS_EXAMS = MOCK_EXAMS.filter((e) => e.track === "IELTS");

export default function MockExamsPage() {
  return (
    <div>
      <PageHeader
        title="Mock Exams"
        subtitle="Board-style and full IELTS mock tests — timed and auto-graded"
        action={
          <LinkButton href="#" variant="secondary">
            ＋ Custom exam builder
          </LinkButton>
        }
      />

      <section>
        <SectionHeading title="SSC Mock Exams" />
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SSC_EXAMS.map((e) => (
            <MockExamCard
              key={e.id}
              id={e.id}
              title={e.title}
              subject={e.subject}
              durationMin={e.durationMin}
              questions={e.questions}
              totalMarks={e.totalMarks}
              premium={e.premium}
              track={e.track}
            />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeading title="IELTS Mock Tests" />
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {IELTS_EXAMS.map((e) => (
            <MockExamCard
              key={e.id}
              id={e.id}
              title={e.title}
              subject={e.subject}
              durationMin={e.durationMin}
              questions={e.questions}
              totalMarks={e.totalMarks}
              premium={e.premium}
              track={e.track}
            />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeading title="Previous results" />
        <Card className="mt-5">
          <CardBody className="space-y-3">
            {RESULTS.map((r, i) => (
              <ResultSummaryCard
                key={i}
                title={r.title}
                score={r.score}
                total={r.total}
                date={r.date}
                band={r.band}
              />
            ))}
          </CardBody>
        </Card>
      </section>

      <section className="mt-10">
        <SectionHeading title="Custom exam builder" />
        <Card className="mt-5">
          <CardBody className="space-y-6">
            <div>
              <p className="label mb-2">Subjects</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Physics", "Mathematics", "Chemistry", "Biology", "English", "ICT"].map(
                  (s, i) => (
                    <div
                      key={s}
                      className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-3"
                    >
                      <span
                        className={
                          i < 2
                            ? "flex h-5 w-5 items-center justify-center rounded-md bg-brand-500 text-[11px] text-white"
                            : "h-5 w-5 rounded-md border-2 border-line"
                        }
                      >
                        {i < 2 ? "✓" : ""}
                      </span>
                      <span className="text-sm text-ink">{s}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label mb-1.5 block">Difficulty</label>
                <select className="input" defaultValue="Mixed" disabled>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                  <option>Mixed</option>
                </select>
              </div>
              <div>
                <label className="label mb-1.5 block">Number of questions</label>
                <input className="input" type="number" defaultValue={25} disabled />
              </div>
            </div>

            <button
              className="btn-primary w-full cursor-not-allowed opacity-60"
              disabled
            >
              Generate exam
            </button>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
