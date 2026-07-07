/** Formatting helpers used across dashboards. */

export function bdt(amount: number): string {
  return "৳" + amount.toLocaleString("en-BD");
}

export function pct(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`;
}

export function formatMinutes(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function relativeDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString();
}

export function daysUntil(date: Date | string): number {
  const d = typeof date === "string" ? new Date(date) : date;
  return Math.max(0, Math.ceil((d.getTime() - Date.now()) / 86_400_000));
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
