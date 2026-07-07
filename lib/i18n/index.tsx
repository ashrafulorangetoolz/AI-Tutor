"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import en from "@/messages/en.json";
import bn from "@/messages/bn.json";

type Lang = "en" | "bn";
type Dict = typeof en;

const DICTS: Record<Lang, Dict> = { en, bn: bn as Dict };

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (path: string) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

function resolve(dict: Dict, path: string): string {
  return (
    path.split(".").reduce<unknown>((acc, key) => {
      if (acc && typeof acc === "object" && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, dict) as string
  ) ?? path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("ai_tutor_lang") as Lang | null;
    if (stored === "en" || stored === "bn") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("ai_tutor_lang", l);
    document.documentElement.setAttribute("data-lang", l);
  };

  const value: I18nCtx = {
    lang,
    setLang,
    toggle: () => setLang(lang === "en" ? "bn" : "en"),
    t: (path: string) => resolve(DICTS[lang], path),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // Safe fallback if used outside the provider (e.g. static server render).
    return {
      lang: "en",
      setLang: () => {},
      toggle: () => {},
      t: (path: string) => resolve(en, path),
    };
  }
  return ctx;
}
