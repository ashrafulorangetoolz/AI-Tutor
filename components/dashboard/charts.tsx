"use client";

import { cn } from "@/lib/utils/cn";

// Lightweight dependency-free SVG charts tuned to the brand palette.

export function BarChart({
  data,
  height = 160,
  color = "#7034EA",
  suffix = "",
}: {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  suffix?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="w-full">
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center justify-end gap-1.5">
            <span className="text-[11px] font-semibold text-ink">
              {d.value}
              {suffix}
            </span>
            <div
              className="w-full rounded-t-lg transition-all"
              style={{
                height: `${(d.value / max) * (height - 28)}px`,
                background: color,
                opacity: 0.85,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-2">
        {data.map((d) => (
          <div key={d.label} className="flex-1 text-center text-[11px] text-muted">
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LineChart({
  data,
  height = 180,
  color = "#7034EA",
}: {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}) {
  const w = 100;
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = 100 - ((d.value - min) / range) * 90 - 5;
    return { x, y };
  });
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `0,100 ${line} ${w},100`;

  return (
    <div className="w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height }} className="w-full">
        <defs>
          <linearGradient id="lc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#lc)" />
        <polyline
          points={line}
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill={color} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="mt-1 flex justify-between">
        {data.map((d) => (
          <span key={d.label} className="text-[11px] text-muted">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Donut({
  segments,
  size = 140,
  thickness = 18,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  // Precompute each arc's length and cumulative offset (pure — no render-time mutation).
  const dashes = segments.map((s) => (s.value / total) * c);
  const offsets = dashes.map((_, i) => dashes.slice(0, i).reduce((a, b) => a + b, 0));

  return (
    <div className="flex items-center gap-5">
      <svg width={size} height={size} className="-rotate-90">
        {segments.map((s, i) => (
          <circle
            key={s.label}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={thickness}
            strokeDasharray={`${dashes[i]} ${c - dashes[i]}`}
            strokeDashoffset={-offsets[i]}
          />
        ))}
      </svg>
      <div className="space-y-1.5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
            <span className="text-muted">{s.label}</span>
            <span className="ml-auto font-semibold text-ink">
              {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RingStat({
  value,
  label,
  color = "#7034EA",
  size = 96,
}: {
  value: number;
  label?: string;
  color?: string;
  size?: number;
}) {
  const thickness = 9;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#00000010" strokeWidth={thickness} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-ink">
          {Math.round(value)}%
        </div>
      </div>
      {label && <span className={cn("mt-1 text-xs text-muted")}>{label}</span>}
    </div>
  );
}
