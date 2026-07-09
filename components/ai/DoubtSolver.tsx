"use client";

import { useState } from "react";
import { Upload, Image as ImageIcon, ScanText, Sparkles, Bookmark, Loader2 } from "lucide-react";
import { AiResponseSteps } from "./AiResponseSteps";
import { Card, CardBody } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/toast";
import { useI18n } from "@/lib/i18n";
import type { OcrResult, TutorResponse } from "@/types";
import { cn } from "@/lib/utils/cn";

export function DoubtSolver() {
  const { lang } = useI18n();
  const { toast } = useToast();
  const [mode, setMode] = useState<"text" | "image">("text");
  const [question, setQuestion] = useState("");
  const [fileName, setFileName] = useState("");
  const [ocr, setOcr] = useState<OcrResult | null>(null);
  const [solution, setSolution] = useState<TutorResponse | null>(null);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [solving, setSolving] = useState(false);

  async function runOcr(name: string) {
    setOcrLoading(true);
    setOcr(null);
    try {
      const res = await fetch("/api/ocr/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: name }),
      });
      const data: OcrResult = await res.json();
      setOcr(data);
      setQuestion(data.text);
    } catch {
      toast("Could not read the image. Try another photo.", "error");
    } finally {
      setOcrLoading(false);
    }
  }

  async function solve() {
    const q = question.trim();
    if (!q) return;
    setSolving(true);
    setSolution(null);
    try {
      const res = await fetch("/api/ai/solve-doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, language: lang === "bn" ? "BN" : "EN" }),
      });
      const data: TutorResponse = await res.json();
      setSolution(data);
    } catch {
      toast("Something went wrong.", "error");
    } finally {
      setSolving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input side */}
      <div className="space-y-4">
        <div className="inline-flex rounded-xl border border-line bg-surface p-1">
          <TabBtn active={mode === "text"} onClick={() => setMode("text")}>
            ✏️ Type question
          </TabBtn>
          <TabBtn active={mode === "image"} onClick={() => setMode("image")}>
            📷 Upload photo
          </TabBtn>
        </div>

        {mode === "image" && (
          <Card>
            <CardBody>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-brand-50/40 px-6 py-10 text-center transition-colors hover:border-brand-400">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <Upload className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-ink">Upload a question photo</span>
                <span className="text-xs text-muted">PNG, JPG up to 10MB — handwriting supported</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setFileName(f.name);
                      runOcr(f.name);
                    }
                  }}
                />
              </label>

              {fileName && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink">
                  <ImageIcon className="h-4 w-4 text-muted" />
                  <span className="truncate">{fileName}</span>
                </div>
              )}

              {/* OCR preview */}
              {(ocrLoading || ocr) && (
                <div className="mt-4 rounded-xl border border-line bg-brand-50/40 p-3.5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-600">
                    <ScanText className="h-4 w-4" /> Extracted text
                  </div>
                  {ocrLoading ? (
                    <div className="space-y-2">
                      <div className="skeleton h-3 w-full" />
                      <div className="skeleton h-3 w-4/5" />
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-ink">{ocr?.text}</p>
                      <p className="mt-2 text-[11px] text-muted">
                        {ocr?.provider} · {Math.round((ocr?.confidence ?? 0) * 100)}% confidence
                        {ocr?.mocked && " · mock"}
                      </p>
                    </>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        )}

        <Card>
          <CardBody>
            <label className="label">Your question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={5}
              placeholder={lang === "bn" ? "আপনার প্রশ্ন এখানে লিখুন বা ছবি থেকে আসা টেক্সট সম্পাদনা করুন…" : "Type your question here, or edit the text from your photo…"}
              className={cn("input resize-none", lang === "bn" && "font-bangla")}
            />
            <button onClick={solve} disabled={solving || !question.trim()} className="btn-primary mt-3 w-full">
              {solving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {solving ? "Solving…" : "Solve with AI"}
            </button>
          </CardBody>
        </Card>
      </div>

      {/* Solution side */}
      <div>
        <Card className="min-h-[300px]">
          <CardBody>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-ink">AI Solution</h3>
              {solution && (
                <button onClick={() => toast("Doubt saved to your library")} className="btn-secondary !px-3 !py-1.5 text-xs">
                  <Bookmark className="h-3.5 w-3.5" /> Save
                </button>
              )}
            </div>
            {solving ? (
              <div className="space-y-3">
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-11/12" />
                <div className="skeleton h-24 w-full" />
              </div>
            ) : solution ? (
              <AiResponseSteps data={solution} />
            ) : (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="text-4xl">🧮</div>
                <p className="mt-3 max-w-xs text-sm text-muted">
                  Type a question or upload a photo, then tap <b>Solve with AI</b> for a step-by-step explanation.
                </p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
        active ? "bg-brand-500 text-white" : "text-muted hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

export function SavedDoubtCard({
  question,
  subject,
  date,
}: {
  question: string;
  subject: string;
  date: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="line-clamp-2 text-sm font-medium text-ink">{question}</p>
      <div className="mt-2 flex items-center gap-2 text-xs text-muted">
        <span>{subject}</span>
        <span>·</span>
        <span>{date}</span>
      </div>
    </div>
  );
}
