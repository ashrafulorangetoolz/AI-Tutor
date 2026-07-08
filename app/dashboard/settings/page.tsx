"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/cards";
import {
  Card,
  CardBody,
  Badge,
  ProgressBar,
  LinkButton,
} from "@/components/ui/primitives";
import { useToast } from "@/components/ui/toast";
import { useI18n } from "@/lib/i18n";
import { planById } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

const NOTIF_ROWS = [
  { key: "reminders", label: "Study reminders" },
  { key: "streak", label: "Streak alerts" },
  { key: "report", label: "Weekly report" },
  { key: "countdown", label: "Exam countdown" },
] as const;

export default function SettingsPage() {
  const { toast } = useToast();
  const { lang, setLang } = useI18n();

  const [name, setName] = useState("Rafi Ahmed");
  const [email, setEmail] = useState("rafi.ahmed@example.com");
  const [phone, setPhone] = useState("+880 1712 345678");

  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    reminders: true,
    streak: true,
    report: false,
    countdown: true,
  });

  const freePlan = planById("FREE");

  function toggleNotif(key: string, label: string) {
    setNotifs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      toast(`${label} ${next[key] ? "enabled" : "disabled"}`);
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Settings" subtitle="Manage your account and preferences" />

      <div className="space-y-5">
        {/* Profile */}
        <Card>
          <CardBody>
            <h2 className="mb-4 text-base font-semibold text-ink">Profile</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label mb-1.5 block">Name</label>
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="label mb-1.5 block">Email</label>
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label mb-1.5 block">Phone</label>
                <input
                  className="input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-5">
              <button
                className="btn-primary"
                onClick={() => toast("Profile updated")}
              >
                Save changes
              </button>
            </div>
          </CardBody>
        </Card>

        {/* Language preference */}
        <Card>
          <CardBody>
            <h2 className="mb-1 text-base font-semibold text-ink">
              Language preference
            </h2>
            <p className="mb-4 text-sm text-muted">
              Choose the interface language for your dashboard.
            </p>
            <div className="inline-grid grid-cols-2 gap-1 rounded-lg border border-line bg-black/5 p-1">
              <button
                onClick={() => setLang("en")}
                className={cn(
                  "rounded-md px-5 py-2.5 text-sm font-semibold transition",
                  lang === "en"
                    ? "bg-surface text-ink shadow-sm"
                    : "text-muted hover:text-ink",
                )}
              >
                English
              </button>
              <button
                onClick={() => setLang("bn")}
                className={cn(
                  "rounded-md px-5 py-2.5 font-bangla text-sm font-semibold transition",
                  lang === "bn"
                    ? "bg-surface text-ink shadow-sm"
                    : "text-muted hover:text-ink",
                )}
              >
                বাংলা
              </button>
            </div>
          </CardBody>
        </Card>

        {/* Subscription */}
        <Card>
          <CardBody>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-ink">Subscription</h2>
                <Badge tone="gray">{freePlan.name}</Badge>
              </div>
              <LinkButton href="/pricing" variant="primary" className="!px-4 !py-2 text-sm">
                Upgrade
              </LinkButton>
            </div>

            <div className="mb-6">
              <p className="label mb-2">What's included</p>
              <ul className="space-y-1.5 text-sm text-ink/90">
                {freePlan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-500">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="label">This period's usage</p>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-ink">AI questions</span>
                  <span className="font-semibold text-ink">12 / 30</span>
                </div>
                <ProgressBar value={(12 / 30) * 100} />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-ink">Mock tests</span>
                  <span className="font-semibold text-ink">1 / 1</span>
                </div>
                <ProgressBar value={100} tone="amber" />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-ink">Writing evaluations</span>
                  <span className="font-semibold text-ink">1 / 3</span>
                </div>
                <ProgressBar value={(1 / 3) * 100} tone="blue" />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Notifications */}
        <Card>
          <CardBody>
            <h2 className="mb-4 text-base font-semibold text-ink">Notifications</h2>
            <div className="divide-y divide-line">
              {NOTIF_ROWS.map((row) => {
                const on = notifs[row.key];
                return (
                  <div
                    key={row.key}
                    className="flex items-center justify-between py-3"
                  >
                    <span className="text-sm text-ink">{row.label}</span>
                    <button
                      role="switch"
                      aria-checked={on}
                      onClick={() => toggleNotif(row.key, row.label)}
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        on ? "bg-brand-500" : "bg-black/15",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                          on ? "left-[1.375rem]" : "left-0.5",
                        )}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
