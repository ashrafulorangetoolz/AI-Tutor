"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

type Testimonial = (typeof TESTIMONIALS)[number];

/* Shared horizontal-scroll row: hidden scrollbar, snap, edge padding. */
const ROW =
  "flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export function TestimonialShowcase() {
  return (
    <div className="space-y-5">
      {/* Video testimonial cards — infinite auto-scroll marquee */}
      <div className="group overflow-hidden">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 gap-5 pr-5" aria-hidden={half === 1}>
              {TESTIMONIALS.map((t) => (
                <VideoCard key={`${half}-${t.name}`} t={t} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Written review cards */}
      <div className={ROW}>
        {TESTIMONIALS.map((t) => (
          <ReviewCard key={t.name} t={t} />
        ))}
      </div>
    </div>
  );
}

function VideoCard({ t }: { t: Testimonial }) {
  return (
    <article className="w-72 shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-surface shadow-card sm:w-80">
      {/* Thumbnail (gradient placeholder — no video assets in repo) */}
      <div
        className="relative flex h-52 items-center justify-center"
        style={{
          background: `linear-gradient(150deg, ${t.avatarColor} 0%, #0f1020 120%)`,
        }}
      >
        <button
          type="button"
          aria-label={`Play ${t.name}'s testimonial`}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-ink shadow-pop backdrop-blur transition-transform hover:scale-105"
        >
          <Play className="ml-0.5 h-6 w-6 fill-current" />
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 p-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ background: t.avatarColor }}
        >
          {t.name[0]}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
          <p className="truncate text-xs text-muted">{t.role}</p>
        </div>
      </div>
    </article>
  );
}

function ReviewCard({ t }: { t: Testimonial }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="flex w-80 shrink-0 snap-start flex-col rounded-xl border border-line p-6 shadow-card"
      style={{ background: `linear-gradient(160deg, ${t.avatarColor}14 0%, #ffffff 70%)` }}
    >
      <p
        className={cn(
          "text-sm leading-relaxed text-ink",
          !expanded && "line-clamp-4",
        )}
      >
        &ldquo;{t.quote}&rdquo;
      </p>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 self-start text-sm font-semibold text-brand-600 hover:underline"
      >
        {expanded ? "Show less" : "Read more"}
      </button>

      <div className="mt-auto flex items-center gap-3 pt-5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ background: t.avatarColor }}
        >
          {t.name[0]}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
          <p className="truncate text-xs text-muted">{t.role}</p>
        </div>
      </div>
    </article>
  );
}
