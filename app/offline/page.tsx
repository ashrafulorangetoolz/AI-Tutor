"use client";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 text-center">
      <div className="text-6xl">📡</div>
      <h1 className="mt-4 text-3xl font-bold text-ink">You&apos;re offline</h1>
      <p className="mt-2 max-w-sm text-muted">
        We couldn&apos;t reach the internet. Check your connection — your saved
        pages are still available, and we&apos;ll reconnect automatically.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="btn-primary mt-6"
      >
        Try again
      </button>
    </div>
  );
}
