"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

type ToastKind = "success" | "info" | "warning" | "error";
interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

const ToastCtx = createContext<{
  toast: (message: string, kind?: ToastKind) => void;
} | null>(null);

const ICONS: Record<ToastKind, ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-brand-500" />,
  info: <Info className="h-5 w-5 text-info" />,
  warning: <AlertTriangle className="h-5 w-5 text-warning" />,
  error: <AlertTriangle className="h-5 w-5 text-danger" />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, kind: ToastKind = "success") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((t) => [...t, { id, kind, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex w-full max-w-sm animate-fadeUp items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-pop"
          >
            {ICONS[t.kind]}
            <span className="flex-1 text-sm font-medium text-ink">{t.message}</span>
            <button
              onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))}
              className="text-muted hover:text-ink"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) return { toast: () => {} };
  return ctx;
}
