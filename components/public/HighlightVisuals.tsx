import { Bot, ScanText, Check } from "lucide-react";

/** Mini AI-chat illustration for the "Bilingual AI Tutor" highlight. */
export function TutorVisual() {
  return (
    <div className="relative rounded-3xl border border-line bg-surface p-5 shadow-card">
      <div className="mb-3 flex items-center gap-2 border-b border-line pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
          <Bot className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold text-ink">AI Tutor</span>
        <span className="badge-green ml-auto">Mathematics</span>
      </div>
      <div className="space-y-3">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-sky-500 px-3.5 py-2 text-sm text-white">
          How do I solve x² − 5x + 6 = 0?
        </div>
        <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink">
          <p className="font-semibold">Step 1 · Factor it</p>
          <p className="mt-1 text-muted">Find two numbers that multiply to 6 and add to −5 → −2 and −3.</p>
          <p className="mt-2 font-semibold">Step 2 · Solve</p>
          <p className="text-muted">(x−2)(x−3) = 0, so x = 2 or x = 3. ✅</p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">🇧🇩 বাংলা</span>
        <span className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">Explain simply</span>
        <span className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">Practice</span>
      </div>
    </div>
  );
}

/** Mini OCR-solve illustration for the "Photo Doubt Solver" highlight. */
export function DoubtVisual() {
  return (
    <div className="relative rounded-3xl border border-line bg-surface p-5 shadow-card">
      <div className="rounded-2xl border-2 border-dashed border-line bg-canvas p-4 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
          <ScanText className="h-5 w-5" />
        </div>
        <p className="mt-2 text-xs text-muted">physics-question.jpg</p>
      </div>
      <div className="mt-3 rounded-xl bg-brand-50 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Extracted</p>
        <p className="mt-1 text-sm text-ink">
          A ball is thrown up at 20 m/s. Find the max height. (g = 9.8)
        </p>
      </div>
      <div className="mt-3 flex items-start gap-2 rounded-xl border border-line p-3">
        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white">
          <Check className="h-3 w-3" />
        </span>
        <p className="text-sm text-ink">
          h = v²/2g = 400/19.6 ≈ <b>20.4 m</b> — solved step by step.
        </p>
      </div>
    </div>
  );
}
