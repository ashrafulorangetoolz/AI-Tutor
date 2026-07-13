import { Star, Quote, Play } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants/site";
import { ScrollReveal } from "./Reveal";

type Testimonial = (typeof TESTIMONIALS)[number];

export function TestimonialShowcase() {
  return (
    <div className="space-y-6">
      {/* Video testimonials — marquee scrolling left → right */}
      <ScrollReveal>
        <Marquee reverse>
          {TESTIMONIALS.map((t) => (
            <VideoCard key={t.name} t={t} />
          ))}
        </Marquee>
      </ScrollReveal>

      {/* Written reviews — marquee scrolling right → left */}
      <ScrollReveal>
        <Marquee>
          {TESTIMONIALS.map((t) => (
            <ReviewCard key={t.name} t={t} />
          ))}
        </Marquee>
      </ScrollReveal>
    </div>
  );
}

/* Seamless infinite marquee: the track holds two copies of the children and
   translates -50%. `reverse` flips the travel direction (left → right). */
function Marquee({
  children,
  reverse,
}: {
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="group [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] overflow-hidden">
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {[0, 1].map((half) => (
          <div
            key={half}
            className="flex shrink-0 gap-6 pr-6"
            aria-hidden={half === 1}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoCard({ t }: { t: Testimonial }) {
  return (
    <article className="w-72 shrink-0 overflow-hidden rounded-3xl border border-line bg-surface shadow-card sm:w-80">
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
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ring-2 ring-surface"
          style={{
            background: `linear-gradient(135deg, ${t.avatarColor}, ${t.avatarColor}bb)`,
          }}
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
  return (
    <article className="group/card relative flex w-[22rem] shrink-0 flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-card">
      {/* soft corner glow in the testimonial's accent colour */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl"
        style={{ background: t.avatarColor }}
      />

      {/* decorative quote glyph */}
      <Quote
        aria-hidden
        className="h-9 w-9 shrink-0 rotate-180 fill-current"
        style={{ color: `${t.avatarColor}33` }}
        strokeWidth={0}
      />

      {/* stars */}
      <div className="mt-3 flex text-warning">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} className="h-4 w-4 fill-current" strokeWidth={0} />
        ))}
      </div>

      {/* quote */}
      <p className="mt-4 text-base leading-relaxed text-ink">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* author */}
      <div className="mt-auto flex items-center gap-3 pt-6">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ring-2 ring-surface"
          style={{
            background: `linear-gradient(135deg, ${t.avatarColor}, ${t.avatarColor}bb)`,
          }}
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
