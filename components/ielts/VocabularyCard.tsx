"use client";

import { useState } from "react";
import { Volume2, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface VocabWord {
  word: string;
  meaning: string;
  meaningBn?: string;
  example: string;
  band: string;
}

export function VocabularyCard({ item }: { item: VocabWord }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="group relative h-48 w-full [perspective:1000px]"
    >
      <div
        className={cn(
          "relative h-full w-full rounded-2xl border border-line bg-surface shadow-card transition-transform duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 [backface-visibility:hidden]">
          <span className="badge-blue absolute right-3 top-3">Band {item.band}</span>
          <span className="text-xl font-bold text-ink">{item.word}</span>
          <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted">
            <RotateCw className="h-3 w-3" /> Tap to flip
          </span>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-center gap-2 p-5 text-left [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-ink">{item.word}</span>
            <Volume2 className="h-4 w-4 text-muted" />
          </div>
          <p className="text-sm text-ink">{item.meaning}</p>
          {item.meaningBn && <p className="font-bangla text-xs text-muted">{item.meaningBn}</p>}
          <p className="mt-1 text-xs italic text-muted">&ldquo;{item.example}&rdquo;</p>
        </div>
      </div>
    </button>
  );
}

export const SAMPLE_VOCAB: VocabWord[] = [
  { word: "Ubiquitous", meaning: "Present everywhere", meaningBn: "সর্বত্র বিদ্যমান", example: "Smartphones are ubiquitous today.", band: "8" },
  { word: "Mitigate", meaning: "To make less severe", meaningBn: "প্রশমিত করা", example: "Planting trees can mitigate climate change.", band: "7.5" },
  { word: "Substantial", meaning: "Large in amount", meaningBn: "উল্লেখযোগ্য", example: "There was a substantial rise in prices.", band: "7" },
  { word: "Conducive", meaning: "Making a situation likely", meaningBn: "সহায়ক", example: "A quiet room is conducive to study.", band: "8" },
  { word: "Detrimental", meaning: "Causing harm", meaningBn: "ক্ষতিকর", example: "Pollution is detrimental to health.", band: "7.5" },
  { word: "Prevalent", meaning: "Widespread", meaningBn: "প্রচলিত", example: "This belief is prevalent among students.", band: "7" },
];
