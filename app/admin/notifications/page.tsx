"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { PageHeader } from "@/components/dashboard/cards";
import { Badge, Card, CardBody } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/toast";

type Audience = "All" | "Students" | "Parents" | "Schools";

interface Notification {
  id: number;
  title: string;
  body: string;
  audience: Audience;
  time: string;
}

const SEED: Notification[] = [
  {
    id: 3,
    title: "New IELTS mock exams live",
    body: "Three new full-length IELTS mock exams are now available for all Pro users.",
    audience: "Students",
    time: "just now",
  },
  {
    id: 2,
    title: "Weekly progress reports sent",
    body: "Parents can now review their child's weekly performance in the dashboard.",
    audience: "Parents",
    time: "2d ago",
  },
  {
    id: 1,
    title: "Scheduled maintenance",
    body: "The platform will be briefly unavailable on Sunday 2:00–3:00 AM BST.",
    audience: "All",
    time: "5d ago",
  },
];

export default function AdminNotificationsPage() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>(SEED);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<Audience>("All");

  function send() {
    if (!title.trim() || !body.trim()) {
      toast("Add a title and message first", "warning");
      return;
    }
    setNotifications((n) => [
      { id: Date.now(), title: title.trim(), body: body.trim(), audience, time: "just now" },
      ...n,
    ]);
    setTitle("");
    setBody("");
    setAudience("All");
    toast("Notification sent", "success");
  }

  return (
    <>
      <PageHeader title="Notifications" subtitle="Broadcast messages to your users" />

      <Card className="mb-6">
        <CardBody>
          <h2 className="mb-4 text-base font-semibold text-ink">Compose notification</h2>
          <div className="space-y-4">
            <div>
              <label className="label" htmlFor="notif-title">
                Title
              </label>
              <input
                id="notif-title"
                className="input"
                placeholder="e.g. New feature released"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="notif-body">
                Message
              </label>
              <textarea
                id="notif-body"
                className="input min-h-[96px] resize-y"
                placeholder="Write your message…"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="sm:w-56">
                <label className="label" htmlFor="notif-audience">
                  Audience
                </label>
                <select
                  id="notif-audience"
                  className="input"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as Audience)}
                >
                  <option value="All">All</option>
                  <option value="Students">Students</option>
                  <option value="Parents">Parents</option>
                  <option value="Schools">Schools</option>
                </select>
              </div>
              <button className="btn-primary" onClick={send}>
                Send
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      <h2 className="mb-3 text-base font-semibold text-ink">Sent notifications</h2>
      <div className="space-y-3">
        {notifications.map((n) => (
          <Card key={n.id}>
            <CardBody className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <Bell className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-ink">{n.title}</span>
                  <Badge tone="blue">{n.audience}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted">{n.body}</p>
                <p className="mt-1 text-xs text-muted">{n.time}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}
