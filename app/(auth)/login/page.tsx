"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Phone, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { ROLE_LABEL } from "@/lib/constants";
import type { UserRole } from "@/types";

const DEMO_ROLES: UserRole[] = [
  "STUDENT",
  "PARENT",
  "SCHOOL_ADMIN",
  "SUPER_ADMIN",
];

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState<UserRole>("STUDENT");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        toast("Could not log in. Please try again.", "error");
        return;
      }
      toast("Welcome back!");
      router.push(data.redirect);
    } catch {
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-transparent max-w-[440px]">
      <div className="card card-pad">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-ink">Welcome back</h1>
          <p className="mt-1 text-sm text-muted">Log in to continue learning</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <span className="label">Log in as (demo):</span>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ROLES.map((r) => {
                const selected = r === role;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    aria-pressed={selected}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                      selected
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-line bg-surface text-ink hover:bg-brand-50"
                    }`}
                  >
                    {ROLE_LABEL[r].en}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Logging in…" : "Log in"}
            {!loading && <ArrowRight className="ml-1 h-4 w-4" />}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs text-muted">or</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <button
          type="button"
          onClick={() => toast("OTP sent to your phone (demo)")}
          className="btn-secondary w-full"
        >
          <Phone className="mr-1 h-4 w-4" />
          Continue with Phone OTP
        </button>

        <p className="mt-6 text-center text-sm text-muted">
          New here?{" "}
          <Link
            href="/signup"
            className="font-medium text-brand-500 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
