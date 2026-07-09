import { cn } from "@/lib/utils/cn";

/**
 * Figma "Shape / Gradients" — a soft, full-bleed aurora wash.
 * The source linear gradient (flipped, heavily blurred, low opacity) paints
 * the corners; a central + bottom canvas fade keeps content legible.
 * Used behind the hero and the login / signup screens.
 */
export function GradientBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* Aurora gradient, horizontally flipped + blurred */}
      <div
        className="absolute inset-0 -scale-x-100 opacity-35 blur-[90px]"
        style={{
          background:
            "linear-gradient(269.3deg, #09FF9B 4.46%, #CAB099 23.59%, #ffffff 80%,  #FDFD35 42.73%, #FF5714 55.98%, #B285FF 95.69%)",
        }}
      />
      {/* Clear the centre so the heading reads cleanly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 42%, var(--color-canvas) 0%, transparent 70%)",
        }}
      />
      {/* Soft fade so the glow melts into the canvas below */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-canvas" />
    </div>
  );
}
