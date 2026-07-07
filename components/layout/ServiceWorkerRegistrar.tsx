"use client";

import { useEffect } from "react";

/**
 * Registers the PWA service worker once, on the client, after load.
 * Skipped in development so it never interferes with HMR.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      typeof window === "undefined" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => console.error("SW registration failed:", err));
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register);

    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
