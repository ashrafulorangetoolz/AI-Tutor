"use client";

import { useState } from "react";
import { Loader2, Sparkles, Lightbulb } from "lucide-react";
import { Card, CardBody, Badge } from "@/components/ui/primitives";
import { BandScoreCard } from "./BandScoreCard";
import { useToast } from "@/components/ui/toast";
import type { WritingScoreResponse } from "@/types";

const PROMPTS = {
  TASK2:
    "Some people believe that technology has made our lives more complex, while others think it has made life easier. Discuss both views and give your own opinion.",
  TASK1:
    "The chart below shows the percentage of households with internet access in three countries between 2000 and 2020. Summarise the information.",
};

export function WritingScorerForm({ targetBand = 7 }: { targetBand?: number }) {
  const { toast } = useToast();
  const [taskType, setTaskType] = useState<"TASK1" | "TASK2">("TASK2");
  const [essay, setEssay] = useState("");
  const [result, setResult] = useState<WritingScoreResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const words = essay.trim().split(/\s+/).filter(Boolean).length;
  const minWords = taskType === "TASK2" ? 250 : 150;

  async function evaluate() {
    if (!essay.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/ielts/writing-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskType, essay, targetBand }),
      });
      setResult(await res.json());
    } catch {
      toast("Scoring failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="inline-flex rounded-xl border border-line bg-surface p-1">
          {(["TASK1", "TASK2"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTaskType(t)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${taskType === t ? "bg-brand-500 text-white" : "text-muted"}`}
            >
              {t === "TASK1" ? "Task 1" : "Task 2"}
            </button>
          ))}
        </div>

        <Card>
          <CardBody>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Question</p>
            <p className="mt-1 text-sm text-ink">{PROMPTS[taskType]}</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="label !mb-0">Your essay</label>
              <span className={`text-xs font-medium ${words < minWords ? "text-warning" : "text-brand-500"}`}>
                {words} / {minWords} words
              </span>
            </div>
            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              rows={12}
              placeholder="Write your response here…"
              className="input resize-none"
            />
            <button onClick={evaluate} disabled={loading || !essay.trim()} className="btn-primary mt-3 w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Evaluating…" : "Evaluate with AI examiner"}
            </button>
          </CardBody>
        </Card>
      </div>

      <div>
        {loading ? (
          <Card>
            <CardBody className="space-y-3">
              <div className="skeleton h-20 w-full" />
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-5/6" />
              <div className="skeleton h-3 w-4/6" />
            </CardBody>
          </Card>
        ) : result ? (
          <WritingFeedbackCard result={result} targetBand={targetBand} />
        ) : (
          <Card className="flex min-h-[300px] items-center justify-center">
            <div className="p-8 text-center">
              <div className="text-4xl">✍️</div>
              <p className="mt-3 max-w-xs text-sm text-muted">
                Write your Task {taskType === "TASK1" ? "1" : "2"} response and get an instant band estimate with
                examiner-style feedback.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export function WritingFeedbackCard({
  result,
  targetBand,
}: {
  result: WritingScoreResponse;
  targetBand?: number;
}) {
  return (
    <div className="space-y-4">
      <BandScoreCard
        estimatedBand={result.estimatedBand}
        targetBand={targetBand}
        criteria={[
          { label: "Task Achievement", band: result.taskAchievement },
          { label: "Coherence & Cohesion", band: result.coherenceCohesion },
          { label: "Lexical Resource", band: result.lexicalResource },
          { label: "Grammatical Range", band: result.grammar },
        ]}
      />

      <Card>
        <CardBody>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
            <Lightbulb className="h-4 w-4 text-warning" /> Improvement suggestions
          </div>
          <ul className="space-y-2">
            {result.improvementSuggestions.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink">
                <span className="text-brand-500">•</span>
                {s}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="mb-2 flex items-center gap-2">
            <Badge tone="green">Rewritten sample</Badge>
          </div>
          <p className="text-sm italic text-ink">{result.rewrittenSample}</p>
          {result.mocked && <p className="mt-2 text-[11px] text-muted">Demo mode — add an AI key for full scoring.</p>}
        </CardBody>
      </Card>
    </div>
  );
}
