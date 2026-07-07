"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 text-center">
      <div className="text-6xl">⚠️</div>
      <h1 className="mt-4 text-2xl font-bold text-ink">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-muted">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-6 flex gap-3">
        <button onClick={reset} className="btn-primary">
          Try again
        </button>
        <Link href="/" className="btn-secondary">
          Go home
        </Link>
      </div>
    </div>
  );
}
