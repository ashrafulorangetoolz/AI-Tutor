import type { ReactNode } from "react";
import { Bot, User } from "lucide-react";
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
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          isUser ? "bg-sky-100 text-sky-600" : "bg-brand-500 text-white",
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
          isUser
            ? "rounded-tr-sm bg-sky-500 text-white"
            : "rounded-tl-sm border border-line bg-surface text-ink",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-line bg-surface px-4 py-3.5">
        <span className="h-2 w-2 animate-blink rounded-full bg-muted" />
        <span className="h-2 w-2 animate-blink rounded-full bg-muted [animation-delay:.2s]" />
        <span className="h-2 w-2 animate-blink rounded-full bg-muted [animation-delay:.4s]" />
      </div>
    </div>
  );
}
