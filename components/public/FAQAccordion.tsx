"use client";

import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { FAQS } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";
import { LinkButton } from "@/components/ui/primitives";

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-y border-line bg-linear-to-b from-brand-50/50 via-surface to-secondary-50/30 py-16 sm:py-20">
    <div className="section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      {/* Left — intro */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-500">
          <Sparkles className="h-4 w-4" />
          FAQ
        </span>
        <h2 className="mt-6 text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Frequently Asked
          <br />
          <span className="text-brand-500">Questions</span>
        </h2>
        <p className="mt-5 max-w-md text-base text-muted">
          Everything you need to know about the AI tutor, subjects, pricing and
          support — so you can start learning smarter without the guesswork.
        </p>
        <div className="mt-8">
          <LinkButton href="/contact" variant="primary">
            Contact Us
          </LinkButton>
        </div>
      </div>

      {/* Right — accordion */}
      <div className="flex flex-col gap-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={cn(
                "rounded-2xl border transition-colors duration-200",
                isOpen
                  ? "border-brand-200 bg-surface shadow-card"
                  : "border-transparent bg-canvas hover:bg-surface",
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center  justify-between gap-4 px-5 py-5 text-left sm:px-6"
              >
                <span
                  className={cn(
                    "text-base font-semibold transition-colors sm:text-lg",
                    isOpen ? "text-ink" : "text-ink/90",
                  )}
                >
                  {f.q}
                </span>
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200",
                    isOpen
                      ? "bg-brand-500 text-white shadow-brand"
                      : "bg-surface text-muted ring-1 ring-line",
                  )}
                >
                  <Plus
                    className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      isOpen && "rotate-45",
                    )}
                  />
                </span>
              </button>
              <div
                className={cn(
                  "grid overflow-hidden px-5 transition-all duration-300 ease-out sm:px-6",
                  isOpen
                    ? "grid-rows-[1fr] pb-5 opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <p className="min-h-0 max-w-xl text-sm leading-relaxed text-muted">
                  {f.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </section>
  );
}
