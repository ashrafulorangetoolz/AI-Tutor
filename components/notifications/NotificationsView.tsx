"use client";

import { useMemo, useState } from "react";
import { CheckCheck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/cards";
import { Card, CardBody, EmptyState } from "@/components/ui/primitives";
import { NOTIFICATIONS } from "@/lib/mock/data";

const NOTIF_ICON: Record<string, string> = {
  EXAM_COUNTDOWN: "⏳",
  STREAK_ALERT: "🔥",
  REPORT_READY: "📊",
  ACHIEVEMENT: "🏆",
};

type Filter = "all" | "unread";

export function NotificationsView() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState<Filter>("all");

  const unread = items.filter((n) => !n.read).length;
  const visible = useMemo(
    () => (filter === "unread" ? items.filter((n) => !n.read) : items),
    [items, filter],
  );

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function toggleRead(index: number) {
    setItems((prev) =>
      prev.map((n, i) => (i === index ? { ...n, read: !n.read } : n)),
    );
  }

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle={
          unread > 0
            ? `You have ${unread} unread notification${unread > 1 ? "s" : ""}`
            : "You're all caught up"
        }
        action={
          unread > 0 ? (
            <button className="btn-secondary" onClick={markAllRead}>
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </button>
          ) : undefined
        }
      />

      <div className="mb-5 inline-flex rounded-lg border border-line bg-surface p-1">
        {(["all", "unread"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === f
                ? "bg-brand-500 text-white"
                : "text-muted hover:text-ink"
            }`}
          >
            {f}
            {f === "unread" && unread > 0 && (
              <span className="ml-1.5 text-xs">({unread})</span>
            )}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon="🔔"
          title={filter === "unread" ? "No unread notifications" : "No notifications"}
          description="New updates about your exams, streaks and reports will appear here."
        />
      ) : (
        <div className="space-y-3">
          {items.map((n, i) => {
            if (filter === "unread" && n.read) return null;
            return (
              <Card key={i}>
                <CardBody
                  className={`flex items-start gap-3 ${
                    n.read ? "" : "border-l-4 border-brand-500"
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-xl">
                    {NOTIF_ICON[n.type] ?? "🔔"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold text-ink">
                        {n.title}
                      </span>
                      {!n.read && (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted">{n.body}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <span className="text-xs text-muted">{n.time}</span>
                      <button
                        onClick={() => toggleRead(i)}
                        className="text-xs font-medium text-brand-500 hover:text-brand-600"
                      >
                        {n.read ? "Mark as unread" : "Mark as read"}
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
