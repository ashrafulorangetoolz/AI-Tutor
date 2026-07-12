import {
  PageHeader,
  StatCard,
  ExamCountdownCard,
  ActivityFeed,
  WeakTopicCard,
  ConceptCardPreview,
} from "@/components/dashboard/cards";
import { BarChart } from "@/components/dashboard/charts";
import { Card, CardBody, Badge, LinkButton } from "@/components/ui/primitives";
import {
  CONCEPT_CARDS,
  WEAK_TOPICS,
  RECENT_ACTIVITY,
  STUDY_TIME_WEEK,
  MOCK_SCORES,
  STUDY_PLAN_TASKS,
} from "@/lib/mock/data";
import { formatMinutes } from "@/lib/utils/format";

export const metadata = { title: "Dashboard" };

export default function DashboardOverviewPage() {
  const weekMinutes = STUDY_TIME_WEEK.reduce((sum, d) => sum + d.min, 0);
  const avgScore = Math.round(
    MOCK_SCORES.reduce((sum, m) => sum + m.score, 0) / MOCK_SCORES.length,
  );

  return (
    <div>
      <PageHeader
        title="Welcome back, Rafi 👋"
        subtitle="Here's your learning snapshot"
      />

      <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Study streak"
          value="7 days"
          icon={<span>🔥</span>}
          tone="amber"
        />
        <StatCard
          label="Study time this week"
          value={formatMinutes(weekMinutes)}
          icon={<span>⏱</span>}
          tone="brand"
        />
        <StatCard
          label="Avg mock score"
          value={`${avgScore}%`}
          icon={<span>📝</span>}
          tone="blue"
        />
        <StatCard
          label="AI questions today"
          value="12/30"
          icon={<span>🤖</span>}
          tone="purple"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardBody>
              <h2 className="mb-4 text-xl font-semibold text-ink">
                This week's study time
              </h2>
              <BarChart
                data={STUDY_TIME_WEEK.map((d) => ({
                  label: d.day,
                  value: d.min,
                }))}
                suffix="m"
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-ink">
                  Recommended for you
                </h2>
                <LinkButton
                  href="/dashboard/concept-cards"
                  variant="ghost"
                  className="!px-3 !py-1.5 text-xs"
                >
                  Browse all
                </LinkButton>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CONCEPT_CARDS.slice(0, 3).map((card) => (
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
            </CardBody>
          </Card>
        </div>

        <div className="space-y-5">
          <ExamCountdownCard days={84} streak={7} />

          <Card>
            <CardBody>
              <h2 className="mb-4 text-xl font-semibold text-ink">
                Weak topics
              </h2>
              <div className="space-y-3">
                {WEAK_TOPICS.map((t) => (
                  <WeakTopicCard
                    key={t.topic}
                    subject={t.subject}
                    topic={t.topic}
                    mastery={t.mastery}
                    priority={t.priority}
                  />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="mb-2 text-xl font-semibold text-ink">
              Recent activity
            </h2>
            <ActivityFeed items={RECENT_ACTIVITY} />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="min-w-0 text-xl font-semibold text-ink">
                Current study plan
              </h2>
              <LinkButton
                href="/dashboard/study-plan"
                variant="secondary"
                className="shrink-0 self-start !px-3 !py-1.5 text-xs sm:self-auto"
              >
                View full plan
              </LinkButton>
            </div>
            <div className="space-y-2">
              {STUDY_PLAN_TASKS.slice(0, 3).map((task, i) => (
                <div
                  key={i}
                  className="flex items-center gap-x-3 gap-y-1.5 rounded-xl border border-line bg-surface p-3.5"
                >
                  <div
                    className={
                      task.completed
                        ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs text-white"
                        : "h-6 w-6 shrink-0 rounded-full border-2 border-line"
                    }
                  >
                    {task.completed ? "✓" : ""}
                  </div>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">
                    {task.title}
                  </span>
                  <Badge tone="gray" className="shrink-0">
                    {task.subject}
                  </Badge>
                  <span className="shrink-0 text-xs text-muted">
                    {task.estMinutes}m
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
