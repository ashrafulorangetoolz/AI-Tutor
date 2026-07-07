import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-canvas">
      {/* Ambient gradient glow (Figma: Shape / Gradients) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[130%] w-[120%] -translate-x-1/2 -translate-y-1/2 animate-float bg-cover bg-center bg-no-repeat opacity-70"
          style={{ backgroundImage: "url('/hero-glow.svg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-canvas/50 via-transparent to-canvas" />
      </div>
      <header className="flex items-center justify-between px-4 py-4 sm:px-8">
        <Logo />
        <div className="flex items-center gap-2">
          <LanguageSwitcher compact />
          <Link href="/" className="btn-ghost">
            ← Home
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-8">{children}</main>
    </div>
  );
}
