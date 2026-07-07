import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 text-center">
      <div className="text-6xl">🧭</div>
      <h1 className="mt-4 text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Back to home
      </Link>
    </div>
  );
}
