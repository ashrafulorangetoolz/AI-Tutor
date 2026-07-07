import { PageHeader, StatCard } from "@/components/dashboard/cards";
import { BarChart, LineChart } from "@/components/dashboard/charts";
import { Card, CardBody, ProgressBar } from "@/components/ui/primitives";
import {
  STUDY_TIME_WEEK,
  MOCK_SCORES,
  SUBJECT_MASTERY,
  BAND_PROGRESS,
  ACHIEVEMENTS,
} from "@/lib/mock/data";
import { formatMinutes } from "@/lib/utils/format";

export const metadata = { title: "Progress" };

export default function ProgressPage() {
  const totalMinutes = STUDY_TIME_WEEK.reduce((sum, d) => sum + d.min, 0);
  const mastered = SUBJECT_MASTERY.filter((s) => s.mastery >= 80).length;

  return (
    <div>
      <PageHeader title="Progress & Analytics" subtitle="Track how far you've come" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total study time"
          value={formatMinutes(totalMinutes)}
          icon={<span>⏱</span>}
          tone="brand"
        />
        <StatCard
          label="Topics mastered"
          value={mastered}
          icon={<span>🏅</span>}
          tone="amber"
        />
        <StatCard
          label="Mock exams taken"
          value={MOCK_SCORES.length}
          icon={<span>📝</span>}
          tone="blue"
        />
        <StatCard
          label="AI questions asked"
          value={128}
          icon={<span>🤖</span>}
          tone="purple"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="mb-4 text-base font-semibold text-ink">
              Study time (this week)
            </h2>
            <BarChart
              data={STUDY_TIME_WEEK.map((d) => ({ label: d.day, value: d.min }))}
              suffix="m"
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-base font-semibold text-ink">Mock exam scores</h2>
            <LineChart
              data={MOCK_SCORES.map((m) => ({ label: m.label, value: m.score }))}
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-base font-semibold text-ink">Topic mastery</h2>
            <div className="space-y-3.5">
              {SUBJECT_MASTERY.map((s) => (
                <div key={s.subject}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-ink">{s.subject}</span>
                    <span className="font-semibold text-ink">{s.mastery}%</span>
                  </div>
                  <ProgressBar value={s.mastery} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-base font-semibold text-ink">
              IELTS band progress
            </h2>
            <div className="space-y-3.5">
              {BAND_PROGRESS.map((b) => (
                <div key={b.skill}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-ink">{b.skill}</span>
                    <span className="font-semibold text-ink">
                      {b.current.toFixed(1)} → {b.target.toFixed(1)}
                    </span>
                  </div>
                  <ProgressBar value={(b.current / 9) * 100} tone="blue" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-5">
        <Card>
          <CardBody>
            <h2 className="mb-4 text-base font-semibold text-ink">Achievements</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ACHIEVEMENTS.map((a) => (
                <div
                  key={a.title}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4"
                >
                  <span className="text-2xl">{a.icon}</span>
                  <span className="text-sm font-semibold text-ink">{a.title}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
