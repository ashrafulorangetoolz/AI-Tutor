import type { Metadata } from "next";
import { PageHeader, StatCard } from "@/components/dashboard/cards";
import { BarChart, RingStat } from "@/components/dashboard/charts";
import {
  Card,
  CardBody,
  ProgressBar,
  LinkButton,
} from "@/components/ui/primitives";
import {
  SCHOOL_STATS,
  SCHOOL_CLASS_PERFORMANCE,
  SCHOOL_SUBJECT_PERFORMANCE,
} from "@/lib/mock/admin";

export const metadata: Metadata = { title: "School Dashboard" };

export default function SchoolPage() {
  const s = SCHOOL_STATS;

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader title={s.name} subtitle="School overview" />
        <div className=" flex flex-wrap gap-3">
          <LinkButton href="/school/reports" variant="secondary">
            View reports
          </LinkButton>
          <LinkButton href="/school/students">Manage students</LinkButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total students"
          value={s.totalStudents}
          icon={<span>👥</span>}
          tone="brand"
        />
        <StatCard
          label="Active students"
          value={s.activeStudents}
          icon={<span>✅</span>}
          tone="blue"
        />
        <StatCard
          label="Avg performance"
          value={`${s.avgPerformance}%`}
          icon={<span>📊</span>}
          tone="amber"
        />
        <StatCard
          label="Seats"
          value={`${s.usedSeats}/${s.licenseSeats}`}
          icon={<span>🎫</span>}
          tone="purple"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
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
          <CardBody className="flex flex-col items-center justify-center gap-3">
            <h2 className="self-start text-xl font-semibold text-ink">
              License usage
            </h2>
            <RingStat
              value={(s.usedSeats / s.licenseSeats) * 100}
              trackColor="#e6d9fb"
              legend={{ filled: "Seats used", empty: "Seats free" }}
            />
            <p className="text-sm text-muted">
              {s.usedSeats} of {s.licenseSeats}
            </p>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardBody>
          <h2 className="mb-4 text-xl font-semibold text-ink">
            Subject performance
          </h2>
          <div className="space-y-4">
            {SCHOOL_SUBJECT_PERFORMANCE.map((sub) => (
              <div key={sub.subject}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-ink">{sub.subject}</span>
                  <span className="text-xs font-semibold text-muted">
                    {sub.avg}%
                  </span>
                </div>
                <ProgressBar
                  value={sub.avg}
                  tone={sub.avg >= 80 ? "brand" : "blue"}
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
