"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Counts a numeric stat up from zero when it scrolls into view.
 * Preserves any non-numeric prefix/suffix (e.g. "+", "k+", "%", "★", commas
 * and decimals). Values without a number (e.g. "Board", "বাংলা") render as-is.
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/\d[\d,]*\.?\d*/);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !match) return;

      const numStr = match[0];
      const idx = match.index ?? 0;
      const prefix = value.slice(0, idx);
      const suffix = value.slice(idx + numStr.length);
      const decimals = numStr.includes(".")
        ? numStr.split(".")[1].length
        : 0;
      const target = parseFloat(numStr.replace(/,/g, ""));

      const fmt = (n: number) =>
        prefix +
        n.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        el.textContent = fmt(target);
        return;
      }

      const counter = { v: 0 };
      el.textContent = fmt(0);
      gsap.to(counter, {
        v: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = fmt(counter.v);
        },
      });
    },
    { scope: ref },
  );

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
