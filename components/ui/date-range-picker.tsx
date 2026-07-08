"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type DateRange = { start: Date | null; end: Date | null };

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function addDays(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function sameDay(a: Date | null, b: Date | null) {
  return (
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function isBetween(d: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  const t = startOfDay(d).getTime();
  return t > startOfDay(start).getTime() && t < startOfDay(end).getTime();
}
function fmtLabel(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function fmtInput(d: Date | null) {
  if (!d) return "";
  return `${d.getMonth() + 1} / ${d.getDate()} / ${d.getFullYear()}`;
}
function parseInput(s: string): Date | null {
  const parts = s.split("/").map((p) => Number(p.trim()));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  const [m, day, y] = parts;
  const d = new Date(y, m - 1, day);
  return Number.isNaN(d.getTime()) ? null : d;
}

type Preset = { label: string; range: (today: Date) => DateRange };

function buildPresets(): Preset[] {
  return [
    { label: "Today", range: (t) => ({ start: t, end: t }) },
    {
      label: "Yesterday",
      range: (t) => ({ start: addDays(t, -1), end: addDays(t, -1) }),
    },
    {
      label: "This week",
      range: (t) => ({ start: addDays(t, -t.getDay()), end: t }),
    },
    {
      label: "Last week",
      range: (t) => {
        const startThis = addDays(t, -t.getDay());
        return { start: addDays(startThis, -7), end: addDays(startThis, -1) };
      },
    },
    {
      label: "This month",
      range: (t) => ({
        start: new Date(t.getFullYear(), t.getMonth(), 1),
        end: t,
      }),
    },
    {
      label: "Last month",
      range: (t) => ({
        start: new Date(t.getFullYear(), t.getMonth() - 1, 1),
        end: new Date(t.getFullYear(), t.getMonth(), 0),
      }),
    },
    {
      label: "This year",
      range: (t) => ({
        start: new Date(t.getFullYear(), 0, 1),
        end: new Date(t.getFullYear(), 11, 31),
      }),
    },
    {
      label: "Last year",
      range: (t) => ({
        start: new Date(t.getFullYear() - 1, 0, 1),
        end: new Date(t.getFullYear() - 1, 11, 31),
      }),
    },
    { label: "All time", range: () => ({ start: null, end: null }) },
  ];
}

function MonthGrid({
  month,
  range,
  hover,
  onPick,
  onHover,
}: {
  month: Date;
  range: DateRange;
  hover: Date | null;
  onPick: (d: Date) => void;
  onHover: (d: Date | null) => void;
}) {
  const year = month.getFullYear();
  const m = month.getMonth();
  const firstDay = new Date(year, m, 1).getDay();
  const daysInMonth = new Date(year, m + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, m, d));

  // Effective end for range preview while selecting.
  const previewEnd =
    range.start && !range.end && hover ? hover : range.end;
  const lo =
    range.start && previewEnd && previewEnd < range.start
      ? previewEnd
      : range.start;
  const hi =
    range.start && previewEnd && previewEnd < range.start
      ? range.start
      : previewEnd;

  return (
    <div className="w-[280px]">
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="py-1 text-xs font-medium text-muted"
          >
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const isStart = sameDay(d, lo);
          const isEnd = sameDay(d, hi);
          const isEndpoint = isStart || isEnd;
          const inRange = isBetween(d, lo, hi);
          return (
            <div
              key={i}
              className={cn(
                "flex justify-center",
                inRange && "bg-brand-50",
                isStart && hi && !sameDay(lo, hi) && "rounded-l-full bg-brand-50",
                isEnd && lo && !sameDay(lo, hi) && "rounded-r-full bg-brand-50",
              )}
            >
              <button
                type="button"
                onClick={() => onPick(d)}
                onMouseEnter={() => onHover(d)}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors",
                  isEndpoint
                    ? "bg-brand-500 font-semibold text-white"
                    : inRange
                      ? "text-ink hover:bg-brand-100"
                      : "text-ink hover:bg-brand-50",
                )}
              >
                {d.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DateRangePicker({
  value,
  onChange,
  today = startOfDay(new Date()),
  className,
}: {
  value: DateRange;
  onChange: (range: DateRange) => void;
  today?: Date;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange>(value);
  const [hover, setHover] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState<Date>(
    value.start ? new Date(value.start.getFullYear(), value.start.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [startText, setStartText] = useState("");
  const [endText, setEndText] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const presets = useMemo(() => buildPresets(), []);

  // Reset draft/inputs each time the popover opens.
  useEffect(() => {
    if (!open) return;
    setDraft(value);
    setStartText(fmtInput(value.start));
    setEndText(fmtInput(value.end));
    setViewMonth(
      value.start
        ? new Date(value.start.getFullYear(), value.start.getMonth(), 1)
        : new Date(today.getFullYear(), today.getMonth(), 1),
    );
  }, [open, value, today]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activePreset = presets.find((p) => {
    const r = p.range(today);
    return sameDay(r.start, draft.start) && sameDay(r.end, draft.end);
  });

  function pickDay(d: Date) {
    setDraft((prev) => {
      if (!prev.start || (prev.start && prev.end)) {
        setStartText(fmtInput(d));
        setEndText("");
        return { start: d, end: null };
      }
      // Second click.
      const [start, end] = d < prev.start ? [d, prev.start] : [prev.start, d];
      setStartText(fmtInput(start));
      setEndText(fmtInput(end));
      return { start, end };
    });
  }

  function applyPreset(p: Preset) {
    const r = p.range(today);
    setDraft(r);
    setStartText(fmtInput(r.start));
    setEndText(fmtInput(r.end));
    if (r.start)
      setViewMonth(new Date(r.start.getFullYear(), r.start.getMonth(), 1));
  }

  function commit() {
    onChange(draft);
    setOpen(false);
  }

  const triggerLabel =
    value.start && value.end
      ? `${fmtLabel(value.start)} – ${fmtLabel(value.end)}`
      : value.start
        ? fmtLabel(value.start)
        : "All time";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-lg border bg-surface px-3 py-2 text-sm font-medium text-ink transition-colors",
          open
            ? "border-brand-400 ring-2 ring-brand-200"
            : "border-line hover:border-brand-300",
        )}
      >
        <Calendar className="h-4 w-4 text-muted" />
        {triggerLabel}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 flex overflow-hidden rounded-xl border border-line bg-surface shadow-xl">
          {/* Presets */}
          <div className="w-40 shrink-0 border-r border-line py-2">
            {presets.map((p) => {
              const active = activePreset?.label === p.label;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className={cn(
                    "block w-full px-4 py-2 text-left text-sm transition-colors",
                    active
                      ? "bg-brand-50 font-semibold text-ink"
                      : "text-muted hover:bg-canvas hover:text-ink",
                  )}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Calendars */}
          <div className="flex flex-col">
            <div className="flex items-start gap-6 px-5 pt-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setViewMonth((m) => addMonths(m, -1))}
                  className="rounded-md p-1 text-muted hover:bg-canvas hover:text-ink"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-1 flex-col">
                <div className="mb-2 flex items-center justify-between gap-10">
                  <div className="flex-1 text-center text-sm font-semibold text-ink">
                    {viewMonth.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex-1 text-center text-sm font-semibold text-ink">
                    {addMonths(viewMonth, 1).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div
                  className="flex gap-6"
                  onMouseLeave={() => setHover(null)}
                >
                  <MonthGrid
                    month={viewMonth}
                    range={draft}
                    hover={hover}
                    onPick={pickDay}
                    onHover={setHover}
                  />
                  <MonthGrid
                    month={addMonths(viewMonth, 1)}
                    range={draft}
                    hover={hover}
                    onPick={pickDay}
                    onHover={setHover}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewMonth((m) => addMonths(m, 1))}
                className="rounded-md p-1 text-muted hover:bg-canvas hover:text-ink"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-line px-5 py-3">
              <div className="flex items-center gap-2">
                <input
                  value={startText}
                  onChange={(e) => setStartText(e.target.value)}
                  onBlur={() => {
                    const d = parseInput(startText);
                    if (d) setDraft((prev) => ({ ...prev, start: d }));
                  }}
                  placeholder="M / D / YYYY"
                  className="w-28 rounded-lg border border-line bg-surface px-3 py-1.5 text-center text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                />
                <span className="text-muted">–</span>
                <input
                  value={endText}
                  onChange={(e) => setEndText(e.target.value)}
                  onBlur={() => {
                    const d = parseInput(endText);
                    if (d) setDraft((prev) => ({ ...prev, end: d }));
                  }}
                  placeholder="M / D / YYYY"
                  className="w-28 rounded-lg border border-line bg-surface px-3 py-1.5 text-center text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn-secondary px-4 py-1.5 text-sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary px-4 py-1.5 text-sm"
                  onClick={commit}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
