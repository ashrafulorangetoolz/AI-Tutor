import Link from "next/link";
import type { ReactNode } from "react";
import { Card, CardBody, Badge, ProgressBar } from "@/components/ui/primitives";
import { cn } from "@/lib/utils/cn";

// ---- StatCard ----
export function StatCard({
  label,
  value,
  icon,
  delta,
  tone = "brand",
}: {
  label: string;
  value: string | number;
  icon?: ReactNode;
  delta?: string;
  tone?: "brand" | "blue" | "amber" | "purple";
}) {
  const bg = {
    brand: "bg-brand-100 text-brand-600",
    blue: "bg-sky-100 text-sky-600",
    amber: "bg-amber-100 text-amber-700",
    purple: "bg-[#6B4FA0]/10 text-[#6B4FA0]",
  }[tone];
  return (
    <Card>
      <CardBody className="flex items-center gap-2 sm:gap-4">
        {icon && (
          <div
            className={cn(
              "flex h-10 w-10 sm:h-16 sm:w-16 items-center justify-center rounded sm:rounded-md text-xl sm:text-3xl ",
              bg,
            )}
          >
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <div className="truncate text-xl sm:text-3xl font-bold text-ink">
            {value}
          </div>
          <div className="truncate text-xs  sm:text-sm text-muted">{label}</div>
        </div>
        {delta && (
          <span className="ml-auto text-xs font-semibold text-brand-500">
            {delta}
          </span>
        )}
      </CardBody>
    </Card>
  );
}

// ---- ProgressCard ----
export function ProgressCard({
  title,
  value,
  caption,
  tone = "brand",
}: {
  title: string;
  value: number;
  caption?: string;
  tone?: "brand" | "amber" | "blue";
}) {
  return (
    <Card>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-ink">{title}</span>
          <span className="text-sm font-bold text-ink">{value}%</span>
        </div>
        <ProgressBar value={value} tone={tone} />
        {caption && <p className="mt-2 text-xs text-muted">{caption}</p>}
      </CardBody>
    </Card>
  );
}

// ---- WeakTopicCard ----
export function WeakTopicCard({
  subject,
  topic,
  mastery,
  priority,
}: {
  subject: string;
  topic: string;
  mastery: number;
  priority: "HARD" | "MEDIUM" | "EASY";
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3.5">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="min-w-0 truncate text-sm font-semibold text-ink">
            {topic}
          </span>
          {priority === "HARD" && (
            <Badge tone="amber" className="shrink-0">
              Priority
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted">{subject}</p>
        <ProgressBar
          value={mastery}
          tone={mastery < 50 ? "amber" : "brand"}
          className="mt-2"
        />
      </div>
      <Link
        href="/dashboard/ai-tutor"
        className="btn-secondary shrink-0 !px-3 !py-2 text-xs"
      >
        Practice
      </Link>
    </div>
  );
}

// ---- ExamCountdownCard ----
export function ExamCountdownCard({
  days,
  label = "SSC Examination",
  streak,
}: {
  days: number;
  label?: string;
  streak?: number;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-brand-500 p-5 text-white">
        <p className="text-sm font-medium text-brand-100">{label}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold">{days}</span>
          <span className="text-sm text-brand-100">days to go</span>
        </div>
      </div>
      <CardBody className="flex items-center justify-between">
        <span className="text-sm text-muted">
          Keep going — you're on track!
        </span>
        {typeof streak === "number" && (
          <span className="badge-amber">🔥 {streak}-day streak</span>
        )}
      </CardBody>
    </Card>
  );
}

// ---- ActivityFeed ----
export function ActivityFeed({
  items,
}: {
  items: { icon: string; text: string; time: string }[];
}) {
  return (
    <ul className="space-y-1">
      {items.map((it, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-md px-2 py-2.5 hover:bg-brand-50"
        >
          <span className="mt-0.5 text-xl">{it.icon}</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-ink">{it.text}</p>
            <p className="text-xs text-muted">{it.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// ---- SubjectCard ----
export function SubjectCard({
  slug,
  name,
  nameBn,
  icon,
  color,
  chapters,
  href,
}: {
  slug: string;
  name: string;
  nameBn?: string;
  icon: string;
  color: string;
  chapters: number;
  href?: string;
}) {
  return (
    <Link
      href={href ?? `/dashboard/concept-cards?subject=${slug}`}
      className="group flex items-center gap-4 rounded-lg border border-line bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-6"
    >
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md text-3xl"
        style={{ background: `${color}1A` }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-lg font-bold text-ink">{name}</div>
        {nameBn && (
          <div className="truncate font-bangla text-sm text-muted">
            {nameBn}
          </div>
        )}
      </div>
      <span className="shrink-0 text-xs text-muted">{chapters} ch.</span>
    </Link>
  );
}

// ---- ChapterCard ----
export function ChapterCard({
  title,
  count,
  index,
}: {
  title: string;
  count: number;
  index: number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-sm font-bold text-brand-600">
        {index}
      </div>
      <span className="flex-1 text-sm font-medium text-ink">{title}</span>
      <span className="text-xs text-muted">{count} cards</span>
    </div>
  );
}

// ---- ConceptCardPreview ----
export function ConceptCardPreview({
  id,
  title,
  subject,
  chapter,
  difficulty,
  premium,
  locked,
}: {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: string;
  premium?: boolean;
  locked?: boolean;
}) {
  const diffTone =
    difficulty === "HARD" ? "amber" : difficulty === "EASY" ? "green" : "blue";
  return (
    <Card className="flex h-full flex-col">
      <CardBody className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between">
          <Badge tone={diffTone as "amber" | "green" | "blue"}>
            {difficulty}
          </Badge>
          {premium && <Badge tone="amber">★ Premium</Badge>}
        </div>
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-xs text-muted">
          {subject} · {chapter}
        </p>
        <div className="mt-4 flex-1" />
        {locked ? (
          <Link href="/pricing" className="btn-secondary w-full">
            🔒 Upgrade to unlock
          </Link>
        ) : (
          <Link
            href={`/dashboard/concept-cards/${id}`}
            className="btn-primary w-full"
          >
            Study card
          </Link>
        )}
      </CardBody>
    </Card>
  );
}

// ---- MockExamCard ----
export function MockExamCard({
  id,
  title,
  subject,
  durationMin,
  questions,
  totalMarks,
  premium,
  track,
}: {
  id: string;
  title: string;
  subject?: string;
  durationMin: number;
  questions: number;
  totalMarks: number;
  premium?: boolean;
  track: string;
}) {
  return (
    <Card className="flex h-full flex-col">
      <CardBody className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between">
          <Badge tone={track === "IELTS" ? "blue" : "green"}>{track}</Badge>
          {premium && <Badge tone="amber">★ Premium</Badge>}
        </div>
        <h3 className="text-xl font-semibold text-ink">{title}</h3>
        {subject && <p className="text-xs text-muted">{subject}</p>}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          <span>⏱ {durationMin} min</span>
          <span>❓ {questions} questions</span>
          <span>💯 {totalMarks} marks</span>
        </div>
        <div className="mt-4 flex-1" />
        <Link
          href={`/dashboard/mock-exams/${id}`}
          className="btn-primary w-full"
        >
          Start exam
        </Link>
      </CardBody>
    </Card>
  );
}

// ---- ResultSummaryCard ----
export function ResultSummaryCard({
  title,
  score,
  total,
  date,
  band,
}: {
  title: string;
  score: number;
  total: number;
  date: string;
  band?: number;
}) {
  const pct = Math.round((score / total) * 100);
  return (
    <div className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-sm font-bold text-brand-600">
        {band ? band.toFixed(1) : `${pct}%`}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-ink">{title}</div>
        <div className="text-xs text-muted">
          {band ? `Band ${band.toFixed(1)}` : `${score}/${total}`} · {date}
        </div>
      </div>
      <Badge tone={pct >= 80 ? "green" : pct >= 60 ? "blue" : "amber"}>
        {pct >= 80 ? "Excellent" : pct >= 60 ? "Good" : "Improve"}
      </Badge>
    </div>
  );
}

// ---- Page header used across dashboard pages ----
export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
