import { cn } from "@/lib/utils/cn";

export function BandBadge({ band, size = "md" }: { band: number; size?: "sm" | "md" | "lg" }) {
  const dims = { sm: "h-10 w-10 text-sm", md: "h-14 w-14 text-lg", lg: "h-20 w-20 text-2xl" }[size];
  const tone = band >= 7 ? "bg-brand-500" : band >= 6 ? "bg-info" : "bg-warning";
  return (
    <div className={cn("flex items-center justify-center rounded-2xl font-extrabold text-white", dims, tone)}>
      {band.toFixed(1)}
    </div>
  );
}

/** Criterion breakdown row used by writing & speaking feedback. */
export function CriterionRow({ label, band }: { label: string; band: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-44 text-sm text-ink">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/5">
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${(band / 9) * 100}%` }} />
      </div>
      <span className="w-8 text-right text-sm font-bold text-ink">{band.toFixed(1)}</span>
    </div>
  );
}

export function BandScoreCard({
  estimatedBand,
  criteria,
  targetBand,
}: {
  estimatedBand: number;
  criteria: { label: string; band: number }[];
  targetBand?: number;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-center gap-4">
        <BandBadge band={estimatedBand} size="lg" />
        <div>
          <p className="text-sm text-muted">Estimated band</p>
          <p className="text-3xl font-extrabold text-ink">{estimatedBand.toFixed(1)}</p>
          {targetBand && (
            <p className="text-xs text-muted">
              Target {targetBand.toFixed(1)} ·{" "}
              {estimatedBand >= targetBand ? (
                <span className="font-semibold text-brand-500">On target 🎉</span>
              ) : (
                <span className="font-semibold text-warning">
                  {(targetBand - estimatedBand).toFixed(1)} band to go
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {criteria.map((c) => (
          <CriterionRow key={c.label} {...c} />
        ))}
      </div>
    </div>
  );
}
