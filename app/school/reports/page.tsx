import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/dashboard/cards";
import { BarChart } from "@/components/dashboard/charts";
import { Avatar, Badge, Card, CardBody } from "@/components/ui/primitives";
import {
  SCHOOL_CLASS_PERFORMANCE,
  SCHOOL_SUBJECT_PERFORMANCE,
  SCHOOL_STUDENTS,
} from "@/lib/mock/admin";

export const metadata: Metadata = { title: "School Reports" };

export default function SchoolReportsPage() {
  const topStudents = [...SCHOOL_STUDENTS]
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 5);

  return (
    <>
      <PageHeader
        title="Reports"
        action={
          <button className="btn-secondary">
            <Download className="h-4 w-4" />
            Export report
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold text-ink">
              Class performance
            </h2>
            <BarChart
              data={SCHOOL_CLASS_PERFORMANCE.map((c) => ({
                label: c.class,
                value: c.avg,
              }))}
              suffix="%"
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold text-ink">
              Subject performance
            </h2>
            <BarChart
              data={SCHOOL_SUBJECT_PERFORMANCE.map((s) => ({
                label: s.subject,
                value: s.avg,
              }))}
              suffix="%"
            />
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardBody>
          <h2 className="mb-4 text-xl font-semibold text-ink">
            Top performers
          </h2>
          <ul className="space-y-2">
            {topStudents.map((s, i) => (
              <li
                key={s.id}
                className="flex items-center gap-3 rounded-md border border-line bg-surface px-4 py-3"
              >
                <span className="w-5 text-sm font-bold text-muted">
                  {i + 1}
                </span>
                <Avatar name={s.name} size={32} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-ink">
                    {s.name}
                  </div>
                  <div className="truncate text-xs text-muted">{s.class}</div>
                </div>
                <Badge
                  tone={
                    s.avgScore >= 80
                      ? "green"
                      : s.avgScore >= 60
                        ? "blue"
                        : "amber"
                  }
                >
                  {s.avgScore}%
                </Badge>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <p className="mt-6 text-sm text-muted">
        Automated weekly reports are emailed to school admins every Sunday at
        8:00 PM.
      </p>
    </>
  );
}
