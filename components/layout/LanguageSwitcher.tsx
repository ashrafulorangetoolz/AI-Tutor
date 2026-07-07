"use client";

import { useI18n } from "@/lib/i18n";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useI18n();

  if (compact) {
    return (
      <button
        onClick={() => setLang(lang === "en" ? "bn" : "en")}
        className="btn-secondary !px-3 !py-2"
        aria-label="Toggle language"
      >
        <Languages className="h-4 w-4" />
        <span className={cn("text-sm font-semibold", lang === "bn" && "font-bangla")}>
          {lang === "en" ? "বাংলা" : "EN"}
        </span>
      </button>
    );
  }

  return (
    <div className="inline-flex rounded-xl border border-line bg-surface p-1">
      <button
        onClick={() => setLang("en")}
        className={cn(
          "rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors",
          lang === "en" ? "bg-brand-500 text-white" : "text-muted hover:text-ink",
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLang("bn")}
        className={cn(
          "rounded-lg px-3 py-1.5 font-bangla text-sm font-semibold transition-colors",
          lang === "bn" ? "bg-brand-500 text-white" : "text-muted hover:text-ink",
        )}
      >
        বাংলা
      </button>
    </div>
  );
}
