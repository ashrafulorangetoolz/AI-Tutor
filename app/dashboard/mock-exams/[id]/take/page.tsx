"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Flag, Clock } from "lucide-react";
import { Card, CardBody, Badge, EmptyState, LinkButton } from "@/components/ui/primitives";
import { cn } from "@/lib/utils/cn";
import { MOCK_EXAMS, SAMPLE_QUESTIONS } from "@/lib/mock/data";

function formatClock(totalSeconds: number) {
  const s = Math.max(0, totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

export default function TakeExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const exam = MOCK_EXAMS.find((e) => e.id === id);

  // Repeat the sample bank up to the exam's question count so navigation feels real.
  const questions = useMemo(() => {
    if (!exam) return [];
    return Array.from({ length: exam.questions }, (_, i) => {
      const base = SAMPLE_QUESTIONS[i % SAMPLE_QUESTIONS.length];
      return { ...base, id: `${base.id}-${i}` };
    });
  }, [exam]);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [remaining, setRemaining] = useState((exam?.durationMin ?? 0) * 60);
  const [submitted, setSubmitted] = useState(false);

  // Countdown timer — auto-submits at zero.
  useEffect(() => {
    if (!exam || submitted) return;
    if (remaining <= 0) {
      setSubmitted(true);
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, submitted, exam]);

  if (!exam) {
    return (
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
    );
  }

  const q = questions[current];
  const answeredCount = Object.keys(answers).length;

  const score = useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce(
      (sum, item) =>
        answers[item.id]?.trim().toLowerCase() ===
        item.correct.trim().toLowerCase()
          ? sum + item.marks
          : sum,
      0,
    );
  }, [submitted, questions, answers]);

  if (submitted) {
    const totalMarks = questions.reduce((s, item) => s + item.marks, 0);
    const pct = totalMarks ? Math.round((score / totalMarks) * 100) : 0;
    return (
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardBody className="text-center">
            <div className="text-5xl">{pct >= 60 ? "🎉" : "📚"}</div>
            <h1 className="mt-3 text-2xl font-bold text-ink">
              {remaining <= 0 ? "Time's up!" : "Exam submitted"}
            </h1>
            <p className="mt-1 text-sm text-muted">{exam.title}</p>
            <div className="mt-6 flex items-center justify-center gap-8">
              <div>
                <div className="text-4xl font-extrabold text-brand-500">
                  {score}
                  <span className="text-lg text-muted">/{totalMarks}</span>
                </div>
                <div className="text-xs text-muted">marks</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-ink">{pct}%</div>
                <div className="text-xs text-muted">score</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-ink">
                  {answeredCount}
                  <span className="text-lg text-muted">/{questions.length}</span>
                </div>
                <div className="text-xs text-muted">answered</div>
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <LinkButton href="/dashboard/mock-exams" variant="secondary">
                Back to mock exams
              </LinkButton>
              <LinkButton href="/dashboard/progress" variant="primary">
                View progress
              </LinkButton>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  const lowTime = remaining <= 60;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header: title + timer */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href={`/dashboard/mock-exams/${exam.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit exam
          </Link>
          <h1 className="mt-1 text-xl font-semibold text-ink">{exam.title}</h1>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg border px-4 py-2 text-lg font-bold tabular-nums",
            lowTime
              ? "border-warning/40 bg-warning/10 text-warning"
              : "border-line bg-surface text-ink",
          )}
        >
          <Clock className="h-5 w-5" />
          {formatClock(remaining)}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4 flex items-center justify-between text-sm text-muted">
        <span>
          Question {current + 1} of {questions.length}
        </span>
        <span>{answeredCount} answered</span>
      </div>

      {/* Question */}
      <Card>
        <CardBody>
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge tone="gray">{q.type.replace("_", " ")}</Badge>
              <span className="text-xs text-muted">{q.marks} mark{q.marks > 1 ? "s" : ""}</span>
            </div>
            <button
              type="button"
              onClick={() =>
                setFlagged((f) => ({ ...f, [q.id]: !f[q.id] }))
              }
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                flagged[q.id]
                  ? "bg-warning/15 text-warning"
                  : "text-muted hover:bg-canvas hover:text-ink",
              )}
            >
              <Flag className="h-3.5 w-3.5" />
              {flagged[q.id] ? "Flagged" : "Flag"}
            </button>
          </div>

          <p className="text-lg font-medium text-ink">{q.prompt}</p>

          <div className="mt-5 space-y-2.5">
            {q.options.length > 0 ? (
              q.options.map((opt) => {
                const selected = answers[q.id] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setAnswers((a) => ({ ...a, [q.id]: opt }))
                    }
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      selected
                        ? "border-brand-400 bg-brand-50 text-ink"
                        : "border-line bg-surface text-ink hover:border-brand-300",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        selected
                          ? "border-brand-500 bg-brand-500 text-white"
                          : "border-line",
                      )}
                    >
                      {selected && <span className="text-[10px]">✓</span>}
                    </span>
                    {opt}
                  </button>
                );
              })
            ) : (
              <input
                value={answers[q.id] ?? ""}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                }
                placeholder="Type your answer…"
                className="input"
              />
            )}
          </div>
        </CardBody>
      </Card>

      {/* Navigation */}
      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>

        {current < questions.length - 1 ? (
          <button
            type="button"
            onClick={() =>
              setCurrent((c) => Math.min(questions.length - 1, c + 1))
            }
            className="btn-secondary"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="btn-primary"
          >
            Submit exam
          </button>
        )}
      </div>

      {/* Question grid */}
      <div className="mt-6 flex flex-wrap gap-2">
        {questions.map((item, i) => {
          const isAnswered = answers[item.id] !== undefined && answers[item.id] !== "";
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrent(i)}
              className={cn(
                "relative h-9 w-9 rounded-lg border text-xs font-semibold transition-colors",
                i === current
                  ? "border-brand-500 bg-brand-500 text-white"
                  : isAnswered
                    ? "border-brand-300 bg-brand-50 text-brand-600"
                    : "border-line bg-surface text-muted hover:border-brand-300",
              )}
            >
              {i + 1}
              {flagged[item.id] && (
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-warning" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
