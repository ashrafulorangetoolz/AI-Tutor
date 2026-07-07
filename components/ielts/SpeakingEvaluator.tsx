"use client";

import { useState } from "react";
import { Loader2, Mic, Lightbulb, Type } from "lucide-react";
import { Card, CardBody } from "@/components/ui/primitives";
import { BandScoreCard } from "./BandScoreCard";
import { useToast } from "@/components/ui/toast";
import type { SpeakingScoreResponse } from "@/types";

const QUESTION = "Describe a skill you would like to learn. You should say what it is, why you want to learn it, and how you would learn it.";

export function SpeakingEvaluator({ targetBand = 7 }: { targetBand?: number }) {
  const { toast } = useToast();
  const [mode, setMode] = useState<"record" | "transcript">("transcript");
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<SpeakingScoreResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function simulateRecording() {
    setRecording(true);
    toast("Recording… (demo will auto-transcribe)", "info");
    // Simulate a recording + Whisper transcription round-trip.
    setTimeout(() => {
      setRecording(false);
      setTranscript(
        "I would really like to learn how to play the guitar. Music has always been a big part of my life, and being able to play an instrument would let me express myself. I plan to learn through online tutorials and daily practice.",
      );
      toast("Audio transcribed with Whisper");
    }, 1600);
  }

  async function evaluate() {
    if (!transcript.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/ielts/speaking-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, question: QUESTION, targetBand }),
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
        <Card>
          <CardBody>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Cue card · Part 2</p>
            <p className="mt-1 text-sm text-ink">{QUESTION}</p>
          </CardBody>
        </Card>

        <div className="inline-flex rounded-xl border border-line bg-surface p-1">
          <button
            onClick={() => setMode("transcript")}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold ${mode === "transcript" ? "bg-brand-500 text-white" : "text-muted"}`}
          >
            <Type className="mr-1 inline h-4 w-4" /> Transcript
          </button>
          <button
            onClick={() => setMode("record")}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold ${mode === "record" ? "bg-brand-500 text-white" : "text-muted"}`}
          >
            <Mic className="mr-1 inline h-4 w-4" /> Record
          </button>
        </div>

        {mode === "record" && (
          <Card>
            <CardBody className="flex flex-col items-center gap-3 py-8">
              <button
                onClick={simulateRecording}
                disabled={recording}
                className={`flex h-20 w-20 items-center justify-center rounded-full text-white transition-transform ${recording ? "animate-pulse bg-danger" : "bg-brand-500 hover:scale-105"}`}
              >
                <Mic className="h-8 w-8" />
              </button>
              <p className="text-sm text-muted">{recording ? "Listening…" : "Tap to record your answer"}</p>
            </CardBody>
          </Card>
        )}

        <Card>
          <CardBody>
            <label className="label">Your answer (transcript)</label>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={6}
              placeholder="Type or record your spoken answer…"
              className="input resize-none"
            />
            <button onClick={evaluate} disabled={loading || !transcript.trim()} className="btn-primary mt-3 w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
              {loading ? "Evaluating…" : "Evaluate speaking"}
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
            </CardBody>
          </Card>
        ) : result ? (
          <div className="space-y-4">
            <BandScoreCard
              estimatedBand={result.estimatedBand}
              targetBand={targetBand}
              criteria={[
                { label: "Fluency & Coherence", band: result.fluency },
                { label: "Pronunciation", band: result.pronunciation },
                { label: "Grammatical Range", band: result.grammar },
                { label: "Lexical Resource", band: result.vocabulary },
              ]}
            />
            <Card>
              <CardBody>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
                  <Lightbulb className="h-4 w-4 text-warning" /> Improvement tips
                </div>
                <ul className="space-y-2">
                  {result.improvementTips.map((t, i) => (
                    <li key={i} className="flex gap-2 text-sm text-ink">
                      <span className="text-brand-500">•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>
        ) : (
          <Card className="flex min-h-[300px] items-center justify-center">
            <div className="p-8 text-center">
              <div className="text-4xl">🎤</div>
              <p className="mt-3 max-w-xs text-sm text-muted">
                Record or paste your spoken answer to get a band estimate across all four speaking criteria.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
