"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function NotFound() {
  const router = useRouter();

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const q = (data.get("q") as string)?.trim();
    router.push(q ? `/?q=${encodeURIComponent(q)}` : "/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="relative w-full max-w-2xl py-20 text-center">
        {/* Giant watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[13rem] font-extrabold leading-none tracking-tighter text-ink/[0.04] sm:text-[18rem]"
        >
          404
        </span>

        {/* Foreground content */}
        <div className="relative">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            We lost this page
          </h1>
          <p className="mt-4 text-base text-muted sm:text-lg">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-8 flex max-w-md items-center gap-3"
          >
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                name="q"
                placeholder="Search our site"
                aria-label="Search our site"
                className="input pl-10"
              />
            </div>
            <button type="submit" className="btn-secondary shrink-0">
              Search
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Go back
            </button>
            <Link href="/" className="btn-primary">
              Go home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
