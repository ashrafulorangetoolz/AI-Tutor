"use client";

import { useState } from "react";
import { PenLine, Mic, BookOpen, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/dashboard/cards";
import { Card, CardBody } from "@/components/ui/primitives";
import { WritingScorerForm } from "@/components/ielts/WritingScorer";
import { SpeakingEvaluator } from "@/components/ielts/SpeakingEvaluator";
import { VocabularyCard, SAMPLE_VOCAB } from "@/components/ielts/VocabularyCard";
import { BAND_PROGRESS } from "@/lib/mock/data";
import { cn } from "@/lib/utils/cn";

const TABS = [
  { id: "writing", label: "Writing Scorer", icon: PenLine },
  { id: "speaking", label: "Speaking Evaluator", icon: Mic },
  { id: "vocabulary", label: "Vocabulary", icon: BookOpen },
  { id: "band", label: "Band Tracker", icon: TrendingUp },
] as const;

type Tab = (typeof TABS)[number]["id"];

export default function IeltsLabPage() {
  const [tab, setTab] = useState<Tab>("writing");

  return (
    <div>
      <PageHeader
        title="IELTS Lab"
        subtitle="AI writing & speaking scoring, vocabulary and band tracking — all in one place"
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const TabIcon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors",
                tab === t.id
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-line bg-surface text-muted hover:text-ink",
              )}
            >
              <TabIcon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "writing" && <WritingScorerForm targetBand={7.5} />}
      {tab === "speaking" && <SpeakingEvaluator targetBand={7} />}

      {tab === "vocabulary" && (
        <div>
          <p className="mb-4 text-sm text-muted">
            Tap a card to reveal the meaning, Bangla translation and an example sentence.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_VOCAB.map((item) => (
              <VocabularyCard key={item.word} item={item} />
            ))}
          </div>
        </div>
      )}

      {tab === "band" && (
        <div className="grid gap-5 sm:grid-cols-2">
          {BAND_PROGRESS.map((b) => (
            <Card key={b.skill}>
              <CardBody>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink">{b.skill}</span>
                  <span className="text-sm text-muted">
                    {b.current.toFixed(1)} → <b className="text-brand-500">{b.target.toFixed(1)}</b>
                  </span>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-black/5">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${(b.current / 9) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted">
                  {b.target - b.current <= 0
                    ? "Target reached 🎉"
                    : `${(b.target - b.current).toFixed(1)} band to your goal`}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
