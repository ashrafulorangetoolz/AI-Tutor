import type { ReactNode } from "react";
import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function AiMessageBubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: ReactNode;
}) {
  const isUser = role === "user";
  return (
    <div className={cn("flex gap-3 animate-fadeUp", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-sm",
          isUser
            ? "bg-gradient-to-br from-sky-500 to-sky-400 text-white"
            : "bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-brand",
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-sm bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-sm"
            : "rounded-tl-sm border border-line bg-surface text-ink shadow-card",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex gap-3 animate-fadeUp">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-brand">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-line bg-surface px-4 py-4 shadow-card">
        <span className="h-2 w-2 animate-blink rounded-full bg-brand-400" />
        <span className="h-2 w-2 animate-blink rounded-full bg-brand-400 [animation-delay:.2s]" />
        <span className="h-2 w-2 animate-blink rounded-full bg-brand-400 [animation-delay:.4s]" />
      </div>
    </div>
  );
}
