import {
  PageHeader,
  StatCard,
  WeakTopicCard,
} from "@/components/dashboard/cards";
import { Card, CardBody, Badge } from "@/components/ui/primitives";
import {
  STUDY_PLAN_TASKS,
  STUDY_TIME_WEEK,
  WEAK_TOPICS,
} from "@/lib/mock/data";
import { formatMinutes } from "@/lib/utils/format";

export const metadata = { title: "Study Plan" };

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export default function StudyPlanPage() {
  const weekMinutes = STUDY_TIME_WEEK.reduce((sum, d) => sum + d.min, 0);
  const completed = STUDY_PLAN_TASKS.filter((t) => t.completed).length;

  return (
    <div>
      <PageHeader
        title="Adaptive Study Plan"
        subtitle="Personalized around your weak topics"
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard
          label="Tasks completed"
          value={`${completed}/${STUDY_PLAN_TASKS.length}`}
          icon={<span>✅</span>}
          tone="brand"
        />
        <StatCard
          label="Weekly goal"
          value="7h"
          icon={<span>🎯</span>}
          tone="purple"
        />
        <StatCard
          label="This week"
          value={formatMinutes(weekMinutes)}
          icon={<span>⏱</span>}
          tone="blue"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-2xl font-bold text-ink">Weekly plan</h2>
          <div className="space-y-4">
            {DAYS.map((day) => {
              const tasks = STUDY_PLAN_TASKS.filter((t) => t.day === day);
              return (
                <Card key={day}>
                  <CardBody>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
                      {day}
                    </h3>
                    {tasks.length === 0 ? (
                      <p className="text-sm text-muted">Rest day / review</p>
                    ) : (
                      <div className="space-y-2.5">
                        {tasks.map((task, i) => (
                          <div
                            key={i}
                            className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface p-3.5"
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
                            <span
                              className={
                                task.completed
                                  ? "min-w-0 flex-1 text-sm font-medium text-muted line-through"
                                  : "min-w-0 flex-1 text-sm font-medium text-ink"
                              }
                            >
                              {task.title}
                            </span>
                            <Badge tone="gray">{task.subject}</Badge>
                            <span className="text-xs text-muted">
                              {task.estMinutes}m
                            </span>
                            {task.priority === "HARD" && (
                              <Badge tone="amber">Priority</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-ink">Priority weak topics</h2>
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
        </div>
      </div>
    </div>
  );
}
