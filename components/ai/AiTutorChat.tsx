"use client";

import { useRef, useState } from "react";
import { Send, RefreshCw, Bookmark, Sparkles, GraduationCap } from "lucide-react";
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
  "Explain Newton's second law with an example",
  "How do I solve quadratic equations?",
  "Structure of an IELTS Task 2 essay",
  "বাংলায় সালোকসংশ্লেষণ ব্যাখ্যা করো",
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
    <div className="flex h-[calc(100vh-8.5rem)] flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line p-3">
        <div className="inline-flex rounded-lg border border-line p-0.5">
          {(["SSC", "IELTS"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTrack(t);
                setSubject((t === "SSC" ? SSC_SUBJECTS : IELTS_MODULES)[0].slug);
              }}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold",
                track === t ? "bg-brand-500 text-white" : "text-muted",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <select value={subject} onChange={(e) => setSubject(e.target.value)} className="input !w-auto !py-1.5 text-xs">
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
      <div ref={scroller} className="scroll-thin flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink">Your bilingual AI Tutor</h3>
            <p className="mt-1 max-w-sm text-sm text-muted">
              Ask anything about your subjects — I&apos;ll explain step by step in English or বাংলা.
            </p>
            <div className="mt-5 flex max-w-md flex-wrap justify-center gap-2">
              {STARTER_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => ask(p)}
                  className={cn(
                    "rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink hover:bg-brand-50",
                    /[ঀ-৿]/.test(p) && "font-bangla",
                  )}
                >
                  {p}
                </button>
              ))}
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
            <div key={m.id} className="space-y-2">
              <AiMessageBubble role="assistant">
                {m.data ? <AiResponseSteps data={m.data} /> : m.text}
              </AiMessageBubble>
              <div className="ml-11 flex flex-wrap gap-2">
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex items-center gap-2 border-t border-line p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === "bn" ? "আপনার প্রশ্ন লিখুন…" : "Ask anything about your subjects…"}
          className={cn("input", lang === "bn" && "font-bangla")}
        />
        <button type="submit" disabled={busy || !input.trim()} className="btn-primary !px-3.5">
          <Send className="h-4 w-4" />
        </button>
      </form>
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
      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs font-medium text-muted hover:bg-brand-50 hover:text-ink"
    >
      {icon}
      {label}
    </button>
  );
}
