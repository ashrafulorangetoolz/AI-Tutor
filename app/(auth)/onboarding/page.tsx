"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { SSC_GROUPS } from "@/lib/constants";

type Track = "SSC" | "IELTS" | "BOTH";
type Lang = "en" | "bn";

const TRACK_OPTIONS: {
  id: Track;
  icon: string;
  title: string;
  desc: string;
}[] = [
  { id: "SSC", icon: "📖", title: "SSC", desc: "Class 9–10 curriculum" },
  { id: "IELTS", icon: "🌍", title: "IELTS", desc: "Band-focused prep" },
  { id: "BOTH", icon: "🎓", title: "Both", desc: "SSC + IELTS together" },
];

const GRADES = ["Class 9", "Class 10"];
const BANDS = ["5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"];
const GOALS = [30, 45, 60, 90];

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [lang, setLang] = useState<Lang>("en");
  const [track, setTrack] = useState<Track | null>(null);
  const [grade, setGrade] = useState<string | null>(GRADES[0]);
  const [group, setGroup] = useState<string | null>(null);
  const [band, setBand] = useState<string | null>(null);
  const [goal, setGoal] = useState<number | null>(null);

  const hasSSC = track === "SSC" || track === "BOTH";
  const hasIELTS = track === "IELTS" || track === "BOTH";

  function next() {
    if (step === 1 && !track) {
      toast("Please choose a track to continue.", "error");
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function finish() {
    toast("You're all set! 🎉");
    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-[460px]">
      {/* Progress dots */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <span
            key={s}
            className={`h-2 rounded-full transition-all ${
              s === step ? "w-6 bg-brand-500" : "w-2 bg-line"
            }`}
          />
        ))}
      </div>

      <div className="card card-pad">
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-bold text-ink">
                Let's personalize your learning
              </h1>
              <p className="mt-1 text-sm text-muted">
                Tell us how you'd like to study.
              </p>
            </div>

            <div>
              <span className="label">Preferred language</span>
              <div className="grid grid-cols-2 gap-1 rounded-lg border border-line bg-black/5 p-1">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  aria-pressed={lang === "en"}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    lang === "en"
                      ? "bg-surface text-ink shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang("bn")}
                  aria-pressed={lang === "bn"}
                  className={`font-bangla rounded-md px-3 py-2 text-sm font-medium transition ${
                    lang === "bn"
                      ? "bg-surface text-ink shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  বাংলা
                </button>
              </div>
            </div>

            <div>
              <span className="label">Choose your track</span>
              <div className="space-y-2">
                {TRACK_OPTIONS.map((opt) => {
                  const selected = track === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTrack(opt.id)}
                      aria-pressed={selected}
                      className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left transition ${
                        selected
                          ? "border-brand-500 bg-brand-50"
                          : "border-line bg-surface hover:bg-brand-50"
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="flex-1">
                        <span className="block font-semibold text-ink">
                          {opt.title}
                        </span>
                        <span className="block text-xs text-muted">
                          {opt.desc}
                        </span>
                      </span>
                      {selected && <Check className="h-5 w-5 text-brand-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-bold text-ink">A few details</h1>
              <p className="mt-1 text-sm text-muted">
                Help us tailor your content.
              </p>
            </div>

            {hasSSC && (
              <>
                <div>
                  <span className="label">Class / grade</span>
                  <div className="grid grid-cols-2 gap-1 rounded- border border-line bg-black/5 p-1">
                    {GRADES.map((g) => {
                      const selected = grade === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGrade(g)}
                          aria-pressed={selected}
                          className={`rounded px-3 py-2 text-sm font-medium transition ${
                            selected
                              ? "bg-surface text-ink shadow-sm"
                              : "text-muted hover:text-ink"
                          }`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="label">SSC group</span>
                  <div className="space-y-2">
                    {SSC_GROUPS.map((grp) => {
                      const selected = group === grp.id;
                      return (
                        <button
                          key={grp.id}
                          type="button"
                          onClick={() => setGroup(grp.id)}
                          aria-pressed={selected}
                          className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left transition ${
                            selected
                              ? "border-brand-500 bg-brand-50"
                              : "border-line bg-surface hover:bg-brand-50"
                          }`}
                        >
                          <span>
                            <span className="block font-semibold text-ink">
                              {grp.name}
                            </span>
                            <span className="font-bangla block text-xs text-muted">
                              {grp.nameBn}
                            </span>
                          </span>
                          {selected && (
                            <Check className="h-5 w-5 text-brand-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {hasIELTS && (
              <div>
                <span className="label">Target band</span>
                <div className="flex flex-wrap gap-2">
                  {BANDS.map((b) => {
                    const selected = band === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBand(b)}
                        aria-pressed={selected}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                          selected
                            ? "border-brand-500 bg-brand-500 text-white"
                            : "border-line bg-surface text-ink hover:bg-brand-50"
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-bold text-ink">
                Set your daily goal
              </h1>
              <p className="mt-1 text-sm text-muted">
                Consistency beats intensity.
              </p>
            </div>

            <div>
              <span className="label">Daily study goal</span>
              <div className="grid grid-cols-4 gap-2">
                {GOALS.map((g) => {
                  const selected = goal === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      aria-pressed={selected}
                      className={`rounded-md border px-2 py-3 text-sm font-semibold transition ${
                        selected
                          ? "border-brand-500 bg-brand-500 text-white"
                          : "border-line bg-surface text-ink hover:bg-brand-50"
                      }`}
                    >
                      {g}
                      <span className="block text-[10px] font-normal opacity-80">
                        min
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-md border border-line bg-brand-50/60 p-4">
              <p className="mb-2 text-sm font-semibold text-ink">Your setup</p>
              <ul className="space-y-1 text-sm text-muted">
                <li>Language: {lang === "en" ? "English" : "বাংলা"}</li>
                <li>Track: {track ?? "—"}</li>
                {hasSSC && <li>Class: {grade ?? "—"}</li>}
                {hasSSC && (
                  <li>
                    Group:{" "}
                    {group ? SSC_GROUPS.find((g) => g.id === group)?.name : "—"}
                  </li>
                )}
                {hasIELTS && <li>Target band: {band ?? "—"}</li>}
                <li>Daily goal: {goal ? `${goal} min` : "—"}</li>
              </ul>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-6 flex items-center gap-3">
          {step > 1 && (
            <button type="button" onClick={back} className="btn-secondary">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              className="btn-primary ml-auto"
            >
              Next
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={finish}
              className="btn-primary ml-auto"
            >
              Finish &amp; go to dashboard
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
