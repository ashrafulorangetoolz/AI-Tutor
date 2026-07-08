"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { ROLE_LABEL } from "@/lib/constants";
import type { UserRole } from "@/types";

const SIGNUP_ROLES: UserRole[] = ["STUDENT", "PARENT"];

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState<UserRole>("STUDENT");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
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
        toast("Could not create account. Please try again.", "error");
        return;
      }
      toast("Account created!");
      if (role === "STUDENT") {
        router.push("/onboarding");
      } else {
        router.push(data.redirect);
      }
    } catch {
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[440px]">
      <div className="card card-pad">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-ink">Create your account</h1>
          <p className="mt-1 text-sm text-muted">
            Start learning smarter with your AI tutor
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="label" htmlFor="name">
              Full name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className="input pl-10"
              />
            </div>
          </div>

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
            <label className="label" htmlFor="phone">
              Phone
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+880 1XXX-XXXXXX"
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
                autoComplete="new-password"
                placeholder="Create a password"
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <span className="label">I am a</span>
            <div className="grid grid-cols-2 gap-1 rounded-lg border border-line bg-black/5 p-1">
              {SIGNUP_ROLES.map((r) => {
                const selected = r === role;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    aria-pressed={selected}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                      selected
                        ? "bg-surface text-ink shadow-sm"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {ROLE_LABEL[r].en}
                  </button>
                );
              })}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Creating account…" : "Create account"}
            {!loading && <ArrowRight className="ml-1 h-4 w-4" />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-brand-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
