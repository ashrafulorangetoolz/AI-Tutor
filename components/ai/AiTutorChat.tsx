"use client";

import { useRef, useState } from "react";
import {
  Send,
  RefreshCw,
  Bookmark,
  Sparkles,
  Atom,
  Sigma,
  PenLine,
  Leaf,
  ArrowUp,
} from "lucide-react";
import { AiMessageBubble, TypingBubble } from "./AiMessageBubble";
import { AiResponseSteps } from "./AiResponseSteps";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/components/ui/toast";
import { SSC_SUBJECTS, IELTS_MODULES } from "@/lib/constants/subjects";
import type { TutorResponse } from "@/types";
import { cn } from "@/lib/utils/cn";

interface ChatItem {
  id: number;
  role: "user" | "assistant";
  text?: string;
  data?: TutorResponse;
}

const STARTER_PROMPTS = [
  {
    icon: Atom,
    text: "Explain Newton's second law with an example",
    tint: "from-brand-500 to-brand-400",
  },
  {
    icon: Sigma,
    text: "How do I solve quadratic equations?",
    tint: "from-sky-500 to-sky-400",
  },
  {
    icon: PenLine,
    text: "Structure of an IELTS Task 2 essay",
    tint: "from-coral-500 to-coral-400",
  },
  {
    icon: Leaf,
    text: "বাংলায় সালোকসংশ্লেষণ ব্যাখ্যা করো",
    tint: "from-secondary-600 to-secondary-500",
  },
];

export function AiTutorChat({ userId = "usr_student" }: { userId?: string }) {
  const { lang, setLang } = useI18n();
  const { toast } = useToast();
  const [track, setTrack] = useState<"SSC" | "IELTS">("SSC");
  const [subject, setSubject] = useState("physics");
  const [topic, setTopic] = useState("");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const lastQuestion = useRef<string>("");
  const scroller = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const subjects = track === "SSC" ? SSC_SUBJECTS : IELTS_MODULES;
  const empty = messages.length === 0;

  async function ask(question: string, simpler = false) {
    if (!question.trim() || busy) return;
    lastQuestion.current = question;
    const uid = (idRef.current += 1);
    setMessages((m) => [...m, { id: uid, role: "user", text: question }]);
    setInput("");
    setBusy(true);
    setTimeout(() => scroller.current?.scrollTo({ top: 9e9, behavior: "smooth" }), 50);

    try {
      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          track,
          subject,
          topic,
          language: lang === "bn" ? "BN" : "EN",
          question: simpler ? `Explain more simply: ${question}` : question,
        }),
      });
      const data: TutorResponse = await res.json();
      setMessages((m) => [...m, { id: (idRef.current += 1), role: "assistant", data }]);
    } catch {
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setBusy(false);
      setTimeout(() => scroller.current?.scrollTo({ top: 9e9, behavior: "smooth" }), 60);
    }
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      {/* Ambient aurora glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl animate-float" />
        <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl animate-float [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-secondary-400/10 blur-3xl animate-float [animation-delay:4s]" />
      </div>

      {/* Toolbar */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 border-b border-line/70 bg-surface/70 p-3 backdrop-blur-xl">
        <div className="inline-flex rounded-xl border border-line bg-canvas/60 p-1">
          {(["SSC", "IELTS"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTrack(t);
                setSubject((t === "SSC" ? SSC_SUBJECTS : IELTS_MODULES)[0].slug);
              }}
              className={cn(
                "rounded-lg px-4 py-1.5 text-xs font-semibold transition-all",
                track === t
                  ? "bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-brand"
                  : "text-muted hover:text-ink",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="input !w-auto !py-1.5 text-xs"
        >
          {subjects.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic (optional)"
          className="input !w-40 !py-1.5 text-xs"
        />

        <button
          onClick={() => setLang(lang === "en" ? "bn" : "en")}
          className="ml-auto btn-secondary !px-3 !py-1.5 text-xs"
        >
          {lang === "en" ? "🇧🇩 বাংলা" : "🇬🇧 English"}
        </button>
      </div>

      {/* Messages */}
      <div ref={scroller} className="scroll-thin relative z-10 flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
        {empty && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-brand-500/30 blur-2xl" />
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-400 to-brand-500 text-white shadow-brand">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>

            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-600 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-secondary-500" />
              AI online
            </span>

            <h3 className="mt-4 bg-gradient-to-r from-ink via-brand-600 to-brand-400 bg-clip-text text-2xl font-bold text-transparent">
              Your bilingual AI Tutor
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Ask anything about your subjects — I&apos;ll break it down step by
              step, in English or বাংলা.
            </p>

            <div className="mt-6 grid w-full max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2">
              {STARTER_PROMPTS.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.text}
                    onClick={() => ask(p.text)}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-surface/70 p-3 text-left backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-pop"
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm",
                        p.tint,
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span
                      className={cn(
                        "text-sm font-medium text-ink",
                        /[ঀ-৿]/.test(p.text) && "font-bangla",
                      )}
                    >
                      {p.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {messages.map((m) =>
          m.role === "user" ? (
            <AiMessageBubble key={m.id} role="user">
              <span className={cn(/[ঀ-৿]/.test(m.text ?? "") && "font-bangla")}>
                {m.text}
              </span>
            </AiMessageBubble>
          ) : (
            <div key={m.id} className="space-y-2 animate-fadeUp">
              <AiMessageBubble role="assistant">
                {m.data ? <AiResponseSteps data={m.data} /> : m.text}
              </AiMessageBubble>
              <div className="ml-12 flex flex-wrap gap-2">
                <ActionBtn icon={<RefreshCw className="h-3.5 w-3.5" />} label="Regenerate" onClick={() => ask(lastQuestion.current)} />
                <ActionBtn icon={<Sparkles className="h-3.5 w-3.5" />} label="Explain simply" onClick={() => ask(lastQuestion.current, true)} />
                <ActionBtn icon={<Bookmark className="h-3.5 w-3.5" />} label="Save" onClick={() => toast("Answer saved to your library")} />
              </div>
            </div>
          ),
        )}

        {busy && <TypingBubble />}
      </div>

      {/* Composer */}
      <div className="relative z-10 border-t border-line/70 bg-surface/70 p-3 backdrop-blur-xl sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="gradient-border group flex items-center gap-2 rounded-xl p-1.5 pl-4 shadow-card transition-all focus-within:shadow-brand"
        >
          <Sparkles className="h-4.5 w-4.5 shrink-0 text-brand-400" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              lang === "bn"
                ? "আপনার প্রশ্ন লিখুন…"
                : "Ask anything about your subjects…"
            }
            className={cn(
              "min-w-0 flex-1 bg-transparent py-2 text-sm text-ink outline-none placeholder:text-muted/70",
              lang === "bn" && "font-bangla",
            )}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-brand transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:from-line disabled:to-line disabled:text-muted disabled:shadow-none"
          >
            {busy ? (
              <Send className="h-4 w-4 animate-pulse" />
            ) : (
              <ArrowUp className="h-4.5 w-4.5" />
            )}
          </button>
        </form>
        <p className="mt-2 text-center text-[11px] text-muted">
          AI can make mistakes — always double-check important answers.
        </p>
      </div>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface/80 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
    >
      {icon}
      {label}
    </button>
  );
}
