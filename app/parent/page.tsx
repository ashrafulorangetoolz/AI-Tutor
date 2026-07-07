import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/cards";
import { BarChart } from "@/components/dashboard/charts";
import { Card, CardBody, ProgressBar } from "@/components/ui/primitives";
import { PARENT_CHILD } from "@/lib/mock/admin";
import { formatMinutes } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Parent Dashboard" };

export default function ParentPage() {
  const c = PARENT_CHILD;

  return (
    <>
      <PageHeader title={`Following ${c.name}`} subtitle={c.class} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg score" value={`${c.avgScore}%`} icon={<span>📈</span>} tone="brand" />
        <StatCard
          label="Study this week"
          value={formatMinutes(c.studyMinThisWeek)}
          icon={<span>⏱</span>}
          tone="blue"
        />
        <StatCard label="Streak" value={`${c.streak} days`} icon={<span>🔥</span>} tone="amber" />
        <StatCard label="Exam in" value={`${c.examInDays} days`} icon={<span>📅</span>} tone="purple" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody>
            <h2 className="mb-4 text-base font-semibold text-ink">Weekly study time</h2>
            <BarChart
              data={c.weeklyStudy.map((d) => ({ label: d.day, value: d.min }))}
              suffix="m"
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-base font-semibold text-ink">Goals &amp; achievements</h2>
            <div className="space-y-4">
              {c.goals.map((g) => (
                <div key={g.title}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm text-ink">{g.title}</span>
                    <span className="text-xs font-semibold text-muted">{g.progress}%</span>
                  </div>
                  <ProgressBar value={g.progress} tone={g.progress >= 100 ? "brand" : "blue"} />
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {c.achievements.map((a) => (
                <span key={a} className="badge-amber">
                  🏅 {a}
                </span>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="mb-4 text-base font-semibold text-ink">Weak areas</h2>
            <ul className="space-y-2">
              {c.weakAreas.map((w) => (
                <li
                  key={w}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3"
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-warning" />
                  <span className="flex-1 text-sm font-medium text-ink">{w}</span>
                  <span className="text-xs text-warning">needs attention</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-base font-semibold text-ink">Early alerts</h2>
            <ul className="space-y-2">
              {c.alerts.map((a, i) => {
                const warning = a.level === "warning";
                return (
                  <li
                    key={i}
                    className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
                      warning
                        ? "border-amber-100 bg-amber-100/40"
                        : "border-sky-100 bg-sky-100/40"
                    }`}
                  >
                    {warning ? (
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                    ) : (
                      <span className="mt-0.5 h-4 w-4 shrink-0 text-center text-sky-600">ℹ</span>
                    )}
                    <span className="flex-1 text-sm text-ink">{a.text}</span>
                  </li>
                );
              })}
            </ul>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardBody>
          <p className="text-sm text-muted">
            This is a read-only view. Learning content is managed by your child.
          </p>
        </CardBody>
      </Card>
    </>
  );
}
