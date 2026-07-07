"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line rounded-2xl border border-line bg-surface">
      {FAQS.map((f, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <span className="text-sm font-semibold text-ink">{f.q}</span>
            <ChevronDown
              className={cn("h-5 w-5 shrink-0 text-muted transition-transform", open === i && "rotate-180")}
            />
          </button>
          <div
            className={cn(
              "grid overflow-hidden px-5 transition-all",
              open === i ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]",
            )}
          >
            <p className="min-h-0 text-sm text-muted">{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
